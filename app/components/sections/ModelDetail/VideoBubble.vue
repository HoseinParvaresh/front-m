<script setup lang="ts">
import type { Attachment } from "~/utils/playground-types";

const props = defineProps<{ attachment: Attachment }>();

const isReal = computed(
  () => !!props.attachment.src && !props.attachment.simulated,
);
const total = computed(() => props.attachment.duration || 0);
const { playing, progress, toggle } = useSimulatedPlayback(total);

const remaining = computed(() =>
  formatDuration(total.value * (1 - progress.value)),
);
</script>

<template>
  <!-- Actual Video (User Uploaded) -->
  <video
    v-if="isReal"
    :src="attachment.src"
    controls
    playsinline
    preload="metadata"
    class="max-h-72 w-full max-w-[420px] rounded-14 bg-black"
  />

  <!-- Sample Video: Simulated Playback with Animated Poster -->
  <div
    v-else
    role="button"
    tabindex="0"
    :aria-label="playing ? 'توقف ویدیو' : 'پخش ویدیو'"
    class="relative aspect-video w-full max-w-[420px] cursor-pointer overflow-hidden rounded-14 border border-primary/15 bg-background"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <img
      :src="attachment.src"
      alt=""
      class="size-full object-cover"
      :class="playing && 'pg-poster-play'"
    />
    <div
      class="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-black/20"
    />

    <Transition name="pg-pop">
      <span
        v-if="!playing"
        class="absolute inset-0 m-auto flex-center size-14 rounded-full bg-primary/90 text-background shadow-[0_0_24px_rgba(22,242,157,0.5)]"
      >
        <Icon name="mdi:play" size="32" />
      </span>
    </Transition>

    <div class="absolute inset-x-3 bottom-3 flex items-center gap-3">
      <div class="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
        <div
          class="h-full rounded-full bg-primary"
          :style="{ width: `${progress * 100}%` }"
        />
      </div>
      <span dir="ltr" class="text-caption-1 text-title">{{ remaining }}</span>
    </div>
  </div>
</template>
