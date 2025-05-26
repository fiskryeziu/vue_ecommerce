import type { Category, Feature, Product } from '@/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const productsByCollections: Ref<Record<Feature, Product[]>> = ref({
    'new-arrivals': [],
    featured: [],
    'best-sellers': [],
  })

  const fetchProductsByCollection = async (collection: Feature): Promise<void> => {
    if (productsByCollections.value[collection].length > 0) return

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${encodeURIComponent(collection)}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: Product[] = await response.json()
      productsByCollections.value[collection] = data
    } catch (error) {
      console.error(`Failed to fetch products for collection "${collection}":`, error)
    }
  }
  const fetchProductsByCategory = async (category: Category): Promise<Product[]> => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/categories?category=${category}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Product[] = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching user:', error.message)
      } else {
        console.error('An unknown error occurred:', error)
      }
      throw error
    }
  }

  return {
    productsByCollections,
    fetchProductsByCollection,
    fetchProductsByCategory,
  }
})
