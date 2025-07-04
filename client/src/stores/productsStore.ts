import type { Category, Feature, Product, TProducts, TSearchProducts } from '@/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

export const useProductsStore = defineStore('products', () => {
  const productsByCollections: Ref<Record<Feature, Product[]>> = ref({
    'new-arrivals': [],
    featured: [],
    'best-sellers': [],
  })
  const quickViewProduct = ref<Product>()
  const route = useRoute()

  const searchQuery = ref('')
  const searchResults: Ref<TSearchProducts[]> = ref([])
  const isSearching = ref(false)

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null

  const updateSearchQuery = (newQuery: string) => {
    searchQuery.value = newQuery

    if (debounceTimeout) clearTimeout(debounceTimeout)

    if (!newQuery) {
      searchResults.value = []
      return
    }

    debounceTimeout = setTimeout(async () => {
      isSearching.value = true
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/search?q=${encodeURIComponent(newQuery)}`,
        )
        const data = await res.json()
        searchResults.value = data
      } catch (err) {
        console.error('Search failed:', err)
        searchResults.value = []
      } finally {
        isSearching.value = false
      }
    }, 300)
  }

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

  const getProducts = async (page = 1) => {
    try {
      const params = new URLSearchParams(route.query as Record<string, string>)
      params.set('page', String(page))

      const response = await fetch(`http://localhost:3000/api/products?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: TProducts = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching products:', error.message)
      } else {
        console.error('An unknown error occurred:', error)
      }
      throw error
    }
  }

  const getQuickViewProduct = (product: Product) => {
    quickViewProduct.value = product
  }

  const fetchOrders = async () => {
    const res = await fetch('http://localhost:3000/api/products/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch orders')
    }

    const data = await res.json()
    console.log(data)
    return data
  }

  return {
    productsByCollections,
    quickViewProduct,
    fetchProductsByCollection,
    fetchProductsByCategory,
    getProducts,
    getQuickViewProduct,
    fetchOrders,
    searchQuery,
    searchResults,
    isSearching,
    updateSearchQuery,
  }
})
