<script setup lang="ts">
interface Props {
  title: string;
  category: string;
  date: string;
  image?: string;
  to: string;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex w-full flex-col items-center overflow-hidden rounded-2xl border border-borderDivider bg-cardSurface shadow-[0_1px_4px_0_rgba(25,33,61,0.08)]"
  >
    <div class="flex-center h-40 w-full shrink-0 bg-borderDivider lg:h-56">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="size-full object-cover"
      />
      <Icon v-else name="mdi:image-outline" size="40" class="text-white/30" />
    </div>

    <div class="flex w-full flex-col gap-6 p-4 lg:gap-8 lg:p-6">
      <div class="flex w-full flex-col items-start gap-4">
        <div class="flex w-full items-center gap-3">
          <div class="flex items-center gap-1.5">
            <Icon
              name="mdi:calendar-blank-outline"
              size="15"
              class="text-caption"
            />
            <span class="text-body-2 text-caption">{{ date }}</span>
          </div>

          <span class="h-px w-6 bg-borderDivider" />

          <div class="flex items-center gap-1.5">
            <Icon name="mdi:tag-outline" size="15" class="text-caption" />
            <span class="text-body-2 text-caption">{{ category }}</span>
          </div>
        </div>

        <p
          class="w-full text-right text-heading-4 font-shabnamBold line-clamp-2 text-title"
        >
          {{ title }}
        </p>
      </div>

      <div class="flex items-center gap-1.5">
        <span class="text-body-2 font-shabnamBold text-caption">بیشتر</span>
        <Icon name="mdi:arrow-left" size="15" class="text-caption" />
      </div>
    </div>
  </NuxtLink>
</template>
