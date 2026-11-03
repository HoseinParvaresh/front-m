<script setup lang="ts">
const cards = [
  {
    icon: 'fe:mail',
    title: 'پشتیبانی ایمیل',
    value: 'info@mlgrid.com',
    desc: 'برای هرگونه سوال عمومی، پشتیبانی فنی، یا درخواست همکاری، ایمیل بزنید.',
    actionLabel: 'ارسال ایمیل',
    actionHref: 'mailto:info@mlgrid.com',
  },
  {
    icon: 'lucide:phone',
    title: 'تماس تلفنی',
    value: '۰۹۳۳۶۱۰۰۸۱۵',
    desc: 'در ساعات کاری (شنبه تا چهارشنبه، ۹ صبح تا ۵ عصر) پاسخگوی شما هستیم.',
    actionLabel: 'تماس بگیرید',
    actionHref: 'tel:+989336100815',
  },
  {
    icon: 'ep:chat-round',
    title: 'ارسال پیام',
    value: '۰۹۳۳۶۱۰۰۸۱۵',
    desc: 'پیام خود را ارسال نمایید، در اسرع وقت پاسخگوی شما هستیم.',
    actionLabel: 'ارسال پیام',
    actionHref: '#contact-form',
    textIcon: "ic:baseline-whatsapp"
  },
  {
    icon: 'boxicons:location',
    title: 'آدرس دفتر مرکزی',
    value: 'شیراز، شهرک آرین، خیابان فناوری، پارک علم و فناوری استان فارس، ساختمان نفت، گاز و پتروشیمی، طبقه اول، واحد ۵۱۰۸',
    actionLabel: 'مشاهده در نقشه',
    actionHref: '#map',
  },
]
</script>

<template>
  <section class="relative flex flex-col items-center gap-8 px-4 py-8 sm:px-8 lg:px-32 lg:py-16">
    <UiDecorLine direction="c" color="primary" :width="707"/>
    <div class="flex flex-col items-center gap-4 text-center lg:gap-6">
      <UiBadge icon="lucide:phone">راه‌های ارتباطی</UiBadge>
      <h2 class="text-heading-0 font-shabnamBold">
        <span class="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
          اطلاعات تماس
        </span>
      </h2>
      <p class=" text-caption text-subtitle">راحت‌ترین روش‌ها برای رسیدن به ما</p>
    </div>

    <div class="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 lg:gap-6">
      <SectionsContactInfoCard
        v-for="(card, i) in cards"
        :key="card.title"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 450 } }"
        :icon="card.icon"
        :title="card.title"
        :value="card.value"
        :desc="card.desc"
        :text-icon="card.textIcon"
        :action-label="card.actionLabel"
        :action-href="card.actionHref"
      />
    </div>
    
    <SectionsContactMap />
  </section>
</template>