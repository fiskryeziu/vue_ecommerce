<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :pagination="{ clickable: true }"
    effect="fade"
    :autoplay="{ delay: 10000 }"
    :loop="true"
  >
    <swiper-slide v-for="item in items" :key="item.id">
      <div class="slider-wrapper">
        <div class="slider-wrapper__info" :style="{ backgroundColor: item.color }">
          <p class="title">{{ item.title }}</p>
          <p class="subtitle">{{ item.subtitle }}</p>
          <p class="discount-title">{{ item.discountInfo }}</p>
        </div>
        <img :src="item.src" alt="" />
      </div>
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'

const items = ref([
  {
    id: 1,
    src: './banner1.jpg',
    color: '#f3e7e0',
    title: 'Pearls Spring Collections',
    subtitle: 'Revitalizing Supreme',
    discountInfo: '60% OFF Summer Sale',
  },
  {
    id: 2,
    src: './banner2.jpg',
    color: '#f8e4e4',
    title: 'Crown Brighter Collection',
    subtitle: 'Pave diamonds sets',
    discountInfo: 'Buy with 30% Discount',
  },
  {
    id: 3,
    src: './banner3.jpg',
    color: '#e2e7ed',
    title: 'Limited Edition Cage Rings',
    subtitle: 'World-class diamond',
    discountInfo: "Mother's Day Special",
  },
])

const modules = [Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]
</script>

<style lang="css">
.slider-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-inline: 1em;
}

.slider-wrapper__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: clamp(5px, 5vw, 90px);
  overflow: hidden;
}
.title {
  font-size: clamp(1rem, 4vw, 3rem);
  width: clamp(100%, 5vw, 20ch);
}
.subtitle {
  font-size: clamp(0.6875rem, 2.5vw, 1.375rem);
  color: var(--dark);
}

.discount-title {
  font-size: clamp(0.6875rem, 3vw, 2rem);
  font-weight: var(--font-light);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  z-index: 0;
}
.swiper-pagination-bullet {
  background-color: var(--background);
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: var(--primary);
}

@media screen and (max-width: 500px) {
  .slider-wrapper {
    aspect-ratio: 16/10;
  }
}
</style>
