import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import ShopView from '@/views/ShopView.vue'
import ProductView from '@/views/ProductView.vue'
import WishlistView from '@/views/WishlistView.vue'
import NotFound from '@/views/NotFound.vue'
import MyAccountView from '@/components/MyAccountView.vue'

const isAuthed = true

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView,
    },
    {
      path: '/my-account',
      name: 'my account',
      component: MyAccountView,
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
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
