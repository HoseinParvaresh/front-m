export type ModelTab = "about" | "playground" | "api";

export interface ModelDetail {
  slug: string;
  title: string;
  desc: string;
  publisher: string;
  tags: string[];
  bannerImage?: string;
  avatarImage?: string;
  apiSlug: string;
  intro: string;
  bulletPoints: string[];
  quickStats: { label: string; value: string; order: string }[];
  metrics: {
    label: string;
    value: string;
    unit: string;
    icon: string;
    tone: "primary" | "warning";
  }[];
  info: { label: string; value: string; order: string }[];
}

export const PLAYGROUND_SUGGESTIONS = [
  "یک تصویر از شهر آینده‌نگر در شب بساز",
  "یک ویدیوی کوتاه درست کن",
  "متن من رو به صدا تبدیل کن",
  "نمونه کد اتصال به API رو بده",
];

export const SampleModel: ModelDetail = {
  slug: "voice-to-video",
  title: "ساخت ویدیو از طریق فرمان صوتی",
  desc: "تبدیل صدای کاربر به ویدیو با استفاده از هوش مصنوعی پیشرفته",
  publisher: "محمد علی زنده بودی",
  bannerImage: "/gpt-4-vision.webp",
  avatarImage: "/gpt-4-vision.webp",
  tags: ["NLP", "Vision", "پیشرفته"],
  apiSlug: "audio-to-video-v2",
  intro:
    "این مدل هوش مصنوعی پیشرفته قادر است فرمان‌های صوتی شما را به ویدیوهای حرفه‌ای تبدیل کند. با استفاده از تکنولوژی‌های پردازش زبان طبیعی و تولید محتوای چندرسانه‌ای، این سیستم می‌تواند:",
  bulletPoints: [
    "تولید محتوای چندرسانه‌ای برای اهداف آموزشی، تبلیغاتی و سینمایی",
    "تبدیل خودکار فرمان صوتی به تصویر و انیمیشن با کیفیت بالا",
    "پردازش زبان طبیعی برای درک عمیق محتوای صوتی شما",
    "پشتیبانی از زبان فارسی با دقت بالا در تشخیص گفتار",
    "خروجی ویدیویی در فرمت‌های MP4، WebM و MOV",
  ],
  quickStats: [
    { label: "نوع مدل", value: "Multimodal", order: "order-3 lg:order-none" },
    { label: "ورودی", value: "صدا / متن", order: "order-4 lg:order-none" },
    { label: "خروجی", value: "ویدیو", order: "order-1 lg:order-none" },
    { label: "حداکثر مدت", value: "۶۰ ثانیه", order: "order-2 lg:order-none" },
  ],
  metrics: [
    {
      label: "قیمت هر درخواست",
      value: "۲,۵۰۰",
      unit: "تومان",
      icon: "mdi:cash-multiple",
      tone: "primary",
    },
    {
      label: "تعداد اجراها",
      value: "۱۲۴,۸۳۲",
      unit: "اجرا",
      icon: "mdi:play",
      tone: "warning",
    },
    {
      label: "دقت مدل",
      value: "۹۷.۲",
      unit: "٪",
      icon: "mdi:target",
      tone: "primary",
    },
  ],
  info: [
    {
      label: "معماری مدل",
      value: "Transformer-based Multimodal",
      order: "order-2 lg:order-none",
    },
    { label: "پارامترها", value: "۷ میلیارد", order: "order-1 lg:order-none" },
    {
      label: "دقت تشخیص گفتار",
      value: "۹۴.۷٪",
      order: "order-4 lg:order-none",
    },
    {
      label: "میانگین زمان پاسخ",
      value: "۳.۲ ثانیه",
      order: "order-3 lg:order-none",
    },
    {
      label: "حداکثر طول ورودی",
      value: "۵۱۲ توکن",
      order: "order-6 lg:order-none",
    },
    {
      label: "فرمت خروجی",
      value: "MP4 / WebM / MOV",
      order: "order-5 lg:order-none",
    },
    {
      label: "رزولوشن پشتیبانی شده",
      value: "720p / 1080p / 4K",
      order: "order-8 lg:order-none",
    },
    {
      label: "زبان‌های پشتیبانی شده",
      value: "فارسی، انگلیسی، عربی",
      order: "order-7 lg:order-none",
    },
  ],
};
