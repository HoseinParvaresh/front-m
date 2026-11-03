<script setup lang="ts">
interface Props {
	icon: string;
	title: string;
	desc: string;
	size: "sm" | "md"
}

defineProps<Props>();
</script>

<template>
	<div class="flex w-full items-center gap-4 rounded-2xl border border-borderDivider bg-cardSurface p-4 text-right lg:items-start">
		<div class="flex-center size-12 shrink-0 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/10">
			<Icon :name="icon" size="24" class="text-primary" />
		</div>
		<div class="flex-1">
			<p :class="`${size === 'sm' ? 'text-body-1' : 'text-subtitle'} text-title`">{{ title }}</p>
			<p class="text-body-2 mt-1 text-caption">{{ desc }}</p>
		</div>
	</div>
</template>
