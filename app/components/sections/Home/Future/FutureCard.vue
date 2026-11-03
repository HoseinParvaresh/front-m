<script setup lang="ts">
interface Props {
	title: string;
	desc: string;
	icon: string;
}

defineProps<Props>();
</script>

<template>
	<div class="group relative flex h-64 w-[336px] items-end justify-center rounded-t-[100px] rounded-b-[20px] bg-cardSurface px-8 pb-12 drop-shadow-card">
		<Icon :name="`icon:${icon}`" size="100px" aria-hidden="true" class="absolute -top-[50px] left-1/2 -translate-x-1/2 drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md" />
		<div class="text-center">
			<p class="mb-5 line-clamp-1 text-heading-3 font-shabnamBold text-title">{{ title }}</p>
			<p class="line-clamp-3 text-body-2 text-body">{{ desc }}</p>
		</div>
	</div>
</template>
