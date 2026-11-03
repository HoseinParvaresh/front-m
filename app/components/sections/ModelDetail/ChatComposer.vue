<script setup lang="ts">
import type { Attachment } from "~/utils/playground-types";

const props = defineProps<{ generating: boolean; placeholder?: string }>();
const emit = defineEmits<{
  send: [text: string, attachments: Attachment[]];
  stop: [];
}>();

const MAX_ATTACHMENTS = 4;
const { fromFile, fromRecording, sample } = useAttachments();

const text = ref("");
const attachments = ref<Attachment[]>([]);
const error = ref("");
const menuOpen = ref(false);
const isPopping = ref(false);

const textarea = useTemplateRef<HTMLTextAreaElement>("textarea");
const fileInput = useTemplateRef<HTMLInputElement>("fileInput");
const menuRoot = useTemplateRef<HTMLElement>("menuRoot");

const canSend = computed(
  () =>
    !props.generating &&
    (text.value.trim().length > 0 || attachments.value.length > 0),
);

function resize() {
  const el = textarea.value;
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
}
watch(text, () => nextTick(resize));

function addFiles(files: File[]) {
  for (const file of files) {
    if (attachments.value.length >= MAX_ATTACHMENTS) break;
    attachments.value.push(fromFile(file));
  }
}
function removeAttachment(id: string) {
  attachments.value = attachments.value.filter((a) => a.id !== id);
}
function onPick(event: Event) {
  const input = event.target as HTMLInputElement;
  addFiles(Array.from(input.files ?? []));
  input.value = "";
  menuOpen.value = false;
}
function onPaste(event: ClipboardEvent) {
  const files = Array.from(event.clipboardData?.files ?? []);
  if (files.length === 0) return;
  event.preventDefault();
  addFiles(files);
}
// close menu with click
function onDocPointer(event: PointerEvent) {
  if (menuOpen.value && !menuRoot.value?.contains(event.target as Node))
    menuOpen.value = false;
}
onMounted(() => document.addEventListener("pointerdown", onDocPointer));
onUnmounted(() => document.removeEventListener("pointerdown", onDocPointer));

// send
function submit() {
  if (!canSend.value) return;
  emit("send", text.value.trim(), [...attachments.value]);
  text.value = "";
  attachments.value = [];
  isPopping.value = true;
  setTimeout(() => (isPopping.value = false), 350);
  nextTick(resize);
}
function onKeydown(event: KeyboardEvent) {
  // Enter --> send / Shift + Enter --> Next Line
  if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    submit();
  }
}

// Record voice
const recording = ref(false);
const seconds = ref(0);
let recorder: MediaRecorder | null = null;
let stream: MediaStream | null = null;
let chunks: Blob[] = [];
let ticker: ReturnType<typeof setInterval> | undefined;
let cancelled = false;

function cleanupRecording() {
  stream?.getTracks().forEach((track) => track.stop());
  stream = null;
  recorder = null;
}

async function startRecording() {
  error.value = "";
  if (attachments.value.length >= MAX_ATTACHMENTS) return;
  if (
    !navigator.mediaDevices?.getUserMedia ||
    typeof MediaRecorder === "undefined"
  ) {
    error.value = "مرورگر شما از ضبط صدا پشتیبانی نمی‌کند.";
    return;
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new MediaRecorder(stream);
    chunks = [];
    cancelled = false;
    recorder.ondataavailable = (event) => chunks.push(event.data);
    recorder.onstop = () => {
      if (!cancelled) {
        const blob = new Blob(chunks, {
          type: recorder?.mimeType || "audio/webm",
        });
        attachments.value.push(fromRecording(blob, seconds.value));
      }
      cleanupRecording();
    };
    recorder.start();
    seconds.value = 0;
    recording.value = true;
    ticker = setInterval(() => seconds.value++, 1000);
  } catch {
    error.value = "دسترسی به میکروفون داده نشد.";
    cleanupRecording();
  }
}

function endRecording(discard: boolean) {
  cancelled = discard;
  clearInterval(ticker);
  recording.value = false;
  if (recorder && recorder.state !== "inactive") recorder.stop();
}

onUnmounted(() => {
  clearInterval(ticker);
  if (recorder && recorder.state !== "inactive") {
    cancelled = true;
    recorder.stop();
  }
  cleanupRecording();
});

