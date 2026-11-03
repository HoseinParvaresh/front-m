<script setup lang="ts">
import type { ModelDetail } from "~/utils/model-detail-data";
defineProps<{ model: ModelDetail }>();

const isFavorite = ref(false);
const isPopping = ref(false);

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
  isPopping.value = true;
  setTimeout(() => (isPopping.value = false), 450);
}

const hidden = { opacity: 0, y: 24 };
const enter = (delay: number) => ({
  opacity: 1,
  y: 0,
  transition: { delay, duration: 500 },
});
</script>

<template>
  <section
    class="relative flex flex-col-reverse justify-between gap-4 p-4 lg:flex-row lg:items-start lg:gap-12 lg:px-32 lg:py-16"
  >
    <UiDecorCircle side="l" size="md" />
    <UiDecorCircle side="r" size="md" />

    <div class="relative z-10 flex flex-col gap-4 lg:w-[592px] lg:shrink-0">
      <h1
        v-motion
        :initial="hidden"
        :enter="enter(100)"
        class="font-shabnamBold text-heading-1 text-title"
      >
        {{ model.title }}
      </h1>

      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="(tag, i) in model.tags"
          :key="tag"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { delay: 250 + i * 90, duration: 350 },
          }"
          class="rounded-lg border border-primary/20 bg-borderDivider px-3 py-1 text-caption-1 text-primary"
        >
          {{ tag }}
        </span>
      </div>

      <p
        v-motion
        :initial="hidden"
        :enter="enter(300)"
        class="text-subtitle text-body"
      >
        {{ model.desc }}
      </p>
      <p
        v-motion
        :initial="hidden"
        :enter="enter(380)"
        class="text-caption-1 text-secondary"
      >
        منتشر شده توسط : {{ model.publisher }}
      </p>

      <div
        v-motion
        :initial="hidden"
        :enter="enter(460)"
        class="flex flex-col gap-4 sm:flex-row"
      >
        <UiActionButton
          variant="primary"
          size="sm"
          radius="md"
          full-width
          class="sm:w-[200px]"
          >استفاده کن</UiActionButton
        >

        <UiActionButton
          variant="secondary"
          size="sm"
          radius="md"
          full-width
          :icon="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
          class="bg-background! border-primary! sm:w-[200px]"
          :class="{ 'fav-pop': isPopping }"
          @click="toggleFavorite"
        >
          {{ isFavorite ? "در علاقه‌مندی‌ها" : "افزودن به علاقه مندی ها" }}
        </UiActionButton>
      </div>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.96 }"
      :enter="{
        opacity: 1,
        scale: 1,
        transition: { delay: 150, duration: 600 },
      }"
      class="relative h-[230px] w-full overflow-hidden rounded-2xl bg-borderDivider lg:h-72 lg:max-w-[476px] lg:flex-1"
    >
      <img
        v-if="model.bannerImage"
        :src="model.bannerImage"
        :alt="model.title"
        class="size-full object-cover object-center"
      />
      <Icon
        v-else
        name="mdi:image-outline"
        size="40"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30"
      />
      <div
        class="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background/80 to-transparent"
      />
    </div>
  </section>
</template>

<style scoped>
@keyframes heart-pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.fav-pop :deep(svg),
.fav-pop :deep(.iconify) {
  animation: heart-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (prefers-reduced-motion: reduce) {
  .fav-pop :deep(svg),
  .fav-pop :deep(.iconify) {
    animation: none;
  }
}
</style>
