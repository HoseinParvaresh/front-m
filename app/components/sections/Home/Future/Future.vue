<script setup lang="ts">
import { FutureCards } from "~/utils/constants";
</script>

<template>
	<section class="w-full px-4 py-6 sm:p-16 mt-40 3xs:mt-20 2xs:mt-0">
		<div class="flex flex-col items-center gap-6">

			<UiDecorCircle side="r" size="sm" class="top-300" />
			<UiDecorCircle side="l" size="md" class="top-400" />

			<!-- title / subtitle -->
			<div class="flex flex-col gap-4">
				<div class="flex-center flex-col gap-3 lg:flex-row">
					<p aria-hidden="true" class="select-none font-anta text-[40px] text-pureWhite text-stroke text-shadow-2xl">MLgrid</p>
					<h2 class="text-center font-shabnamBold text-heading-1 text-title">آینده هوش مصنوعی همینجاست، آسان‌تر از همیشه.</h2>
				</div>
				<p class="max-w-[1086px] text-center text-body text-subtitle py-2.5">MLGrid تنها یک پلتفرم نیست؛ بلکه دروازه‌ای به دنیای هوش مصنوعی است. ما محیطی امن و مقیاس‌پذیر فراهم کرده‌ایم تا توسعه‌دهندگان و کسب‌وکارها به راحتی مدل‌های هوش مصنوعی را به API تبدیل کرده و از آن‌ها بهره‌برداری کنند. هدف ما: دموکراتیزه کردن هوش مصنوعی برای همه.</p>
			</div>

			<!-- cards -->
			<div class="mt-20 mb-10 lg:mb-0 flex-center w-full flex-wrap gap-16 xl:gap-y-0">
				<SectionsHomeFutureCard v-for="card in FutureCards" :key="card.id" :title="card.title" :desc="card.desc" :icon="card.icon" />
			</div>

			<!-- button -->
			<UiButtonBrand title="بیشتر بدانید" to="/" />
		</div>
	</section>
</template>
