<script setup lang="ts">
interface Props {
  label: string
  icon: string
  modelValue: boolean
}

defineProps<Props>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <label class="flex h-[57px] w-full cursor-pointer items-center gap-3 rounded-10 border border-borderDivider bg-cardSurface px-4">
    <UiCheckBox :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" />
    <Icon :name="icon" size="24" class="shrink-0 text-primary" />
    <span class="flex-1 text-right text-body-2 text-title/80">{{ label }}</span>
  </label>
</template>