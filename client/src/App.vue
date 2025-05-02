<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import BottomMenu from './components/BottomMenu.vue'
import Footer from './components/Footer.vue'
import { provide, ref, type Ref } from 'vue'

export interface IFilter {
  isOpen: boolean
  isOpenLoginModal: boolean
  isOpenCart: boolean
  toggleFilter: () => void
  toggleLoginModal: () => void
  toggleCart: () => void
}

const isOpen: Ref<boolean> = ref(false)
const isOpenLoginModal: Ref<boolean> = ref(false)
const isOpenCart: Ref<boolean> = ref(false)

const toggleFilter = () => {
  isOpen.value = !isOpen.value
}

const toggleLoginModal = () => {
  isOpenLoginModal.value = !isOpenLoginModal.value
}
const toggleCart = () => {
  isOpenCart.value = !isOpenCart.value
}

provide('appState', {
  isOpen,
  toggleFilter,
  toggleLoginModal,
  isOpenLoginModal,
  isOpenCart,
  toggleCart,
})
</script>

<!--
TODO:
- [x] login modal
- [x] add-cart sidebar
- [] wishlist page
- [] my-account / login / register page
- [] authentication with jwt(localstorage/cookies)
- [] payment gateway with stripe
-->
<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
  <Footer />
  <BottomMenu />
</template>

<style scoped></style>
