<template>
  <div class="login__modal" :class="{ 'login__modal-active': open }">
    <form>
      <h2>Login</h2>
      <div class="col gap">
        <label for="emailaddress">Email Address</label>
        <input type="text" />
      </div>
      <div class="col gap">
        <label for="password">Password</label>
        <input type="password" name="password" />
      </div>
      <div>
        <RouterLink to="/my-account/register">Don't have an account?</RouterLink>
      </div>
      <button class="center">Log in</button>
      <XCircle class="close-btn" :strokeWidth="1" @click="$emit('toggle')" />
    </form>
  </div>
  <div class="overlay" v-if="open" @click="$emit('toggle')"></div>
</template>

<script setup lang="ts">
import { XCircle } from 'lucide-vue-next'

defineProps({ open: Boolean })
defineEmits(['toggle'])
</script>

<style scoped>
.login__modal {
  position: absolute;
  left: 50%;
  top: -100%;
  transform: translateX(-50%);
  max-width: 500px;
  width: 100%;
  background-color: var(--background);
  z-index: 3;
  transition: top 500ms ease-in;
}

.login__modal-active {
  top: 10%;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
}
.login__modal input {
  border: 1px solid var(--lighter);
  padding: 0.3em 0.6em;
  color: var(--secondary);
}
.login__modal form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
}

.login__modal a {
  text-decoration: underline;
}

.login__modal button {
  width: 100%;
  background-color: var(--primary);
  color: var(--background);
  padding: 1em;
}

h2 {
  font-size: var(--text-4xl);
  font-weight: var(--font-normal);
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
}
</style>
