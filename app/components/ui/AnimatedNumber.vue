<script setup lang="ts">
const props = withDefaults(
  defineProps<{ value: string; duration?: number }>(),
  { duration: 1300 },
);

const parsed = computed(() => {
  const match = props.value.match(/[۰-۹][۰-۹,.]*/);
  if (!match || match.index === undefined) return null;

  const latin = toLatinDigits(match[0]);
  return {
    target: parseFloat(latin.replace(/,/g, "")),
    decimals: latin.includes(".") ? (latin.split(".")[1] ?? "").length : 0,
    grouped: latin.includes(","),
    prefix: props.value.slice(0, match.index),
    suffix: props.value.slice(match.index + match[0].length),
  };
});

function render(n: number): string {
  const p = parsed.value;
  if (!p) return props.value;
  const [int = "0", dec] = n.toFixed(p.decimals).split(".");
  const grouped = p.grouped ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : int;
  return (
    p.prefix + toPersianDigits(dec ? `${grouped}.${dec}` : grouped) + p.suffix
  );
}

const display = ref(render(0));
const { target, isVisible } = useRevealOnView(0.4);

function run() {
  const p = parsed.value;
  if (!p) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    display.value = props.value;
    return;
  }
  const startedAt = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - startedAt) / props.duration);
    display.value = render(p.target * (1 - (1 - t) ** 3));
    if (t < 1) requestAnimationFrame(step);
    else display.value = props.value;
  };
  requestAnimationFrame(step);
}

watch(isVisible, (visible) => {
  if (visible) run();
});
</script>

<template>
  <span ref="target">{{ display }}</span>
</template>
