<script setup lang="ts">
interface Props {
  question: string
  answer: string
  open: boolean
}

defineProps<Props>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <div
    class="w-full rounded-lg border bg-cardSurface px-5 py-5 transition-colors"
    :class="open ? 'border-secondary/60' : 'border-borderDivider'"
  >
    <button
      type="button"
      class="flex w-full items-center justify-between gap-3 cursor-pointer"
      :aria-expanded="open"
      @click="$emit('toggle')"
    >
      <p class="text-body-1 text-title">{{ question }}</p>
      <Icon :name="open ? 'ic:round-minus' : 'ic:round-plus'" size="16" class="shrink-0 text-title" />
    </button>

    <Transition name="collapse">
      <div v-if="open" class="grid grid-rows-[1fr]">
        <div class="overflow-hidden">
          <p class="pt-3 text-body-2 text-body">{{ answer }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: grid-template-rows 250ms ease;
}
.collapse-enter-from,
.collapse-leave-to {
  grid-template-rows: 0fr;
}
.collapse-enter-to,
.collapse-leave-from {
  grid-template-rows: 1fr;
}
</style>