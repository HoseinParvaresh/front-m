<script setup lang="ts">
const searchQuery = ref("");

const trustBadges = ["+۵۰۰ مدل تایید شده", "بهینه‌سازی شده برای سرعت", "امنیت تضمین شده"];
</script>

<template>
	<section class="py-8 sm:py-16 flex-center flex-col gap-4">
		<!-- circle -->
		<UiDecorCircle side="r" size="md" />
		<UiDecorCircle side="l" size="md" />
		<!-- title -->
		<div class="flex gap-1 text-[48px] text-pureWhite font-shabnamBold">
			<p>بازارچه</p>
			<p class="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent inline-block relative top-[-11px]">MLgrid</p>
		</div>
		<!-- desc -->
		<p class="text-subtitle text-caption">مدل‌ها، ابزارها و راهکارهای هوش مصنوعی آماده استفاده</p>
		<!-- search box -->
		<div class="h-14 flex-center w-full">
			<div class="bg-cardSurface h-full flex-center gap-4 rounded-r-2xl w-full max-w-[730px] px-6">
				<Icon name="ri:search-line" size="20" class="shrink-0 text-primary" />
				<input v-model="searchQuery" placeholder="جستجو در مدل‌ها و ابزارها..." type="text" class="outline-none text-pureWhite w-full" />
			</div>
			<button class="bg-primary rounded-l-2xl h-full cursor-pointer text-cardSurface text-body-1 px-[18px] py-4 transition-colors duration-300 ease-in-out hover:bg-secondary">جستجو</button>
		</div>
		<!-- list -->
		<div class="flex-center flex-wrap gap-6 sm:px-16">
			<div v-for="badge in trustBadges" :key="badge" class="flex items-center gap-2">
				<span class="size-2 rounded-full bg-secondary/50" />
				<p class="text-body-2 text-title/60">{{ badge }}</p>
			</div>
		</div>
	</section>
</template>
