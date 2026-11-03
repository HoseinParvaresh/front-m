<script setup lang="ts">
interface Props {
	title: string;
	desc: string;
	icon: string;
	img: string;
	textButton: string;
	to: string;
}

const props = defineProps<Props>();

const bannerSrc = computed(() => resolveImage(props.img))
</script>

<template>
	<div class="w-full lg:h-[304px] bg-cardSurface hover:bg-borderDivider p-6 lg:grid grid-cols-5 items-center gap-6 rounded-3xl xs:rounded-5xl transition-colors duration-500 z-2">
		<!-- banner -->
		<img class="col-span-2 h-[212px] lg:h-full w-full object-cover rounded-2xl xs:rounded-3xl" :src="bannerSrc" :alt="title" />
		<div class="flex flex-col gap-4 col-span-3 mt-6 lg:mt-0">
			<!-- title / icon -->
			<div class="flex items-center gap-4">
				<!-- <img class="" :src="iconSrc" :alt="icon" /> -->
				<Icon :name="`icon:${icon}`" class="size-10! drop-shadow-xs"/>
				<p class="text-heading-3 font-shabnamBold text-title">{{ title }}</p>
			</div>
			<!-- desc -->
			<p class="text-subtitle text-body 2xs:line-clamp-3">{{ desc }}</p>
			<!-- button -->
			<UiButtonBrand :title="textButton" :to="to" class="w-full lg:w-[170px]" />
		</div>
	</div>
</template>
