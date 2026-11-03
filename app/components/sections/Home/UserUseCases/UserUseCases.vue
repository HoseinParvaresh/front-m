<script setup lang="ts">
import { UserUseCases } from "~/utils/constants";
</script>

<template>
	<section class="w-full px-4 py-6 sm:p-16 flex flex-col items-center gap-8">
		<div class="w-full py-8 px-1 sm:p-8 text-center">
			<h2 class="text-heading-1 text-title font-shabnamBold">قدرت هوش مصنوعی برای هر نیاز شما</h2>
			<p class="text-subtitle text-body py-2.5 mt-4">فرقی نمی‌کند یک توسعه‌دهنده حرفه‌ای باشید یا صاحب یک کسب‌وکار خلاق؛ MLGrid راهکارهای هوشمندی برای شما دارد.</p>
		</div>
		<UiDecorLine direction="r" color="white" :width="215" class="md:mt-14"/>
		<UiDecorLine direction="l" color="white" :width="215" class="hidden sm:block mt-40 md:mt-32"/>

		<UiDecorCircle side="c" size="md" class="mt-100 left-90 blur-[250px]" />
		<UiDecorCircle side="l" size="lg" class="mt-230 blur-[250px]" />
		
		<template v-for="(useCase, index) in UserUseCases" :key="useCase.id">
			<SectionsHomeUserUseCasesCard v-bind="useCase" />
			<UiDecorLine v-if="index < UserUseCases.length - 1" direction="c" color="white" :width="430"/>
		</template>
	</section>
</template>
