<template>
  <div
    class="shop-card"
    @mouseenter="isHovering[product.id] = true"
    @mouseleave="isHovering[product.id] = false"
  >
    <div class="shop-card__image-wrapper">
      <img :src="product.image" alt="" />
      <div
        class="shop-card__buttons"
        :class="{ 'shop-card__button--active': isHovering[product.id] || isMobileScreen }"
      >
        <Heart :strokeWidth="1" :size="30" />
        <Search :strokeWidth="1" :size="30" @click="quickViewHandler(product, $event)" />
      </div>
    </div>
    <div class="shop-card__info">
      <p class="shop-card__category">{{ product.category }}</p>
      <p class="shop-card__title">{{ product.title }}</p>
      <div class="center">
        <p class="shop-card__price">${{ product.price }}</p>
        <p class="shop-card__compareprice" v-if="product.compareprice">
          ${{ product.compareprice }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Heart, Search } from 'lucide-vue-next'
import type { Product } from '@/types'
import { useProductsStore } from '@/stores/productsStore'
import { useUIStore } from '@/stores/uiStore'

defineProps<{
  product: Product
}>()

const isHovering = ref<Record<number, boolean>>({})
const width = ref(window.innerWidth)
const productStore = useProductsStore()
const ui = useUIStore()

const quickViewHandler = (product: Product, e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  productStore.getQuickViewProduct(product)
  ui.openQuickView()
}

const isMobileScreen = computed(() => width.value < 768)

const updateWidth = () => {
  width.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<style scoped>
.shop-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
}

.shop-card__image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;
}
.shop-card img {
  object-fit: contain;
}

.shop-card__buttons {
  position: absolute;
  top: 1.5em;
  right: -4em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.shop-card__button--active {
  right: 1em;
}

.shop-card__buttons svg {
  padding: 0.3rem;
  background-color: var(--background);
  border-radius: 50%;
  transition: background-color 0.2s ease-in;
}

.shop-card__buttons svg:hover {
  color: var(--light);
  background-color: var(--primary);
}

.shop-card__category {
  font-size: var(--text-xs);
  color: var(--secondary);
  text-transform: uppercase;
}
.shop-card__title {
  font-size: 17px;
  color: var(--primary);
  text-transform: capitalize;
}

.shop-card__info div {
  gap: 1em;
}
.shop-card__price {
  font-size: var(--text-base);
  color: var(--primary);
  font-weight: var(--font-medium);
}
.shop-card__compareprice {
  font-size: var(--text-sm);
  color: var(--secondary);
  text-decoration: line-through;
}
</style>
