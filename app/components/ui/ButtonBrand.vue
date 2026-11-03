<script setup lang="ts">

interface Props {
  title: string
  line?: boolean
  variant?: 'primary' | 'secondary'
  to?: string 
}

const props = withDefaults(defineProps<Props>(), {
  line: false,
  variant: 'primary',
  to: '/',
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const isPrimary = computed(() => props.variant === 'primary')

const textClass = computed(() =>
  isPrimary.value ? 'text-shadow-sm text-primary' : 'text-caption'
)

const borderClass = computed(() =>
  isPrimary.value ? 'border-primary' : 'border-caption'
)
</script>

<template>
  <NuxtLink
    :to="to"
    @click="$emit('click', $event)"
    class="relative group flex-center w-[170px] h-12 overflow-hidden cursor-pointer transition-all"
  >
    <span class="text-button font-shabnamBold" :class="textClass">{{ title }}</span>

    <template v-if="isPrimary && line">
      <span class="absolute top-0 left-1/2 -translate-x-1/2 w-23 h-[3px] bg-primary rounded-b-full blur-sm" />
      <span class="absolute top-0 left-1/2 -translate-x-1/2 w-25 h-px bg-linear-to-r from-transparent via-green-200 to-transparent" />
    </template>

    <span class="corner tl border-2 group-hover:top-0.5! group-hover:left-[7px]!" :class="borderClass" />
    <span class="corner tr border-2 group-hover:top-0.5! group-hover:right-[7px]!" :class="borderClass" />
    <span class="corner bl border-2 group-hover:bottom-0.5! group-hover:left-[7px]!" :class="borderClass" />
    <span class="corner br border-2 group-hover:bottom-0.5! group-hover:right-[7px]!" :class="borderClass" />
  </NuxtLink>
</template>

<style scoped>
.corner {
  position: absolute;
  width: 10px;
  height: 10px;
  transition: all 400ms;
}

.tl, .tr { top: 0; border-bottom: none; }
.bl, .br { bottom: 0; border-top: none; }
.tl, .bl { left: 0; border-right: none; }
.tr, .br { right: 0; border-left: none; }

.tl { border-top-left-radius: 5px; }
.tr { border-top-right-radius: 5px; }
.bl { border-bottom-left-radius: 5px; }
.br { border-bottom-right-radius: 5px; }
</style>