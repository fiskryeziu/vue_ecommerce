import type { ProfileUser, TProfile } from '@/types'
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
    const profile: Ref<ProfileUser> = ref({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      street: '',
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

    const getProfile = async () => {
      const res = await fetch('http://localhost:3000/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      })

      if (res.ok) {
        const data = (await res.json()) as TProfile
        profile.value = data.user
      }
    }

    const updateProfile = async (passwordForm: {
      current: string
      new: string
      confirm: string
    }) => {
      try {
        console.log(passwordForm)

        const res = await fetch('http://localhost:3000/api/auth/update', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: profile.value.first_name,
            last_name: profile.value.last_name,
            email: profile.value.email,
            phone: profile.value.phone,
            street: profile.value.street,
            current_password: passwordForm.current,
            new_password: passwordForm.new,
            confirm_password: passwordForm.confirm,
          }),
        })

        if (!res.ok) {
          const errorData = await res.json()

          throw new Error(errorData)
        }

        const data = await res.json()

        profile.value = data.user
      } catch (err) {
        if (err instanceof Error) throw err.message
      }
    }

    return {
      isLoggedIn,
      isAuthed,
      login,
      logOut,
      user,
      profile,
      saveUser,
      getProfile,
      updateProfile,
    }
  },
  {
    persist: {
      pick: ['user', 'profile'],
    },
  },
)
