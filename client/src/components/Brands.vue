<template>
  <h2>Only best brands</h2>
  <section>
    <swiper
      :slidesPerView="2"
      :pagination="{
        clickable: true,
      }"
      :breakpoints="{
        '768': {
          slidesPerView: 4,
        },
        '1024': {
          slidesPerView: 6,
        },
      }"
      class="slider"
    >
      <swiper-slide v-for="item in items" :key="item.id">
        <div class="brand__wrapper">
          <img :src="item.imgSrc" alt="" class="brand__logo" />
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { brands } from '@/data'

const items = ref<{ id: number; imgSrc: string }[]>(brands)
</script>

<style scoped>
h2 {
  padding-block: 2em;
  text-align: center;
  font-weight: var(--font-normal);
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 16.66%;
  max-width: 16.66%;
}

.brand__logo {
  height: auto;
}

@media screen and (max-width: 1024px) {
  .swiper-slide {
    flex: 0 0 25%;
    max-width: 25%;
  }
}
@media screen and (max-width: 768px) {
  .swiper-slide {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>
