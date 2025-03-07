<template>
  <nav class="col">
    <div class="nav-upper center">
      <div class="wrapper">
        <div class="menu">
          <Menu @click="toggleMenu" />
        </div>

        <form>
          <input type="text" placeholder="Search products" />
          <button class="center">
            <Search strokeWidth="1.3" />
          </button>
        </form>
        <h1 class="text-3xl uppercase text-light">Gold & Co</h1>
        <div class="icons">
          <div class="icon">
            <User />
          </div>
          <!-- NOTE: the data count attr static for now. -->
          <div class="icon" data-count="2">
            <Heart />
          </div>
          <div class="icon" data-count="1">
            <ShoppingCart />
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/shop">Shop</RouterLink>
      <RouterLink to="/about">About Us</RouterLink>
      <RouterLink to="/about">Contact</RouterLink>
    </div>
  </nav>
  <MobileMenu :open="isOpen" @toggle="toggleMenu" />
</template>

<script setup lang="ts">
import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import MobileMenu from './MobileMenu.vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
nav {
  padding-inline: 1em;
}

.nav-upper {
  height: 85px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 100%;
  max-width: 100%;
}
form {
  border: 1px solid var(--lightest);
  display: flex;
}

form > input {
  padding-left: 1em;
  color: var(--text-primary);
  width: 80%;
  padding-block: 0.5em;
}
form > button {
  flex-grow: 1;
  padding: 0;
}

h1 {
  display: flex;
  flex-basis: 50%;
  justify-content: center;
}

form {
  display: flex;
  flex-basis: 25%;
  justify-content: start;
}
.menu {
  display: none;
}
.icons {
  display: flex;
  flex-basis: 25%;
  justify-content: end;
  gap: 1em;
}

.icon {
  position: relative;
}

.icon:not(:first-child)::before {
  content: attr(data-count);
  position: absolute;
  top: -0.8em;
  right: -0.8em;
  height: 1.5em;
  width: 1.5em;
  font-size: var(--text-xs);
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

@media screen and (max-width: 1024px) {
  .icon:not(:last-child) {
    display: none;
  }
  form {
    display: none;
  }
  .menu {
    display: flex;
    flex-basis: 25%;
    justify-content: start;
  }
}
</style>
