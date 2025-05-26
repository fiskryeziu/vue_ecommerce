import type { Product } from '@/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export type Feature = 'new-arrivals' | 'featured' | 'best-sellers'
export const useProductsStore = defineStore('products', () => {
  const productsByCategory: Ref<Record<Feature, Product[]>> = ref({
    'new-arrivals': [],
    featured: [],
    'best-sellers': [],
  })

  const fetchProductsByCategory = async (category: Feature): Promise<void> => {
    if (productsByCategory.value[category].length > 0) return

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${encodeURIComponent(category)}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: Product[] = await response.json()
      productsByCategory.value[category] = data
    } catch (error) {
      console.error(`Failed to fetch products for category "${category}":`, error)
    }
  }

  return {
    productsByCategory,
    fetchProductsByCategory,
  }
})
