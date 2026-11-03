<script setup lang="ts">
interface Props {
  image: string
  title: string
  desc: string
  tags: string[]
  to: string
}

defineProps<Props>()
</script>

<template>
  <div class="col-span-1 flex shrink-0 flex-col gap-2.5 rounded-2xl border border-borderDivider bg-cardSurface p-2 lg:p-6">
    <!-- image -->
    <img :src="image" :alt="title" class="h-32 w-full rounded-lg object-cover lg:h-40" />

    <div class="flex w-full flex-col gap-4 text-right lg:gap-6">
      <!-- title / desc -->
      <div class="flex flex-col gap-2">
        <h3 class="text-subtitle text-title">{{ title }}</h3>
        <p class="line-clamp-2 text-body-2 text-caption">{{ desc }}</p>
      </div>
      <!-- tag -->
      <div class="flex gap-1.5 overflow-x-scroll scrollbar-hidden">
        <span
          v-for="tag in tags"
          :key="tag"
          class="rounded-lg border border-primary/20 bg-borderDivider px-3 py-1 text-caption-1 text-primary"
        >
          {{ tag }}
        </span>
      </div>
      <!-- button -->
      <UiActionButton :to="to" variant="primary" radius="lg" size="sm" full-width>
        مشاهده / استفاده
      </UiActionButton>
    </div>
  </div>
</template>