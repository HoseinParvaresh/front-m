<script setup lang="ts">
import { PLAYGROUND_SUGGESTIONS } from "~/utils/model-detail-data";
import type { ModelDetail } from "~/utils/model-detail-data";
import type { Attachment } from "~/utils/playground-types";

defineProps<{ model: ModelDetail }>();

const { messages, isGenerating, send, stop, regenerate, reset, setFeedback } =
  usePlayground();

const scroller = useTemplateRef<HTMLElement>("scroller");
const composer = useTemplateRef<{ addFiles: (files: File[]) => void }>(
  "composer",
);
const stick = ref(true);

function onScroll() {
  const el = scroller.value;
  if (el) stick.value = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
}
function scrollToBottom(smooth = false) {
  scroller.value?.scrollTo({
    top: scroller.value.scrollHeight,
    behavior: smooth ? "smooth" : "auto",
  });
}

onMounted(() => {
  scrollToBottom();
  const inner = scroller.value?.firstElementChild;
  if (!inner) return;
  const observer = new ResizeObserver(() => {
    if (stick.value) scrollToBottom();
  });
  observer.observe(inner);
  onUnmounted(() => observer.disconnect());
});

function handleSend(text: string, attachments: Attachment[]) {
  stick.value = true;
  send(text, attachments);
  nextTick(() => scrollToBottom(true));
}

const dragging = ref(false);
let dragDepth = 0;

function onDragEnter(event: DragEvent) {
  if (!event.dataTransfer?.types.includes("Files")) return;
  dragDepth++;
  dragging.value = true;
}
function onDragLeave() {
  dragDepth = Math.max(0, dragDepth - 1);
  if (dragDepth === 0) dragging.value = false;
}
function onDrop(event: DragEvent) {
  dragDepth = 0;
  dragging.value = false;
  composer.value?.addFiles(Array.from(event.dataTransfer?.files ?? []));
}

const hidden = { opacity: 0, y: 24 };
const reveal = (delay = 0) => ({
  opacity: 1,
  y: 0,
  transition: { delay, duration: 450 },
});
</script>

<template>
  <div class="flex flex-col gap-4 p-4 lg:px-32 lg:py-8">
    <!-- title -->
    <div class="flex flex-col gap-4 px-4 py-2">
      <h2
        v-motion
        :initial="hidden"
        :visible-once="reveal()"
        class="font-shabnamBold text-heading-1 text-title"
      >
        محیط آزمایش
      </h2>
      <p
        v-motion
        :initial="hidden"
        :visible-once="reveal(80)"
        class="text-body text-subtitle"
      >
        توضیحات محیط آزمایش
      </p>
    </div>
    <!-- header chat / chat / input message -->
    <div
      v-motion
      :initial="hidden"
      :visible-once="reveal(120)"
      class="relative flex flex-col gap-3 rounded-2xl border border-borderDivider bg-cardSurface p-3 lg:p-4"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <!-- header -->
      <div class="flex items-center justify-between gap-3 px-1">
        <button
          type="button"
          class="flex shrink-0 items-center gap-2 rounded-lg border border-borderDivider px-3 py-2 text-body-2 text-body transition hover:border-primary/60 hover:text-primary active:scale-95"
          @click="reset"
        >
          <Icon name="mdi:square-edit-outline" size="18" />
          گفتگوی جدید
        </button>
      </div>

      <!-- chat -->
      <div class="relative overflow-hidden rounded-lg bg-[#0d1510]">
        <div
          ref="scroller"
          class="model-detail-chat h-[480px] overflow-y-auto lg:h-[560px]"
          @scroll.passive="onScroll"
        >
          <div class="flex min-h-full flex-col">
            <Transition name="pg-swap" mode="out-in">
              <!-- empty chat -->
              <div
                v-if="messages.length === 0"
                key="empty"
                class="flex-center flex-1 flex-col gap-4 p-6 text-center"
              >
                <span
                  class="pg-float flex-center size-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/10 shadow-[0_0_32px_rgba(22,242,157,0.15)]"
                >
                  <Icon
                    name="mdi:message-text-outline"
                    size="32"
                    class="text-primary"
                  />
                </span>
                <p class="max-w-sm text-body-1 text-title/70">
                  گفتگو را با یک پیام، تصویر، ویدیو یا صدا شروع کنید.
                </p>
                <div class="flex flex-wrap justify-center gap-2">
                  <button
                    v-for="suggestion in PLAYGROUND_SUGGESTIONS"
                    :key="suggestion"
                    type="button"
                    class="rounded-full border border-primary/20 bg-borderDivider px-4 py-2 text-body-2 text-primary transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 active:scale-95"
                    @click="handleSend(suggestion, [])"
                  >
                    {{ suggestion }}
                  </button>
                </div>
              </div>
              <!-- chats -->
              <TransitionGroup
                v-else
                key="list"
                name="pg-msg"
                tag="div"
                class="flex flex-col"
              >
                <SectionsModelDetailChatMessage
                  v-for="(message, i) in messages"
                  :key="message.id"
                  :message="message"
                  :avatar="model.avatarImage"
                  :is-last="i === messages.length - 1"
                  :generating="isGenerating"
                  @regenerate="regenerate"
                  @feedback="(value) => setFeedback(message.id, value)"
                />
              </TransitionGroup>
            </Transition>
          </div>
        </div>

        <!-- Scroll to Bottom Button  -->
        <Transition name="pg-jump">
          <button
            v-if="!stick && messages.length > 0"
            type="button"
            class="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/40 bg-cardSurface/90 p-2 text-body-2 text-primary shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur transition hover:bg-primary/10 active:scale-95"
            @click="scrollToBottom(true)"
          >
            <Icon name="mdi:arrow-down" size="18" />
          </button>
        </Transition>

        <!-- layer for drag file -->
        <Transition name="pg-zoom">
          <div
            v-if="dragging"
            class="pointer-events-none absolute inset-0 z-10 flex-center flex-col gap-3 border-2 border-dashed border-primary bg-background/80 backdrop-blur-sm"
          >
            <Icon
              name="mdi:cloud-upload-outline"
              size="48"
              class="pg-float text-primary"
            />
            <p class="text-body-1 font-shabnamBold text-title">
              فایل را اینجا رها کنید
            </p>
          </div>
        </Transition>
      </div>

      <!-- input message -->
      <SectionsModelDetailChatComposer
        ref="composer"
        :generating="isGenerating"
        placeholder="پیام خود را بنویسید…"
        @send="handleSend"
        @stop="stop"
      />
    </div>
  </div>
</template>
