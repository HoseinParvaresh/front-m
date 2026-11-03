<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper/types";
import { Navigation } from "swiper/modules";


const modules = [Navigation];
const swiper = ref<SwiperType | null>(null);
const isBeginning = ref(true);
const isEnd = ref(false);

const breakpoints = {
	768: { slidesPerView: 2 },
	1280: { slidesPerView: 3 },
};

const updateNavigation = (instance: SwiperType) => {
	isBeginning.value = instance.isBeginning;
	isEnd.value = instance.isEnd;
};

const onSwiper = (instance: SwiperType) => {
	swiper.value = instance;
	updateNavigation(instance);
};

const onSlideChange = (instance: SwiperType) => {
	updateNavigation(instance);
};

interface GalleryPhoto {
	title: string;
	desc: string;
	date: string;
	image: string;
}

const photos: GalleryPhoto[] = [
	{
		title: "جلسه بررسی مدل جدید MLGrid",
		desc: "در این رویداد، نسخه جدید پلتفرم MLGrid با قابلیت‌های پیشرفته در حوزه مدل‌های زبانی، پردازش داده و ابزارهای هوش مصنوعی بومی معرفی شد. این به‌روزرسانی با هدف دسترس‌پذیرتر کردن فناوری‌های هوش مصنوعی برای کسب‌وکارها و توسعه‌دهندگان ایرانی ارائه شده است.",
		date: "۲۵ اردیبهشت ۱۴۰۵",
		image: "",
	},
	{
		title: "جلسه بررسی مدل جدید MLGrid",
		desc: "در این رویداد، نسخه جدید پلتفرم MLGrid با قابلیت‌های پیشرفته در حوزه مدل‌های زبانی، پردازش داده و ابزارهای هوش مصنوعی بومی معرفی شد. این به‌روزرسانی با هدف دسترس‌پذیرتر کردن فناوری‌های هوش مصنوعی برای کسب‌وکارها و توسعه‌دهندگان ایرانی ارائه شده است.",
		date: "۲۵ اردیبهشت ۱۴۰۵",
		image: "",
	},
	{
		title: "جلسه بررسی مدل جدید MLGrid",
		desc: "در این رویداد، نسخه جدید پلتفرم MLGrid با قابلیت‌های پیشرفته در حوزه مدل‌های زبانی، پردازش داده و ابزارهای هوش مصنوعی بومی معرفی شد. این به‌روزرسانی با هدف دسترس‌پذیرتر کردن فناوری‌های هوش مصنوعی برای کسب‌وکارها و توسعه‌دهندگان ایرانی ارائه شده است.",
		date: "۲۵ اردیبهشت ۱۴۰۵",
		image: "",
	},
	{
		title: "جلسه بررسی مدل جدید MLGrid",
		desc: "در این رویداد، نسخه جدید پلتفرم MLGrid با قابلیت‌های پیشرفته در حوزه مدل‌های زبانی، پردازش داده و ابزارهای هوش مصنوعی بومی معرفی شد. این به‌روزرسانی با هدف دسترس‌پذیرتر کردن فناوری‌های هوش مصنوعی برای کسب‌وکارها و توسعه‌دهندگان ایرانی ارائه شده است.",
		date: "۲۵ اردیبهشت ۱۴۰۵",
		image: "",
	},
	{
		title: "جلسه بررسی مدل جدید MLGrid",
		desc: "در این رویداد، نسخه جدید پلتفرم MLGrid با قابلیت‌های پیشرفته در حوزه مدل‌های زبانی، پردازش داده و ابزارهای هوش مصنوعی بومی معرفی شد. این به‌روزرسانی با هدف دسترس‌پذیرتر کردن فناوری‌های هوش مصنوعی برای کسب‌وکارها و توسعه‌دهندگان ایرانی ارائه شده است.",
		date: "۲۵ اردیبهشت ۱۴۰۵",
		image: "",
	},
];

const activeIndex = ref<number | null>(null);

const activePhoto = computed<GalleryPhoto | null>(() => {
  if (activeIndex.value === null) return null
  return photos[activeIndex.value] ?? null
})
</script>

<template>
	<section class="relative flex flex-col items-center gap-8 px-4 py-8 sm:px-8 lg:gap-16 lg:px-32 lg:py-16">
		<UiDecorCircle side="c" size="lg" class="top-70 blur-[350px]" />
		<div class="z-1 flex flex-col items-center gap-4 text-center lg:gap-6">
			<h2 class="text-heading-0 font-shabnamBold text-title">
				نگاهی به دنیای
				<span class="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">MLGrid</span>
			</h2>
			<p class="max-w-[662px] text-body text-subtitle">لحظاتی که با عشق ثبت شده‌اند؛ مجموعه‌ای از برترین پروژه‌ها و خاطرات ما</p>
		</div>

		<div class="z-1 relative flex w-full gap-4 pb-2 mt-10 sm:mt-0 lg:pb-0">
			<!-- next -->
			<button type="button" aria-label=" بعدی" v-show="!isEnd" @click="swiper?.slideNext()" class="absolute z-2 cursor-pointer transition-all duration-300 hover:drop-shadow-xs left-0 -top-14 sm:top-[calc(50%-30px)]">
				<Icon name="ei:arrow-left" class="text-title size-[50px]! sm:size-[60px]!" />
			</button>
			<!-- prev -->
			<button type="button" aria-label=" قبلی" v-show="!isBeginning" @click="swiper?.slidePrev()" class="absolute z-2 cursor-pointer transition-all duration-300 hover:drop-shadow-xs -top-14 left-14 sm:right-0 sm:left-auto sm:top-[calc(50%-30px)]">
				<Icon name="ei:arrow-right" class="text-title size-[50px]! sm:size-[60px]!" />
			</button>

			<Swiper dir="rtl" @swiper="onSwiper" @slideChange="onSlideChange" :modules="modules" :slides-per-view="1" :space-between="22" :breakpoints="breakpoints">
				<SwiperSlide v-for="(photo, i) in photos" :key="i">
					<button type="button" class="h-56 w-full relative rounded-lg bg-cardSurface lg:h-[405px]" @click="activeIndex = i">
						<img v-if="photo.image" :src="photo.image" :alt="photo.title" class="size-full object-cover" />
						<Icon v-else name="streamline-ultimate-color:picture-double-landscape" size="66" />
						<p class="absolute bottom-6 right-6 font-shabnamBold text-title text-heading-3">
							{{ photo.title }}
						</p>
					</button>
				</SwiperSlide>
			</Swiper>
		</div>

		<UiDecorLine direction="c" color="primary" :width="707" />
	</section>
	<SectionsAboutGalleryModal v-if="activePhoto"
    :open="true"
    :image="activePhoto.image"
    :title="activePhoto.title"
    :desc="activePhoto.desc"
    :date="activePhoto.date"
    @close="activeIndex = null" />
</template>
