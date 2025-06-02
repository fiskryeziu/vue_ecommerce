import type { Product } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type CartItem = Product & { quantity: number }
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const itemCount = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0))
  const totalPrice = computed(() => {
    const total = items.value.reduce(
      (acc, item) => acc + item.quantity * (item.compareprice ?? item.price),
      0,
    )
    return total.toFixed(2)
  })

  function addItem(product: Product, quantity = 1) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }

  function removeItem(productId: number) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function clearCart() {
    items.value = []
  }

  return { items, itemCount, totalPrice, addItem, removeItem, clearCart }
})
