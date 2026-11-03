<script setup lang="ts">
interface Props {
	title: string;
	desc: string;
	name: string;
	job: string;
}

defineProps<Props>();
</script>

<template>
	<div class="flex h-[253px] flex-col gap-4 rounded-2xl bg-cardSurface px-4 py-8 3xs:p-8">
		<!-- top -->
		<div class="flex items-center gap-4">
			<div class="flex-center size-12 shrink-0 rounded-full bg-borderDivider">
				<Icon name="lucide:user" size="28" class="shrink-0 text-primary" />
			</div>
			<p class="line-clamp-1 text-subtitle text-title">”{{ title }}“</p>
		</div>
		<!-- text -->
		<p class="h-21 line-clamp-4 text-body-2 text-body">{{ desc }}</p>
		<!-- name -->
		<div class="flex py-0.5">
			<p class="border-e-2 border-caption pe-2 font-shabnamBold text-body-2 text-title">{{ name }}</p>
			<p class="ms-2 text-body-2 text-caption">{{ job }}</p>
		</div>
	</div>
</template>
