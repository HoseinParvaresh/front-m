<script setup lang="ts">
import { SamplePost } from "~/utils/blog-post-data";

const route = useRoute();
const post = SamplePost;

const relatedPosts = [
  {
    id: 1,
    slug: "post-2",
    title: "تیتر وبلاگ بعلاوه یکسری توضیحات کوتاه",
    category: "اخبار",
    date: "۱۳ دی ۱۴۰۴",
  },
  {
    id: 2,
    slug: "post-3",
    title: "تیتر وبلاگ بعلاوه یکسری توضیحات کوتاه",
    category: "اخبار",
    date: "۱۳ دی ۱۴۰۴",
  },
];

useSeoMeta({
  title: post.title,
  description: post.sections[0]?.paragraphs[0] ?? "",
});
</script>

<template>
  <div>
    <section class="relative flex-center w-full flex-col">
      <UiDecorCircle side="c" size="sm" class="top-50 blur-[300px]" />
      <div
        class="relative z-10 flex w-full flex-col-reverse items-start gap-8 px-4 py-8 lg:flex-row sm:px-16 lg:px-32 lg:py-16"
      >
        <SectionsBlogPostSidebar :post="post" />
        <SectionsBlogPostContent :post="post" />
      </div>
    </section>

    <section
      class="relative flex w-full flex-col items-center gap-5 px-4 py-8 sm:py-8 sm:px-8 lg:gap-10 lg:py-16 lg:px-32"
    >
      <UiDecorCircle side="c" size="sm" class="top-50 blur-[200px]" />

      <div class="relative z-10 flex w-full flex-col gap-6 lg:gap-10">
        <div class="flex items-center">
          <p class="font-shabnamBold text-secondary text-heading-2">
            مقالات مرتبط
          </p>
        </div>

        <div class="h-px w-full bg-borderDivider" />

        <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-10">
          <SectionsBlogCard
            v-for="related in relatedPosts"
            :key="related.id"
            :title="related.title"
            :category="related.category"
            :date="related.date"
            :to="`/blog/${related.slug}`"
          />
        </div>
      </div>
    </section>
  </div>
</template>
