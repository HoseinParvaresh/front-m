<script setup lang="ts">
import { FilterCategories } from "~/utils/constants";

const { sortBy, selectedCategories, toggleCategory, clearFilters } = useModelsFilters();

const categoryOpen = ref(false);
const sortOpen = ref(false);

function isSelected(id: string) {
	return selectedCategories.value.includes(id);
}

function toggleCategoryPanel() {
	categoryOpen.value = !categoryOpen.value;
	sortOpen.value = false;
}

function toggleSortPanel() {
	sortOpen.value = !sortOpen.value;
	categoryOpen.value = false;
}
</script>

<template>
	<div class="flex w-full flex-col gap-3 lg:hidden">
		<div class="flex h-12 w-full items-center justify-between rounded-2xl border border-borderDivider bg-cardSurface px-4">
			<p class="text-subtitle text-title">فیلترها :</p>
			<div class="flex items-center gap-2.5">
				<button type="button" class="flex items-center gap-1 rounded-lg border border-borderDivider px-3 py-2 text-body-2 text-title/80" @click="toggleSortPanel">
					<Icon name="mdi:chevron-down" size="16" />
					مرتب سازی
				</button>
				<button type="button" class="flex items-center gap-1 rounded-lg border border-borderDivider px-3 py-2 text-body-2 text-title/80" @click="toggleCategoryPanel">
					<Icon name="mdi:chevron-down" size="16" />
					دسته‌بندی
				</button>
			</div>
		</div>

		<Transition name="collapse">
			<div v-if="categoryOpen" class="grid grid-rows-[1fr]">
				<div class="flex flex-col gap-2 overflow-hidden">
					<SectionsModelsFilterCategoryItem v-for="cat in FilterCategories" :key="cat.id" :label="cat.label" :icon="cat.icon" :model-value="isSelected(cat.id)" @update:model-value="toggleCategory(cat.id, $event)" />
				</div>
			</div>
		</Transition>

		<Transition name="collapse">
			<div v-if="sortOpen" class="grid grid-rows-[1fr]">
				<div class="flex flex-wrap gap-3 overflow-hidden">
					<SectionsModelsFilterSortTag :active="sortBy === 'newest'" @click="sortBy = 'newest'"> جدیدترین‌ها </SectionsModelsFilterSortTag>
					<SectionsModelsFilterSortTag :active="sortBy === 'popular'" @click="sortBy = 'popular'"> محبوب‌ترین‌ها </SectionsModelsFilterSortTag>
				</div>
			</div>
		</Transition>

		<UiActionButton v-if="selectedCategories.length > 0" variant="secondary" size="sm" radius="sm" full-width @click="clearFilters"> پاک کردن فیلترها </UiActionButton>
	</div>
</template>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
	transition: grid-template-rows 300ms ease;
}
.collapse-enter-from,
.collapse-leave-to {
	grid-template-rows: 0fr;
}
.collapse-enter-to,
.collapse-leave-from {
	grid-template-rows: 1fr;
}
</style>
