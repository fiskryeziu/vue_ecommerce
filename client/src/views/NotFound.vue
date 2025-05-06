<template>
  <Breadcrumb :items="links" />
  <div class="error">
    <div class="error__text">
      <p>404</p>
      <span>This page has been probably moved somewhere... </span>
      <span>Please back to homepage or check our offer</span>
    </div>
    <RouterLink to="/">
      <button><MoveLeft :strokeWidth="1" /><span>Back to Homepage</span></button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue'
import { MoveLeft } from 'lucide-vue-next'

const links = [
  { label: 'Home', link: '/' },
  { label: '404', link: '' },
]
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
  margin: auto;
}

.error__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
p {
  font-size: clamp(7rem, 20vw, 10rem);
  background: url('/banner3.jpg') 0 0 / cover no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(0, 0, 0, 0.5);
  padding: 0;
  margin: 0;
  line-height: 1;
}
.error__text span:first-of-type {
  font-size: clamp(1.8rem, 4vw, 2rem);
  font-weight: var(--font-medium);
}
.error__text span:nth-of-type(2) {
  font-size: clamp(1rem, 4vw, 1.5rem);
  color: var(--secondary);
}

button {
  display: flex;
  gap: 1em;
  padding: 1rem 2em;
  background: var(--primary);
  border: none;
  cursor: pointer;
}
button span,
button svg {
  color: white;
}
</style>
