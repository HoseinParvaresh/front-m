<script setup lang="ts">
import type { ModelDetail } from "~/utils/model-detail-data";
import type { CodeLine } from "~/composables/useTypewriter";

const props = defineProps<{ model: ModelDetail }>();

type Lang = "python" | "nodejs" | "http";

const API_TOKEN = "sk-mlgrid-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const MASKED_TOKEN = "sk-mlgrid-••••••••••••••••••••••••";

const langs: { id: Lang; label: string }[] = [
  { id: "python", label: "Python" },
  { id: "nodejs", label: "NodeJS" },
  { id: "http", label: "HTTP" },
];
const lang = ref<Lang>("python");
const langIndex = computed(() => langs.findIndex((l) => l.id === lang.value));

const samples = computed<Record<Lang, string>>(() => ({
  python: `import requests

response = requests.post(
    "https://api.mlgrid.com/v1/models/${props.model.apiSlug}/run",
    headers={"Authorization": "Bearer YOUR_API_TOKEN"},
    json={"prompt": "..."},
)
print(response.json())`,
  nodejs: `const res = await fetch("https://api.mlgrid.com/v1/models/${props.model.apiSlug}/run", {
  method: "POST",
  headers: { Authorization: "Bearer YOUR_API_TOKEN" },
  body: JSON.stringify({ prompt: "..." }),
})
console.log(await res.json())`,
  http: `POST https://api.mlgrid.com/v1/models/${props.model.apiSlug}/run
Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json

{ "prompt": "..." }`,
}));

const TOKEN_RE =
  /("[^"]*"|'[^']*'|`[^`]*`)|(#.*|\/\/.*)|\b(import|from|const|let|await|async|def|return|print)\b|\b(POST|GET|Authorization|Bearer)\b/g;

function highlight(line: string): CodeLine {
  const segments: CodeLine = [];
  let last = 0;
  for (const match of line.matchAll(TOKEN_RE)) {
    const index = match.index ?? 0;
    if (index > last)
      segments.push({ text: line.slice(last, index), color: "#9ca3af" });
    const color = match[1] ? "#ffd866" : match[3] ? "#ff6b9d" : "#16f29d";
    segments.push({ text: match[0], color });
    last = index + match[0].length;
  }
  if (last < line.length)
    segments.push({ text: line.slice(last), color: "#9ca3af" });
  return segments;
}

const codeLines = reactive<CodeLine[]>([]);
const { visibleLineCount, visibleChars, isDone, start, stop, sliceLine } =
  useTypewriter(codeLines, 10);
const generating = ref(false);

async function generate() {
  if (generating.value) return;
  generating.value = true;
  stop();
  codeLines.splice(0, codeLines.length);
  await new Promise((resolve) => setTimeout(resolve, 650));
  codeLines.push(...samples.value[lang.value].split("\n").map(highlight));
  generating.value = false;
  start();
}

watch(lang, () => {
  if (codeLines.length > 0) generate();
});

const codeCopied = ref(false);
async function copyCode() {
  await navigator.clipboard.writeText(samples.value[lang.value]);
  codeCopied.value = true;
  setTimeout(() => (codeCopied.value = false), 1600);
}

const hidden = { opacity: 0, y: 24 };
const reveal = (delay = 0) => ({
  opacity: 1,
  y: 0,
  transition: { delay, duration: 450 },
});
const badge =
  "flex-center size-6 shrink-0 rounded-lg border border-secondary bg-secondary/[0.08] text-body-2 text-primary";
</script>