defineExpose({ addFiles });
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Attachments Tray-->
    <TransitionGroup
      name="pg-tray"
      tag="div"
      class="flex flex-wrap gap-2 empty:hidden"
    >
      <div v-for="a in attachments" :key="a.id" class="relative">
        <div
          v-if="a.type === 'image'"
          class="size-16 overflow-hidden rounded-xl border border-borderDivider"
        >
          <img :src="a.src" alt="" class="size-full object-cover" />
        </div>
        <div
          v-else
          class="flex h-16 items-center gap-2 rounded-xl border border-borderDivider bg-background/60 px-3 text-body-2 text-title/80"
        >
          <Icon
            :name="
              a.type === 'video'
                ? 'mdi:video-outline'
                : a.type === 'audio'
                  ? 'mdi:microphone-outline'
                  : 'mdi:file-document-outline'
            "
            size="22"
            class="shrink-0 text-primary"
          />
          <span class="max-w-[120px] truncate">{{ a.name }}</span>
          <span
            v-if="a.duration"
            dir="ltr"
            class="text-caption-1 text-title/50"
            >{{ formatDuration(a.duration) }}</span
          >
        </div>
        <button
          type="button"
          aria-label="حذف پیوست"
          class="absolute -start-2 -top-2 flex-center size-5 rounded-full border border-borderDivider bg-cardSurface text-title/70 transition hover:text-alert"
          @click="removeAttachment(a.id)"
        >
          <Icon name="mdi:close" size="12" />
        </button>
      </div>
    </TransitionGroup>

    <Transition name="pg-swap" mode="out-in">
      <!-- Record voice section -->
      <div
        v-if="recording"
        key="rec"
        class="flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-2"
      >
        <button
          type="button"
          aria-label="لغو ضبط"
          class="flex-center size-[42px] shrink-0 rounded-lg border border-borderDivider text-alert transition hover:bg-alert/10 active:scale-95"
          @click="endRecording(true)"
        >
          <Icon name="mdi:trash-can-outline" size="20" />
        </button>
        <span class="size-2.5 shrink-0 animate-pulse rounded-full bg-alert" />
        <span
          class="flex-center h-8 flex-1 gap-[3px] overflow-hidden"
          aria-hidden="true"
        >
          <span
            v-for="n in 36"
            :key="n"
            class="pg-wave h-full w-[3px] shrink-0 rounded-full bg-primary"
            :style="{ animationDelay: `${(n * 67) % 900}ms` }"
          />
        </span>
        <span dir="ltr" class="text-body-2 text-primary">{{
          formatDuration(seconds)
        }}</span>
        <button
          type="button"
          aria-label="پایان ضبط"
          class="flex-center h-[42px] shrink-0 rounded-2xl bg-linear-to-b from-primary to-secondary px-5 text-background transition active:scale-95"
          @click="endRecording(false)"
        >
          <Icon name="mdi:check" size="22" />
        </button>
      </div>

      <!-- send button / voice button / text input / Attachments button -->
      <div v-else key="input" class="flex items-end gap-2">
        <!-- Attachments button -->
        <div ref="menuRoot" class="relative shrink-0">
          <button
            type="button"
            aria-label="افزودن پیوست"
            :aria-expanded="menuOpen"
            class="flex-center size-[42px] rounded-lg border bg-borderDivider transition hover:border-primary/60 hover:text-primary active:scale-95"
            :class="
              menuOpen
                ? 'border-primary/60 text-primary'
                : 'border-borderDivider text-title'
            "
            @click="fileInput?.click()"
          >
            <Icon
              name="mdi:plus"
              size="20"
              class="transition-transform duration-300"
              :class="menuOpen && 'rotate-45'"
            />
          </button>
        </div>
        <input
          ref="fileInput"
          type="file"
          multiple
          class="hidden"
          @change="onPick"
        />
        <!-- text input -->
        <textarea
          ref="textarea"
          v-model="text"
          rows="1"
          :placeholder="placeholder"
          aria-label="پیام"
          class="max-h-40 min-h-[42px] scrollbar-hidden min-w-0 flex-1 resize-none rounded-lg border border-borderDivider bg-transparent px-4 py-[9px] text-body-1 leading-6 text-title transition-colors placeholder:text-title/40 focus:border-primary/60 focus:outline-none"
          @keydown="onKeydown"
          @paste="onPaste"
        />
        <!-- voice button -->
        <button
          type="button"
          aria-label="ضبط پیام صوتی"
          class="flex-center size-[42px] shrink-0 rounded-lg text-title/60 transition hover:bg-white/5 hover:text-primary active:scale-95"
          @click="startRecording"
        >
          <Icon name="mdi:microphone-outline" size="22" />
        </button>
        <!-- send button -->
        <Transition name="pg-pop" mode="out-in">
          <button
            v-if="generating"
            key="stop"
            type="button"
            aria-label="توقف پاسخ"
            class="pg-stop-pulse flex-center h-[42px] shrink-0 rounded-2xl border border-primary/50 bg-primary/10 px-6 text-primary transition active:scale-95"
            @click="emit('stop')"
          >
            <Icon name="mdi:stop" size="20" />
          </button>
          <button
            v-else
            key="send"
            type="button"
            :disabled="!canSend"
            aria-label="ارسال"
            class="flex-center h-[42px] shrink-0 rounded-2xl bg-linear-to-b from-primary to-secondary px-6 text-background transition-all duration-200 hover:shadow-[0_0_16px_rgba(22,242,157,0.4)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            :class="isPopping && 'pg-send-pop'"
            @click="submit"
          >
            <Icon name="mdi:arrow-up" size="20" />
          </button>
        </Transition>
      </div>
    </Transition>

    <!-- error -->
    <Transition name="pg-swap">
      <p v-if="error" class="text-body-2 text-alert">{{ error }}</p>
    </Transition>
  </div>
</template>
