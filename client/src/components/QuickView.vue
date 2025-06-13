<template>
  <div class="overlay" v-if="ui.isQuickViewOpen" @click="ui.closeQuickView"></div>
  <main :class="{ 'quickview-active': ui.isQuickViewOpen }">
    <section class="product" v-if="product.quickViewProduct">
      <XCircle class="close-btn" strokeWidth="1" @click="ui.closeQuickView" />
      <section class="product__img">
        <img :src="product.quickViewProduct.image" alt="" />
      </section>
      <section class="product__info">
        <p class="product__title">{{ product.quickViewProduct.title }}</p>
        <div class="row">
          <Star v-for="n in product.quickViewProduct.rating" fill="#222222" :size="14" />
        </div>
        <p class="product__price">${{ product.quickViewProduct.price }}</p>
        <p class="product__compareprice">${{ product.quickViewProduct.compareprice }}</p>
        <p class="product__desc">{{ product.quickViewProduct.description }}</p>
        <p class="product__availability">
          Availability: <span style="color: green">In Stock</span>
        </p>
        <div class="product__buy">
          <div class="product__add-cart">
            <div class="quantity-wrapper">
              <div class="quantity">
                <button @click="dec()">−</button>
                <input type="number" :value="qty" min="1" max="99" />
                <button @click="inc()">+</button>
              </div>
            </div>
            <button
              class="product__cart center"
              ref="targetRef"
              @click="addCartHandler(product.quickViewProduct, qty)"
            >
              ADD TO CART
            </button>
          </div>
          <button class="product__buy-now center">BUY IT NOW</button>
        </div>
        <div class="row gap">
          <Heart />
          <p>Add to wish list</p>
        </div>
        <div class="row gap">
          <Clock />
          <p>Estimated Delivery: <span style="color: var(--secondary)">27 April - 01 May</span></p>
        </div>

        <section class="product__benefits">
          <article class="product__benefit">
            <Truck :size="40" :strokeWidth="1" />
            <p>Free <br />Shipping</p>
          </article>
          <article class="product__benefit">
            <ShieldCheck :size="40" :strokeWidth="1" />
            <p>1 Year <br />Warranty</p>
          </article>
          <article class="product__benefit">
            <Handshake :size="40" :strokeWidth="1" />
            <p>Secure <br />Payment</p>
          </article>
          <article class="product__benefit">
            <RotateCcw :size="40" :strokeWidth="1" />
            <p>30 Days <br />Return</p>
          </article>
        </section>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { useProductsStore } from '@/stores/productsStore'
import { useUIStore } from '@/stores/uiStore'
import type { Product } from '@/types'
import {
  Clock,
  Handshake,
  Heart,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
  XCircle,
} from 'lucide-vue-next'
import { ref, watch } from 'vue'

defineProps<{
  product?: Product
}>()

const cart = useCartStore()
const ui = useUIStore()
const product = useProductsStore()

const qty = ref(1)
const targetRef = ref<HTMLElement | null>(null)

const dec = () => {
  if (qty.value === 1) {
    return
  }
  qty.value--
}
const inc = () => {
  if (qty.value === 99) {
    return
  }
  qty.value++
}
const addCartHandler = (product: Product, quantity: number) => {
  cart.addItem(product, quantity)

  ui.closeQuickView()
  ui.toggleCart()
  qty.value = 1
}

watch(
  () => ui.isQuickViewOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  },
)
</script>

<style scoped>
main {
  position: fixed;
  left: 50%;
  top: -199%;
  transform: translateX(-50%);
  max-width: 1000px;
  width: 100%;
  height: 60vh;
  background-color: var(--background);
  z-index: 4;
  transition: top 500ms ease-in;
  overflow: hidden;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
}

.quickview-active {
  top: 10%;
}

.product {
  position: relative;
  display: flex;
  height: 100%;
}

.close-btn {
  position: absolute;
  left: 0.5em;
  top: 0.5em;
  cursor: pointer;
  z-index: 4;
}

.product__img {
  display: flex;
  flex-basis: 50%;
  height: 100%;
}

.product__img img {
  width: 100%;
  object-fit: contain;
  padding: 1em;
}
.product__info {
  display: flex;
  flex-basis: 50%;
  flex-direction: column;
  padding: 1em;
  gap: 1em;
  height: 100%;
  overflow-y: auto;
}

.product__title {
  font-size: 32px;
}
.product__price {
  font-size: 22px;
}

.product__compareprice {
  color: var(--secondary);
  text-decoration: line-through;
}
.product__desc {
  color: var(--secondary);
}

.product__add-cart {
  display: flex;
  align-items: center;
  gap: 1em;
}
.quantity-wrapper {
  font-family: sans-serif;
  text-align: center;
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

.product__cart {
  flex-grow: 1;
  background-color: var(--primary);
  color: white;
  width: calc(300px - 105.6px);
  padding-block: 0.3em;
  text-align: center;
}

.product__buy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  align-items: start;
}
.product__buy > button {
  background-color: var(--lightest);
  max-width: 300px;
  width: 100%;
  padding-block: 0.3em;
}

.product__benefits {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-block: 2em;
  background-color: var(--light);
}

.product__benefit {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1 0 150px;
}

.product__benefit p {
  color: var(--secondary);
  text-align: center;
}

.sticky__cart {
  position: fixed;
  bottom: -100px;
  left: 0;
  height: 80px;
  width: 100%;
  background-color: var(--background);
  transition: bottom 250ms ease-in;
  display: flex;
  justify-content: space-between;
  padding-inline: 1em;
  z-index: 1;
}

.sticky__cart-active {
  bottom: 0;
}
.mobile__cart {
  position: fixed;
  bottom: 0;
  left: 0;
  display: none;
  z-index: 1;
}

@media (max-width: 768px) {
  main {
    height: 100vh;
    overflow-y: auto;
    padding: 2em;
    margin-top: 2em;
    max-width: 90%;
  }

  .quickview-active {
    top: 0;
  }

  .close-btn {
    left: -1em;
    top: -1em;
  }

  .product {
    flex-direction: column;
    height: auto;
  }

  .product {
    flex-direction: column;
  }

  .product__img,
  .product__info {
    flex-basis: 100%;
  }

  .product__cart,
  .product__buy-now {
    display: none;
  }

  .sticky__cart {
    display: none;
  }

  .mobile__cart {
    display: flex;
    width: 100%;
  }
  .mobile__cart button {
    text-transform: uppercase;
    font-size: 14px;
    background-color: var(--background);
    flex-grow: 1;
  }
  .mobile__cart button:nth-child(1) {
    background-color: var(--primary);
    padding: 1em;
    color: var(--background);
  }
}
</style>
