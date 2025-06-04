import type { Product } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useWishlistStore = defineStore(
  'wishlist',
  () => {
    const items = ref<Product[]>([])

    const count = computed(() => items.value.length)
    function addItem(product: Product) {
      const existing = items.value.find((item) => item.id === product.id)

      if (existing) return
      items.value.push(product)
    }

    function removeItem(productId: number) {
      items.value = items.value.filter((item) => item.id !== productId)
    }

    function isWishlist(productId: number) {
      return items.value.some((item) => item.id === productId)
    }

    return { items, count, addItem, removeItem, isWishlist }
  },
  {
    persist: { storage: sessionStorage, pick: ['items'] },
  },
)
