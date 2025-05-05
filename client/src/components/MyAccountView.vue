<!-- do the login register ui for know -->
<template>
  <Breadcrumb :items="links" />
  <template v-if="loggedIn">
    <!-- dashboard stuff -->
  </template>
  <template v-else>
    <LoginForm v-if="hasAccount" @toggle="toggleLogins" />
    <RegisterForm v-else @toggle="toggleLogins" />
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const links = [
  { label: 'Home', link: '/' },
  { label: 'My Account', link: '' },
]

const hasAccount = ref(true)
const loggedIn = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('hasAccount')
  if (saved !== null) {
    hasAccount.value = saved === 'true'
  }
})

watch(hasAccount, (value) => {
  localStorage.setItem('hasAccount', value.toString())
})

const toggleLogins = () => {
  hasAccount.value = !hasAccount.value
}
</script>

<style scoped></style>
