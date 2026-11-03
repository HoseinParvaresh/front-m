<script setup lang="ts">
useSeoMeta({
  title: 'Solutions',
  description: 'هوش مصنوعی متناسب با نیاز کسب‌وکار و پروژه شما — راهکارهایی برای توسعه‌دهندگان، کسب‌وکارها، پژوهشگران و علاقه‌مندان به یادگیری',
})
</script>

<template>
    <SectionsSolutionsHero />

    <SectionsSolutionsDevelopers
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    />

    <SectionsSolutionsBusiness
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    />

    <SectionsSolutionsResearchers
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    />

    <SectionsSolutionsAi
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    />

    <SectionsSolutionsCustom
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    />

    <SectionsSolutionsCta />
</template>