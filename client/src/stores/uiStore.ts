import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isOpen = ref(false)
  const isOpenLoginModal = ref(false)
  const isOpenCart = ref(false)

  const toggleFilter = computed(() => {
    isOpen.value = !isOpen.value
  })

  const toggleLoginModal = computed(() => {
    isOpenLoginModal.value = !isOpenLoginModal.value
  })

  const toggleCart = computed(() => {
    isOpenCart.value = !isOpenCart.value
  })

  return { isOpen, isOpenLoginModal, isOpenCart, toggleFilter, toggleLoginModal, toggleCart }
})
