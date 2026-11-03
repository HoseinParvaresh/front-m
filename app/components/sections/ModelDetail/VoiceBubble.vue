<script setup lang="ts">
import type { Attachment } from "~/utils/playground-types";

const props = defineProps<{ attachment: Attachment }>();

const BARS = 30;
const heights = Array.from(
  { length: BARS },
  (_, i) => 22 + ((i * 47 + 13) % 70),
);

const isReal = computed(
  () => !!props.attachment.src && !props.attachment.simulated,
);
const audioEl = useTemplateRef<HTMLAudioElement>("audioEl");
const total = computed(() => props.attachment.duration || 0);

const sim = useSimulatedPlayback(total);
const realPlaying = ref(false);
const realProgress = ref(0);

const playing = computed(() =>
  isReal.value ? realPlaying.value : sim.playing.value,
);
const progress = computed(() =>
  isReal.value ? realProgress.value : sim.progress.value,
);

const label = computed(() => {
  const active = playing.value || progress.value > 0;
  return formatDuration(
    active ? total.value * (1 - progress.value) : total.value,
  );
});

function toggle() {
  if (!isReal.value) return sim.toggle();
  const el = audioEl.value;
  if (!el) return;
  if (el.paused) el.play();
  else el.pause();
}

function onTimeUpdate() {
  const el = audioEl.value;
  if (el && Number.isFinite(el.duration) && el.duration > 0)
    realProgress.value = el.currentTime / el.duration;
}
</script>

<template>
  <div
    class="flex min-w-64 max-w-full items-center gap-3 rounded-full border border-primary/25 bg-primary/10 py-2 ps-2 pe-4"
  >
    <button
      type="button"
      class="flex-center size-10 shrink-0 rounded-full bg-linear-to-b from-primary to-secondary text-background transition active:scale-90"
      :aria-label="playing ? 'توقف' : 'پخش'"
      @click="toggle"
    >
      <Transition name="pg-pop" mode="out-in">
        <Icon
          :key="playing ? 'pause' : 'play'"
          :name="playing ? 'mdi:pause' : 'mdi:play'"
          size="22"
        />
      </Transition>
    </button>

    <div class="flex h-8 flex-1 items-center gap-0.5" aria-hidden="true">
      <span
        v-for="(h, i) in heights"
        :key="i"
        class="w-[3px] flex-1 rounded-full transition-colors duration-150"
        :class="i / BARS < progress ? 'bg-primary' : 'bg-title/25'"
        :style="{ height: `${h}%` }"
      />
    </div>

    <span dir="ltr" class="w-10 shrink-0 text-caption-1 text-title/70">{{
      label
    }}</span>

    <audio
      v-if="isReal"
      ref="audioEl"
      :src="attachment.src"
      preload="metadata"
      class="hidden"
      @play="realPlaying = true"
      @pause="realPlaying = false"
      @timeupdate="onTimeUpdate"
      @ended="
        realPlaying = false;
        realProgress = 0;
      "
    />
  </div>
</template>
