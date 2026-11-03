<script setup lang="ts">
const achievements = [
	{ title: "عضو اتحادیه صنف انفورماتیک فارس", desc: "عضویت رسمی در اتحادیه صنف کامپیوتر و انفورماتیک استان فارس" },
	{ title: "توافقنامه همکاری با پردیس نوآوری دیجیتال و هوش مصنوعی ایران", desc: "قرارداد استراتژیک برای همکاری در توسعه اکوسیستم هوش مصنوعی کشور" },
	{ title: "گواهی شرکت خلاق", desc: "دریافت گواهینامه شرکت خلاق از مراجع معتبر ملی" },
	{ title: "استقرار در پارک علم و فناوری فارس", desc: "مستقر در پارک علم و فناوری استان فارس، مرکز نوآوری استان" },
];
</script>

<template>
	<section class="relative flex flex-col items-center gap-8 px-4 py-8 sm:px-8 lg:gap-16 lg:px-32 lg:py-16">
		<UiDecorCircle side="c" size="lg" class="left-100 top-10 blur-[350px]"/>
		<div class="flex flex-col items-center gap-4 text-center lg:gap-6 z-1">
			<UiBadge> دستاوردها</UiBadge>
			<h2 class="text-heading-0 font-shabnamBold text-title">
        دستاوردها و
				<span class="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">مجوزها</span>
			</h2>
			<p class="max-w-[662px] text-body text-subtitle">در مدت کوتاهی، MLGrid به عنوان یک استارتاپ نوآورانه هوش مصنوعی از طریق جوایز، رقابت‌ها و برنامه‌های ملی متعدد شناخته شده است</p>
		</div>
		<div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 z-1">
			<div
				v-for="(item, i) in achievements"
				:key="item.title"
				v-motion
				:initial="{ opacity: 0, y: 30 }"
				:visible-once="{ opacity: 1, y: 0, transition: { delay: (i % 2) * 100, duration: 450 } }"
				class="flex w-full flex-col gap-2.5 rounded-3xl border border-borderDivider bg-cardSurface p-4"
			>
				<p class="w-full text-body-1 font-shabnamBold text-title">{{ item.title }}</p>
				<p class="w-full text-body-2 text-caption">{{ item.desc }}</p>
			</div>
		</div>
		<UiDecorLine direction="c" color="primary" :width="707" />
	</section>
</template>
