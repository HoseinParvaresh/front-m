<script setup lang="ts">
interface Props {
  active: boolean
}

defineProps<Props>()
defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    class="rounded-full border border-primary/20 bg-borderDivider px-3 py-2 text-body-2 transition-colors"
    :class="active ? 'text-primary' : 'text-title/80'"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>