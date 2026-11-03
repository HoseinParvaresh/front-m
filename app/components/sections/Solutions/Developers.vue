<script setup lang="ts">
const features = [
  { icon: 'meteor-icons:cloud', title: 'حذف نیاز به زیرساخت‌های گران‌قیمت', desc: 'با MLGrid دیگر نیازی به راه‌اندازی سرورهای پرهزینه نیست' },
  { icon: 'solar:code-linear', title: 'تبدیل مدل‌ها به API در چند دقیقه', desc: 'مدل‌های خود را به صورت REST API در دسترس قرار دهید' },
  { icon: 'lucide:store', title: 'بازارچه مدل‌های آماده', desc: 'دسترسی به صدها مدل آماده برای استفاده فوری' },
  { icon: 'uil:setting', title: 'سفارشی‌سازی و ترکیب مدل‌ها با AI-Composer', desc: 'مدل‌های مختلف را ترکیب کرده و راهکارهای منحصر به فرد بسازید' },
  { icon: 'si:credit-card-line', title: 'پرداخت Pay-as-you-go ریالی', desc: 'فقط برای آنچه استفاده می‌کنید پرداخت کنید، بدون هزینه ثابت' },
]
</script>

<template>
  <section class="w-full px-4 py-8 flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16 sm:px-8 lg:px-16">
    <div class="flex w-full flex-col items-center gap-8 text-center lg:flex-1 lg:items-start lg:text-right">
      <UiBadge icon="solar:code-linear">برای توسعه‌دهندگان</UiBadge>

      <div class="flex flex-col gap-6">
        <h2 class="text-heading-1 font-shabnamBold text-title">
          توسعه‌دهندگان:
          <span class="block bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
            سریع‌تر بسازید، آسان‌تر مقیاس دهید
          </span>
        </h2>
        <p class="text-subtitle text-caption">
          اگر شما یک توسعه‌دهنده نرم‌افزار هستید، MLGrid پیچیدگی‌های استقرار و زیرساخت هوش مصنوعی را
          حذف می‌کند تا شما بتوانید روی نوآوری تمرکز کنید.
        </p>
      </div>

      <div class="flex w-full flex-col gap-4 pt-4">
        <UiFeatureRow v-for="f in features" :key="f.title" :icon="f.icon" :title="f.title" :desc="f.desc" size="md" />
      </div>

      <UiActionButton variant="primary" radius="md" size="md" class="w-full lg:w-[272px]">با ما همسفر شو</UiActionButton>
    </div>

    <SectionsSolutionsCodeBlock class="lg:flex-1" />
  </section>
</template>