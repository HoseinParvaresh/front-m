<script setup lang="ts">
import type { ModelItem } from '~/utils/constants'

interface Props {
  title: string
  models: ModelItem[]
  mobile?: boolean
}

withDefaults(defineProps<Props>(), {
  mobile: false,
})
</script>

<template>
  <section class="flex flex-col gap-4 lg:gap-6">
    <!-- title -->
    <div class="flex h-8 items-center gap-4 relative">
      <div class="flex items-center gap-3 min-w-max">
        <span class="size-2 rounded-full bg-linear-to-b from-primary to-secondary" />
        <h2 class="text-heading-3 text-title font-shabnamBold">{{ title }}</h2>
      </div>
      <UiDecorLine direction="r" color="primary" :width="655" class="static" />
    </div>
    <!-- mobile filter -->
    <SectionsModelsFilterMobileBar v-if="mobile" />
    <!-- models -->
    <div class="grid grid-cols-1 3xs:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
      <SectionsModelsCard
        v-for="(model, i) in models"
        :key="model.id"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: (i % 4) * 80, duration: 450 } }"
        :image="model.image"
        :title="model.title"
        :desc="model.desc"
        :tags="model.tags"
        :to="`/models/${model.slug}`"
      />
    </div>
  </section>
</template>