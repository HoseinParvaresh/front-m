<template>
	<section class="w-full flex items-center flex-col px-4 py-16 sm:p-16 h-[747px] relative">
		<!-- lines background -->
		<UiFlowingLines />
		<!-- circles -->
		<div class="pointer-events-none">
			<UiDecorCircle side="c" size="lg" class="top-[250px] translate-x-1/2 blur-[260px]"/>
			<UiDecorCircle side="l" size="lg" class="top-5"/>
			<UiDecorCircle side="l" size="sm" class="top-150"/>
			<UiDecorCircle side="r" size="lg" class="top-5"/>
		</div>
		<!-- banner -->
		<div class="relative">
			<img class="animate-float size-100 object-cover" src="/banner.webp" alt="MLGrid" />
			<!-- shadow under banner -->
			<div class="w-[303px] bg-linear-to-t from-background to-transparent h-[150px] absolute bottom-5 rounded-b-[64px] left-[50px] hidden lg:block"></div>
			<div class="w-[303px] bg-linear-to-t from-background to-transparent h-[150px] absolute bottom-5 rounded-b-[64px] left-[50px] hidden lg:block"></div>
		</div>
		<!-- title / subTitle / description / buttons -->
		<div class="flex items-center flex-col gap-4 absolute top-[220px] z-2">
			<div class="flex-center flex-col gap-6">
				<h1 class="font-anta text-[96px] text-shadow-2xl text-pureWhite text-stroke select-none z-2">MLgrid</h1>
				<p class="text-heading-3 font-shabnamBold text-title px-4 3xs:p-0">ایده‌های هوشمندتان را به واقعیت تبدیل کنید !</p>
			</div>
			<p class="text-center text-body py-2.5 px-4 max-w-[920px] text-subtitle">
				<span class="block sm:inline">MLGrid پلتفرمی نوآورانه است که مدل‌های پیچیده هوش مصنوعی را به سرویس‌های ابری ساده و قابل استفاده تبدیل می‌کند </span>
				<span>بدون نیاز به دانش عمیق کدنویسی یا زیرساخت‌های گران‌قیمت، قدرت AI را به کسب‌وکار و پروژه‌های خود بیاورید</span>
			</p>
			<div class="flex flex-wrap justify-center gap-5">
				<UiButtonBrand title="➔ همین حالا شروع کن" :line="true" to="/" class="w-full 3xs:w-[170px]" />
				<UiButtonBrand variant="secondary" to="/models" title="بازارچه مدل‌ها" class="w-full 3xs:w-[170px]" />
			</div>
		</div>
	</section>
</template>

<style scoped>
@keyframes float {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-20px);
	}
}

.animate-float {
	animation: float 3s ease-in-out infinite;
}
</style>
