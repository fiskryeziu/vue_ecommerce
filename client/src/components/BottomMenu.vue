<template>
  <div class="bottom-nav">
    <RouterLink to="/" class="col center">
      <Home style="color: var(--secondary)" />
      <p class="text-xs uppercase">Home</p>
    </RouterLink>
    <div class="col center">
      <Search style="color: var(--secondary)" />
      <p class="text-xs uppercase">Search</p>
    </div>
    <RouterLink to="/wishlist" class="col center">
      <Heart style="color: var(--secondary)" />
      <p class="text-xs uppercase">WishList</p>
    </RouterLink>
    <div class="col center">
      <User style="color: var(--secondary)" />
      <p class="text-xs uppercase">Account</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heart, Home, Search, User } from 'lucide-vue-next'
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

@media screen and (max-width: 1024px) {
  .bottom-nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

@media screen and (max-width: 600px) {
  .bottom-nav {
    padding: 0.5em 1em;
  }
}
</style>
