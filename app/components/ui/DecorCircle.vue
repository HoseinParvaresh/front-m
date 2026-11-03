<script setup lang="ts">
interface Props {
  side: 'l' | 'r' | 'c'
  size: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary'
}

withDefaults(defineProps<Props>(), {
  color: "primary"
})
</script>

<template>
  <div
    aria-hidden="true"
    class="circle"
    :class="[`circle-${side}`, `circle-${size}`,`circle-${color}`]"
  />
</template>