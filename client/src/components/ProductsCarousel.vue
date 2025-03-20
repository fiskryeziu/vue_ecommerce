<template>
  <h1 class="title">Necklase</h1>
  <div class="wrapper">
    <div class="feature">
      <div class="image-wrapper">
        <img src="/feature1.jpg" alt="feature" />
      </div>
      <div class="content-wrapper">
        <h3>New Earrings Arrival</h3>
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
import { Heart, Search, ShoppingCart } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import CardProduct from './CardProduct.vue'

export type Product = {
  id: number
  title: string
  desc: string
  imgSrc: string
  price: number
  comparePrice?: number
  category: string
  rating: number
  href?: string
}

defineProps<{
  category: string
  title: string
  featuredImage: string
  products?: Product[]
}>()

const items = ref<Product[]>([
  {
    id: 1,
    imgSrc: './categories/1.jpg',
    category: 'necklaces',
    href: '',
    title: 'Birds of Paradise Pendant',
    desc: 'A beautiful pendant inspired by the exotic Birds of Paradise.',
    price: 199.99,
    comparePrice: 249.99,
    rating: 4.5,
  },
  {
    id: 2,
    imgSrc: './categories/2.jpg',
    category: 'rings',
    href: '',
    title: 'Eternal Love Ring',
    desc: 'A symbol of everlasting love, crafted with precision and care.',
    price: 299.0,
    rating: 4.8,
  },
  {
    id: 3,
    imgSrc: './categories/3.jpg',
    category: 'bracelets',
    href: '',
    title: 'Ocean Breeze Bracelet',
    desc: 'Capture the essence of the ocean with this elegant bracelet.',
    price: 149.5,
    comparePrice: 179.99,
    rating: 4.2,
  },
  {
    id: 4,
    imgSrc: './categories/4.jpg',
    category: 'earrings',
    href: '',
    title: 'Starlight Earrings',
    desc: 'Shine like the stars with these delicate and sparkling earrings.',
    price: 129.0,
    rating: 4.6,
  },
  {
    id: 5,
    imgSrc: './categories/5.jpg',
    category: 'charm & dangles',
    href: '',
    title: 'Lucky Clover Charm',
    desc: 'Bring good fortune with this charming clover dangle.',
    price: 49.99,
    rating: 4.0,
  },
])
</script>

<style scoped>
.title {
  text-align: center;
  margin-block: 2em;
  font-size: clamp(1.625rem, 5vw, 2.5rem);
  font-weight: var(--font-normal);
}

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
