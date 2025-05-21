<template>
  <form @submit.prevent="handleRegister">
    <h2>Register</h2>
    <div class="col gap">
      <label for="name">Username</label>
      <input v-model="username" type="text" required />
    </div>
    <div class="col gap">
      <label for="email">Email</label>
      <input v-model="email" type="email" required />
    </div>
    <div class="col gap">
      <label for="password">Password</label>
      <input v-model="password" type="password" required />
    </div>
    <div>
      <p @click="$emit('toggle')">Have an account?</p>
    </div>
    <button class="center">Register</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['toggle'])

const username = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    })

    if (res.ok) {
      username.value = ''
      email.value = ''
      password.value = ''
    } else {
      const e = await res.json()
      console.error('Signup failed:', e.message)
    }
  } catch (error) {
    console.error('Network or server error:', error)
  }
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
