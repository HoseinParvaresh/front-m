<script setup lang="ts">
import type { ModelDetail } from "~/utils/model-detail-data";

defineProps<{ model: ModelDetail }>();

const hidden = { opacity: 0, y: 24 };
const reveal = (delay = 0) => ({
  opacity: 1,
  y: 0,
  transition: { delay, duration: 450 },
});
</script>

<template>
  <div class="flex flex-col gap-8 p-4 lg:px-32 lg:py-8">
    <section class="flex flex-col gap-4 px-4">
      <h2
        v-motion
        :initial="hidden"
        :visible-once="reveal()"
        class="font-shabnamBold text-heading-1 text-title"
      >
        معرفی کامل مدل
      </h2>
      <p
        v-motion
        :initial="hidden"
        :visible-once="reveal(80)"
        class="text-subtitle text-body"
      >
        {{ model.intro }}
      </p>

      <ul class="flex flex-col gap-3">
        <li
          v-for="(point, i) in model.bulletPoints"
          :key="point"
          v-motion
          :initial="{ opacity: 0, x: 24 }"
          :visible-once="{
            opacity: 1,
            x: 0,
            transition: { delay: i * 90, duration: 400 },
          }"
          class="flex items-center gap-4"
        >
          <span class="size-2 shrink-0 rounded-full bg-secondary" />
          <span class="flex-1 text-subtitle text-body">{{ point }}</span>
        </li>
      </ul>
    </section>

    <section class="flex flex-col items-center gap-6">
      <div class="grid w-full grid-cols-2 gap-4 text-center lg:grid-cols-4">
        <div
          v-for="(stat, i) in model.quickStats"
          :key="stat.label"
          v-motion
          :initial="hidden"
          :visible-once="reveal(i * 80)"
          :class="stat.order"
          class="flex-center flex-col gap-3 rounded-2xl border border-borderDivider bg-cardSurface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
        >
          <p class="text-body-2 text-caption">{{ stat.label }}</p>
          <p class="font-shabnamBold text-body-1 text-title">
            <UiAnimatedNumber :value="stat.value" />
          </p>
        </div>
      </div>

      <UiDecorLine
        v-motion
        :initial="hidden"
        :visible-once="reveal(160)"
        direction="c"
        color="primary"
        :width="707"
      />

      <div class="flex w-full flex-col-reverse gap-4 lg:flex-row">
        <div
          v-for="(metric, i) in model.metrics"
          :key="metric.label"
          v-motion
          :initial="hidden"
          :visible-once="reveal(i * 100)"
          class="group flex items-center gap-4 rounded-2xl border border-borderDivider bg-cardSurface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 lg:flex-1"
        >
          <div
            class="flex-center size-12 shrink-0 rounded-14 border transition-transform duration-300 group-hover:scale-110"
            :class="
              metric.tone === 'warning'
                ? 'border-warning bg-[#262819] text-warning'
                : 'border-secondary bg-linear-to-br from-primary/20 to-secondary/10 text-primary'
            "
          >
            <Icon :name="metric.icon" size="24" />
          </div>

          <div
            class="flex flex-1 items-center justify-between gap-2 whitespace-nowrap"
          >
            <p class="text-body-2 text-title/60">{{ metric.label }}</p>
            <p class="flex items-center gap-2">
              <span class="font-shabnamBold text-body-1 text-title"
                ><UiAnimatedNumber :value="metric.value"
              /></span>
              <span class="text-caption-1 text-title/60">{{
                metric.unit
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2
        v-motion
        :initial="hidden"
        :visible-once="reveal()"
        class="font-shabnamBold text-heading-1 text-title"
      >
        اطلاعات تکمیلی
      </h2>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          v-for="(item, i) in model.info"
          :key="item.label"
          v-motion
          :initial="hidden"
          :visible-once="reveal((i % 2) * 80)"
          :class="item.order"
          class="flex items-center justify-between gap-4 rounded-2xl border border-borderDivider bg-cardSurface p-4 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
        >
          <p class="text-body-2 text-caption">{{ item.label }}</p>
          <p class="font-shabnamBold text-body-1 text-title">
            <UiAnimatedNumber :value="item.value" />
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
