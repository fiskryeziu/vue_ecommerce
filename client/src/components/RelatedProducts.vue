<template>
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
      '1024': {
        slidesPerView: 4,
      },
    }"
    class="slider"
  >
    <swiper-slide v-for="item in items" :key="item.id">
      <ShopCard :product="item" />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'
import { data } from '@/data'
import ShopCard from './ShopCard.vue'
import { useRoute } from 'vue-router'

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
  products?: Product[]
}>()

const items = ref<Product[]>(data)

const route = useRoute()
const slug = route.params.slug as string

async function fetchProduct(slug: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/related/${slug}`)

    if (!res.ok) {
      const errorData = await res.json().catch(() => null)
      const message = errorData?.message || `Failed to fetch product: ${res.status}`
      throw new Error(message)
    }

    items.value = await res.json()
  } catch (err: any) {
    let msg = err.message || 'Unknown error'
    console.log(msg)
  }
}

onMounted(() => {
  fetchProduct(slug)
})
</script>

<style scoped>
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
  width: 90%;
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