<template>
  <div class="flex flex-col gap-4 p-4 lg:px-32 lg:py-8">
    <div class="flex flex-col gap-4">
      <h2
        v-motion
        :initial="hidden"
        :visible-once="reveal()"
        class="font-shabnamBold text-heading-1 text-title"
      >
        اتصال به پروژه
      </h2>
      <p
        v-motion
        :initial="hidden"
        :visible-once="reveal(80)"
        class="text-body text-subtitle"
      >
        کد اتصال به API را بسازید و مستقیماً در پروژه خود استفاده کنید.
      </p>
    </div>

    <div
      v-motion
      :initial="hidden"
      :visible-once="reveal(100)"
      class="flex flex-col gap-4 rounded-2xl border border-borderDivider bg-cardSurface p-4"
    >
      <div class="flex items-center gap-3">
        <span :class="badge">۱</span>
        <p class="font-shabnamBold text-body-1 text-title">
          مرحله ۱: اطلاعات دسترسی
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SectionsModelDetailCopyField
          label="شناسه مدل (Slug)"
          :value="model.apiSlug"
        />
        <SectionsModelDetailCopyField
          class="order-first sm:order-0"
          label="توکن API شما"
          :value="API_TOKEN"
          :display="MASKED_TOKEN"
        />
      </div>
    </div>

    <div
      v-motion
      :initial="hidden"
      :visible-once="reveal(200)"
      class="flex flex-col gap-4 rounded-2xl border border-borderDivider bg-cardSurface p-4"
    >
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-center gap-3">
          <span :class="badge">۲</span>
          <p class="font-shabnamBold text-body-1 text-title">
            مرحله ۲: انتخاب زبان برنامه‌نویسی
          </p>
        </div>

        <div
          role="tablist"
          class="relative grid grid-cols-3 rounded-lg bg-background p-1 sm:w-[270px]"
        >
          <span
            class="absolute inset-y-1 w-[calc((100%-0.5rem)/3)] rounded-lg border border-secondary bg-[#0c3124] transition-[inset-inline-start] duration-300 ease-out"
            :style="{
              insetInlineStart: `calc(0.25rem + ${langIndex} * (100% - 0.5rem) / 3)`,
            }"
          />
          <button
            v-for="item in langs"
            :key="item.id"
            type="button"
            role="tab"
            :aria-selected="lang === item.id"
            class="relative z-10 py-2 text-body-2 transition-colors duration-300"
            :class="
              lang === item.id
                ? 'text-secondary'
                : 'text-title/60 hover:text-title'
            "
            @click="lang = item.id"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <div
        class="relative min-h-60 overflow-x-auto rounded-lg bg-[#0d1510] p-4 lg:min-h-80"
        dir="ltr"
      >
        <Transition name="pg-swap" mode="out-in">
          <div
            v-if="generating"
            key="gen"
            class="flex flex-col gap-3 pt-2"
            aria-label="در حال ساخت کد"
          >
            <span
              v-for="(width, i) in [
                'w-3/4',
                'w-1/2',
                'w-5/6',
                'w-2/3',
                'w-1/3',
              ]"
              :key="i"
              class="pg-shimmer h-4 rounded bg-white/5"
              :class="width"
            />
          </div>

          <div
            v-else-if="codeLines.length > 0"
            key="code"
            class="font-mono text-body-2 leading-7"
          >
            <div
              v-for="(line, i) in codeLines"
              :key="i"
              class="min-h-7 whitespace-pre"
            >
              <template v-if="i < visibleLineCount">
                <span
                  v-for="(seg, j) in line"
                  :key="j"
                  :style="{ color: seg.color }"
                  >{{ seg.text }}</span
                >
              </template>
              <template v-else-if="i === visibleLineCount">
                <span
                  v-for="(seg, j) in sliceLine(line, visibleChars)"
                  :key="j"
                  :style="{ color: seg.color }"
                  >{{ seg.text }}</span
                >
                <span v-if="!isDone" class="pg-caret" />
              </template>
            </div>
          </div>

          <p
            v-else
            key="empty"
            dir="rtl"
            class="flex-center text-body-2 h-72 text-caption"
          >
            برای مشاهده کد، روی دکمه «ساخت کد» کلیک کنید.
          </p>
        </Transition>

        <Transition name="pg-pop">
          <button
            v-if="isDone && codeLines.length > 0"
            type="button"
            aria-label="کپی کد"
            class="absolute end-3 top-3 flex-center size-9 rounded-lg border border-borderDivider bg-background/80 text-title transition hover:border-primary/60 hover:text-primary active:scale-90"
            @click="copyCode"
          >
            <Icon
              :name="codeCopied ? 'mdi:check' : 'mdi:content-copy'"
              size="18"
            />
          </button>
        </Transition>
      </div>

      <UiActionButton
        variant="primary"
        size="sm"
        radius="md"
        full-width
        :icon="generating ? 'mdi:loading' : 'mdi:refresh'"
        class="sm:w-[200px] sm:self-start"
        :class="
          generating &&
          'pointer-events-none opacity-80 [&_svg]:animate-spin [&_.iconify]:animate-spin'
        "
        @click="generate"
      >
        ساخت کد
      </UiActionButton>
    </div>
  </div>
</template>
