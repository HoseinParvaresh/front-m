<script setup lang="ts">
type AuthTab = "signup" | "login";

const activeTab = ref<AuthTab>("login");

const form = reactive({
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
});

function handleSubmit() {}
</script>

<template>
	<div class="relative z-10 flex w-full max-w-[422px] flex-col gap-5 rounded-[40px] border border-borderDivider bg-cardSurface p-6">
    <!-- top button -->
		<div class="relative flex h-12 w-full rounded-3xl bg-background p-1">
			<div class="absolute inset-y-1 w-[calc(50%-4px)] rounded-3xl bg-primary/16 transition-[inset-inline-start] duration-300 ease-out" :class="activeTab === 'login' ? 'start-1' : 'start-[calc(50%+2px)]'" />
			<button type="button" class="relative z-10 flex-1 text-subtitle transition-colors duration-200" :class="activeTab === 'login' ? 'text-primary' : 'text-caption'" @click="activeTab = 'login'">ورود</button>
			<button type="button" class="relative z-10 flex-1 text-subtitle transition-colors duration-200" :class="activeTab === 'signup' ? 'text-primary' : 'text-caption'" @click="activeTab = 'signup'">ثبت نام</button>
		</div>
    <!-- form -->
		<form class="flex w-full flex-col gap-4" @submit.prevent="handleSubmit">
			<Transition name="collapse">
				<div v-if="activeTab === 'signup'" class="grid grid-rows-[1fr]">
					<div class="overflow-hidden">
						<UiInput v-model="form.name" icon="mdi:account-outline" placeholder="نام و نام خانوادگی" />
					</div>
				</div>
			</Transition>

			<UiInput v-model="form.email" type="email" icon="mdi:email-outline" placeholder="ایمیل" />
			<UiInput v-model="form.password" type="password" icon="mdi:lock-outline" placeholder="کلمه عبور" />

			<Transition name="collapse">
				<div v-if="activeTab === 'signup'" class="grid grid-rows-[1fr]">
					<div class="overflow-hidden">
						<UiInput v-model="form.confirmPassword" type="password" icon="mdi:lock-outline" placeholder="تکرار کلمه عبور" />
					</div>
				</div>
			</Transition>

			<NuxtLink v-if="activeTab === 'login'" to="#" class="w-full text-right text-body-2 text-secondary"> کلمه عبور خود را فراموش کرده‌ام! </NuxtLink>

			<UiActionButton variant="primary" size="sm" radius="lg" >{{ activeTab === "login" ? "ورود" : "ثبت نام" }}</UiActionButton>
		</form>
    <!-- line -->
		<UiDecorLine direction="c" :width="374" color="secondary"/>
    <!-- google button -->
		<button type="button" class="flex-center h-12 w-full gap-4 rounded-4xl bg-white px-[69px] py-3 transition-opacity hover:opacity-90">
			<span class="text-body-1 text-[#1e2421]">ادامه با گوگل</span>
			<Icon name="logos:google-icon" class="size-6" />
		</button>
	</div>
</template>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
	transition: grid-template-rows 300ms ease;
}
.collapse-enter-from,
.collapse-leave-to {
	grid-template-rows: 0fr;
}
.collapse-enter-to,
.collapse-leave-from {
	grid-template-rows: 1fr;
}
</style>
