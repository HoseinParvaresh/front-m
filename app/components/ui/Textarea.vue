<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  rows?: number
}

withDefaults(defineProps<Props>(), {
  rows: 5,
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    dir="rtl"
    class="w-full resize-none rounded-2xl border border-borderDivider bg-background px-4 py-3 text-right text-body text-title placeholder:text-white/40 focus:outline-none"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>