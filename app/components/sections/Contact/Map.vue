<template>
    <section id="map" class="relative w-full rounded-3xl overflow-hidden border border-borderDivider bg-cardSurface">
      <iframe 
        src="https://balad.ir/embed?p=PWcB8cgn4kJiOz" 
        class="h-95 w-full grayscale lg:h-[650px]"
        title="موقعیت دفتر مرکزی MLGrid" 
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        frameborder="0"  
        aria-hidden="false" 
        tabindex="0"/>
      <!-- bg black -->
      <div class="pointer-events-none absolute inset-0 bg-black/80" />
      <!-- info -->
      <div class="pointer-events-none absolute inset-0 flex-center p-4">
        <div class="pointer-events-auto flex w-full flex-col items-center gap-4 text-center">
          <Icon name="boxicons:location" size="64" class="text-primary" />
          <p class="text-subtitle font-shabnamBold text-title">موقعیت دفتر مرکزی MLGrid</p>
          <p class="text-body-2 text-caption">
           شیراز، شهرک آرین، خیابان فناوری، پارک علم و فناوری استان فارس، ساختمان نفت، گاز و پتروشیمی، طبقه اول، واحد ۵۱۰۸
          </p>
          <div class="flex-center gap-5 flex-col md:flex-row">
            <a
            href="https://maps.app.goo.gl/SPDZjVq2F4Wd9pAEA"
            target="_blank"
            rel="noopener"
            class="rounded-2xl shrink-0 border border-primary/30 bg-primary/10 px-6 py-3 text-body-2 font-shabnamBold text-primary"
          >
            مشاهده در Google Maps
          </a>
          <a
            href="https://balad.ir/p/PWcB8cgn4kJiOz"
            target="_blank"
            rel="noopener"
            class="rounded-2xl shrink-0 border border-primary/30 bg-primary/10 px-6 py-3 text-body-2 font-shabnamBold text-primary"
          >
            مشاهده در بلد
          </a>
          </div>
        </div>
      </div>
    </section>
</template>