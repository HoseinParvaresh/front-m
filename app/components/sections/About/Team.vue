<script setup lang="ts">
const team = [
	{ name: "رضا کریمی", role: "بنیان‌گذار و مدیرعامل", desc: "طراح تجربه کاربری با تمرکز بر محصولات هوش مصنوعی. علاقه‌مند به سادگی و کاربردپذیری." },
	{ name: "سارا احمدی", role: "مدیر ارشد فناوری", desc: "متخصص در معماری سیستم‌های توزیع‌شده و زیرساخت‌های ابری. سابقه کار در شرکت‌های بین‌المللی." },
	{ name: "علی محمدی", role: "بنیان‌گذار و مدیرعامل", desc: "بیش از ۱۰ سال تجربه در توسعه هوش مصنوعی و استارتاپ‌های فناوری. دانش‌آموخته مهندسی کامپیوتر" },
	{ name: "فاطمه رضایی", role: "مدیر توسعه کسب‌وکار", desc: "متخصص در مشارکت‌های استراتژیک و توسعه بازار B2B با تمرکز بر اکوسیستم فناوری." },
	{ name: "محمد تهرانی", role: "متخصص زیرساخت", desc: "کارشناس DevOps و Kubernetes با تجربه مدیریت سیستم‌های در مقیاس بزرگ." },
	{ name: "نازنین حسینی", role: "مهندس پژوهش هوش مصنوعی", desc: "دکترای یادگیری ماشین با تخصص در مدل‌های زبانی بزرگ و پردازش زبان طبیعی فارسی." },
];
</script>

<template>
	<section class="relative flex flex-col items-center gap-8 px-4 py-8 sm:px-8 lg:gap-16 lg:px-32 lg:py-16">
		<UiDecorCircle side="c" size="lg" class="left-80 xs:left-100 top-70 xs:top-0 blur-[350px]" />
		<div class="flex flex-col items-center gap-8 z-1">
			<div class="flex flex-col items-center text-center gap-6">
				<UiBadge> تیم ما</UiBadge>
				<h2 class="text-heading-0 font-shabnamBold text-title">
					متخصصان
					<span class="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">MLGrid</span>
				</h2>
				<p class="max-w-[1046px] text-body text-subtitle">موفقیت ما حاصل تلاش تیمی از متخصصین با تجربه و خلاق در حوزه‌های هوش مصنوعی، توسعه نرم‌افزار، زیرساخت ابری و کسب‌وکار است. ما با اشتیاق و دانش عمیق خود، هر روز در تلاشیم تا بهترین تجربه را برای شما فراهم آوریم و همواره در مسیر توسعه و بهبود گام برداریم.</p>
			</div>
			<div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 items-stretch justify-center gap-6">
				<SectionsAboutTeamCard
				v-for="(member, i) in team"
				:key="member.name"
				v-motion
				:initial="{ opacity: 0, y: 30 }"
				:visible-once="{ opacity: 1, y: 0, transition: { delay: (i % 3) * 100, duration: 450 } }"
				:name="member.name"
				:role="member.role"
				:desc="member.desc"
				/>
			</div>
		</div>
		<!-- line -->
		<UiDecorLine direction="c" color="primary" :width="707" />
	</section>
</template>
