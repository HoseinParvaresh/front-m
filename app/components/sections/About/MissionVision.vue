<script setup lang="ts">
const values = [
	{ icon: "ic:sharp-rocket", title: "نوآوری", desc: "همیشه در جستجوی راه‌حل‌های خلاقانه و پیشرفته" },
	{ icon: "teenyicons:box-solid", title: "سادگی", desc: "تبدیل پیچیدگی هوش مصنوعی به تجربه‌های شهودی" },
	{ icon: "mdi:shield-check", title: "اعتماد و شفافیت", desc: "ایجاد روابط بلندمدت از طریق عملکرد اخلاقی و شفاف" },
	{ icon: "tabler:flag-filled", title: "بومی‌سازی", desc: "ارائه راه‌حل‌هایی متناسب با فرهنگ و نیازهای بازار محلی" },
	{ icon: "ic:baseline-handshake", title: "همکاری", desc: "رشد مشترک با جامعه و شرکای خود" },
];
</script>

<template>
	<section class="relative flex flex-col items-center gap-8 px-4 py-8 sm:px-8 lg:gap-16 lg:px-32 lg:py-16">
		<div class="flex w-full flex-col items-center gap-6 lg:gap-8">
			<!-- top -->
			<div class="flex flex-col items-center gap-4 text-center lg:gap-6">
				<UiBadge>چشم‌انداز ما </UiBadge>
				<h2 class="text-heading-0 font-shabnamBold leading-tight text-title lg:leading-[60px]">
					آینده‌ای هوشمندتر
					<span class="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent block xs:inline">برای همه</span>
				</h2>
			</div>
			<!-- center -->
			<div class="flex w-full flex-col items-stretch gap-4 lg:flex-row lg:gap-8">
				<div class="flex flex-1 flex-col items-center gap-4 rounded-2xl border border-borderDivider bg-cardSurface p-4">
					<div class="flex-center w-full gap-4">
						<div class="flex-center size-12 rounded-14 bg-linear-to-br from-primary/20 to-secondary/10">
							<Icon name="boxicons:bullseye" size="24" class="text-primary" />
						</div>
						<p class="text-body-2 font-shabnamBold text-title">چشم‌انداز</p>
					</div>
					<UiDecorLine direction="c" color="primary" :width="544" />
					<p class="text-center text-body-2 text-caption">تبدیل شدن به پلتفرم پیشرو و مورد اعتماد هوش مصنوعی در منطقه، که با ساده‌سازی دسترسی و کاربرد هوش مصنوعی، نوآوری را در تمامی صنایع دموکراتیزه می‌کند.</p>
				</div>

				<div class="flex flex-1 flex-col items-center gap-4 rounded-2xl border border-borderDivider bg-cardSurface p-4">
					<div class="flex-center w-full gap-4">
						<div class="flex-center size-12 rounded-14 bg-linear-to-br from-primary/20 to-secondary/10">
							<Icon name="boxicons:mountain-peak-filled" size="24" class="text-primary" />
						</div>
						<p class="text-body-2 font-shabnamBold text-title">مأموریت</p>
					</div>
					<UiDecorLine direction="c" color="primary" :width="544" />
					<p class="text-center text-body-2 text-caption">ما متعهدیم با ارائه پلتفرمی مقیاس‌پذیر، امن و بومی برای تبدیل و استفاده از مدل‌های هوش مصنوعی، ابزارهای لازم را برای توسعه‌دهندگان، پژوهشگران و کسب‌وکارها فراهم کنیم تا ایده‌های هوشمند خود را به سرعت و با کمترین دغدغه به واقعیت تبدیل کنند.</p>
				</div>
			</div>
			<p class="text-center text-body text-subtitle">اصول اساسی که هر تصمیم و هر محصول ما را شکل می‌دهند.</p>
			<!-- button -->
			<div class="grid w-full grid-cols-2 sm:grid-cols-3 lg:flex lg:items-stretch gap-6">
				<div v-for="value in values" :key="value.title" class="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-borderDivider bg-cardSurface p-4 text-center lg:gap-4">
					<div class="flex-center size-12 rounded-14 bg-linear-to-br from-primary/20 to-secondary/10">
						<Icon :name="value.icon" size="24" class="text-primary" />
					</div>
					<p class="font-shabnamBold text-title text-body-1">{{ value.title }}</p>
					<p class="text-caption text-body-2">{{ value.desc }}</p>
				</div>
			</div>
		</div>
		<UiDecorLine direction="c" color="primary" :width="707" />
	</section>
</template>
