<script setup lang="ts">
interface Props {
  icon: string
  title: string
  value: string
  desc?: string
  textIcon?: string
  actionLabel: string
  actionHref: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4 rounded-3xl border border-borderDivider bg-cardSurface p-6 lg:gap-6 lg:p-8">
    <div class="flex-center size-16 rounded-2xl bg-primary">
      <Icon :name="icon" size="32" class="text-background" />
    </div>

    <div class="flex flex-col gap-2.5">
      <h3 class="font-bold text-title text-subtitle">{{ title }}</h3>
      <p v-if="value" class="bg-linear-to-b from-secondary to-primary bg-clip-text font-shabnamBold flex items-center gap-[7px] text-transparent text-subtitle">
        <Icon :name="`${textIcon}`" size="20" class="text-primary" />
        {{ value }}
      </p>
      <p class="text-body-2 text-caption">{{ desc }}</p>
    </div>

    <a
      :href="actionHref"
      class="flex-center max-w-max gap-2 rounded-2xl border border-body px-6 py-3 text-body-1 font-shabnamBold text-title transition-colors hover:bg-white/5"
    >
      {{ actionLabel }}
      <Icon name="fe:arrow-left" size="16" />
    </a>
  </div>
</template>