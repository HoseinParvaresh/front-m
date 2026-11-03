<script setup lang="ts">
import type { Attachment } from "~/utils/playground-types";

const props = defineProps<{ attachment: Attachment; downloadable?: boolean }>();

const zoomed = ref(false);

const canDownload = computed(
  () =>
    props.downloadable &&
    !!props.attachment.src &&
    (props.attachment.type === "image" ||
      (props.attachment.type === "video" && !props.attachment.simulated)),
);

function formatSize(bytes?: number): string {
  if (!bytes) return "";
  return bytes > 1_048_576
    ? `${toPersianDigits((bytes / 1_048_576).toFixed(1))} MB`
    : `${toPersianDigits(Math.max(1, Math.round(bytes / 1024)))} KB`;
}

function onKey(event: KeyboardEvent) {
  if (event.key === "Escape") zoomed.value = false;
}
watch(zoomed, (open) => {
  if (open) document.addEventListener("keydown", onKey);
  else document.removeEventListener("keydown", onKey);
});
onUnmounted(() => document.removeEventListener("keydown", onKey));
</script>

<template>
  <div class="relative max-w-max">
    <template v-if="attachment.type === 'image'">
      <button
        type="button"
        class="group/img relative block overflow-hidden rounded-14"
        aria-label="بزرگ‌نمایی تصویر"
        @click="zoomed = true"
      >
        <img
          :src="attachment.src"
          :alt="attachment.name"
          class="max-h-72 max-w-full cursor-zoom-in object-cover transition duration-300 group-hover/img:scale-105"
        />
      </button>

      <Teleport to="body">
        <Transition name="pg-zoom">
          <div
            v-if="zoomed"
            class="fixed inset-0 z-70 flex-center bg-black/80 p-4 backdrop-blur-sm"
            @click="zoomed = false"
          >
            <img
              :src="attachment.src"
              :alt="attachment.name"
              class="max-h-full max-w-full rounded-2xl object-contain"
            />
            <button
              type="button"
              aria-label="بستن"
              class="absolute end-4 top-4 flex-center size-10 rounded-full bg-white/10 text-title transition hover:bg-white/20"
              @click="zoomed = false"
            >
              <Icon name="mdi:close" size="22" />
            </button>
          </div>
        </Transition>
      </Teleport>
    </template>

    <SectionsModelDetailVideoBubble
      v-else-if="attachment.type === 'video'"
      :attachment="attachment"
    />
    <SectionsModelDetailVoiceBubble
      v-else-if="attachment.type === 'audio'"
      :attachment="attachment"
    />

    <div
      v-else
      class="flex items-center gap-3 rounded-xl border border-borderDivider bg-background/60 px-3 py-2"
    >
      <Icon
        name="mdi:file-document-outline"
        size="24"
        class="shrink-0 text-primary"
      />
      <div class="min-w-0">
        <p class="max-w-[200px] truncate text-body-2 text-title">
          {{ attachment.name }}
        </p>
        <p v-if="attachment.size" class="text-caption-1 text-title/50">
          {{ formatSize(attachment.size) }}
        </p>
      </div>
    </div>

    <a
      v-if="canDownload"
      :href="attachment.src"
      :download="attachment.name"
      aria-label="دانلود"
      class="absolute end-2 top-2 flex-center size-8 rounded-lg bg-black/50 text-title opacity-100 backdrop-blur transition hover:bg-black/70 sm:opacity-0 sm:group-hover:opacity-100"
    >
      <Icon name="mdi:download" size="18" />
    </a>
  </div>
</template>
