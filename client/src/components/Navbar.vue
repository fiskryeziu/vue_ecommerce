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
        <h1 class="uppercase text-light">Gold & Co</h1>
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

    <div class="nav-lower">
      <RouterLink to="/" class="nav-lower__link">Home</RouterLink>
      <RouterLink to="/shop" class="nav-lower__link">Shop</RouterLink>
      <RouterLink to="/about" class="nav-lower__link">About Us</RouterLink>
      <RouterLink to="/contact" class="nav-lower__link">Contact</RouterLink>
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
.nav-upper {
  height: 85px;
  padding-inline: 1em;
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

.nav-lower {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3em;
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  text-transform: uppercase;
  border-top: 1px solid var(--lightest);
  padding: 1em;
}

.nav-lower__link {
  position: relative;
}

.nav-lower__link:before {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: all 300ms ease;
}

.nav-lower__link:hover::before {
  width: 100%;
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

  h1 {
    font-size: var(--text-3xl);
  }

  .nav-lower {
    display: none;
  }

  @media screen and (max-width: 624px) {
    h1 {
      font-size: var(--text-2xl);
    }
  }
}
</style>
