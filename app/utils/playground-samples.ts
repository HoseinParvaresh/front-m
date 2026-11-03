import type {
  Attachment,
  AttachmentType,
  ChatMessage,
} from "~/utils/playground-types";

const base = { status: "done", feedback: null } as const;

export function createSeedMessages(): ChatMessage[] {
  return [
    {
      ...base,
      id: 1,
      role: "user",
      time: "۱۰:۴۱",
      attachments: [],
      text: "سلام، می‌خوام یه تصویر برام بسازی.",
    },
    {
      ...base,
      id: 2,
      role: "model",
      time: "۱۰:۴۱",
      attachments: [],
      text: "سلام!  حتماً. برای شروع این موارد کمکم می‌کنه:\n\n- **توضیح صحنه**: فضا، رنگ‌ها و حال‌وهوا\n- **تصویر مرجع** (اختیاری)\nهرکدوم رو داشتی همین‌جا بفرست.",
    },
    {
      ...base,
      id: 3,
      role: "user",
      time: "۱۰:۴۳",
      text: "یک شهر آینده‌نگر در شب، با ساختمان‌های شیشه‌ای، ماشین‌های پرنده و نورهای نئونی. یه دختر هم روی پشت‌بام ایستاده باشه و به شهر نگاه کنه. \n این عکس رو هم به‌عنوان مرجع در نظر بگیر.",
      attachments: [
        {
          id: "seed-img-1",
          type: "image",
          name: "refrence.png",
          src: "/simple-media/refrence.png",
        },
      ],
    },
    {
      ...base,
      id: 4,
      role: "model",
      time: "۱۰:۴۳",
      text: "",
      attachments: [
        {
          id: "seed-img-2",
          type: "image",
          name: "img-gen.jpg",
          src: "/simple-media/img-gen.jpg",
        },
      ],
    },
    {
      ...base,
      id: 5,
      role: "user",
      time: "۱۰:۴۵",
      text: "",
      attachments: [
        {
          id: "seed-voice-1",
          type: "audio",
          name: "voice-message.webm",
          duration: 3,
          src: "/simple-media/ref-voice.mp3",
        },
      ],
    },
    {
      ...base,
      id: 6,
      role: "model",
      time: "۱۰:۴۵",
      text: "صدای شما رو دریافت کردم 🎧\n\nمتن تشخیص‌داده‌شده: «شهر باید پر از نور و پرنده‌های رباتیک باشه.» ایده‌ی خیلی خوبیه! یه پاسخ صوتی کوتاه هم برات فرستادم:",
      attachments: [
        {
          id: "seed-voice-2",
          type: "audio",
          name: "reply.webm",
          src: "/simple-media/ai_answer.mp3",
          duration: 2,
        },
        {
          id: "seed-img-3",
          type: "image",
          name: "img-gen.jpg",
          src: "/simple-media/img-gen.jpg",
        },
      ],
    },
    {
      ...base,
      id: 7,
      role: "user",
      time: "۱۰:۴۸",
      text: "این کلیپ رو هم ببین، حرکت دوربین مثل این باشه.",
      attachments: [
        {
          id: "seed-video-1",
          type: "video",
          name: "ref-video.mp4",
          src: "/simple-media/ref-video.mp4",
        },
      ],
    },
    {
      ...base,
      id: 8,
      role: "model",
      time: "۱۰:۵۰",
      text: "\nویدیوی نهایی آماده‌ست:",
      attachments: [
        {
          id: "seed-video-2",
          type: "video",
          name: "video-gen.mp4",
          src: "/simple-media/video-gen.mp4",
        },
      ],
    },
    {
      ...base,
      id: 7,
      role: "user",
      time: "۱۰:۴۸",
      text: "نمونه کد اتصال به API رو بده",
      attachments: [],
    },
    {
      ...base,
      id: 9,
      role: "model",
      time: "۱۰:۵۰",
      text: '\n\n```python\nimport mlgrid\n\nclient = mlgrid.Client()\nvideo = client.run("audio-to-video-v2", audio="voice.webm")\nprint(video.url)\n```',
      attachments: [],
    },
  ];
}

export interface ReplyPlan {
  text: string;
  attachments: Attachment[];
  mediaDelay: number;
}

