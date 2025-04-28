<template>
  <div class="bottom-nav" v-if="route.name !== 'product'">
    <RouterLink to="/" class="col center">
      <Home style="color: var(--secondary)" />
      <p class="text-xs uppercase">Home</p>
    </RouterLink>
    <div class="bottom-nav__filter col center" v-if="route.name === 'shop'">
      <SlidersHorizontal style="color: var(--secondary)" @click="toggleFilter" />
      <p class="text-xs uppercase">Filter</p>
    </div>
    <div class="col center">
      <Search style="color: var(--secondary)" />
      <p class="text-xs uppercase">Search</p>
    </div>
    <RouterLink to="/wishlist" class="col center">
      <Heart style="color: var(--secondary)" />
      <p class="text-xs uppercase">WishList</p>
    </RouterLink>
    <div class="col center">
      <User style="color: var(--secondary)" @click="toggleLoginModal" />
      <p class="text-xs uppercase">Account</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFilter } from '@/App.vue'
import { Heart, Home, Search, SlidersHorizontal, User } from 'lucide-vue-next'
import { inject } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const context = inject<IFilter>('appState')

if (!context) {
  throw new Error('appState not provided!')
}

const { toggleFilter, toggleLoginModal } = context
</script>

<style scoped>
.bottom-nav {
  display: none;
  position: fixed;
  padding: 0.5em 3em;
  bottom: 0;
  z-index: 1;
  background-color: var(--background);
}

.bottom-nav__filter {
  display: none;
}
@media screen and (max-width: 1024px) {
  .bottom-nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .bottom-nav__filter {
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .bottom-nav {
    padding: 0.5em 1em;
  }
}
</style>
