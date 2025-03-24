<template>
  <section>
    <h1 class="heading m-8">Follow Us on Instagram</h1>
    <swiper
      :slidesPerView="2"
      :spaceBetween="20"
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
      <swiper-slide v-for="post in posts" :key="post.id">
        <div
          class="social__wrapper"
          @mouseenter="isHovering[post.id] = true"
          @mouseleave="isHovering[post.id] = false"
        >
          <img :src="post.imgSrc" alt="" />
          <div :class="{ activeIcon: isHovering[post.id] }" class="social__icon">
            <Instagram />
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { postsData } from '@/data'
import { Instagram } from 'lucide-vue-next'

const posts = ref(postsData)
const isHovering = ref<Record<number, boolean>>({})
</script>

<style scoped>
section {
  padding-inline: 1em;
}

.social__wrapper {
  overflow: hidden;
  position: relative;
}

img {
  aspect-ratio: 1;
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}

.social__wrapper::before {
  content: '';
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0);
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.2s ease-in-out;
}

.social__wrapper:hover::before {
  opacity: 0.5;
}

.social__icon {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  opacity: 0;
  z-index: 2;
  transition: opacity 0.21s ease-in-out;
}

.social__icon svg {
  width: 2em;
  height: 2em;
  color: var(--background);
}

.activeIcon {
  opacity: 1;
}
</style>
