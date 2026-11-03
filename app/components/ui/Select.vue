<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  options: Option[]
  placeholder?: string
}

defineProps<Props>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="relative w-full">
    <select
      :value="modelValue"
      dir="rtl"
      class="w-full appearance-none rounded-2xl border border-borderDivider bg-background px-4 py-3 text-right text-body-2 text-title focus:outline-none"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <Icon
      name="mynaui:chevron-down"
      size="20"
      class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-caption"
    />
  </div>
</template>