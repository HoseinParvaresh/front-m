<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  desc: string;
  size?: "sm" | "md";
}

withDefaults(defineProps<Props>(), {
  size: "md",
});
</script>

<template>
  <div
    class="flex flex-col w-full gap-3 rounded-2xl border border-borderDivider bg-cardSurface text-right"
    :class="size === 'sm' ? 'p-4' : 'gap-4 p-8'"
  >
    <div
      class="flex-center shrink-0 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/10"
      :class="size === 'sm' ? 'size-10' : 'size-14'"
    >
      <Icon :name="icon" :size="size === 'sm' ? 20 : 28" class="text-primary" />
    </div>
    <p class="text-subtitle text-title">{{ title }}</p>
    <p class="text-body-2 text-caption">{{ desc }}</p>
  </div>
</template>
