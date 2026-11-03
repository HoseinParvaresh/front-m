<script setup lang="ts">
</script>

<template>
  <section class="flex flex-col-reverse items-center gap-4 px-4 py-6 sm:px-8 lg:flex-row lg:gap-16 lg:px-16 lg:py-10">
    <!-- right -->
    <div class="flex w-full flex-col items-center gap-8 text-center lg:max-w-[640px] lg:items-start lg:text-right">
      <!-- texts -->
      <div class="flex flex-col gap-6">
        <h1 class="text-heading-2 sm:text-heading-0 font-shabnamBold text-title">
          راهکارهای MLGrid:
          <span class="block bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
            هوش مصنوعی، متناسب با نیاز
          </span>
          کسب‌وکار و پروژه شما
        </h1>
        <p class="text-subtitle text-primary text-center lg:text-right">
          دغدغه‌هایتان را به ما بسپارید و بر نوآوری تمرکز کنید.
        </p>
        <p class="text-subtitle text-caption text-center lg:text-right">
          در دنیای پرشتاب امروز، هوش مصنوعی دیگر یک گزینه نیست، بلکه یک ضرورت است. MLGrid با درک
          چالش‌های مختلف صنایع و حوزه‌ها، راهکارهای هوشمند و سفارشی‌شده‌ای را ارائه می‌دهد تا شما
          بتوانید به سادگی و بدون نیاز به تخصص پیچیده، از قدرت هوش مصنوعی بهره‌مند شوید.
        </p>
      </div>

      <!-- buttons -->
      <div class="flex w-full flex-col gap-4 sm:flex-row">
        <UiActionButton variant="primary" radius="md" size="md" full-width>
          شروع رایگان
        </UiActionButton>
        <UiActionButton variant="secondary" radius="md" size="md" full-width class="border-primary/30! text-pureWhite">
          مشاهده دموها
        </UiActionButton>
      </div>
    </div>
    <!-- left -->
    <div class="relative flex-center w-full max-w-sm lg:max-w-none lg:flex-1">
      <UiDecorCircle side="c" size="md"/>
      <img
        src="/solutionsHero.webp"
        alt="MLGrid"
        class="relative h-64 w-full rounded-bl-[256px] rounded-tl-[256px] rounded-br-2xl rounded-tr-2xl border border-primary/15 object-cover sm:h-80 lg:h-[472px] lg:w-[538px]"
      />
    </div>
  </section>
</template>