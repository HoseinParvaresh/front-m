<script setup lang="ts">
const stats = [
  { value: '۵۰+', label: 'مدل هوش مصنوعی' },
  { value: '۵', label: 'جایزه ملی' },
  { value: '۱۰۰۰+', label: 'کاربر فعال' },
]
</script>

<template>
  <section class="relative flex flex-col-reverse gap-8 px-4 py-8 sm:px-8 lg:flex-row lg:gap-16 lg:px-32 lg:py-16">
     <UiDecorCircle side="c" size="lg" class="lg:mr-70 xl:mr-170 lg:mt-70 blur-[300px]"/>

    <div class="z-10 flex w-full flex-col items-center gap-6 text-center lg:text-right">
      <h1 class="w-full text-heading-0 font-shabnamBold leading-tight text-title lg:leading-[60px]">
        هوش مصنوعی آینده،
        <span class="block bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
          امروز در دستان شما
        </span>
      </h1>

      <p class="w-full lg:font-shabnamBold text-primary text-body-1">
        از یک ایده جسورانه تا پلتفرمی پیشرو در هوش مصنوعی ایران
      </p>

      <p class="w-full leading-7 text-body-1 text-body lg:text-right lg:leading-[29px]">
        در MLGrid ما به قدرت دگرگون‌کننده هوش مصنوعی عمیقاً باور داریم و معتقدیم هوش مصنوعی باید در
        دسترس همه باشد. از سال ۱۴۰۳ سفر پرماجرای خود را در قالب «شرکت هوش گستران ابر پرداز»، با هدف
        ساده‌سازی، بومی‌سازی و کاربردی‌کردن فناوری‌های هوش مصنوعی آغاز کردیم و امروز در مسیر
        توانمندسازی کسب‌وکارها، پژوهشگران و توسعه‌دهندگان گام برمی‌داریم.
      </p>

      <div class="flex w-full flex-wrap items-center justify-between gap-0 lg:justify-start lg:gap-16">
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center lg:items-start">
          <p class="text-heading-2 font-shabnamBold text-title">{{ stat.value }}</p>
          <p class="text-subtitle text-body">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <img
      src="/heroAbout.webp"
      alt="MLGrid"
      class="h-56 w-full shrink-0 lg:-mt-16 -ml-4 sm:-ml-8 lg:-ml-32 rounded-2xl object-cover sm:h-72 lg:h-[561px] lg:w-[500px] xl:w-[656px] lg:rounded-r-2xl lg:rounded-l-none"
    />
  </section>
</template>