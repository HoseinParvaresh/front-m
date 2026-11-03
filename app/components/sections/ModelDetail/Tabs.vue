<script setup lang="ts">
import type { ModelTab } from "~/utils/model-detail-data";

const active = defineModel<ModelTab>({ required: true });

const tabs: { id: ModelTab; label: string }[] = [
  { id: "about", label: "درباره مدل" },
  { id: "playground", label: "محیط آزمایش playground" },
  { id: "api", label: "دریافت API" },
];

const tabEls: Partial<Record<ModelTab, HTMLElement>> = {};
const bar = reactive({ left: 0, width: 0, ready: false });

function setEl(id: ModelTab, el: unknown) {
  if (el instanceof HTMLElement) tabEls[id] = el;
}

function measure() {
  const el = tabEls[active.value];
  if (!el) return;
  bar.left = el.offsetLeft;
  bar.width = el.offsetWidth;
  bar.ready = true;
}

onMounted(() => {
  measure();
  document.fonts?.ready.then(measure);
  window.addEventListener("resize", measure);
});
onUnmounted(() => window.removeEventListener("resize", measure));
watch(active, () => nextTick(measure));
</script>

<template>
  <nav
    aria-label="بخش‌های مدل"
    class="flex flex-col px-4 pt-2 lg:px-32 lg:pt-6"
  >
    <div role="tablist" class="relative flex items-center gap-6 sm:gap-12">
      <button
        v-for="tab in tabs"
        :id="`tab-${tab.id}`"
        :key="tab.id"
        :ref="(el) => setEl(tab.id, el)"
        type="button"
        role="tab"
        :aria-selected="active === tab.id"
        class="whitespace-nowrap py-3 text-subtitle transition-colors duration-300"
        :class="
          active === tab.id
            ? 'text-primary text-shadow-2xl'
            : 'text-body hover:text-title'
        "
        @click="active = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="relative h-0.5 w-full bg-borderDivider">
      <span
        class="absolute left-0 top-0 h-full rounded-full bg-linear-to-r from-primary to-secondary shadow-[0_0_12px_#0fd280] transition-[transform,width,opacity] duration-300 ease-out"
        :style="{
          width: `${bar.width}px`,
          transform: `translateX(${bar.left}px)`,
          opacity: bar.ready ? 1 : 0,
        }"
      />
    </div>
  </nav>
</template>
