<template>
  <aside class="addcart" :class="{ 'addcart-active': open }">
    <div class="addcart__heading">
      <h3>Your Cart ({{ 2 }})</h3>
      <p @click="emit('toggle')">Close</p>
    </div>

    <div class="addcart__main" v-if="true">
      <div class="addcart__items">
        <div
          ref="scrollContent"
          class="addcart__items-scroll-content"
          @scroll="handleScroll"
          @mouseenter="isHovering(true)"
          @mouseleave="isHovering(false)"
        >
          <div v-for="i in 10" :key="i" class="addcart__item">
            <div class="item__img">
              <img src="/products/earrings.jpg" alt="" />
            </div>
            <div class="item__info">
              <p class="item__title">Blue Stripes & Stone Earrings</p>
              <div class="quantity-wrapper">
                <div class="quantity">
                  <!-- NOTE: we'll use the context in the future for the qty in addcart.vue -->
                  <button>−</button>
                  <input type="number" :value="2" min="1" max="99" />
                  <button>+</button>
                </div>
              </div>
              <div class="item__qty row gap">
                <!--TODO: qty X price -->
                <p>4</p>
                <p>x</p>
                <span>$249.00</span>
              </div>
            </div>
            <div class="item__remove">
              <XCircle :strokeWidth="1" />
            </div>
          </div>
        </div>
        <div class="scroll-pane" :class="{ active: hovering }">
          <div
            class="scroll-slider"
            :style="{
              height: sliderHeight + 'px',
              transform: `translateY(${sliderTop}px)`,
            }"
          ></div>
        </div>
      </div>

      <div class="addcart__buttons">
        <div>
          <p>Subtotal:</p>
          <span>$815.00</span>
        </div>
        <button class="outline">View Cart</button>
        <button>Checkout</button>
      </div>
    </div>

    <div class="addcart__empty" v-else>
      <ShoppingCart :size="100" />
      <p>Shopping cart is empty</p>
      <RouterLink to="/shop" @click="emit('toggle')">
        <button>Continue Shopping</button>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ShoppingCart, XCircle } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

defineProps({ open: Boolean })
const emit = defineEmits(['toggle'])

const hovering = ref(false)
const scrollContent = ref<HTMLElement | null>(null)
const sliderHeight = ref(0)
const sliderTop = ref(0)

const isHovering = (value: boolean) => {
  hovering.value = value
  console.log(hovering.value)
}

const handleScroll = () => {
  if (!scrollContent.value) return

  const content = scrollContent.value
  const visibleHeight = content.clientHeight
  const scrollHeight = content.scrollHeight
  const scrollTop = content.scrollTop

  const ratio = visibleHeight / scrollHeight
  sliderHeight.value = visibleHeight * ratio
  sliderTop.value = scrollTop * ratio
}

onMounted(() => {
  handleScroll()
})
</script>

<style scoped>
.addcart {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  right: -100%;
  max-width: 370px;
  width: 100%;
  height: 100vh;
  background-color: var(--background);
  z-index: 2;
  padding: 1em 0.4em 1em 1em;
  transition: right 500ms ease-in-out;
}

.addcart-active {
  right: 0;
}

.addcart__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1em;
}
.addcart__heading h3 {
  font-size: var(--text-xl);
  font-weight: var(--text-normal);
}
.addcart__heading p {
  cursor: pointer;
}

.addcart__main {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  align-items: stretch;
}

.addcart__items {
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.addcart__item {
  display: flex;
  align-items: center;
  padding-inline: 0.3em 1em;
  padding-block: 1em;
  border-bottom: 1px solid var(--lightest);
}
.item__img {
  width: 100px;
  height: 100px;
}

.item__title {
  width: 20ch;
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

.item__remove {
  margin-left: auto;
}

.addcart__items-scroll-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  overflow: scroll;
  overflow-x: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-overflow-scrolling: touch;
}
.addcart__items-scroll-content::-webkit-scrollbar {
  display: none;
}
.scroll-pane {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
  width: 5px;
  right: 0;
  top: 0;
  bottom: 0;
  visibility: hidden;
  opacity: 0.1;
  transition: 0.2s;
  border-radius: 5px;
}

.scroll-pane.active {
  visibility: visible;
  opacity: 0.9;
}
.scroll-slider {
  background: #444;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  margin: 0 1px;
  border-radius: 3px;
}

.addcart__buttons {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  padding: 1em 1em 0 1em;
  border-top: 1px solid var(--lightest);
}

.addcart__buttons div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.addcart__buttons button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  padding-block: 0.7em;
  margin-block: 0.2em;
  color: var(--background);
}

.addcart__buttons span {
  font-weight: var(--font-medium);
}

.addcart__buttons .outline {
  color: var(--primary);
  background-color: var(--background);
  border: 2px solid var(--primary);
  transition: all 200ms ease;
}

.outline:hover {
  background-color: var(--primary);
  color: var(--background);
}

.addcart__empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  margin-top: 3em;
}
.addcart__empty > svg,
p {
  color: var(--secondary);
}

.addcart__empty a {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  padding-block: 0.7em;
  margin-block: 2em;
  color: var(--background);
}
</style>
