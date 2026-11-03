<script setup lang="ts">
const activities = [
  'توسعه و استقرار مدل‌های هوش مصنوعی اختصاصی سازمان‌ها',
  'توسعه راهکارهای هوش مصنوعی، یادگیری ماشین و تحلیل داده',
  'مشاوره، تحلیل و مدیریت پروژه‌های نرم‌افزاری و تحول دیجیتال',
  'طراحی و توسعه نرم‌افزارهای تحت وب، موبایل و سامانه‌های ابری',
  'همکاری پژوهشی و اجرای پروژه‌های بین‌رشته‌ای مبتنی بر هوش مصنوعی',
  'توسعه سامانه‌های سازمانی و بهینه‌سازی حضور دیجیتال (SEO, ASO, GEO)',
  'آموزش و توانمندسازی سازمان‌ها در کاربردهای هوش مصنوعی',
]
</script>

<template>
  <section class="flex flex-col-reverse items-center gap-8 px-4 py-8 sm:px-8 lg:flex-row lg:gap-16 lg:px-32 lg:py-16">
    <!-- <UiSectionGlow /> -->
     <UiDecorCircle side="c" size="lg" class="mb-150 mr-0 lg:mb-0 lg:mr-150 blur-[250px]"/>

    <div class="relative z-2 flex w-full flex-col items-center gap-8 text-center lg:items-start lg:text-right">
      <UiBadge>گستره فعالیت‌ها</UiBadge>
      <!-- title -->
      <h2 class="text-heading-0 font-shabnamBold leading-tight text-title lg:leading-[70px]">
        <span class="block bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
          هوش گستران ابر پرداز
        </span>
        دامنه فعالیت گسترده
      </h2>
      <!-- desc -->
      <p class="text-subtitle text-body text-center lg:text-right">
        علاوه بر توسعه و بهبود مداوم پلتفرم MLGrid، شرکت هوش گستران ابر پرداز در حوزه‌های دیگری نیز
        فعالیت مستمر و موثر دارد:
      </p>
      <!-- list -->
      <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          v-for="item in activities"
          :key="item"
          class="flex items-start gap-2 text-right"
        >
          <Icon name="streamline-ultimate:check-badge-bold" size="24" class="shrink-0 text-primary" />
          <p class="flex-1 text-subtitle text-title">{{ item }}</p>
        </div>
      </div>
    </div>

    <img
      src="/office.webp"
      alt="هوش گستران ابر پرداز"
      class="h-56 w-full shrink-0 rounded-2xl object-cover sm:h-72 lg:h-[392px] lg:w-[400px]"
    />
  </section>
</template>