<script setup lang="ts">
interface ProgressItem {
  label: string
  percent: number
  status: string
  statusColor: string
}

const progressItems: ProgressItem[] = [
  { label: 'مبانی یادگیری ماشین', percent: 100, status: '۱۰۰٪', statusColor: 'text-primary' },
  { label: 'پردازش زبان طبیعی', percent: 75, status: '۷۵٪', statusColor: 'text-primary' },
  { label: 'بینایی ماشین', percent: 35, status: 'در حال یادگیری', statusColor: 'text-secondary' },
]

const stats = [
  { value: '+۵۰', label: 'دوره' },
  { value: '+۵k', label: 'دانشجو' },
  { value: '۴.۸', label: 'امتیاز' },
]

const { target, isVisible } = useRevealOnView(0.4)
</script>

<template>
  <div ref="target" class="flex w-full  max-w-[544px] flex-col gap-6 rounded-3xl border border-primary/30 bg-cardSurface p-8 shadow-[0_0_20px_rgba(22,242,157,0.1)]">
    <div class="flex-center flex-col gap-2 3xs:gap-4 rounded-2xl aspect-2/1 border border-primary/20 bg-linear-to-br from-primary/10 to-secondary/5">
      <Icon name="octicon:book-16" size="64" class="text-primary" />
      <p class="text-body-1 text-title">آموزش تعاملی</p>
    </div>

    <div class="flex flex-col gap-4">
      <div v-for="(item, i) in progressItems" :key="item.label" class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <p class="text-body-2 text-title">{{ item.label }}</p>
          <p class="text-body-2" :class="item.statusColor">{{ item.status }}</p>
        </div>
        <div class="h-2 w-full overflow-hidden rounded-full bg-borderDivider">
          <div
            class="h-full rounded-full bg-linear-to-b from-primary to-secondary transition-[width] duration-1500 ease-out"
            :style="{ width: isVisible ? `${item.percent}%` : '0%', transitionDelay: `${i * 200}ms` }"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 border-t border-borderDivider pt-6 text-center">
      <div v-for="stat in stats" :key="stat.label">
        <p class="text-2xl font-bold text-primary">{{ stat.value }}</p>
        <p class="text-caption-2 text-white/60">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>