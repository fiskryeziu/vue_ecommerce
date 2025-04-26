<template>
  <Breadcrumb :items="links" />
  <!-- product img - product info -->
  <main class="product">
    <section class="product__img">
      <img src="/products/earrings.jpg" alt="" />
    </section>
    <section class="product__info">
      <p class="product__title">Blue Stripes & Stone Earrings</p>
      <div class="row">
        <Star v-for="n in 5" fill="#222222" :size="14" />
      </div>
      <p class="product__price">$249.00</p>
      <p class="product__desc">
        This regulator has a rolled diaphragm and high flow rate with reduced pressure drop.It has
        an excellent degree of condensation.
      </p>
      <p class="product__availability">Availability: <span style="color: green">In Stock</span></p>
      <div class="product__buy">
        <div class="product__add-cart">
          <div class="quantity-wrapper">
            <div class="quantity">
              <button @click="dec()">−</button>
              <input type="number" :value="qty" min="1" max="99" />
              <button @click="inc()">+</button>
            </div>
          </div>
          <button class="product__cart center" ref="targetRef">ADD TO CART</button>
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
      <!-- related products -->
      <section class="product__related-product"></section>
    </section>
  </main>
  <section class="sticky__cart" :class="{ 'sticky__cart-active': !isInView }">
    <div class="row">
      <div class="sticky__cart__img">
        <img src="/products/earrings.jpg" alt="" />
      </div>
      <div class="col gap-1">
        <p style="">Blue Stripes & Stone Earrings</p>
        <div class="row">
          <Star v-for="n in 5" fill="#222222" :size="14" />
        </div>

        <p>$249.00</p>
      </div>
    </div>

    <div class="product__add-cart">
      <div class="quantity-wrapper">
        <div class="quantity">
          <button @click="dec()">−</button>
          <input type="number" :value="qty" min="1" max="99" />
          <button @click="inc()">+</button>
        </div>
      </div>
      <!-- TODO: in this button below will be placed the ref to track if its in view -->
      <button class="product__cart center">ADD TO CART</button>
    </div>
  </section>
  <section class="mobile__cart">
    <button class="center">add to cart</button>
    <button class="center">buy it now</button>
  </section>

  <RelatedProducts />
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue'
import RelatedProducts from '@/components/RelatedProducts.vue'
import { useInView } from '@/composables/useInView'
import { Clock, Handshake, Heart, RotateCcw, ShieldCheck, Star, Truck } from 'lucide-vue-next'
import { ref } from 'vue'

// TODO: where the label is earrings
//      the value will change based
//      on product categories

const links = [
  { label: 'Home', link: '/' },
  { label: 'Shop', link: '/shop' },
  { label: 'Earrings', link: '/shop?categories=earrings' },
  { label: 'current product test', link: '' },
]

const qty = ref(1)
const targetRef = ref<HTMLElement | null>(null)
const { isInView } = useInView(targetRef)

console.log(isInView.value)

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
</script>

<style scoped>
.product {
  display: flex;
}

.product__img {
  display: flex;
  flex-basis: 50%;
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
}

.product__title {
  font-size: 32px;
}
.product__price {
  font-size: 22px;
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
}

@media (max-width: 768px) {
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
