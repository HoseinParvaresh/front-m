<script setup lang="ts">
import { FeaturedPosts } from "~/utils/blog-data";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper/types";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const modules = [Navigation];
const swiper = ref<SwiperType | null>(null);

const onSwiper = (instance: SwiperType) => {
  swiper.value = instance;
};
</script>

<template>
  <section
    class="w-full flex-center relative gap-0 px-0 py-8 z-10 sm:px-8 lg:py-16 lg:px-[70px] sm:gap-4 lg:gap-8"
  >
    <UiDecorCircle size="sm" side="c" />

    <button
      type="button"
      aria-label="پست قبلی"
      @click="swiper?.slidePrev()"
      class="my-prev relative z-10 shrink-0 flex-center"
    >
      <Icon name="mdi:chevron-right" size="56" class="text-title/60" />
    </button>

    <Swiper
      dir="rtl"
      @swiper="onSwiper"
      :modules="modules"
      :slides-per-view="1"
      :space-between="40"
    >
      <SwiperSlide v-for="post in FeaturedPosts" :key="post.id">
        <div
          class="relative z-10 flex w-full flex-col items-center overflow-hidden rounded-2xl border border-borderDivider bg-cardSurface shadow-[0_1px_4px_0_rgba(25,33,61,0.08)] lg:flex-row"
        >
          <div
            class="flex-center h-48 w-full shrink-0 bg-borderDivider lg:h-[413px] lg:w-[515px]"
          >
            <img
              v-if="post.image"
              :src="post.image"
              :alt="post.title"
              class="size-full object-cover"
            />
            <Icon
              v-else
              name="mdi:image-outline"
              size="48"
              class="text-white/30"
            />
          </div>
          <div
            class="flex w-full flex-col gap-8 p-6 text-right lg:flex-1 lg:p-8"
          >
            <div class="flex w-full flex-col items-start gap-6">
              <div class="flex w-full items-center gap-3">
                <div class="flex items-center gap-1.5">
                  <Icon
                    name="mdi:calendar-blank-outline"
                    size="15"
                    class="text-caption"
                  />
                  <span class="text-body-2 text-caption">{{ post.date }}</span>
                </div>
                <span class="h-px w-6 bg-borderDivider" />
                <div class="flex items-center gap-1.5">
                  <Icon name="mdi:tag-outline" size="15" class="text-caption" />
                  <span class="text-body-2 text-caption">{{
                    post.category
                  }}</span>
                </div>
              </div>
              <p
                class="w-full font-shabnamBold line-clamp-2 text-title text-heading-4"
              >
                {{ post.title }}
              </p>
              <p class="w-full text-body-1 text-body line-clamp-6">
                {{ post.desc }}
              </p>
            </div>

            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="flex items-center gap-1.5"
            >
              <span class="text-body-2 font-shabnamBold text-caption text-right"
                >بیشتر</span
              >
              <Icon name="mdi:arrow-left" size="15" class="text-caption" />
            </NuxtLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <button
      type="button"
      @click="swiper?.slideNext()"
      aria-label="پست بعدی"
      class="my-prev relative z-10 shrink-0 flex-center"
    >
      <Icon name="mdi:chevron-left" size="56" class="text-title/60" />
    </button>
  </section>
</template>
