import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

type User = { username: string; id: string }
export const useUserStore = defineStore(
  'userStore',
  () => {
    const isAuthed: Ref<boolean> = ref(false)
    const user: Ref<User> = ref({
      username: '',
      id: '',
    })

    const isLoggedIn = async () => {
      const res = await fetch('http://localhost:3000/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()

      data.message === 'unauthorized' ? (isAuthed.value = false) : (isAuthed.value = true)
    }

    const login = () => {
      isAuthed.value = true
    }
    const saveUser = (userInfo: User) => {
      user.value = userInfo
      console.log('User saved:', user.value)
    }

    const logOut = async () => {
      const res = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      if (res.ok) {
        isAuthed.value = false
        return true
      }
    }

    return { isLoggedIn, isAuthed, login, logOut, user, saveUser }
  },
  {
    persist: {
      pick: ['user'],
    },
  },
)
