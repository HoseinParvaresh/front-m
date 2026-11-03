<script setup lang="ts">
const floatingBadges = [
  { icon: "fe:mail", angle: 0, left: 10 },
  { icon: "lucide:phone", angle: 120, left: 25 },
  { icon: "ic:baseline-whatsapp", angle: 240, left: 40 },
];
</script>

<template>
  <section
    class="relative flex flex-col-reverse items-center gap-8 px-4 py-8 sm:px-8 lg:flex-row lg:justify-between lg:gap-2 lg:px-32 lg:py-16"
  >
    <!-- right -->
    <div
      class="z-10 flex w-full flex-col items-center gap-6 text-center lg:w-[553px] lg:items-start lg:text-right"
    >
      <UiBadge icon="ep:chat-round">ما همیشه در دسترس هستیم</UiBadge>

      <h1
        class="text-heading-0 font-shabnamBold leading-tight text-title lg:leading-[60px]"
      >
        با MLGrid
        <span
          class="block bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent"
        >
          در تماس باشید
        </span>
      </h1>

      <p class="text-subtitle font-shabnamBold text-primary">
        سوالی دارید؟ به کمک نیاز دارید؟ یا به دنبال همکاری هستید؟
      </p>

      <p class="text-subtitle text-caption lg:text-right lg:leading-8">
        تیم MLGrid آماده شنیدن صدای شماست. ما اینجا هستیم تا به تمام سوالات شما
        پاسخ دهیم، در استفاده از پلتفرم راهنمایی‌تان کنیم و فرصت‌های همکاری جدید
        را بررسی نماییم. از طریق روش‌های زیر با ما در ارتباط باشید.
      </p>

      <div
        class="flex w-full flex-col gap-2.5 p-2.5 lg:gap-4 sm:w-auto sm:flex-row"
      >
        <UiActionButton
          variant="primary"
          radius="md"
          size="md"
          full-width
          class="sm:w-[130px]"
        >
          ارسال پیام
        </UiActionButton>
        <UiActionButton
          variant="secondary"
          radius="md"
          size="md"
          full-width
          class="sm:w-[143px] text-pureWhite"
        >
          تماس تلفنی
        </UiActionButton>
      </div>
    </div>

    <!-- left -->
    <div class="relative z-10 flex-center size-64 lg:size-[400px]">
      <!-- circle -->
      <div
        class="size-[300px] lg:size-[512px] absolute bg-linear-to-br from-primary/20 to-secondary/20 blur-[50px] rounded-full"
      ></div>
      <!-- center icon -->
      <div
        class="absolute z-2 flex-center size-24 rounded-full bg-linear-to-b from-primary to-secondary drop-shadow-sm lg:size-32"
      >
        <Icon
          name="solar:chat-round-outline"
          size="64"
          class="text-background size-12! lg:size-16!"
        />
      </div>
      <!-- rounded icon -->
      <div class="orbit-spin absolute">
        <div
          v-for="badge in floatingBadges"
          :key="badge.icon"
          class="absolute left-1/2 top-1/2 origin-left"
          :style="{ transform: `rotate(${badge.angle}deg)` }"
        >
          <div
            class="h-px w-[120px] border-t-2 border-dashed border-primary/40 lg:w-[168px]"
          />
          <div
            class="counter-spin absolute -top-7 flex-center size-14 rounded-2xl border-2 border-primary/40 bg-transparent backdrop-blur-2xl lg:-top-10 lg:size-20"
            :style="`left: calc(100% - ${badge.left}px)`"
          >
            <Icon
              :name="badge.icon"
              class="text-primary size-7! lg:size-10!"
              :style="{ transform: `rotate(-${badge.angle}deg)` }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes orbit-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes counter-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.orbit-spin {
  animation: orbit-spin 60s linear infinite;
}
.counter-spin {
  animation: counter-spin 60s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .orbit-spin,
  .counter-spin {
    animation: none;
  }
}
</style>
