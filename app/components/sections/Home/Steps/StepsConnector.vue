<script setup lang="ts">
interface Props {
	orientation: "top" | "bottom";
	active: boolean;
	delay?: number;
	dotLeft?: boolean;
	dotRight?: boolean;
}

withDefaults(defineProps<Props>(), {
	delay: 0,
	dotLeft: true,
	dotRight: true,
});
</script>

<template>
	<div
		aria-hidden="true"
		class="absolute h-8 border-2 border-pureWhite drop-shadow-md rounded bg-transparent transition-[clip-path] duration-500 ease-out"
		:class="orientation === 'top' ? 'top-0 rounded-t-2xl border-b-0 rounded-b-none' : 'bottom-0 rounded-b-2xl rounded-t-none border-t-0 '"
		:style="{
			clipPath: active ? 'inset(-25px -30px -25px -20%)' : 'inset(0 0 0 100%)',
			transitionDelay: `${delay}ms`,
		}"
	>
		<span v-if="dotLeft" class="absolute h-2 w-2 rounded-full bg-pureWhite drop-shadow-md transition-transform duration-300" :class="orientation === 'top' ? 'bottom-0 -left-1' : 'top-0 -left-1'" :style="{ transitionDelay: `${delay}ms`, transform: active ? 'scale(1)' : 'scale(0)' }" />
	</div>
</template>
