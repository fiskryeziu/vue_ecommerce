<script setup lang="ts">
import { data } from '@/data'
import { ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import CardProduct from './CardProduct.vue'

const items = ref(data)
const categories = [
  { id: 'new', name: 'New Arrivals' },
  { id: 'featured', name: 'Featured' },
  { id: 'best', name: 'Best Selllers' },
]
const selectedCategory = ref(categories[0].id)

const fetchData = async () => {
  // try {
  //   const response = await fetch(`api-example/category=${selectedCategory.value}`);
  //   const data = await response.json();
  //   items.value = data;
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
  console.log('fetching...')
}

watch(selectedCategory, fetchData)

fetchData()
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
