<script setup lang="ts">
const props = defineProps<{ label: string; value: string; display?: string }>();

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  await navigator.clipboard.writeText(props.value);
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 1800);
}
onUnmounted(() => clearTimeout(timer));
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="text-body-2 text-title/60">{{ label }}</p>

    <!-- copy filed -->
    <div class="flex items-center gap-2">
      <div
        class="flex-center h-10 min-w-0 flex-1 rounded-lg border border-borderDivider px-4"
      >
        <p dir="ltr" class="truncate text-body-2 text-title/60">
          {{ display ?? value }}
        </p>
      </div>

      <div class="relative shrink-0">
        <button
          type="button"
          :aria-label="`کپی ${label}`"
          class="flex-center size-10 rounded-lg border bg-borderDivider transition-colors duration-200 hover:border-primary/60 active:scale-90"
          :class="
            copied
              ? 'border-primary text-primary'
              : 'border-borderDivider text-title'
          "
          @click="copy"
        >
          <Transition name="pg-pop" mode="out-in">
            <Icon
              :key="copied ? 'done' : 'copy'"
              :name="copied ? 'mdi:check' : 'mdi:content-copy'"
              size="18"
            />
          </Transition>
        </button>

        <Transition name="pg-swap">
          <span
            v-if="copied"
            class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-caption-1 text-background"
          >
            کپی شد
          </span>
        </Transition>
      </div>
    </div>
  </div>
</template>
