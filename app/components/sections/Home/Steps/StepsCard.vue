<script setup>
defineProps({
	number: Number,
	title: String,
	desc: String,
	icon: String,
});
</script>

<template>
	<div class="bg-cardSurface rounded-5xl lg:rounded-4xl xl:rounded-5xl w-full flex-center flex-col gap-4 px-4 pt-[42px] pb-4">
		<!-- icon -->
		<div class="p-8 flex-center rounded-3xl bg-borderDivider">
			<Icon v-if="icon" :name="icon" size="64" class="shrink-0 text-primary" />
		</div>
		<!-- number -->
		<div class="size-10 bg-background text-primary flex-center rounded-full text-heading-3 font-shabnamBold">{{ number }}</div>
		<!-- text / subTitle -->
		<div class="py-2 text-center">
			<p class="text-title text-subtitle mb-2">{{ title }}</p>
			<div class="body-1 text-body line-clamp-1">{{ desc }}</div>
		</div>
	</div>
</template>
