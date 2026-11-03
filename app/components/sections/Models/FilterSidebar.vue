<script setup lang="ts">
import { FilterCategories } from "~/utils/constants";

const { sortBy, selectedCategories, toggleCategory, clearFilters } = useModelsFilters();

function isSelected(id: string) {
	return selectedCategories.value.includes(id);
}
</script>

<template>
	<aside class="hidden w-full max-w-[330px] flex-col gap-6 px-6 pt-6 lg:flex">
		<div class="flex flex-col gap-2">
			<h3 class="text-subtitle text-title">فیلترها</h3>
			<div class="h-0.5 w-full rounded-full bg-linear-to-b from-primary to-transparent" />
		</div>

		<div class="flex flex-col gap-3">
			<h4 class="text-body-2 text-title/90">مرتب سازی بر اساس</h4>
			<div class="flex flex-wrap gap-3">
				<SectionsModelsFilterSortTag :active="sortBy === 'newest'" @click="sortBy = 'newest'"> جدیدترین‌ها </SectionsModelsFilterSortTag>
				<SectionsModelsFilterSortTag :active="sortBy === 'popular'" @click="sortBy = 'popular'"> محبوب‌ترین‌ها </SectionsModelsFilterSortTag>
			</div>
		</div>

		<div class="flex flex-col gap-3">
			<h4 class="text-body-2 text-title/90">دسته‌بندی</h4>
			<div class="flex flex-col gap-2">
				<SectionsModelsFilterCategoryItem v-for="cat in FilterCategories" :key="cat.id" :label="cat.label" :icon="cat.icon" :model-value="isSelected(cat.id)" @update:model-value="toggleCategory(cat.id, $event)" />
			</div>
		</div>

		<UiActionButton variant="secondary" size="sm" radius="sm" full-width @click="clearFilters"> پاک کردن فیلترها </UiActionButton>
	</aside>
</template>
