<template>
  <Breadcrumb :items="links" />
  <main>
    <h1 class="heading">Cart</h1>
    <div class="section-wrapper">
      <!--  768+px -->
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="cart.itemCount" v-for="item in cart.items" :key="item.id">
            <td><XCircle @click="cart.removeItem(item.id)" /></td>
            <td><img :src="item.image" alt="" /></td>
            <td class="cart__title">
              <RouterLink :to="`/product/${item.slug}`">{{ item.title }}</RouterLink>
            </td>
            <td class="cart__price">${{ item.price }}</td>
            <td>
              <div class="quantity">
                <!-- TODO: increment or decreate the quantity -->
                <button @click="cart.decreaseQty(item.id)">−</button>
                <input
                  type="number"
                  :value="item.quantity"
                  min="1"
                  max="99"
                  @input="onQuantityChange($event, item.id)"
                />
                <button @click="cart.increaseQty(item.id)">+</button>
              </div>
            </td>
          </tr>
          <tr v-else class="table__empty">
            <td colspan="5">No products added to the cart</td>
          </tr>
        </tbody>
      </table>
      <!--  768-px -->

      <section v-if="cart.itemCount" v-for="item in cart.items" :key="item.id">
        <div class="cart__img">
          <img :src="item.image" alt="" />
        </div>
        <div class="cart__info">
          <div>
            <p>{{ item.title }}</p>
            <XCircle @click="cart.removeItem(item.id)" />
          </div>
          <div>
            <span>Quantity</span>
            <div>
              <div class="quantity">
                <button @click="cart.decreaseQty(item.id)">−</button>
                <input
                  type="number"
                  :value="item.quantity"
                  min="1"
                  max="99"
                  @input="onQuantityChange($event, item.id)"
                />
                <button @click="cart.increaseQty(item.id)">+</button>
              </div>
            </div>
          </div>
          <div>
            <span>Price:</span>
            <p class="cart__price left">${{ item.price }}</p>
          </div>
        </div>
      </section>
      <section class="total-info">
        <h2>Cart Totals</h2>
        <div>
          <p>Total</p>
          <p class="cart__price">${{ cart.totalPrice }}</p>
        </div>
        <RouterLink to="/checkout">
          <button>Proceed to checkout</button>
        </RouterLink>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import Breadcrumb from '../components/Breadcrumb.vue'
import { XCircle } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { onQuantityChange } from '@/utils'

const links = [
  { label: 'Home', link: '/' },
  { label: 'Cart', link: '' },
]
const cart = useCartStore()
</script>

<style scoped>
tbody {
  border-block: 1px solid var(--lightest);
}
.section-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 1em;
}

table {
  width: 100%;
  display: none;
}

th {
  font-weight: 500;
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

.cart__price {
  font-weight: var(--font-medium);
}

.cart__add-to-cart button {
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

/* mobile cart */

section {
  display: none;
}
.cart__img {
  flex: 0 0 20%;
  min-width: 100px;
}
.cart__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cart__info {
  flex-basis: 80%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.cart__info div {
  display: flex;
  justify-content: space-between;
}

.cart__info span {
  font-weight: var(--font-medium);
}

.quantity {
  display: inline-flex;
  border: 1px solid #ccc;
  border-radius: 2px;
  overflow: hidden;
  padding: 0.3em;
}

.quantity button {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quantity input {
  width: 40px;
  text-align: center;
  border: none;
  font-size: 18px;
}
.quantity input::-webkit-outer-spin-button,
.quantity input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.total-info {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  border: 1px solid var(--primary);
  padding: 1em;
}

.total-info div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-info button {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  padding-block: 1em;
  color: var(--background);
  z-index: 2;
}

@media screen and (min-width: 1024px) {
  .section-wrapper {
    flex-direction: row;
    margin: 0.3em;
  }
  .total-info {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    width: 100%;
    margin: 1em;
    padding: 0.5em;
  }

  .total-info button {
    position: initial;
    padding-block: 0.7em;
  }
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
