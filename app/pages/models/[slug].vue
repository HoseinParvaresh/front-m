<script setup lang="ts">
import { SampleModel } from "~/utils/model-detail-data";
import type { ModelTab } from "~/utils/model-detail-data";

const route = useRoute();
const router = useRouter();

const model = SampleModel;

const TAB_ORDER: ModelTab[] = ["about", "playground", "api"];
const queryTab = route.query.tab as ModelTab | undefined;
const activeTab = ref<ModelTab>(
  queryTab && TAB_ORDER.includes(queryTab) ? queryTab : "about",
);

const direction = ref(1);

watch(activeTab, (next, prev) => {
  direction.value = TAB_ORDER.indexOf(next) > TAB_ORDER.indexOf(prev) ? 1 : -1;
  router.replace({ query: { ...route.query, tab: next } });
});

useSeoMeta({
  title: model.title,
  description: model.desc,
});
</script>

<template>
  <div>
    <SectionsModelDetailHeader :model="model" />
    <SectionsModelDetailTabs v-model="activeTab" />

    <div
      class="tab-stage min-h-[560px] overflow-x-clip"
      :style="{ '--tab-dir': direction }"
    >
      <Transition name="tab" mode="out-in">
        <SectionsModelDetailAboutTab
          v-if="activeTab === 'about'"
          key="about"
          :model="model"
        />
        <SectionsModelDetailPlaygroundTab
          v-else-if="activeTab === 'playground'"
          key="playground"
          :model="model"
        />
        <SectionsModelDetailApiTab v-else key="api" :model="model" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.tab-enter-active,
.tab-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.tab-enter-from {
  opacity: 0;
  transform: translateX(calc(var(--tab-dir, 1) * -28px));
}
.tab-leave-to {
  opacity: 0;
  transform: translateX(calc(var(--tab-dir, 1) * 28px));
}

@media (prefers-reduced-motion: reduce) {
  .tab-enter-active,
  .tab-leave-active {
    transition: opacity 0.01s;
  }
  .tab-enter-from,
  .tab-leave-to {
    transform: none;
  }
}
</style>
