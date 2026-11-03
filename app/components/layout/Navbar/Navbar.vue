<script setup lang="ts">
import { NAV_ITEMS } from "~/utils/constants";

const route = useRoute();

const LINE_WIDTH = 70;
const isMenuOpen = ref<boolean>(false);

const navRef = useTemplateRef<HTMLElement>("navRef");
const linkRefs = ref<HTMLElement[]>([]);
const translateX = ref<number>(0);

function getActiveIndex(): number {
  return NAV_ITEMS.findIndex(
    (item) => item.to !== "#" && item.to === route.path,
  );
}

const activeIndex = ref<number>(getActiveIndex());
const isLineVisible = computed(() => activeIndex.value >= 0);

function moveLine(index: number): void {
  if (index < 0) return;
  const el = linkRefs.value[index];
  const nav = navRef.value;
  if (!el || !nav) return;
  const itemRect = el.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  translateX.value =
    itemRect.left - navRect.left + itemRect.width / 2 - LINE_WIDTH / 2;
}

function handleDesktopClick(index: number): void {
  activeIndex.value = index;
  moveLine(index);
}

function handleMobileClick(index: number): void {
  activeIndex.value = index;
  isMenuOpen.value = false;
  nextTick(() => moveLine(index));
}

watch(
  () => route.path,
  () => {
    activeIndex.value = getActiveIndex();
    isMenuOpen.value = false;
    nextTick(() => moveLine(activeIndex.value));
  },
);

watch(isMenuOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? "hidden" : "";
  }
});

onMounted(() => {
  nextTick(() => {
    moveLine(activeIndex.value);
  });
});

onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = "";
});

const lineStyle = computed(() => ({
  transform: `translateX(${translateX.value}px)`,
  width: `${LINE_WIDTH}px`,
}));
</script>

<template>
  <nav ref="navRef" class="relative z-50">
    <!-- Desktop header  -->
    <div class="hidden lg:flex px-16 py-4 items-center justify-between">
      <NuxtLink class="flex gap-2 items-center" to="/">
        <img class="w-12 h-11" src="/logo.webp" alt="MLGrid-Desktop" />
        <p
          class="font-anta text-pureWhite text-[32px] text-stroke text-shadow-2xl"
        >
          MLgrid
        </p>
      </NuxtLink>
      <div class="px-6 py-[13px]">
        <ul class="flex gap-12 text-pureWhite text-body-2 *:cursor-pointer">
          <li
            v-if="isLineVisible"
            :style="lineStyle"
            :class="'absolute top-0 left-0 h-[3px] bg-primary rounded-b-full blur-sm pointer-events-none transition-all duration-300'"
          />
          <li
            v-if="isLineVisible"
            :style="lineStyle"
            :class="'absolute top-0 left-0 h-[1.5px] bg-linear-to-r from-transparent via-green-200 to-transparent pointer-events-none transition-all duration-300'"
          />
          <li
            v-for="(item, i) in NAV_ITEMS"
            :key="i"
            :ref="
              (el) => {
                if (el) linkRefs[i] = el as HTMLElement;
              }
            "
            :class="{ 'text-primary': activeIndex === i }"
            @click="handleDesktopClick(i)"
          >
            <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <UiButtonBrand title="ثبت نام / ورود" :line="true" to="/auth" />
    </div>
    <!-- Mobile header -->
    <div class="lg:hidden flex items-center justify-between px-4 py-4">
      <button
        class="w-8 h-8 bg-card-surface rounded-sm flex-center flex-col gap-1.5 shrink-0"
        :aria-label="isMenuOpen ? 'بستن منو' : 'باز کردن منو'"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <div
          class="hamburger"
          :class="isMenuOpen ? 'rotate-45 translate-y-2' : ''"
        />
        <div
          class="hamburger"
          :class="isMenuOpen ? 'opacity-0 scale-x-0' : ''"
        />
        <div
          class="hamburger"
          :class="isMenuOpen ? '-rotate-45 -translate-y-2' : ''"
        />
      </button>
      <div class="flex gap-2 items-center">
        <NuxtLink to="/auth">
          <img class="w-10 h-9" src="/logo.webp" alt="MLGrid-Mobile" />
        </NuxtLink>
        <p class="font-anta text-pureWhite text-2xl text-stroke">MLgrid</p>
      </div>
      <div class="w-8 h-8 shrink-0" />
    </div>
    <!-- Mobile menu -->
    <LayoutNavbarNavMobileMenu
      v-model="isMenuOpen"
      :active-index="activeIndex"
      @link-click="handleMobileClick"
    />
  </nav>
</template>

<style scoped>
.hamburger {
  width: 24px;
  height: 2px;
  background-color: var(--color-primary);
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms;
  border-radius: 8px;
}
</style>
