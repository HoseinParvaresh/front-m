<script setup lang="ts">
const { target, isVisible } = useRevealOnView(0.4);
</script>

<template>
  <div
    ref="target"
    class="relative flex w-full max-w-[544px] flex-col gap-6 rounded-3xl border border-primary/30 bg-cardSurface p-8 shadow-[0_0_20px_rgba(22,242,157,0.1)]"
  >
    <!-- header -->
    <div
      class="flex items-center justify-between border-b border-borderDivider pb-4"
    >
      <!-- text -->
      <div class="flex items-center gap-3">
        <div
          class="flex-center size-10 rounded-14 bg-linear-to-b from-primary to-secondary"
        >
          <Icon name="gg:file-document" size="20" class="text-background" />
        </div>
        <div class="text-right">
          <p class="text-body-2 text-title">تولید محتوا</p>
          <p class="text-caption-1 text-white/50 animate-pulse">
            در حال پردازش...
          </p>
        </div>
      </div>
      <!-- circle -->
      <div class="flex gap-2" aria-hidden="true">
        <span
          class="loading-dot size-2 rounded-full bg-primary"
          style="animation-delay: 0ms"
        />
        <span
          class="loading-dot size-2 rounded-full bg-primary"
          style="animation-delay: 150ms"
        />
        <span
          class="loading-dot size-2 rounded-full bg-primary"
          style="animation-delay: 300ms"
        />
      </div>
    </div>
    <!-- bars -->
    <div class="flex flex-col gap-4">
      <div
        v-for="(width, i) in ['100%', '83%', '67%']"
        :key="i"
        class="h-4 rounded bg-linear-to-l from-transparent to-primary/20 transition-[width] duration-1200 ease-out"
        :style="{
          width: isVisible ? width : '0%',
          transitionDelay: `${i * 200}ms`,
        }"
      />
    </div>
    <!-- image -->
    <div class="grid grid-cols-2 gap-4 pt-4">
      <div
        v-for="i in 2"
        :key="i"
        class="flex-center aspect-square 3xs:aspect-2/1 animate-pulse rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-secondary/5"
      >
        <Icon
          name="qlementine-icons:picture-16"
          size="32"
          class="text-primary/50"
        />
      </div>
    </div>

    <div
      class="grid grid-cols-3 gap-4 border-t border-borderDivider pt-6 text-center"
    >
      <div>
        <p class="text-2xl font-bold text-primary">95٪</p>
        <p class="text-caption-1 text-white/60">دقت</p>
      </div>
      <div>
        <p class="text-2xl font-bold text-secondary">۲x</p>
        <p class="text-caption-1 text-white/60">سرعت</p>
      </div>
      <div>
        <p class="text-2xl font-bold text-primary">50٪</p>
        <p class="text-caption-1 text-white/60">کاهش هزینه</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes loading-dot {
  0%,
  80%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
}
.loading-dot {
  animation: loading-dot 1.2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .loading-dot {
    animation: none;
  }
}
</style>
