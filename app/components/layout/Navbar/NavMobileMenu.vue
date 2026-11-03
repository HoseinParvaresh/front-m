<script setup lang="ts">
import { NAV_ITEMS } from "~/utils/constants";

const mounted = ref(false);

defineProps<{
	modelValue: boolean;
	activeIndex: number;
}>();

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
	"link-click": [index: number];
}>();

onMounted(() => {
	mounted.value = true;
});

function close(): void {
	emit("update:modelValue", false);
}

function handleLinkClick(index: number): void {
	emit("link-click", index);
}
</script>

<template>
	<Teleport v-if="mounted" to="body">
		<Transition name="nav-backdrop">
			<div v-if="modelValue" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" @click="close" />
		</Transition>
	</Teleport>

	<Transition name="nav-menu">
		<div v-if="mounted && modelValue" class="absolute top-full left-0 right-0 z-50 overflow-hidden border-t border-white/5">
			<div class="bg-card-surface shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
				<ul class="px-5 py-2">
					<li v-for="(item, i) in NAV_ITEMS" :key="i" class="nav-mobile-item border-b border-white/5 last:border-none" :style="{ animationDelay: `${i * 45}ms` }" @click="handleLinkClick(i)">
						<NuxtLink :to="item.to" class="flex items-center justify-between py-3.5 text-pureWhite text-body-2 transition-colors duration-200 hover:text-primary" :class="activeIndex === i ? 'text-primary' : ''">
							<span>{{ item.label }}</span>
							<span v-if="activeIndex === i" class="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
						</NuxtLink>
					</li>
				</ul>

				<div class="px-5 py-4 border-t border-white/5">
					<UiButtonBrand title="ثبت نام / ورود" :line="true" to="/auth" class="w-full" />
				</div>
			</div>
		</div>
	</Transition>
</template>
