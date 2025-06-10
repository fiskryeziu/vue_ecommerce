<template>
  <Breadcrumb :items="links" />
  <h1 class="heading">Checkout</h1>
  <main>
    <section class="form-wrapper">
      <form @submit.prevent="submitForm">
        <p class="checkout__subtitle">Billing Details</p>
        <div class="col">
          <label>First name <span>*</span></label>
          <input v-model="form.firstName" type="text" required />
        </div>

        <div class="col">
          <label>Last name <span>*</span></label>
          <input v-model="form.lastName" type="text" required />
        </div>

        <div class="col">
          <label>Country / Region <span>*</span></label>
          <select v-model="form.country" required>
            <option value="">Select Country</option>
            <option value="XK">Kosova</option>
            <option value="AL">Shqiperi</option>
            <option value="MK">North Macedonia</option>
          </select>
        </div>

        <div class="col">
          <label>Street address <span>*</span></label>
          <input v-model="form.streetAddress" type="text" required />
        </div>

        <div class="col">
          <label>Town / City <span>*</span></label>
          <input v-model="form.city" type="text" required />
        </div>

        <div class="col">
          <label>ZIP Code <span>*</span></label>
          <input v-model="form.zipCode" type="text" required />
        </div>

        <div class="col">
          <label>Phone <span>*</span></label>
          <input v-model="form.phone" type="tel" required />
        </div>

        <div class="col">
          <label>Email address <span>*</span></label>
          <input v-model="form.email" type="email" required />
        </div>
      </form>
    </section>
    <section class="orders" v-if="cart.itemCount > 0">
      <p class="checkout__subtitle">Your order</p>
      <div v-for="item in cart.items" :key="item.id" class="orders__item">
        <div class="item__img">
          <img :src="item.image" alt="" />
        </div>
        <div class="item__info">
          <p class="item__title">{{ item.title }}</p>
          <div class="quantity-wrapper">
            <div class="quantity">
              <button @click="cart.decreaseQty(item.id)">−</button>
              <input type="number" :value="item.quantity" min="1" max="99" />
              <button @click="cart.increaseQty(item.id)">+</button>
            </div>
          </div>
        </div>
        <div class="item__price">
          <span>${{ (item.price * item.quantity).toFixed(2) }} </span>
        </div>
      </div>
      <div class="orders__total">
        <p>Total</p>
        <p>${{ cart.totalPrice }}</p>
      </div>
      <button class="orders__btn" v-if="user.isAuthed">Place Order</button>
      <RouterLink to="/my-account" v-else>
        <button class="orders__btn-disabled">Login to place order</button>
      </RouterLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import Breadcrumb from '../components/Breadcrumb.vue'
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const form = reactive({
  firstName: '',
  lastName: '',
  companyName: '',
  country: '',
  streetAddress: '',
  city: '',
  zipCode: '',
  phone: '',
  email: '',
})

function submitForm() {
  console.log('Form data:', form)
}
const cart = useCartStore()
const router = useRouter()
const user = useUserStore()

const links = [
  { label: 'Home', link: '/' },
  { label: 'Shop', link: '/shop' },
  { label: 'Cart', link: '' },
]

watch(
  () => cart.itemCount,
  (newCount, oldCount) => {
    if (newCount === 0) router.push('/cart')
  },
  { immediate: true },
)
</script>

<style scoped>
main {
  display: flex;
  align-items: start;
  padding: 1em;
  gap: 1em;
}

form select,
form input {
  border: 1px solid var(--lighter);
  padding: 0.5em;
}

.form-wrapper {
  flex: 0 0 58.2%;
  max-width: 58.2%;
}

.checkout__subtitle {
  font-weight: var(--font-medium);
  font-size: var(--text-2xl);
  padding: 1em;
}
form > div {
  margin-bottom: 2em;
}

label {
  font-weight: var(--font-semibold);
}

label span {
  color: var(--danger);
}

.orders {
  flex: 0 0 41%;
  max-width: 41%;

  display: flex;
  flex-direction: column;
  border: 1px solid var(--primary);
  padding-inline: 2em;
}

.orders__item {
  display: flex;
  align-items: center;
  gap: 1em;
  padding-block: 1em;
  border-bottom: 1px solid var(--lightest);
}
.item__img {
  width: 50px;
  height: 50px;
}

.item__title {
  width: 15ch;
  color: var(--secondary);
}

.item__info {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
}

.item__qty p {
  color: var(--secondary);
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

.item__price {
  margin-left: auto;
  font-weight: var(--font-medium);
}

.orders__total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1em;
  font-weight: var(--font-medium);
}

.orders__btn,
.orders__btn-disabled {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  color: var(--background);
  margin-block: 1em;
  padding: 1em;
  font-weight: var(--font-medium);
  width: 100%;
}

@media screen and (max-width: 1024px) {
  .item__img {
    display: none;
  }

  .orders__btn,
  .orders__btn-disabled {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 0;
  }
}
@media screen and (max-width: 768px) {
  main {
    flex-direction: column;
  }

  .form-wrapper {
    flex: 0 0 100%;
    max-width: 100%;
    width: 100%;
  }

  .orders {
    flex: 0 0 100%;
    max-width: 100%;
    width: 100%;
  }
}
</style>
