<script setup lang="ts">
const route = useRoute();
const hideFooter = computed(() => route.meta.hideFooter === true);
</script>

<template>
	<div class="bg-background font-shabnam">
		<div class="max-w-[1536px] mx-auto overflow-hidden">
			<LayoutNavbar />
			<main>
				<slot />
			</main>
			<LayoutFooter v-if="!hideFooter" />
		</div>
	</div>
</template>
