<script setup lang="ts">
interface Props {
  variant: "primary" | "secondary";
  size: "sm" | "md";
  radius: "sm" | "md" | "lg";
  icon?: string;
  fullWidth?: boolean;
  type?: "button" | "submit";
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fullWidth: false,
  type: "button",
});

const tag = computed(() => (props.to ? "a" : "button"));
</script>

<template>
  <component
    :is="tag"
    :type="!to ? type : undefined"
    :href="to"
    class="flex-center gap-2 px-4 text-button font-shabnamBold cursor-pointer transition-all duration-300 ease-out"
    :class="[
      fullWidth && 'w-full',

      variant === 'primary' &&
        'bg-linear-to-r from-primary to-secondary text-background hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,242,157,0.25)] active:translate-y-0 active:shadow-none',

      variant === 'secondary' &&
        'border border-secondary bg-borderDivider text-primary hover:border-transparent hover:bg-linear-to-r hover:from-primary hover:to-secondary hover:text-background',

      size === 'sm' ? 'py-[11px]' : 'py-4',

      radius === 'sm' && 'rounded-10',
      radius === 'md' && 'rounded-14',
      radius === 'lg' && 'rounded-3xl',
    ]"
  >
    <Icon v-if="icon" :name="icon" size="20" class="shrink-0" />
    <span class="whitespace-nowrap"><slot /></span>
  </component>
</template>
