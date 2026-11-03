import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@nuxt/icon','@vueuse/motion/nuxt',],
  icon: {
    customCollections: [
      {
        prefix: 'icon', 
        dir: './app/assets/icons' 
      },
    ],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl',
        class: "dark",
      },
      title: 'MLGrid',
      titleTemplate: '%s | MLGrid',

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'MLGrid پلتفرمی نوآورانه برای تبدیل مدل‌های هوش مصنوعی به سرویس‌های ابری ساده و قابل استفاده.',
        },
      ],
    },
  },
})