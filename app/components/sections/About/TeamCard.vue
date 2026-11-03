<script setup lang="ts">
interface Props {
	name: string;
	role: string;
	desc: string;
	avatar?: string;
}

defineProps<Props>();

const socials = [
	{ icon: "mdi:telegram", to: "/" },
	{ icon: "mdi:instagram", to: "/" },
	{ icon: "mdi:linkedin", to: "/" },
];
</script>

<template>
	<div class="flex w-full flex-col gap-4 rounded-3xl border border-borderDivider bg-cardSurface p-4">
		<div class="flex w-full items-center gap-2.5">
			<img v-if="avatar" :src="avatar" :alt="name" class="size-16 shrink-0 rounded-2xl object-cover" />
			<div v-else class="size-16 shrink-0 rounded-2xl bg-primary/80" />
			<div class="flex flex-1 flex-col gap-2.5 font-shabnamBold">
				<p class="text-body-1 text-title">{{ name }}</p>
				<p class="text-body-2 text-primary">{{ role }}</p>
			</div>
		</div>
		<p class="w-full text-body-2 text-caption">{{ desc }}</p>

		<div class="flex items-center gap-2.5">
			<NuxtLink v-for="social in socials" :key="social.icon" :to="social.to" class="flex-center size-8 rounded-lg bg-background">
				<Icon :name="social.icon" size="20" class="text-primary" />
			</NuxtLink>
		</div>
	</div>
</template>
