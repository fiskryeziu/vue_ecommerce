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
          <tr v-if="length > 0">
            <!-- TODO: remove from cart -->
            <td><XCircle /></td>
            <td><img src="/products/earrings.jpg" alt="" /></td>
            <td class="cart__title">
              <RouterLink to="/product/1">Blue Stripes & Stone Earrings</RouterLink>
            </td>
            <td class="cart__price">$249.00</td>
            <td>
              <div class="quantity">
                <!-- NOTE: we'll use the context in the future for the qty in addcart.vue -->
                <button>−</button>
                <input type="number" :value="2" min="1" max="99" />
                <button>+</button>
              </div>
            </td>
          </tr>
          <tr v-else class="table__empty">
            <td colspan="5">No products added to the cart</td>
          </tr>
        </tbody>
      </table>
      <!--  768-px -->

      <section v-if="length > 0">
        <div class="cart__img">
          <img src="/products/earrings.jpg" alt="" />
        </div>
        <div class="cart__info">
          <div>
            <p>Circle of Light Heart Earrings</p>
            <XCircle />
          </div>
          <div>
            <span>Quantity</span>
            <div>
              <div class="quantity">
                <button>−</button>
                <input type="number" :value="2" min="1" max="99" />
                <button>+</button>
              </div>
            </div>
          </div>
          <div>
            <span>Price:</span>
            <p class="cart__price left">$249</p>
          </div>
        </div>
      </section>
      <section class="total-info">
        <h2>Cart Totals</h2>
        <div>
          <p>Total</p>
          <p class="cart__price">$400.00</p>
        </div>
        <button>Proceed to checkout</button>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import { XCircle } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const links = [
  { label: 'Home', link: '/' },
  { label: 'Cart', link: '' },
]

// mock cart product length
const length = 1
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
  z-index: 4;
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
