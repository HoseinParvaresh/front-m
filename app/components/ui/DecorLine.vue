<script setup lang="ts">
type LineDirection = 'l' | 'r' | 'c'
type LineColor = 'white' | 'primary' | 'secondary'

interface Props {
  direction: LineDirection
  width: number
  color?: LineColor
}

const props = withDefaults(defineProps<Props>(), {
  color: 'white',
})

const gradientClasses: Record<LineDirection, Record<LineColor, string>> = {
  r: {
    white: 'bg-linear-to-r from-transparent to-pureWhite',
    primary: 'bg-linear-to-r from-transparent to-primary/30',
    secondary: 'bg-linear-to-r from-transparent to-secondary',
  },
  l: {
    white: 'bg-linear-to-l from-transparent to-pureWhite',
    primary: 'bg-linear-to-l from-transparent to-primary/30',
    secondary: 'bg-linear-to-l from-transparent to-secondary',
  },
  c: {
    white: 'bg-linear-to-r from-transparent via-pureWhite to-transparent',
    primary: 'bg-linear-to-r from-transparent via-primary to-transparent',
    secondary: 'bg-linear-to-r from-transparent via-secondary to-transparent',
  },
}

const gradientClass = computed(() => gradientClasses[props.direction][props.color])

const edgeClass = computed(() => {
  if (props.direction === 'l') return 'absolute left-0'
  if (props.direction === 'r') return 'absolute right-0'
  return '' 
})
</script>

<template>
  <span
    aria-hidden="true"
    class="block h-px w-full"
    :class="[gradientClass, edgeClass]"
    :style="{ maxWidth: `${width}px` }"
  />
</template>