<script setup lang="ts">
interface Props {
	icon?: string;
	required?: boolean;
	optional?: boolean;
}

defineProps<Props>();
</script>

<template>
	<div class="flex items-center gap-1.5 font-shabnamBold text-body-1 text-title">
		<Icon v-if="icon" :name="icon" size="20" class="shrink-0 text-primary" />
		<span>
			<slot />
		</span>
		<span v-if="required" class="text-alert" aria-hidden="true"> * </span>
		<span v-if="optional" class="text-body-2 text-caption"> (اختیاری) </span>
	</div>
</template>
