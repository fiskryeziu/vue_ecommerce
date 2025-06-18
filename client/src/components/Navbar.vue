<template>
  <nav class="col" style="position: relative">
    <div class="nav-upper center">
      <div class="wrapper">
        <div class="menu">
          <Menu @click="toggleMenu" />
        </div>

        <form @submit.prevent="() => {}">
          <input
            type="text"
            placeholder="Search products"
            v-model="product.searchQuery"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            autocomplete="off"
          />
          <button class="center" type="submit" aria-label="Search" :disabled="product.isSearching">
            <template v-if="product.isSearching">
              <Loader2 class="spinner" strokeWidth="1.3" />
            </template>
            <template v-else>
              <Search strokeWidth="1.3" />
            </template>
          </button>
          <section class="search__products" v-if="product.searchResults && isInputFocused">
            <div v-for="product in product.searchResults" :key="product.id">
              <div class="search__product">
                <div class="row center gap-1">
                  <div class="search__prouduct__img">
                    <img :src="product.image" alt="" />
                  </div>
                  <p class="search__prouduct__title">
                    {{ product.title }}
                  </p>
                </div>
                <p class="search__prouduct__price">
                  {{ product.price }}
                </p>
              </div>
            </div>
          </section>
        </form>
        <h1 class="uppercase text-light">Gold & Co</h1>
        <div class="icons">
          <div class="icon" v-if="showLoginIcon">
            <User :strokeWidth="1" @click="ui.toggleLoginModal" />
          </div>
          <div class="icon" v-else>
            <RouterLink to="/my-account">
              <User :strokeWidth="2" />
            </RouterLink>
          </div>
          <!-- NOTE: the data count attr static for now. -->
          <div class="icon" :data-count="wishlist.count">
            <RouterLink to="/wishlist">
              <Heart :strokeWidth="1" />
            </RouterLink>
          </div>
          <div class="icon" :data-count="cart.itemCount">
            <ShoppingCart :strokeWidth="1" @click="openCart" />
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
  <LoginModal :open="ui.isOpenLoginModal" @toggle="ui.toggleLoginModal" />
  <AddCart :open="ui.isOpenCart" @toggle="ui.toggleCart" />
  <QuickView :product="product.quickViewProduct" />
  <SearchModal />
</template>

<script setup lang="ts">
import { Heart, Loader2, Menu, Search, ShoppingCart, User } from 'lucide-vue-next'
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import MobileMenu from './MobileMenu.vue'
import LoginModal from './LoginModal.vue'
import AddCart from './AddCart.vue'
import { useUserStore } from '@/stores/userStore'
import { useUIStore } from '@/stores/uiStore'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import QuickView from './QuickView.vue'
import { useProductsStore } from '@/stores/productsStore'
import SearchModal from './SearchModal.vue'

const user = useUserStore()
const ui = useUIStore()
const cart = useCartStore()
const wishlist = useWishlistStore()
const product = useProductsStore()

const route = useRoute()
const router = useRouter()

const openCart = () => {
  if (route.name === 'cart') {
    return router.push('/cart')
  }
  ui.toggleCart()
}

const showLoginIcon = computed(() => !user.isAuthed)

const isOpen = ref(false)

const isInputFocused = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (!target) return
  product.updateSearchQuery(target.value)
}

const onFocus = () => {
  isInputFocused.value = true
}

const onBlur = () => {
  isInputFocused.value = false
}

onMounted(() => {
  user.isLoggedIn()
})
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
  position: relative;
  border: 1px solid var(--lightest);
  display: flex;
  flex: 0 0 33%;
  max-width: 33%;
}

.search__products {
  position: absolute;
  top: 40px;
  z-index: 3;
  background-color: var(--background);
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 55vh;
  overflow-x: hidden;
  width: 100%;
  z-index: 98;
}

.search__product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  padding: 0.3em;
}

.search__prouduct__img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.search__prouduct__title {
  font-size: var(--text-sm);
}
.search__prouduct__price {
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
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

.spinner {
  animation: spin 1s linear infinite;
  transform-origin: center center;
  display: inline-block;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
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

  .search__products {
    display: none;
  }

  @media screen and (max-width: 624px) {
    h1 {
      font-size: var(--text-2xl);
    }
  }
}
</style>
