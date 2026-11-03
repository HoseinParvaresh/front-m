<script setup lang="ts">
import { BlogCategories, LatestPosts } from "~/utils/blog-data";

const activeCategory = ref<string>("دسته بندی فعال");
</script>

<template>
  <section
    class="relative flex items-center w-full flex-col px-4 py-8 gap-5 sm:pb-16 sm:pt-0 sm:px-8 sm:gap-10 lg:px-[157px]"
  >
    <UiDecorCircle size="sm" side="c" class="blur-[300px] top-100" />
    <UiDecorCircle size="sm" side="c" class="blur-[300px] top-250" />

    <div
      class="flex w-full flex-col gap-4 items-start z-10 lg:flex-row lg:justify-between"
    >
      <p class="font-shabnamBold text-secondary text-[28px] mr-1">
        آخرین مقالات
      </p>
      <div class="flex overflow-x-scroll scrollbar-hidden gap-4">
        <button
          v-for="cat in BlogCategories"
          :key="cat"
          type="button"
          class="rounded-md px-2.5 py-3 text-body-2 transition-colors shrink-0"
          :class="
            activeCategory === cat
              ? 'bg-secondary text-cardSurface'
              : 'border border-borderDivider bg-cardSurface text-caption'
          "
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="h-px w-full bg-borderDivider" />

    <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-10 z-10">
      <SectionsBlogCard
        v-for="(post, i) in LatestPosts"
        :key="post.id"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{
          opacity: 1,
          y: 0,
          transition: { delay: (i % 4) * 80, duration: 450 },
        }"
        :title="post.title"
        :category="post.category"
        :date="post.date"
        :image="post.image"
        :to="`/blog/${post.slug}`"
      />
    </div>

    <UiActionButton class="w-[163px]" size="md" variant="secondary" radius="md"
      >بارگیری بیشتر</UiActionButton
    >
  </section>
</template>
