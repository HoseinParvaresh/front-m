<template>
    <section class="px-4 py-6 sm:p-16 flex-center flex-col gap-6">
        <!-- image -->
        <img src="/AiFutureCta.svg" alt="AiFutureCta">
        <!-- title / desc -->
        <div  class="text-center">
            <p class="mb-4 text-title text-heading-1 font-shabnamBold">آینده هوش مصنوعی در یک کلیک!</p>
            <p class="py-2.5 text-subtitle text-body">به جمع هزاران کاربر و توسعه‌دهنده‌ای بپیوندید که هوش مصنوعی را در MLGrid تجربه خواهند کرد.</p>
        </div>
        <UiButtonBrand class="w-full 2xs:w-[170px]" title="➔ همین حالا شروع کن" :line="true" to="/models" />
        <UiDecorCircle side="l" size="lg" class="mt-90"/>
    </section>
</template>