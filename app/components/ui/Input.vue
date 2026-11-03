<script setup lang="ts">
interface Props {
  modelValue: string
  type?: 'text' | 'email' | 'password' | 'tel'
  icon?: string
  placeholder?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex h-12 w-full items-center gap-2.5 rounded-3xl border border-borderDivider bg-background px-3">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      dir="rtl"
      class="w-full flex-1 bg-transparent text-right text-body-2 text-title placeholder:text-caption/50 focus:outline-none"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <Icon v-if="icon" :name="icon" class="size-4 shrink-0 text-caption" />
  </div>
</template>