import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'

const isAuthed = true

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from) => {
        if (!isAuthed && to.name !== 'login') {
          return { name: 'login' }
        }
      },
      meta: { breadcrumb: 'Home' },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { breadcrumb: 'About' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: () => {
        if (isAuthed) {
          return { name: 'home' }
        }
      },
    },
  ],
})

export default router
