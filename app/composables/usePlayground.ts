import { createSeedMessages, planReply } from "~/utils/playground-samples";
import type { ChatMessage, Attachment } from "~/utils/playground-types";

const STREAM_TICK = 24;
const STREAM_CHUNK = 3;

export function usePlayground() {
  const messages = useState<ChatMessage[]>(
    "playground-messages",
    createSeedMessages,
  );
  const isGenerating = useState("playground-generating", () => false);
  const counters = useState("playground-counters", () => ({
    message: 100,
    attachment: 5000,
    reply: 0,
  }));

  let timer: ReturnType<typeof setTimeout> | undefined;

  const nowLabel = () =>
    toPersianDigits(
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  const makeAttachmentId = () => `gen-${++counters.value.attachment}`;

  function send(text: string, attachments: Attachment[]) {
    const clean = text.trim();
    if (isGenerating.value || (!clean && attachments.length === 0)) return;

    messages.value.push({
      id: counters.value.message++,
      role: "user",
      text: clean,
      attachments: [...attachments],
      status: "done",
      time: nowLabel(),
      feedback: null,
    });
    respond();
  }

  function respond() {
    const lastUser = [...messages.value]
      .reverse()
      .find((m) => m.role === "user");
    if (!lastUser) return;

    const plan = planReply(
      lastUser.text,
      lastUser.attachments,
      makeAttachmentId,
      counters.value.reply++,
    );

    messages.value.push({
      id: counters.value.message++,
      role: "model",
      text: "",
      attachments: [],
      status: "pending",
      time: nowLabel(),
      feedback: null,
    });
    const target = messages.value[messages.value.length - 1];
    if (!target) return;

    isGenerating.value = true;
    timer = setTimeout(
      () => stream(target, plan.text, plan.attachments, plan.mediaDelay),
      700,
    );
  }

  function stream(
    target: ChatMessage,
    full: string,
    media: Attachment[],
    mediaDelay: number,
  ) {
    target.status = "streaming";
    let cursor = 0;

    const step = () => {
      cursor = Math.min(full.length, cursor + STREAM_CHUNK);
      target.text = full.slice(0, cursor);

      if (cursor < full.length) {
        timer = setTimeout(step, STREAM_TICK);
        return;
      }
      if (media.length > 0) {
        target.pendingMedia = media[0]?.type;
        timer = setTimeout(() => finish(target, media), mediaDelay);
      } else {
        finish(target, media);
      }
    };
    step();
  }

  function finish(target: ChatMessage, media: Attachment[]) {
    target.attachments = media;
    target.pendingMedia = undefined;
    target.status = "done";
    isGenerating.value = false;
  }

  function stop() {
    clearTimeout(timer);
    const last = messages.value[messages.value.length - 1];
    if (
      last?.role === "model" &&
      (last.status === "pending" || last.status === "streaming")
    ) {
      last.status = "stopped";
      last.pendingMedia = undefined;
    }
    isGenerating.value = false;
  }

  function regenerate() {
    if (isGenerating.value) return;
    const last = messages.value[messages.value.length - 1];
    if (last?.role === "model") messages.value.pop();
    respond();
  }

  function setFeedback(id: number, value: "like" | "dislike") {
    const message = messages.value.find((m) => m.id === id);
    if (message) message.feedback = message.feedback === value ? null : value;
  }

  function reset() {
    stop();
    messages.value = [];
  }

  onUnmounted(stop);

  return { messages, isGenerating, send, stop, regenerate, reset, setFeedback };
}
