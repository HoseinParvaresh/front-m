<script setup lang="ts">
const stats = [
  { value: "۱۰k+", label: "کاربر فعال" },
  { value: "۵۰۰+", label: "مدل آماده" },
  { value: "۹۹.۹٪", label: "آپتایم" },
  { value: "۲۴/۷", label: "پشتیبانی" },
];
</script>

<template>
  <section
    class="relative flex flex-col items-center gap-4 px-4 py-8 sm:px-8 lg:gap-8 lg:px-16 lg:py-[70px]"
  >
    <UiDecorCircle side="c" size="lg" color="primary" class="blur-[300px]" />

    <h2
      class="relative z-10 text-center text-heading-1 font-shabnamBold leading-tight text-title lg:text-[60px] lg:leading-[75px]"
    >
      <span class="block"> آماده‌اید آینده</span>
      <span
        class="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent"
      >
        هوش مصنوعی
      </span>
      را تجربه کنید؟
    </h2>

    <p class="z-10 text-center text-subtitle text-caption">
      از امروز شروع کنید و ببینید چگونه MLGrid می‌تواند کسب‌وکار یا پروژه شما را
      متحول کند
    </p>

    <div
      class="z-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
    >
      <UiActionButton
        variant="primary"
        radius="md"
        size="md"
        icon="lucide:rocket"
        full-width
        class="sm:w-[234px] h-[68px]"
      >
        همین حالا شروع کن
      </UiActionButton>
      <UiActionButton
        variant="secondary"
        radius="md"
        size="md"
        icon="griddy-icons:phone"
        full-width
        class="sm:w-[234px] text-pureWhite h-[68px]"
      >
        تماس با ما
      </UiActionButton>
    </div>

    <div
      class="z-10 max-w-[976px] grid grid-cols-2 gap-4 divide-borderDivider md:gap-0 md:flex md:divide-x"
    >
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="flex flex-col items-center px-6 3xs:px-14"
      >
        <p class="text-heading-3 font-shabnamBold text-primary">
          {{ stat.value }}
        </p>
        <p class="text-body-2 text-body">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>
