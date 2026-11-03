<script setup lang="ts">
import type { CodeLine } from "~/composables/useTypewriter";

const codeLines: CodeLine[] = [
  [
    { text: "import ", color: "#ff6b9d" },
    { text: "mlgrid", color: "#9ca3af" },
  ],
  [],
  [
    { text: "client", color: "#ff6b9d" },
    { text: " = mlgrid.", color: "#9ca3af" },
    { text: "Client", color: "#16f29d" },
    { text: "()", color: "#9ca3af" },
  ],
  [
    { text: "model", color: "#ff6b9d" },
    { text: " = client.", color: "#9ca3af" },
    { text: "load", color: "#16f29d" },
    { text: "(", color: "#9ca3af" },
    { text: '"gpt-4"', color: "#ffd866" },
    { text: ")", color: "#9ca3af" },
  ],
  [],
  [
    { text: "response", color: "#ff6b9d" },
    { text: " = model.", color: "#9ca3af" },
    { text: "generate", color: "#16f29d" },
    { text: "(", color: "#9ca3af" },
  ],
  [
    { text: "    prompt=", color: "#9ca3af" },
    { text: '"سلام MLGrid!"', color: "#ffd866" },
  ],
  [{ text: ")", color: "#9ca3af" }],
  [],
  [{ text: "# ✓ Ready in 2 minutes!", color: "#16f29d" }],
];

const codeRef = useTemplateRef<HTMLElement>("codeRef");
const { target: revealTarget, isVisible } = useRevealOnView(0.4);
const { visibleLineCount, visibleChars, isDone, start, sliceLine } =
  useTypewriter(codeLines, 16);

watch(isVisible, (val) => {
  if (val) start();
});
</script>

<template>
  <div
    ref="revealTarget"
    class="relative w-full max-w-[544px] overflow-hidden rounded-2xl border p-[33px] border-primary/30 bg-background shadow-[0_0_20px_rgba(22,242,157,0.1)]"
  >
    <div class="flex justify-between border-b border-borderDivider py-2">
      <div class="flex items-center gap-2">
        <span class="size-3 rounded-full bg-alert" />
        <span class="size-3 rounded-full bg-warning" />
        <span class="size-3 rounded-full bg-success" />
      </div>
      <p class="text-body-2 text-white/40">api_integration.py</p>
    </div>

    <div ref="codeRef" class="flex flex-col gap-3 pt-6" dir="ltr">
      <div
        v-for="(line, i) in codeLines"
        :key="i"
        class="flex min-h-5 gap-3 text-body-2 font-mono"
      >
        <span class="w-4 shrink-0 select-none text-right text-white/30">{{
          i + 1
        }}</span>
        <p>
          <template v-if="i < visibleLineCount">
            <span
              v-for="(seg, j) in line"
              :key="j"
              :style="{ color: seg.color }"
              >{{ seg.text }}</span
            >
          </template>
          <template v-else-if="i === visibleLineCount">
            <span
              v-for="(seg, j) in sliceLine(line, visibleChars)"
              :key="j"
              :style="{ color: seg.color }"
            >
              {{ seg.text }}
            </span>
            <span v-if="!isDone" class="animate-pulse text-primary">▍</span>
          </template>
        </p>
      </div>
    </div>

    <UiDecorCircle
      side="c"
      size="sm"
      color="secondary"
      class="blur-3xl bottom-8 left-1/2"
    />
  </div>
</template>
