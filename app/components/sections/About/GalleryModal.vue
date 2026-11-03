<script setup lang="ts">
interface Props {
	open: boolean;
	image: string;
	title: string;
	desc: string;
	date?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ close: [] }>();

const { lock, unlock } = useScrollLock();

watch(
	() => props.open,
	(val) => {
		val ? lock() : unlock();
	},
);

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Escape" && props.open) emit("close");
}

onMounted(() => document.addEventListener("keydown", handleKeydown));
onUnmounted(() => document.removeEventListener("keydown", handleKeydown));
</script>

<template>
	<Teleport to="body">
		<Transition name="modal-backdrop">
			<div v-if="open" class="fixed inset-0 z-50 bg-black/60" @click="emit('close')" />
		</Transition>

		<Transition name="modal-panel">
			<div v-if="open" class="fixed inset-0 z-50 flex-center top-10 p-4" role="dialog" aria-modal="true" :aria-label="title">
				<div class="relative flex-center gap-4 w-full max-w-[1124px] flex-col rounded-2xl overflow-hidden bg-cardSurface lg:flex-row lg:gap-6 lg:pl-6" @click.stop>
          <!-- image -->
					<div class="relative w-full shrink-0 h-56 3xs:h-[405px] lg:w-[400px] flex-center bg-borderDivider">
            <img v-if="image" :src="image" :alt="title" class="size-full object-cover" />
						<Icon v-else name="streamline-ultimate-color:picture-double-landscape" size="66" />
					</div>
          <!-- title -->
					<div class="flex flex-1 flex-col gap-4 pb-8 pt-4 px-4 font-shabnam lg:gap-8 sm:py-6">
						<h3 class="text-heading-3 font-shabnamBold text-title">{{ title }}</h3>
						<p class="text-body text-subtitle">{{ desc }}</p>
						<p v-if="date" class="text-caption text-subtitle">{{ date }}</p>
					</div>
          <!-- close -->
          <button type="button" aria-label="بستن" class="absolute cursor-pointer top-6 left-6 flex-center rounded-full" @click="emit('close')">
							<Icon name="mdi:close" size="28" class="text-caption" />
					</button>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
	transition: opacity 0.25s ease;
}
.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
	opacity: 0;
}

.modal-panel-enter-active {
	transition:
		opacity 0.3s ease,
		transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-panel-leave-active {
	transition:
		opacity 0.2s ease,
		transform 0.25s ease;
}
.modal-panel-enter-from,
.modal-panel-leave-to {
	opacity: 0;
	transform: scale(0.95) translateY(10px);
}
</style>
