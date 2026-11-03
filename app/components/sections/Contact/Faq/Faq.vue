<script setup lang="ts">
const faqs = [
  { question: 'یک پروژه طراحی وب چقدر طول می‌کشد؟', answer: 'بسته به پیچیدگی پروژه معمولاً بین ۲ تا ۸ هفته زمان می‌برد.' },
  { question: 'چه عواملی بر هزینه طراحی وب تاثیر می‌گذارند؟', answer: 'طراحی وب شامل مراحل مختلفی است که بر هزینه و زمان‌بندی تاثیر می‌گذارد.' },
  { question: 'آیا پشتیبانی مداوم ارائه می‌دهید؟', answer: 'بله، بسته‌های پشتیبانی ماهانه و سالانه برای تمام پروژه‌ها در دسترس است.' },
  { question: 'فرآیند طراحی وب شما چگونه است؟', answer: 'از تحلیل نیاز شروع می‌شود، سپس طراحی، توسعه، تست و در نهایت استقرار.' },
]

const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section class="relative flex flex-col gap-8 w-full px-4 py-8 sm:px-8 lg:px-32 lg:py-16">
    <UiDecorCircle side="c" size="sm" class="bottom-24 right-16"/>
    <UiDecorCircle side="c" size="sm" class="-top-2 left-16"/>
    
    <div class="relative z-2 flex w-full flex-col items-center gap-5 text-center">
      <UiBadge icon="ci:chat">سوالات متداول</UiBadge>
      <h2 class="text-heading-1 font-shabnamBold text-title">پاسخ به سوالات رایج شما</h2>
      <p class="text-body text-subtitle">
        اگر سوالی در ذهن دارید، اینجا پاسخ کوتاه و شفاف آن را پیدا می‌کنید.
      </p>
    </div>

    <div class="z-2 flex w-full flex-col gap-6">
      <SectionsContactFaqItem
        v-for="(faq, i) in faqs"
        :key="faq.question"
        :question="faq.question"
        :answer="faq.answer"
        :open="openIndex === i"
        @toggle="toggle(i)"
      />
    </div>
  </section>
</template>