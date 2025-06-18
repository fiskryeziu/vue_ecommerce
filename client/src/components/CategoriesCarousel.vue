<template>
  <h1>Popular Categories</h1>
  <swiper
    :slidesPerView="2"
    :space-between="15"
    :pagination="{
      clickable: true,
    }"
    :breakpoints="{
      '768': {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      '1024': {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    }"
    class="mySwiper"
  >
    <swiper-slide
      v-for="item in items"
      :key="item.id"
      @mouseenter="isHovering[item.id] = true"
      @mouseleave="isHovering[item.id] = false"
    >
      <RouterLink :to="{ path: '/shop', query: { categories: item.href } }">
        <div class="wrapper">
          <img :src="item.src" alt="" />
          <h4 class="uppercase text-medium" :class="{ active: isHovering[item.id] }">
            {{ item.category }}
          </h4>
        </div>
      </RouterLink>
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import 'swiper/css'

const items = ref([
  {
    id: 1,
    src: './categories/1.jpg',
    category: 'necklaces',
    href: 'necklaces',
  },
  {
    id: 2,
    src: './categories/2.jpg',
    category: 'rings',
    href: 'rings',
  },
  {
    id: 3,
    src: './categories/3.jpg',
    category: 'bracelets',
    href: 'bracelets',
  },
  {
    id: 4,
    src: './categories/4.jpg',
    category: 'earrings',
    href: 'earrings',
  },
  {
    id: 5,
    src: './categories/5.jpg',
    category: 'charm & dangles',
    href: 'charms-dangles',
  },
])
const isHovering = ref<Record<number, boolean>>({})
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

h4 {
  margin-block: 1em;
  position: relative;
}

h4:before,
h4:after {
  content: '';
  position: absolute;
  left: 0px;
  bottom: -3px;
  width: 100%;
  border-bottom: 2px solid var(--lightest);
}
h4:before {
  transform-origin: right;
  transform: scaleX(1) translateZ(0);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
}
h4:after {
  transform-origin: left;
  transform: scaleX(0) translateZ(0);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.active:before {
  transform: scaleX(0) translateZ(0px);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.active:after {
  transform: scaleX(1) translateZ(0px);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
}
.active:before,
.active:after {
  border-bottom: 1px solid var(--primary);
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

h1 {
  text-align: center;
  margin-block: 2em 0.5em;
  font-size: clamp(1.625rem, 5vw, 2.5rem);
  font-weight: var(--font-normal);
}
</style>
