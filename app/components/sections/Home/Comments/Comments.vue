<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Comments } from "~/utils/constants";

const modules = [Navigation];

const breakpoints = {
  1024: { slidesPerView: 2 },
  1536: { slidesPerView: 3 },
};
</script>

<template>
  <section class="w-full px-4 py-6 sm:p-16">
    <div class="flex flex-col items-center">
      <!-- title / desc -->
      <div class="w-full px-1 py-8 text-center sm:p-8">
        <p class="font-shabnamBold text-heading-1 text-title">
          داستان‌های موفقیت از زبان کاربران ما
        </p>
        <p class="mt-4 py-2.5 text-body text-subtitle">
          خوشحالیم که MLGrid توانسته است به دیگران کمک کند تا پروژه‌ها و
          کسب‌وکارهای خود را متحول کنند.
        </p>
      </div>

      <!-- lines -->
      <UiDecorLine direction="r" :width="215" color="white" class="md:mt-14" />
      <UiDecorLine
        direction="l"
        :width="215"
        color="white"
        class="mt-40 hidden sm:block md:mt-32"
      />

      <!-- circles -->
      <UiDecorCircle side="r" size="md" />
      <UiDecorCircle side="r" size="lg" class="mt-110" />
      <UiDecorCircle side="l" size="lg" class="mt-110" />
    </div>

    <!-- next/prev buttons -->
    <div class="relative mt-10 2xs:mt-0">
      <button
        type="button"
        aria-label="اسلاید بعدی"
        class="my-next absolute -top-12 left-0 z-10 size-10 cursor-pointer transition-all duration-300 hover:drop-shadow-xs 2xs:top-22 xs:size-[60px]"
      >
        <Icon
          name="ei:arrow-left"
          class="text-title size-[50px]! sm:size-[60px]!"
        />
      </button>

      <button
        type="button"
        aria-label="اسلاید قبلی"
        class="my-prev absolute -top-12 left-11 z-10 size-10 cursor-pointer transition-all duration-300 hover:drop-shadow-xs 2xs:top-22 2xs:right-0 xs:size-[60px]"
      >
        <Icon
          name="ei:arrow-right"
          class="text-title size-[50px]! sm:size-[60px]!"
        />
      </button>
    </div>

    <!-- comments slider -->
    <div class="px-2 pb-16 2xs:px-12 xs:px-[84px]">
      <Swiper
        dir="rtl"
        :modules="modules"
        :slides-per-view="1"
        :space-between="40"
        :navigation="{ nextEl: '.my-next', prevEl: '.my-prev' }"
        :breakpoints="breakpoints"
      >
        <SwiperSlide v-for="card in Comments" :key="card.id">
          <SectionsHomeCommentsCard
            :title="card.title"
            :name="card.name"
            :job="card.job"
            :desc="card.desc"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
