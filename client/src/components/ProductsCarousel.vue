<template>
  <h1 class="heading">{{ category }}</h1>
  <div class="wrapper">
    <div class="feature">
      <div class="image-wrapper">
        <img :src="featuredImage" alt="feature-image" />
      </div>
      <div class="content-wrapper">
        <h3>{{ title }}</h3>
        <a href="">Shop Now</a>
      </div>
    </div>
    <swiper
      :slidesPerView="2"
      :space-between="30"
      :pagination="{
        clickable: true,
      }"
      :breakpoints="{
        '768': {
          slidesPerView: 3,
        },
      }"
      class="slider"
    >
      <swiper-slide v-for="item in items" :key="item.id">
        <CardProduct :product="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import CardProduct from './CardProduct.vue'
import { data } from '@/data'
import type { Product } from './RelatedProducts.vue'

defineProps<{
  category: string
  title: string
  featuredImage: string
  products?: Product[]
}>()

const items = ref<Product[]>(data)
</script>

<style scoped>
.wrapper {
  display: flex;
  gap: 1em;
}

.feature {
  position: relative;
  display: flex;
  width: 25%;
  min-height: 200px;
  padding-left: 1em;
  color: var(--background);
  overflow: hidden;
}

.image-wrapper + .content-wrapper {
  position: absolute;
  inset: 0;
  padding: 2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  width: 100%;
}

.image-wrapper div {
  position: relative;
}

.image-wrapper img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-wrapper {
  display: flex;
  align-items: start;
  justify-content: end;
  width: 75%;
}

.feature h3 {
  font-size: var(--text-2xl);
  font-weight: 400;
  line-height: 1.2;
}

.feature a {
  position: relative;
  text-transform: uppercase;
  font-size: var(--text-sm);
  margin-top: 0.8em;
}

.feature a:before {
  transform-origin: right;
  transform: scaleX(1) translateZ(0);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
}

.feature a:hover:before {
  transform: scaleX(0) translateZ(0px);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.feature a:after {
  transform-origin: left;
  transform: scaleX(0) translateZ(0);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.feature a:hover:after {
  transform: scaleX(1) translateZ(0px);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
}

.feature a:before,
.feature a:after {
  content: '';
  position: absolute;
  left: 0px;
  bottom: -3px;
  width: 100%;
  border-bottom: 2px solid;
}

.slider {
  width: 75%;
}

@media screen and (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    padding-inline: 1em;
  }
  .feature {
    width: 100%;
    max-height: 250px;
    padding: 0;
  }

  .image-wrapper,
  .image-wrapper img {
    max-height: inherit;
  }

  .slider {
    width: 100%;
  }
}
</style>
