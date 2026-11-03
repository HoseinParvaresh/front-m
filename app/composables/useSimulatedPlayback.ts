import type { MaybeRefOrGetter } from "vue";

export function useSimulatedPlayback(total: MaybeRefOrGetter<number>) {
  const playing = ref(false);
  const progress = ref(0);

  let raf = 0;
  let startedAt = 0;
  let offset = 0;

  function tick(now: number) {
    const duration = toValue(total);
    const elapsed = offset + (now - startedAt) / 1000;
    progress.value = duration > 0 ? Math.min(1, elapsed / duration) : 1;
    if (progress.value >= 1) {
      reset();
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  function toggle() {
    if (playing.value) {
      cancelAnimationFrame(raf);
      offset = progress.value * toValue(total);
      playing.value = false;
      return;
    }
    startedAt = performance.now();
    playing.value = true;
    raf = requestAnimationFrame(tick);
  }

  function reset() {
    cancelAnimationFrame(raf);
    playing.value = false;
    progress.value = 0;
    offset = 0;
  }

  onUnmounted(() => cancelAnimationFrame(raf));

  return { playing, progress, toggle, reset };
}