const GENERIC_REPLIES = [
  "ایده‌ی جالبیه! 😊 برای اینکه دقیق‌تر کمکت کنم، این‌ها رو بگو:\n\n- **هدف** خروجی چیه؟\n- **سبک** و حال‌وهوای دلخواهت\n- مدت‌زمان یا اندازه‌ی مورد نظر",
  "حتماً. اول یه ساختار پیشنهادی می‌دم:\n\n1. توضیح کوتاه صحنه\n2. انتخاب سبک و رنگ‌ها\n3. ساخت خروجی و بازبینی\n\nاگه خواستی با **عکس یا صدا** هم می‌تونی مرجع بدی.",
  "متوجه شدم. می‌تونم چند نسخه‌ی مختلف آماده کنم و تو بهترینش رو انتخاب کنی. از کدوم شروع کنم؟",
];

export function planReply(
  text: string,
  attachments: Attachment[],
  makeId: () => string,
  variant: number,
): ReplyPlan {
  const has = (type: AttachmentType) =>
    attachments.some((a) => a.type === type);
  const media = (a: Omit<Attachment, "id">): Attachment => ({
    id: makeId(),
    simulated: true,
    ...a,
  });

  if (has("image")) {
    return {
      text: "تصویرت رو دیدم حال‌وهوای **رنگارنگ و سینمایی** داره.\n\n- نورپردازی: کنتراست بالا\n- ترکیب‌بندی: متقارن و پرجزئیات\n\nاین هم نسخه‌ی پردازش‌شده‌ی همین تصویر:",
      attachments: [
        media({
          type: "image",
          name: "img-gen.jpg",
          src: "/simple-media/img-gen.jpg",
        }),
      ],
      mediaDelay: 1800,
    };
  }
  if (has("video")) {
    return {
      text: "ویدیو رو بررسی کردم 🎬\n\n- **مدت‌زمان:** کوتاه و مناسب پیش‌نمایش\n- **حرکت دوربین:** آرام و روان\n- **پیشنهاد:** برای نسخه‌ی نهایی رزولوشن رو به 1080p ببر",
      attachments: [],
      mediaDelay: 0,
    };
  }
  if (has("audio")) {
    return {
      text: "صدای شما رو دریافت کردم 🎧\n\nمتن تشخیص‌داده‌شده: «یه شهر پر از نور و پرنده‌های رباتیک بساز.»\n\nیه پاسخ صوتی کوتاه هم برات فرستادم:",
      attachments: [
        media({
          type: "audio",
          name: "/simple-media/ai_answer.mp3",
          duration: 3,
        }),
      ],
      mediaDelay: 1500,
    };
  }
  if (attachments.length) {
    return {
      text: "فایلت رو دریافت کردم ✅ بررسی‌ش می‌کنم و نتیجه رو همین‌جا برات می‌نویسم.",
      attachments: [],
      mediaDelay: 0,
    };
  }
  if (/(تصویر|عکس|نقاشی|طرح)/.test(text)) {
    return {
      text: "حتماً! یه تصویر با **همین توصیف** ساختم:",
      attachments: [
        media({
          type: "image",
          name: "img-gen.jpg",
          src: "/simple-media/img-gen.jpg",
        }),
      ],
      mediaDelay: 2200,
    };
  }
  if (/(ویدیو|فیلم|کلیپ)/.test(text)) {
    return {
      text: "عالی! ویدیو رو آماده می‌کنم و همین‌جا می‌فرستم:",
      attachments: [
        {
          id: "seed-video-3",
          type: "video",
          name: "video-gen.mp4",
          src: "/simple-media/video-gen.mp4",
        },
      ],
      mediaDelay: 2600,
    };
  }
  if (/(صدا|ویس|وویس|بخون|صوتی)/.test(text)) {
    return {
      text: "این هم نسخه‌ی صوتی:",
      attachments: [
        media({
          type: "audio",
          name: "/simple-media/ai_answer.mp3",
          duration: 9,
        }),
      ],
      mediaDelay: 1600,
    };
  }
  if (/(کد|api|python|پایتون)/i.test(text)) {
    return {
      text: 'حتماً! نمونه‌ی ساده‌ی اتصال به API:\n\n```python\nimport mlgrid\n\nclient = mlgrid.Client()\nresult = client.run("audio-to-video-v2", prompt="...")\nprint(result.url)\n```\n\nبعدش می‌تونی `result.url` رو مستقیم توی پروژه‌ت استفاده کنی.',
      attachments: [],
      mediaDelay: 0,
    };
  }
  return {
    text: GENERIC_REPLIES[variant % GENERIC_REPLIES.length] ?? "",
    attachments: [],
    mediaDelay: 0,
  };
}
