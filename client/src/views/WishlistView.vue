<template>
  <Breadcrumb :items="links" />
  <main>
    <h1 class="heading">Wishlist</h1>
    <!--  768+px -->
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Product name</th>
          <th>Unit price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="wishlist.items.length > 0" v-for="item in wishlist.items" :key="item.id">
          <!-- TODO: remove from wishlist -->
          <td><XCircle @click="wishlist.removeItem(item.id)" /></td>
          <td><img :src="item.image" alt="" /></td>
          <td class="wishlist__title">
            <RouterLink :to="`product/${item.slug}`">{{ item.title }}</RouterLink>
          </td>
          <td class="wishlist__price">${{ item.price }}</td>
          <td class="wishlist__add-to-cart">
            <button @click="addCartHandler(item)">Add to cart</button>
          </td>
        </tr>
        <tr v-else class="table__empty">
          <td colspan="5">No products added to the wishlist</td>
        </tr>
      </tbody>
    </table>
    <!--  768-px -->

    <section v-for="item in wishlist.items" :key="item.id">
      <div class="wishlist__img">
        <img :src="item.image" alt="" />
      </div>
      <div class="wishlist__info">
        <div>
          <p>{{ item.title }}</p>
          <XCircle class="left" @click="wishlist.removeItem(item.id)" />
        </div>
        <div>
          <span>Price:</span>
          <p class="wishlist__price left">${{ item.price }}</p>
        </div>
        <button @click="addCartHandler(item)">Add to cart</button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import type { Product } from '@/types'
import { XCircle } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const links = [
  { label: 'Home', link: '/' },
  { label: 'Wishlist', link: '' },
]

const wishlist = useWishlistStore()
const cart = useCartStore()
const ui = useUIStore()

const addCartHandler = (product: Product) => {
  cart.addItem(product)
  wishlist.removeItem(product.id)
  ui.toggleCart()
}
</script>

<style scoped>
tbody {
  border-block: 1px solid var(--lightest);
}

table {
  width: 100%;
  display: none;
}

svg {
  cursor: pointer;
  color: var(--secondary);
}

thead th:nth-child(2) {
  width: 100px;
}
td,
th {
  padding-block: 1em;
  text-align: center;
}
tbody td {
  vertical-align: middle;
  text-align: center;
  padding: 1rem;
}

.table__empty td {
  text-align: center;
  padding-block: 1em;
  color: var(--secondary);
}

.wishlist__price {
  font-weight: var(--font-medium);
}

.wishlist__add-to-cart button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  padding-block: 0.7em;
  margin-block: 0.2em;
  color: var(--background);
  flex-shrink: 0;
}

/* mobile wishlist */

section {
  display: none;
}
.wishlist__img {
  flex: 0 0 20%;
  min-width: 100px;
}
.wishlist__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.wishlist__info {
  flex-basis: 80%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.wishlist__info div {
  display: flex;
  justify-content: space-between;
}

.wishlist__info span {
  font-size: 12px;
}

.info__left p:not(:first-child) {
  font-size: 12px;
}

.left {
  color: var(--secondary);
}

@media screen and (min-width: 768px) {
  table {
    display: table;
  }
}
@media screen and (max-width: 768px) {
  section {
    display: flex;
    gap: 1em;
    padding: 1em;
    width: 100%;
  }
}
</style>
