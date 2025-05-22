import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const isAuthed: Ref<boolean> = ref(false)

  const isLoggedIn = async () => {
    const res = await fetch('http://localhost:3000/api/auth/me', {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()

    data.message === 'unauthorized' ? (isAuthed.value = false) : (isAuthed.value = true)
  }

  const login = computed(() => (isAuthed.value = true))

  return { isLoggedIn, isAuthed, login }
})
