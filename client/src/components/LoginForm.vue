<template>
  <form @submit.prevent="loginHandler">
    <h2>Login</h2>
    <div class="col gap">
      <label for="username">Username</label>
      <input v-model="username" type="text" required />
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
import type { IFilter } from '@/App.vue'
import { inject, ref } from 'vue'

const emit = defineEmits(['toggle'])
const username = ref('')
const password = ref('')

const context = inject<IFilter>('appState')

if (!context) {
  throw new Error('appState not provided!')
}

const { isAuthed } = context

const loginHandler = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      credentials: 'include',
    })
    console.log(res)
    if (res.ok) {
      isAuthed.value = true
      emit('toggle')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log(error)
    }
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
