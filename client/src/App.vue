<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import BottomMenu from './components/BottomMenu.vue'
import Footer from './components/Footer.vue'
</script>

<!--
TODO:
- [x] authentication with jwt(localstorage/cookies)
- [x] single product page dynamic (fetching from single product endpoint)
- [x] related product carousel in single product page fetch from db
- [x] server/client for product filter + pagination
- [x] add to cart, wishlist store with pinia, rm hardcoded data
- [x] quick view modal, when clicking the search icon in product cart
- []  add dashboard for clients to see the profile info & orders
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
