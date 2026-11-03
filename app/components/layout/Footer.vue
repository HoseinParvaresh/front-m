<script setup lang="ts">
import { NAV_ITEMS } from "~/utils/constants";

const socialLinks = [
  { name: "اینستاگرام", icon: "ri:instagram-line", to: "/" },
  { name: "تلگرام", icon: "uil:telegram", to: "/" },
  { name: "لینکدین", icon: "flowbite:linkedin-solid", to: "/" },
];
</script>

<template>
  <footer class="relative z-1 bg-cardSurface px-4 py-8 md:p-16">
    <!-- top -->
    <div class="border-y-2 border-caption/30 py-6 md:py-8">
      <div class="flex flex-col items-center justify-between gap-8 lg:flex-row">
        <!-- logo -->
        <NuxtLink class="flex items-center gap-2 px-4 shrink-0" to="/">
          <img src="/logo.webp" alt="logo" />
          <p
            class="font-anta text-5xl text-pureWhite text-stroke text-shadow-2xl"
          >
            MLgrid
          </p>
        </NuxtLink>

        <!-- info -->
        <div class="flex flex-col gap-4">
          <!-- address -->
          <div class="flex items-center gap-4">
            <Icon
              name="famicons:location-sharp"
              size="24"
              class="shrink-0 text-title"
            />
            <p class="text-body-2 text-title">
              شیراز، شهرک آرین، خیابان فناوری، پارک علم و فناوری استان فارس،
              ساختمان نفت، گاز و پتروشیمی، طبقه اول، واحد ۵۱۰۸
            </p>
          </div>

          <!-- email / phone / social -->
          <div class="flex flex-col justify-between gap-y-4 xs:flex-row">
            <a href="mailto:info@mlgrid.com" class="flex items-center gap-4">
              <Icon
                name="ic:baseline-mail"
                size="24"
                class="shrink-0 text-title"
              />
              <p class="text-body-2 text-title">info@mlgrid.com</p>
            </a>

            <a href="tel:+989336100815" class="flex items-center gap-4">
              <Icon name="fe:phone" size="24" class="shrink-0 text-title" />
              <p class="text-body-2 text-title">۰۹۳۳۶۱۰۰۸۱۵</p>
            </a>

            <div class="flex-center gap-6">
              <NuxtLink
                v-for="social in socialLinks"
                :key="social.icon"
                :to="social.to"
                :aria-label="social.name"
              >
                <Icon
                  :name="social.icon"
                  size="24"
                  class="shrink-0 text-title"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- bottom -->
    <div
      class="flex flex-col-reverse items-center justify-between gap-y-4 pt-6 lg:flex-row"
    >
      <p class="text-body-2 text-title/70">Copyright © 2025 • Clicks Inc.</p>
      <ul class="hidden items-center gap-12 px-6 text-title sm:flex">
        <li v-for="item in NAV_ITEMS" :key="item.to">
          <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
