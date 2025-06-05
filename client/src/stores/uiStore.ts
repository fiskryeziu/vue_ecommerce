import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isOpen = ref(false)
  const isOpenLoginModal = ref(false)
  const isOpenCart = ref(false)
  const isQuickViewOpen = ref(false)

  const toggleFilter = () => {
    isOpen.value = !isOpen.value
  }

  const toggleLoginModal = () => {
    isOpenLoginModal.value = !isOpenLoginModal.value
  }

  const toggleCart = () => {
    isOpenCart.value = !isOpenCart.value
  }
  const openQuickView = () => {
    isQuickViewOpen.value = true
  }
  const closeQuickView = () => {
    isQuickViewOpen.value = false
  }

  return {
    isOpen,
    isOpenLoginModal,
    isOpenCart,
    isQuickViewOpen,
    toggleFilter,
    toggleLoginModal,
    toggleCart,
    openQuickView,
    closeQuickView,
  }
})
