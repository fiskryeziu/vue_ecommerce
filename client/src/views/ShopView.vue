<template>
  <div class="shop__container">
    <div class="shop__banner">
      <img src="/shop-banner.png" alt="" />
    </div>
    <aside class="filter__container" :class="{ 'filter__cotainer-active': isOpen }">
      <div class="filter__wrapper">
        <section class="filter__category">
          <h2>Categories</h2>
          <ul>
            <li><button @click="addParam('categories', 'necklases')">Necklases</button></li>
            <li><button @click="addParam('categories', 'rings')">Rings</button></li>
            <li><button @click="addParam('categories', 'bracelets')">Bracelets</button></li>
            <li><button @click="addParam('categories', 'earrings')">Earrings</button></li>
            <li>
              <button @click="addParam('categories', 'charm&dangles')">Charm & Dangles</button>
            </li>
          </ul>
        </section>
        <section class="filter__pricing">
          <h2>Pricing Filter</h2>
          <RangeSlider />
        </section>
      </div>
    </aside>
    <div class="filter__overlay" v-if="isOpen" @click="toggleFilter"></div>
    <main>
      <div class="shop__sort">
        <p>1–12 Products of 34 Products</p>
        <div class="shop__sort-select">
          <b>Sort by</b>
          <select>
            <option value="">Default sorting</option>
            <option value="">Sort by popularity</option>
            <option value="">Sort by latest</option>
            <option value="">Sort by price: low to high</option>
            <option value="">Sort by price: high to low</option>
          </select>
          <Grid2x2 :strokeWidth="1" :aria-active="gridCol === 2" @click="changeCol(2)" />
          <Grid3x3 :strokeWidth="1" :aria-active="gridCol === 3" @click="changeCol(3)" />
        </div>
      </div>
      <section class="shop__products" :class="gridCol === 2 ? 'col-2' : 'col-3'">
        <div v-for="item of items">
          <ShopCard :product="item" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import RangeSlider from '@/components/RangeSlider.vue'
import ShopCard from '@/components/ShopCard.vue'
import { data } from '@/data'
import { Grid2x2, Grid3x3 } from 'lucide-vue-next'
import { inject, ref, watch, type InjectionKey, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const items = ref(data)

const gridCol = ref(3)

export interface IFilter {
  isOpen: boolean
  toggleFilter: () => void
}
const filterContext = inject<IFilter>('filterIsOpen')

if (!filterContext) {
  throw new Error('filterIsOpen not provided!')
}

const { isOpen, toggleFilter } = filterContext

const changeCol = (col: number) => {
  gridCol.value = col
}

const addParam = (key: string, value: string) => {
  const current = { ...route.query }

  if (value) {
    current[key] = value
  } else {
    delete current[key]
  }

  router.push({ query: current })
  toggleFilter()
}

watch(
  () => route.query.categories,
  (newCategory, oldCategory) => {
    if (newCategory !== oldCategory) {
      const current = { ...route.query }
      delete current['min_price']
      delete current['max_price']
      router.push({ query: current })
    }
  },
)
</script>

<style scoped>
.shop__container {
  display: grid;
  width: 100%;
  grid-template-areas:
    'banner banner'
    'filter  main';
  grid-template-columns: 30% 1fr;
  grid-template-rows: 300px 1fr;
  gap: 1em;
}

.shop__banner {
  grid-area: banner;
}

.shop__banner img {
  object-fit: cover;
}

.shop__container main {
  grid-area: main;
}

.shop__container aside {
  grid-area: filter;
}

.shop__container {
  padding: 1em;
}
.shop__container h2 {
  font-weight: var(--font-medium);
  margin-bottom: 1em;
}

.filter__category ul {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.filter__pricing {
  margin-top: 2em;
}

.flter__category li {
  cursor: pointer;
}

.shop__products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2em;
}

.shop__sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shop__sort-select {
  display: flex;
  gap: 1em;
}

.shop__sort select {
  width: 50%;
}

.shop__products {
  margin-block: 2em;
}

.col-3 {
  grid-template-columns: repeat(3, 1fr);
}
.col-2 {
  grid-template-columns: repeat(2, 1fr);
}

.shop__sort-select [aria-active='true'] {
  color: var(--primary);
}
.shop__sort-select [aria-active='false'] {
  color: var(--secondary);
}

.filter__overlay {
  display: none;
}

@media screen and (max-width: 1024px) {
  .shop__products {
    grid-template-columns: repeat(2, 1fr);
  }

  .shop__sort-select svg {
    display: none;
  }
  .shop__sort p {
    display: none;
  }

  .shop__sort {
    justify-content: flex-end;
  }
}
@media screen and (max-width: 768px) {
  .shop__container {
    display: grid;
    width: 100%;
    grid-template-areas:
      'banner banner'
      'main  main';
    grid-template-columns: 1fr;
    grid-template-rows: 300px 1fr;
    gap: 1em;
  }
  .filter__container {
    position: fixed;
    top: 0;
    left: -100%;
    width: 300px;
    overflow: hidden;
    background-color: var(--background);
    height: 100vh;
    padding: 1em;
    z-index: 3;
    transition: left 200ms ease-in;
  }

  .filter__cotainer-active {
    left: 0;
  }

  .filter__overlay {
    top: 0;
    left: 0;
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
  }
}
</style>
