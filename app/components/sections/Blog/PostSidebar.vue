<script setup lang="ts">
import type { BlogPostDetail } from "~/utils/blog-post-data";

const props = defineProps<{ post: BlogPostDetail }>();

const { activeId, scrollToSection } = useScrollSpy(
  props.post.sections.map((s) => s.id),
);

const shareLinks = [
  { icon: "akar-icons:linkedin-box-fill", to: "#" },
  { icon: "fa6-brands:square-x-twitter", to: "#" },
  { icon: "fa-brands:facebook-square", to: "#" },
];
</script>

<template>
  <aside class="flex w-full flex-col gap-6 lg:w-[336px] lg:shrink-0">
    <!-- author card-->
    <div
      class="flex flex-col relative gap-4 rounded-2xl overflow-hidden border border-borderDivider bg-cardSurface p-4"
    >
      <div class="flex gap-2.5 items-end">
        <img
          v-if="post.author.avatar"
          :src="post.author.avatar"
          :alt="post.author.name"
          class="size-25 shrink-0 rounded-10 object-cover"
        />
        <div v-else class="size-25 shrink-0 rounded-10 object-cover bg-white">
          <Icon
            class="w-full! h-[125%]! block bg-cardSurface!"
            name="bxs:user"
          />
          <img
            class="absolute top-0 left-0 w-full h-full"
            src="/icons/blog-back-profile.svg"
            alt="#"
          />
        </div>
        <NuxtLink :to="shareLinks[0]!.to" class="size-[30px]!" target="_blank">
          <Icon name="devicon:linkedin" class="size-[30px]!" />
        </NuxtLink>
      </div>

      <div class="text-right">
        <p class="text-heading-3 font-shabnamBold text-title">
          {{ post.author.name }}
        </p>
        <p class="mt-2.5 text-body-1 text-title line-clamp-3">
          {{ post.author.bio }}
        </p>
      </div>

      <div class="h-px w-full bg-borderDivider" />
    </div>

    <!-- share card -->
    <div
      class="flex flex-col relative gap-4 rounded-2xl overflow-hidden border border-borderDivider bg-cardSurface p-4"
    >
      <p class="text-body-1 text-title">همین الان به اشتراک بگذارید</p>
      <div class="flex items-center gap-5">
        <NuxtLink
          v-for="link in shareLinks"
          :key="link.icon"
          :to="link.to"
          class="size-[30px]!"
          target="_blank"
        >
          <Icon
            :name="link.icon"
            class="text-white size-[30px]! transition-colors hover:text-primary"
          />
        </NuxtLink>
      </div>
      <img
        class="absolute top-0 left-0"
        src="/icons/blog-back-profile.svg"
        alt="#"
      />
    </div>

    <!-- Table of Contents -->
    <div class="flex flex-col gap-4">
      <p class="text-heading-3 font-shabnamBold text-title">
        در این مقاله می‌خوانیم:
      </p>
      <nav class="flex w-full flex-col gap-2">
        <button
          v-for="section in post.sections"
          :key="section.id"
          type="button"
          class="w-full border-l-0 border-r-[3px] px-4 py-2.5 text-right text-body-2 transition-colors"
          :class="
            activeId === section.id
              ? 'border-primary font-shabnamBold text-primary'
              : 'border-transparent text-title'
          "
          @click="scrollToSection(section.id)"
        >
          {{ section.heading }}
        </button>
      </nav>
    </div>
  </aside>
</template>
