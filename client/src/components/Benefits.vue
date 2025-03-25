<template>
  <section class="benefits">
    <article class="benefit">
      <Truck :size="40" :strokeWidth="1" />
      <p>Free Shipping</p>
      <span>For all Orders Over $100</span>
    </article>
    <article class="benefit">
      <RefreshCw :size="40" :strokeWidth="1" />
      <p>30 Days Returns</p>
      <span>For an Exchange Product</span>
    </article>
    <article class="benefit">
      <CreditCard :size="40" :strokeWidth="1" />
      <p>Secured Payment</p>
      <span>Payment Cards Accepted</span>
    </article>
    <article class="benefit">
      <PhoneCall :size="40" :strokeWidth="1" />
      <p>Support 24/7</p>
      <span>Contact us Anytime</span>
    </article>
  </section>
</template>

<script setup lang="ts">
import { CreditCard, PhoneCall, RefreshCw, Truck } from 'lucide-vue-next'
</script>

<style scoped>
.benefits {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 3em 1em 3em 1em;
}
.benefit {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

p {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
}
span {
  color: var(--text-primary);
}

@media screen and (max-width: 768px) {
  .benefits {
    grid-template-columns: repeat(2, 2fr);
    gap: 2em;
  }
}
</style>
