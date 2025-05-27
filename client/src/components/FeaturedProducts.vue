<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import CardProduct from './CardProduct.vue'
import { useProductsStore } from '@/stores/productsStore'
import type { Feature, Product } from '@/types'

const product = useProductsStore()

const items = ref<Product[]>([])

const categories: { id: Feature; name: string }[] = [
  { id: 'new-arrivals', name: 'New Arrivals' },
  { id: 'featured', name: 'Featured' },
  { id: 'best-sellers', name: 'Best Selllers' },
]
const selectedCategory: Ref<Feature> = ref(categories[0].id)

watch(selectedCategory, async () => {
  await product.fetchProductsByCollection(selectedCategory.value)
  items.value = product.productsByCollections[selectedCategory.value] ?? []
})

onMounted(async () => {
  await product.fetchProductsByCollection(selectedCategory.value)
  items.value = product.productsByCollections[selectedCategory.value] ?? []
})
</script>

<template>
  <h1 class="heading">Featured Products</h1>
  <ul class="tabs">
    <li v-for="category in categories" :key="category.id">
      <button
        class="tab"
        :class="{ active: selectedCategory === category.id }"
        :aria-selected="selectedCategory === category.id"
        @click="selectedCategory = category.id"
      >
        {{ category.name }}
      </button>
    </li>
  </ul>

  <section v-if="items.length > 0" class="tab-content">
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
        <CardProduct :product="item" />
      </swiper-slide>
    </swiper>
  </section>
</template>

<style scoped>
.tabs {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 1em;
}

.tab {
  position: relative;
  display: inline-block;
  font-size: var(--text-xl);
  color: var(--secondary);
}

.tab:before {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: all 300ms ease;
}

.tab:hover::before {
  width: 100%;
}

.tab:hover {
  animation: colorShift 0.5s forwards;
}

.tab[aria-selected='true'] {
  color: var(--primary);
  animation: none;
  pointer-events: none;
}

.tab[aria-selected='true']::before {
  content: '';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary);
}

section {
  margin-block: 1em;
}

@keyframes colorShift {
  0% {
    color: var(--secondary);
  }
  100% {
    color: var(--primary);
  }
}
</style>
