<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import BottomMenu from './components/BottomMenu.vue'
import Footer from './components/Footer.vue'
import { provide, ref, type Ref } from 'vue'

const isOpen: Ref<boolean> = ref(false)

const toggleFilter = () => {
  isOpen.value = !isOpen.value
}

provide('filterIsOpen', { isOpen, toggleFilter })
</script>

<!--
TODO:
- [x] add colors, vars, layout & other things in css
- [x] swiper.js for carousels
- [] finish the frontend with dummy data first
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
