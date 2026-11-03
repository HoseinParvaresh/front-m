<script setup lang="ts">
import type { ChatMessage } from "~/utils/playground-types";

const props = defineProps<{
  message: ChatMessage;
  avatar?: string;
  isLast: boolean;
  generating: boolean;
}>();
const emit = defineEmits<{
  regenerate: [];
  feedback: [value: "like" | "dislike"];
}>();

const isModel = computed(() => props.message.role === "model");
const isPending = computed(() => props.message.status === "pending");
const isStreaming = computed(() => props.message.status === "streaming");
const isFinished = computed(
  () => props.message.status === "done" || props.message.status === "stopped",
);

const copied = ref(false);
async function copyText() {
  if (!props.message.text) return;
  await navigator.clipboard.writeText(props.message.text);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1600);
}

const skeletonIcon = computed(() => {
  switch (props.message.pendingMedia) {
    case "video":
      return "mdi:video-outline";
    case "audio":
      return "mdi:microphone-outline";
    default:
      return "mdi:image-outline";
  }
});

const iconBtn =
  "flex-center size-8 rounded-lg transition hover:bg-white/5 active:scale-90";
const actionBtn =
  "flex-center size-[42px] shrink-0 rounded-lg border border-caption/70 bg-borderDivider text-caption transition hover:border-primary/60 hover:text-primary active:scale-95";
</script>

<template>
  <div
    class="group flex items-start gap-3 p-4 lg:gap-4 lg:p-6"
    :class="isModel && 'bg-borderDivider'"
  >
    <!-- model and user icon -->
    <div
      class="flex-center size-10 shrink-0 overflow-hidden rounded-14 bg-linear-to-br from-primary/20 to-secondary/10 lg:size-12"
    >
      <img
        v-if="isModel && avatar"
        :src="avatar"
        alt=""
        class="size-full object-cover"
      />
      <Icon
        v-else
        :name="isModel ? 'mdi:robot-outline' : 'fa7-solid:user-circle'"
        size="24"
        class="text-primary"
      />
    </div>

    <!-- content -->
    <div class="flex min-w-0 flex-1 flex-col gap-3">
      <!-- user -->
      <template v-if="!isModel">
        <div v-if="message.attachments.length" class="flex flex-wrap gap-2">
          <SectionsModelDetailChatAttachment
            v-for="a in message.attachments"
            :key="a.id"
            :attachment="a"
          />
        </div>
        <p
          v-if="message.text"
          class="whitespace-pre-line text-body-1 leading-8 text-title"
        >
          {{ message.text }}
        </p>
      </template>

      <!-- model -->
      <template v-else>
        <div
          v-if="isPending"
          class="flex h-8 items-center gap-2"
          role="status"
          aria-label="در حال پردازش"
        >
          <span
            v-for="n in 3"
            :key="n"
            class="pg-dot size-2.5 rounded-full bg-primary"
            :style="{ animationDelay: `${(n - 1) * 150}ms` }"
          />
        </div>
        <SectionsModelDetailChatMarkdown
          v-else-if="message.text"
          :text="message.text"
          :streaming="isStreaming"
        />

        <!-- media skeleton -->
        <div
          v-if="message.pendingMedia"
          class="pg-shimmer border border-primary/15 bg-linear-to-br from-primary/10 via-background to-secondary/10"
          :class="
            message.pendingMedia === 'audio'
              ? 'h-14 w-64 max-w-full rounded-full'
              : 'aspect-video w-full max-w-[420px] rounded-14'
          "
          aria-hidden="true"
        >
          <span class="absolute inset-0 flex-center text-primary/70">
            <Icon :name="skeletonIcon" size="32" />
          </span>
        </div>

        <div
          v-if="message.attachments.length"
          class="flex flex-col flex-wrap gap-3"
        >
          <SectionsModelDetailChatAttachment
            v-for="a in message.attachments"
            :key="a.id"
            :attachment="a"
            downloadable
          />
        </div>

        <p
          v-if="message.status === 'stopped'"
          class="text-caption-1 text-title/40"
        >
          پاسخ متوقف شد.
        </p>

        <div
          v-if="isFinished"
          class="flex items-center gap-1 transition-opacity duration-200"
          :class="
            isLast
              ? 'opacity-100'
              : 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
          "
        >
          <button
            v-if="isLast && !generating"
            type="button"
            :class="[iconBtn, 'text-title/50 hover:text-title']"
            aria-label="تولید دوباره"
            @click="emit('regenerate')"
          >
            <Icon name="mdi:refresh" size="18" />
          </button>
        </div>
      </template>
    </div>

    <!-- copy button -->
    <button
      v-if="message.text && !isPending"
      type="button"
      aria-label="کپی متن"
      :class="[actionBtn, !isModel && 'sm:opacity-0']"
      @click="copyText"
    >
      <Transition name="pg-pop" mode="out-in">
        <Icon
          :key="copied ? 'done' : 'copy'"
          :name="copied ? 'mdi:check' : 'keyline-icons:copy'"
          size="16"
          :class="copied && 'text-primary'"
        />
      </Transition>
    </button>
  </div>
</template>
