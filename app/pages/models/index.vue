<script setup lang="ts">
import { SuggestedModels, AllModels } from "~/utils/constants";

useSeoMeta({
	title: "بازارچه مدل‌ها",
	description: "مدل‌ها، ابزارها و راهکارهای هوش مصنوعی آماده استفاده",
});
</script>

<template>
	<div class="px-4 sm:px-16">
		<SectionsModelsHero />
		<div class="flex w-full gap-4 pb-16 pt-8">
			<SectionsModelsFilterSidebar />
			<div class="flex flex-1 flex-col gap-8">
				<SectionsModelsSection title="پیشنهاد شده توسط MLgrid" :models="SuggestedModels" />
				<SectionsModelsSection title="همه مدل ها" :models="AllModels" mobile />
				<UiActionButton variant="secondary" radius="md" size="md" class="self-center border-primary/30! w-32!"> نمایش بیشتر </UiActionButton>
			</div>
		</div>
	</div>
</template>
