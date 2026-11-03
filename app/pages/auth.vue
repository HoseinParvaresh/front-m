<script setup lang="ts">
definePageMeta({ hideFooter: true })

useSeoMeta({
  title: 'ورود یا ثبت‌ نام',
  description: 'وارد حساب کاربری MLGrid شوید یا یک حساب جدید بسازید.',
})
</script>

<template>
  <div class="relative flex-center min-h-[calc(100vh-68px)] lg:min-h-[calc(100vh-80px)] w-full overflow-hidden px-4 py-10 lg:px-16">
    <div class="absolute h-full w-full">
       <img
        src="/auth-illustration.svg"
        alt=""
        class="h-full w-full object-cover object-left opacity-90"
        @error="($event.target as HTMLImageElement).style.display = 'none'"
      />
    </div>
    <SectionsAuthForm />
  </div>
</template>