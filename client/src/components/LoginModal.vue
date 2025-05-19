<template>
  <div class="login__modal" :class="{ 'login__modal-active': open }">
    <form @submit.prevent="loginHandler">
      <h2>Login</h2>
      <div class="col gap">
        <label for="username">Username</label>
        <input type="text" v-model="username" />
      </div>
      <div class="col gap">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div>
        <RouterLink to="/my-account" @click="$emit('toggle')">Don't have an account?</RouterLink>
      </div>
      <button class="center">Log in</button>
      <XCircle class="close-btn" :strokeWidth="1" @click="$emit('toggle')" />
    </form>
  </div>
  <div class="overlay" v-if="open" @click="$emit('toggle')"></div>
</template>
<script setup lang="ts">
import type { IFilter } from '@/App.vue'
import { XCircle } from 'lucide-vue-next'
import { ref, inject } from 'vue'

defineProps({ open: Boolean })
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
    const data = await res.json()

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
.login__modal {
  position: fixed;
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
  position: fixed;
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
