<template>
  <form @submit.prevent="handleLogin">
    <h2>Login</h2>
    <div class="col gap">
      <label for="email">Email</label>
      <input v-model="email" type="email" required />
    </div>
    <div class="col gap">
      <label for="password">Password</label>
      <input v-model="password" type="password" required />
    </div>
    <div>
      <p @click="$emit('toggle')">Don't have an account?</p>
    </div>
    <button type="submit" class="center">Log in</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['toggle'])
const email = ref('')
const password = ref('')

function handleLogin() {
  alert(`Logging in with: ${email.value}, ${password.value}`)
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin-inline: auto;
  margin-top: 2em;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
}

input {
  border: 1px solid var(--lighter);
  padding: 0.3em 0.6em;
  color: var(--secondary);
}

button {
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

input {
  padding: 0.5rem;
  font-size: 1rem;
}
button {
  padding: 0.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

p {
  text-decoration: underline;
  cursor: pointer;
}

@media screen and (max-width: 400px) {
  form {
    margin-inline: 1em;
  }
}
</style>
