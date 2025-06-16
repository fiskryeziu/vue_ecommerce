import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isOpen = ref(false)
  const isOpenLoginModal = ref(false)
  const isOpenCart = ref(false)
  const isQuickViewOpen = ref(false)
  const message = ref<{ show: boolean; type: string; text: string }>({
    show: false,
    type: '',
    text: '',
  })

  const showMessage = (type: string, text: string) => {
    message.value = { show: true, type, text }
    setTimeout(() => {
      message.value.show = false
    }, 3000)
  }

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
    message,
    toggleFilter,
    toggleLoginModal,
    toggleCart,
    openQuickView,
    closeQuickView,
    showMessage,
  }
})
