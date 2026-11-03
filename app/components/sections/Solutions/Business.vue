<script setup lang="ts">
const features = [
  { icon: 'gg:file-document', title: 'تولید محتوای متنی خلاقانه', desc: 'تولید مقالات، پست‌های شبکه اجتماعی و محتوای تبلیغاتی با کیفیت بالا' },
  { icon: 'qlementine-icons:picture-16', title: 'خلق تصاویر بی‌نظیر و سفارشی', desc: 'طراحی تصاویر منحصر به فرد برای برندینگ و کمپین‌های تبلیغاتی' },
  { icon: 'fluent:mic-24-filled', title: 'پردازش هوشمند صوت و زبان', desc: 'تبدیل گفتار به متن، دوبله هوشمند و تحلیل احساسات مشتریان' },
  { icon: 'tabler:clock', title: 'بهینه‌سازی زمان و منابع', desc: 'اتوماسیون فرآیندهای تکراری و کاهش هزینه‌های عملیاتی' },
  { icon: 'ph:chart-line-up-light', title: 'تجزیه و تحلیل داده‌های کسب‌وکار', desc: 'استخراج بینش‌های ارزشمند از داده‌ها برای تصمیم‌گیری بهتر' },
]
</script>

<template>
  <section class="w-full px-4 py-8 flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16 sm:px-8 lg:px-16">

    <SectionsSolutionsContentMockup class="lg:flex-1" />

    <div class="flex w-full flex-col items-center gap-6 text-center lg:flex-1 lg:items-start lg:gap-8 lg:text-right">
      <UiBadge icon="ph:chart-line-up-light">برای کسب‌وکارها و تولیدکنندگان محتوا</UiBadge>

      <div class="flex flex-col gap-6">
        <h2 class="text-heading-1 font-shabnamBold text-title">
          کسب‌وکارها:
          <span class="block bg-linear-to-b from-secondary to-primary bg-clip-text text-transparent">
            محتوای هوشمند، مشتریان بیشتر
          </span>
        </h2>
        <p class="text-subtitle max-w-[516px] text-caption">
          بدون نیاز به هیچ‌گونه دانش فنی، با ابزارهای هوش مصنوعی MLGrid، محتوای باکیفیت تولید کنید،
          مخاطبان خود را جذب کنید و فروش را افزایش دهید.
        </p>
      </div>

      <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <UiFeatureRow v-for="f in features" :key="f.title" size="sm" :icon="f.icon" :title="f.title" :desc="f.desc" />
      </div>

      <UiActionButton variant="primary" radius="md" size="md" class="w-full lg:w-[272px]">بیشتر کشف کن</UiActionButton>
    </div>

    
  </section>
</template>