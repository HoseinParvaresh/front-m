<script setup lang="ts">
const features = [
	{ icon: "si:ai-alt-1-line", title: "تحلیل نیاز دقیق", desc: "شناسایی چالش‌ها و فرصت‌های هوش مصنوعی در سازمان شما" },
	{ icon: "lucide:layers", title: "توسعه مدل‌های خاص‌منظوره", desc: "طراحی و پیاده‌سازی مدل‌های AI متناسب با داده‌ها و اهداف شما" },
	{ icon: "tabler:circle-check", title: "ادغام بی‌نقص", desc: "کمک به ادغام راهکارهای هوش مصنوعی در سیستم‌های موجود شما" },
	{ icon: "ri:headphone-line", title: "پشتیبانی اختصاصی", desc: "همراهی شما در تمام مراحل پیاده‌سازی و پس از آن" },
];
</script>

<template>
	<section class="flex flex-col items-center gap-8 px-4 py-8 sm:px-8 lg:px-32 lg:py-8">
		<div class="flex flex-col items-center gap-6 text-center">
			<UiBadge icon="si:ai-alt-1-line">راهکارهای سفارشی</UiBadge>
			<h2 class="text-heading-0 font-shabnamBold text-title">
				راه‌حل‌های هوشمند برای
				<span class="block bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent"> نیازهای خاص شما </span>
			</h2>
			<p class="text-body text-subtitle">هر کسب‌وکاری نیازهای منحصر به فرد خود را دارد. اگر راهکارهای عمومی ما دقیقاً با نیازهای شما منطبق نیست، تیم متخصص هوش گستران ابر پرداز آماده است تا با مشاوره و توسعه مدل‌های هوش مصنوعی سفارشی و نرم‌افزارهای هوشمند مبتنی بر تحلیل داده، راه‌حل‌های اختصاصی برای شما طراحی و پیاده‌سازی کند. ما تاکنون پروژه‌های موفقی در این زمینه داشته‌ایم.</p>
		</div>

		<div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<UiFeatureCard v-for="f in features" :key="f.title" :icon="f.icon" :title="f.title" :desc="f.desc" />
		</div>

		<div class="relative w-full overflow-hidden rounded-3xl border border-primary/30 bg-linear-to-b from-cardSurface to-background p-6 text-center lg:p-8">
			<UiDecorCircle side="c" size="lg" color="secondary" class="-left-16 -top-16" />
			<UiDecorCircle side="c" size="lg" color="secondary" class="right-16 top-0" />

			<div class="relative z-10 flex flex-col items-center gap-4">
				<h3 class="text-heading-2 font-shabnamBold text-title">پروژه خاصی در ذهن دارید؟</h3>
				<p class="text-body text-subtitle">با تیم MLGrid تماس بگیرید و از مشاوره رایگان بهره‌مند شوید</p>
				<UiActionButton variant="primary" radius="md" size="md" class="w-full lg:w-[198px]">درخواست مشاوره رایگان</UiActionButton>
			</div>
		</div>
	</section>
</template>
