<script setup lang="ts">
interface Props {
	icon?: string;
}

defineProps<Props>();
</script>

<template>
	<div class="min-w-28 flex-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-[17px] py-2 text-body-2 font-shabnamBold text-primary">
        <Icon v-if="icon" :name="icon" size="16" class="shrink-0" />
		<span><slot /></span>
	</div>
</template>
