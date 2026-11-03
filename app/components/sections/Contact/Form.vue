<script setup lang="ts">
const form = reactive({
	name: "",
	phone: "",
	email: "",
	subject: "",
	message: "",
});

const subjectOptions = [
	{ value: "sales", label: "فروش و همکاری" },
	{ value: "support", label: "پشتیبانی فنی" },
	{ value: "general", label: "سوال عمومی" },
];

function handleSubmit() {
	// api
}
</script>

<template>
	<section id="contact-form" class="flex-center w-full px-4 py-8 sm:px-8 lg:px-32 lg:py-16">
		<div class="flex w-full max-w-4xl flex-col gap-8 lg:gap-12">
			<div class="flex flex-col items-center gap-4 text-center lg:gap-6">
				<UiBadge icon="ci:chat">فرم تماس</UiBadge>
				<h2 class="text-heading-1 font-shabnamBold text-title">
					پیام خود را برای ما
					<span class="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent"> ارسال کنید </span>
				</h2>
				<p class="text-caption text-subtitle max-w-[650px]">اگر ترجیح می‌دهید پیامتان را مستقیماً از طریق وب‌سایت ارسال کنید، لطفاً فرم زیر را تکمیل نمایید. کارشناسان ما در اسرع وقت با شما در تماس خواهند بود.</p>
			</div>

			<form class="flex w-full flex-col gap-6 rounded-3xl border border-borderDivider bg-cardSurface p-6 shadow-[0_0_20px_rgba(22,242,157,0.1)] lg:p-12" @submit.prevent="handleSubmit">
				<div class="flex flex-col gap-3">
					<UiLabel required icon="lucide:user"> نام و نام خانوادگی </UiLabel>
					<UiInput v-model="form.name" placeholder="نام کامل خود را وارد کنید" required />
				</div>

				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div class="flex flex-col gap-3">
						<UiLabel required icon="lucide:phone"> شماره تماس </UiLabel>
						<UiInput v-model="form.phone" type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" required />
					</div>

					<div class="flex flex-col gap-3">
						<UiLabel optional icon="fe:mail"> ایمیل </UiLabel>
						<UiInput v-model="form.email" type="email" placeholder="example@email.com" />
					</div>
				</div>

				<div class="flex flex-col gap-3">
          <UiLabel required icon="ci:chat"> موضوع</UiLabel>
					<UiSelect v-model="form.subject" :options="subjectOptions" placeholder="موضوع پیام را انتخاب کنید" />
				</div>

				<div class="flex flex-col gap-3">
          <UiLabel required icon="ci:chat"> متن پیام</UiLabel>
					<UiTextarea v-model="form.message" placeholder="پیام خود را اینجا بنویسید..." :rows="6" />
				</div>
				<UiActionButton class="text-lg!" type="submit" variant="primary" radius="md" size="md" icon="lucide:send" full-width> ارسال پیام </UiActionButton>

				<p class="text-center text-body-2 text-caption">
					با ارسال این فرم، شما با
					<NuxtLink to="/privacy" class="text-primary">سیاست حفظ حریم خصوصی</NuxtLink>
					ما موافقت می‌کنید.
				</p>
			</form>
		</div>
	</section>
</template>
