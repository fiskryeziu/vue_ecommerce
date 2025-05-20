<!-- do the login register ui for know -->
<template>
  <Breadcrumb :items="links" />
  <template v-if="isAuthed">
    <!-- dashboard stuff -->
    <h2>User data</h2>
  </template>
  <template v-else>
    <LoginForm v-if="hasAccount" @toggle="toggleLogins" />
    <RegisterForm v-else @toggle="toggleLogins" />
  </template>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import type { IFilter } from '@/App.vue'

const links = [
  { label: 'Home', link: '/' },
  { label: 'My Account', link: '' },
]

const hasAccount = ref(true)

const context = inject<IFilter>('appState')

if (!context) {
  throw new Error('appState not provided!')
}

const { isAuthed } = context

onMounted(() => {
  const saved = localStorage.getItem('hasAccount')
  if (saved !== null) {
    hasAccount.value = saved === 'true'
  }
})

const isLoggedIn = async () => {
  const res = await fetch('http://localhost:3000/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  })
  const data = await res.json()

  data.message === 'unauthorized' ? (isAuthed.value = false) : (isAuthed.value = true)
}

onMounted(() => {
  isLoggedIn()
})

watch(hasAccount, (value) => {
  localStorage.setItem('hasAccount', value.toString())
})

const toggleLogins = () => {
  hasAccount.value = !hasAccount.value
}
</script>

<style scoped></style>
