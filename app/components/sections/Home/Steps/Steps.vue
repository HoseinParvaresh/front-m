<script setup lang="ts">
import { StepsData } from "~/utils/constants";

const { target: sectionRef, isVisible } = useRevealOnView();

const STAGGER = 300;

const GAP_PX = 24;
const CARD_COUNT = StepsData.length;
const LEAD_IN_PX = 80;

const colWidth = `((100% - ${(CARD_COUNT - 1) * GAP_PX}px) / ${CARD_COUNT})`;

function cardCenterFromRight(i: number): string {
	return `calc(${colWidth} * ${i - 0.5} + ${(i - 1) * GAP_PX}px)`;
}

function connectorStyle(i: number) {
	const orientation = i % 2 === 1 ? "bottom" : "top";
	const right = cardCenterFromRight(i);
	const width = `calc(${cardCenterFromRight(i + 1)} - ${cardCenterFromRight(i)})`;
	return { orientation: orientation as "top" | "bottom", style: { right, width } };
}

const leadInStyle = {
	right: `calc(-${LEAD_IN_PX}px)`,
	width: `calc(${cardCenterFromRight(1)} + ${LEAD_IN_PX}px)`,
};
</script>

<template>
	<section ref="sectionRef" class="w-full px-4 py-16 sm:p-16">
		<div class="mb-14 text-center">
			<h2 class="text-heading-1 font-shabnamBold text-title">هوش مصنوعی در ۵ قدم ساده</h2>
			<p class="mt-4 text-body text-subtitle">از ثبت‌نام تا پیاده‌سازی فقط چند دقیقه فاصله دارید</p>
		</div>

		<div class="relative items-center gap-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:items-start xl:gap-16 lg:pt-8 lg:pb-8">
			<SectionsHomeStepsConnector orientation="top" :active="isVisible" :delay="0" :dot-right="false" class="hidden lg:block" :style="leadInStyle" />

			<SectionsHomeStepsConnector v-for="i in CARD_COUNT - 1" :key="`connector-${i}`" :orientation="connectorStyle(i).orientation" :active="isVisible" :delay="i * STAGGER" class="hidden lg:block" :style="connectorStyle(i).style" />

			<div v-for="(step, i) in StepsData" :key="step.id" class="w-full transition-all duration-500 ease-out lg:w-auto" :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'" :style="{ transitionDelay: `${i * STAGGER}ms` }">
				<SectionsHomeStepsCard :title="step.title" :desc="step.desc" :icon="step.icon" :number="step.id" />
			</div>
		</div>
	</section>
</template>
