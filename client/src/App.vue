<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import BottomMenu from './components/BottomMenu.vue'
import Footer from './components/Footer.vue'
import { provide, ref, type Ref } from 'vue'

export interface IFilter {
  isOpen: boolean
  isOpenLoginModal: boolean
  toggleFilter: () => void
  toggleLoginModal: () => void
}

const isOpen: Ref<boolean> = ref(false)
const isOpenLoginModal: Ref<boolean> = ref(false)

const toggleFilter = () => {
  isOpen.value = !isOpen.value
}

const toggleLoginModal = () => {
  isOpenLoginModal.value = !isOpenLoginModal.value
}

provide('appState', { isOpen, toggleFilter, toggleLoginModal, isOpenLoginModal })
</script>

<!--
TODO:
- [x] add colors, vars, layout & other things in css
- [x] swiper.js for carousels
- [x] finish the frontend with dummy data first
- [] login modal
- [] wishlist page
- [] add to cart sidebar
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
