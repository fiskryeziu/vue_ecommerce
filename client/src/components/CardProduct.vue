<template>
  <RouterLink :to="`/product/${product.slug}`">
    <div
      class="card"
      @mouseenter="isHovering[product.id] = true"
      @mouseleave="isHovering[product.id] = false"
    >
      <div class="card__image-wrapper">
        <img :src="product.image" alt="" />
        <div
          class="card__buttons"
          :class="{ 'card__button--active': isHovering[product.id] || isMobileScreen }"
        >
          <ShoppingCart :strokeWidth="2" :size="20" @click="(e) => addCartHandler(product, e)" />
          <template v-if="wishlist.isWishlist(product.id)">
            <RouterLink to="/wishlist">
              <Check :strokeWidth="2" :size="20" />
            </RouterLink>
          </template>
          <template v-else>
            <Heart :strokeWidth="2" :size="20" @click="(e) => addWishlistHandler(product, e)" />
          </template>
          <Search :strokeWidth="2" :size="20" @click="quickViewHandler(product, $event)" />
        </div>
      </div>
      <div class="card__info">
        <p class="card__category">{{ product.category }}</p>
        <p class="card__title">{{ product.title }}</p>
        <div class="center">
          <p class="card__price">${{ product.price }}</p>
          <p class="card__compareprice" v-if="product.compareprice">${{ product.compareprice }}</p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Check, CloudCog, Heart, Search, ShoppingCart } from 'lucide-vue-next'
import type { Product } from '@/types'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useProductsStore } from '@/stores/productsStore'

defineProps<{
  product: Product
}>()

const cart = useCartStore()
const ui = useUIStore()
const wishlist = useWishlistStore()
const productStore = useProductsStore()

const isHovering = ref<Record<number, boolean>>({})
const width = ref(window.innerWidth)

const isMobileScreen = computed(() => width.value < 768)

const addCartHandler = (product: Product, e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()

  cart.addItem(product)
  ui.toggleCart()
}
const addWishlistHandler = (product: Product, e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()

  wishlist.addItem(product)
}

const quickViewHandler = (product: Product, e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  productStore.getQuickViewProduct(product)
  ui.openQuickView()
}

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
.card {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
}

.card__image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}
.card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.card__buttons {
  position: absolute;
  bottom: -5.5em;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  transition: bottom 0.3s ease-out;
  color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  border-radius: 5px;
  overflow: hidden;
}

.card__button--active {
  bottom: 1.5em;
}
.card__buttons svg {
  padding: 0.4em;
  transition: background-color 0.2s ease-in;
}

.card__buttons svg:hover {
  color: var(--light);
  background-color: var(--primary);
}

.card__category {
  font-size: var(--text-xs);
  color: var(--secondary);
  text-transform: uppercase;
}
.card__title {
  font-size: 17px;
  color: var(--primary);
  text-transform: capitalize;
}

.card__info div {
  gap: 1em;
}
.card__price {
  font-size: var(--text-base);
  color: var(--primary);
  font-weight: var(--font-medium);
}
.card__compareprice {
  font-size: var(--text-sm);
  color: var(--secondary);
  text-decoration: line-through;
}
</style>
