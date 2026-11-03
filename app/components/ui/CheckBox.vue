<script setup lang="ts">
interface Props {
  modelValue: boolean
}

defineProps<Props>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <span
    class="relative flex-center size-[18px] shrink-0 rounded-md border transition-colors"
    :class="modelValue ? 'border-primary bg-primary/20' : 'border-lightGray'"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      class="absolute inset-0 size-full cursor-pointer opacity-0"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <!-- <Icon v-if="modelValue" name="mdi:check" size="16" class="pointer-events-none text-primary" /> -->
  </span>
</template>