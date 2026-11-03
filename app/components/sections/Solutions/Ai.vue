<script setup lang="ts">
const features = [
  { icon: 'ph:video-camera', title: 'محتوای عملیاتی', desc: 'دوره‌های کاربردی با پروژه‌های واقعی' },
  { icon: 'solar:medal-ribbon-linear', title: 'مدرسان مجرب', desc: 'یادگیری از متخصصان صنعت' },
  { icon: 'lucide:users', title: 'جامعه‌پذیری و آمادگی بازار کار', desc: 'مهارت‌های موردنیاز بازار کار' },
]
</script>

<template>
  <section class="w-full px-4 py-8 flex flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16 sm:px-8 lg:px-16 xl:px-32">

    <SectionsSolutionsProgressMockup class="lg:flex-1" />

    <div class="flex w-full flex-col items-center gap-8 text-center lg:flex-1 lg:items-start lg:text-right">
      <UiBadge icon="octicon:book-16">آموزش و توانمندسازی</UiBadge>

      <div class="flex flex-col gap-6">
        <h2 class="text-heading-1 font-shabnamBold text-title lg:text-right">
          هوش مصنوعی:
          <span class="block bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
            از یادگیری تا کاربرد
          </span>
        </h2>
        <p class="text-subtitle text-caption lg:text-right">
          در هوش گستران ابر پرداز، به توانمندسازی جامعه از طریق به اشتراک‌گذاری دانش باور داریم. ما با
          استفاده از تجربه و دانش عمیق اعضای تیم، دوره‌های کاربردی هوش مصنوعی را منطبق بر نیازهای
          عملکردی صنایع و کسب‌وکارهای مختلف، طراحی و برگزار می‌کنیم. هدف ما این است که افراد و
          سازمان‌ها را با مفاهیم و کاربردهای عملی هوش مصنوعی آشنا کرده و آن‌ها را برای آینده‌ای
          هوشمندتر آماده سازیم.
        </p>
      </div>

      <div class="flex w-full flex-col gap-4">
        <UiFeatureRow v-for="f in features" :key="f.title" :icon="f.icon" :title="f.title" :desc="f.desc" size="sm" />
      </div>

      <UiActionButton variant="secondary" radius="md" size="md" class="w-full lg:w-[166px]">اطلاعات بیشتر</UiActionButton>
    </div>

  </section>
</template>