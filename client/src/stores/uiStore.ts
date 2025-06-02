import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isOpen = ref(false)
  const isOpenLoginModal = ref(false)
  const isOpenCart = ref(false)

  const toggleFilter = () => {
    isOpen.value = !isOpen.value
  }

  const toggleLoginModal = () => {
    isOpenLoginModal.value = !isOpenLoginModal.value
  }

  const toggleCart = () => {
    isOpenCart.value = !isOpenCart.value
  }

  return { isOpen, isOpenLoginModal, isOpenCart, toggleFilter, toggleLoginModal, toggleCart }
})
