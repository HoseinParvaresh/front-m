<script setup lang="ts">
import { parseMarkdown } from "~/utils/chat-markdown";

const props = defineProps<{ text: string; streaming?: boolean }>();

const blocks = computed(() => parseMarkdown(props.text));
const lastIndex = computed(() => blocks.value.length - 1);

const copiedIndex = ref<number | null>(null);
async function copyCode(code: string, index: number) {
  await navigator.clipboard.writeText(code);
  copiedIndex.value = index;
  setTimeout(() => {
    if (copiedIndex.value === index) copiedIndex.value = null;
  }, 1500);
}
</script>

<template>
  <div class="flex flex-col gap-3 text-body-1 leading-8 text-title">
    <template v-for="(block, i) in blocks" :key="i">
      <p v-if="block.type === 'paragraph'" class="whitespace-pre-line">
        <template v-for="(token, j) in block.tokens" :key="j">
          <strong
            v-if="token.type === 'bold'"
            class="font-shabnamBold text-primary"
            >{{ token.text }}</strong
          >
          <code
            v-else-if="token.type === 'code'"
            dir="ltr"
            class="rounded-md bg-background px-1.5 py-0.5 font-mono text-body-2 text-secondary"
            >{{ token.text }}</code
          >
          <template v-else>{{ token.text }}</template>
        </template>
        <span v-if="streaming && i === lastIndex" class="pg-caret" />
      </p>

      <component
        :is="block.ordered ? 'ol' : 'ul'"
        v-else-if="block.type === 'list'"
        class="flex flex-col gap-1.5 ps-6 marker:text-primary"
        :class="block.ordered ? 'list-decimal' : 'list-disc'"
      >
        <li v-for="(item, k) in block.items" :key="k">
          <template v-for="(token, j) in item" :key="j">
            <strong
              v-if="token.type === 'bold'"
              class="font-shabnamBold text-primary"
              >{{ token.text }}</strong
            >
            <code
              v-else-if="token.type === 'code'"
              dir="ltr"
              class="rounded-md bg-background px-1.5 py-0.5 font-mono text-body-2 text-secondary"
              >{{ token.text }}</code
            >
            <template v-else>{{ token.text }}</template>
          </template>
          <span
            v-if="streaming && i === lastIndex && k === block.items.length - 1"
            class="pg-caret"
          />
        </li>
      </component>

      <!-- block code -->
      <div
        v-else
        dir="ltr"
        class="overflow-hidden rounded-xl border border-borderDivider bg-background"
      >
        <div
          class="flex items-center justify-between border-b border-borderDivider px-4 py-2 text-caption-1 text-title/50"
        >
          <span>{{ block.lang }}</span>
          <button
            type="button"
            class="flex items-center gap-1.5 transition hover:text-primary"
            @click="copyCode(block.code, i)"
          >
            <Icon
              :name="copiedIndex === i ? 'mdi:check' : 'mdi:content-copy'"
              size="14"
            />
            {{ copiedIndex === i ? "Copied" : "Copy" }}
          </button>
        </div>
        <pre
          class="overflow-x-auto p-4 font-mono text-body-2 leading-7 text-title/90">{{ block.code }}<span v-if="streaming && i === lastIndex" class="pg-caret" /></pre>
      </div>
    </template>

    <span v-if="streaming && blocks.length === 0" class="pg-caret" />
  </div>
</template>
