<template>
  <div class="search__modal__wrapper" :class="{ 'search__modal-active': ui.isOpenSearchModal }">
    <div class="search__modal__div">
      <div class="search__modal__close">
        <X strokeWidth="1.3" @click="ui.toggleSearchModal" />
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
      </form>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import { useUIStore } from '@/stores/uiStore'
import { Loader2, Search, X } from 'lucide-vue-next'
import { ref } from 'vue'

const product = useProductsStore()
const ui = useUIStore()

const isInputFocused = ref(false)

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
</script>

<style scoped>
.search__modal__wrapper {
  position: fixed;
  display: none;
  top: -1000%;
  left: 0;
  background-color: var(--background);
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: top 1s ease;
}
.search__modal-active {
  top: 0;
}

.search__modal__div {
  position: relative;
  display: flex;
  flex-direction: column;
  place-items: center;
  padding-top: 4em;
}

.search__modal__close {
  position: absolute;
  top: 1em;
  right: 1em;
}

form {
  position: relative;
  border: 1px solid var(--lightest);
  display: flex;
  width: 60%;
}

.search__products {
  background-color: var(--background);
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 55vh;
  overflow-x: hidden;
  width: 60%;
  z-index: 1;
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

@media screen and (max-width: 1024px) {
  .search__modal__wrapper {
    display: initial;
  }
}
@media screen and (max-width: 768px) {
  .search__products,
  form {
    width: 90%;
  }
}
</style>
