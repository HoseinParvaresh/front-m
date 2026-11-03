<script setup lang="ts">
import type { BlogPostDetail } from "~/utils/blog-post-data";

const props = defineProps<{ post: BlogPostDetail }>();
const bannerSrc = computed(() => resolveImage(props.post.heroImage!));
console.log(bannerSrc);
</script>

<template>
  <div class="flex w-full flex-1 flex-col gap-8">
    <div
      class="relative h-[374px] w-full overflow-hidden rounded-2xl bg-borderDivider"
    >
      <img
        v-if="post.heroImage"
        :src="bannerSrc"
        :alt="post.title"
        class="size-full object-cover"
      />

      <div
        class="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2.5 bg-black/40 p-5 backdrop-blur-lg lg:py-2 lg:px-[22px]"
      >
        <div
          class="rounded-full flex-center gap-2.5 px-4 py-1 text-body-2 font-shabnamBold"
          :style="{
            backgroundColor: post.categoryColorBg,
            color: post.categoryColorText,
          }"
        >
          {{ post.category }}
          <span
            class="size-4 inline-block rounded-full"
            :style="{
              backgroundColor: post.categoryColorText,
            }"
          ></span>
        </div>
        <p
          class="w-full text-right text-heading-3 sm:text-heading-2 font-shabnamBold text-title"
        >
          {{ post.title }}
        </p>
        <div class="flex items-center gap-6 text-body-2 text-body">
          <span class="flex items-center gap-1.5">
            <span class="size-1 rounded-full bg-body" />
            {{ post.readTime }}
          </span>
          <span>{{ post.date }}</span>
        </div>
      </div>
    </div>

    <!-- Body of the article -->
    <article class="flex w-full flex-col gap-8 text-right">
      <section
        v-for="section in post.sections"
        :id="section.id"
        :key="section.id"
        class="flex flex-col gap-5 scroll-mt-24"
      >
        <h2 class="text-heading-2 font-shabnamBold text-title">
          {{ section.heading }}
        </h2>
        <p
          v-for="(p, i) in section.paragraphs"
          :key="i"
          class="text-subtitle text-body"
        >
          {{ p }}
        </p>
      </section>
    </article>
  </div>
</template>
