<script setup lang="ts">
const features = [
  { icon: 'mynaui:share', title: 'انتشار آسان مدل‌های پژوهشی', desc: 'مدل‌های خود را در بازارچه MLGrid منتشر کنید' },
  { icon: 'ph:chart-line-up-light', title: 'تجاری‌سازی و کسب درآمد از دانش', desc: 'از تحقیقات خود درآمد کسب کنید' },
  { icon: 'lucide:cpu', title: 'دسترسی به منابع پردازشی قدرتمند', desc: 'از زیرساخت‌های ابری پیشرفته استفاده کنید' },
  { icon: 'lucide:users', title: 'همکاری‌های پژوهشی', desc: 'با سایر محققان و صنایع همکاری کنید' },
]
</script>

<template>
  <section class="w-full px-4 py-8 flex flex-col-reverse items-center gap-4 lg:flex-row lg:gap-16 sm:px-8 lg:px-16">
    <div class="flex w-full flex-col items-center gap-8 text-center lg:flex-1 lg:items-start lg:text-right">
      <UiBadge icon="mdi:school-outline">برای پژوهشگران و دانشگاهیان</UiBadge>

      <div class="flex flex-col gap-6 text-center lg:text-right">
        <h2 class="text-heading-1 font-shabnamBold text-title">
          پژوهشگران:
          <span class="block bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
            مسیری هموار از پژوهشگاه تا بازار 
          </span>
        </h2>
        <p class="text-subtitle text-caption">
          MLGrid بستری ایده‌آل برای جامعه علمی و پژوهشی فراهم می‌کند تا نتایج تحقیقات خود را فراتر از
          مقالات علمی به اشتراک بگذارند. دستاوردهای پژوهشی خود را به مدل‌های عملیاتی تبدیل کنید و
          علاوه بر کسب درآمد، جامعه و صنعت را نیز از آن بهره‌مند سازید.
        </p>
      </div>

      <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <UiFeatureRow v-for="f in features" :key="f.title" :icon="f.icon" :title="f.title" :desc="f.desc" size="sm" />
      </div>

      <UiActionButton variant="primary" radius="md" size="md" class="w-full lg:w-[272px]">دانشت را تجاری کن</UiActionButton>
    </div>

    <img
      src="/researchers.webp"
      alt="پژوهشگران"
      class="w-full h-[271px] rounded-2xl object-cover aspect-2/1 lg:h-full lg:max-w-[496px] lg:aspect-square"
    />
  </section>
</template>