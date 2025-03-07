<template>
  <aside class="mobile-nav" :class="{ show: open }">
    <div class="mobile-nav__logo">
      <h1>Gold & Co</h1>
      <X @click="$emit('toggle')"></X>
    </div>
    <div>
      <div class="tab-wrapper text-medium">
        <button
          @click="selectTab('menu')"
          class="uppercase text-sm"
          :class="{ active: tab === 'menu' }"
        >
          Menu
        </button>
        <button
          @click="selectTab('categories')"
          class="uppercase text-sm"
          :class="{ active: tab === 'categories' }"
        >
          Categories
        </button>
      </div>
      <section>
        <div class="col text-medium" v-if="tab === 'menu'">
          <RouterLink
            :to="link.href"
            v-for="(link, index) in menus"
            :key="index"
            @click="$emit('toggle')"
          >
            {{ link.name }}
          </RouterLink>
        </div>
        <div class="col text-medium" v-if="tab === 'categories'">
          <RouterLink
            :to="link.href"
            v-for="(link, index) in categories"
            :key="index"
            @click="$emit('toggle')"
          >
            {{ link.name }}
          </RouterLink>
        </div>
      </section>
    </div>
    <div class="social">
      <Facebook :size="18" />
      <Twitter :size="18" />
      <Instagram :size="18" />
    </div>
  </aside>
  <div class="overlay" v-if="open" @click="$emit('toggle')"></div>
</template>

<script setup lang="ts">
// @ts-ignore
import { Facebook, Instagram, Twitter, X } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps({ open: Boolean })
defineEmits(['toggle'])

const tab = ref('menu')
const menus = ref([
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
])
const categories = ref([
  { name: 'New Products', href: '/' },
  { name: 'Today on Sale', href: '/shop' },
  { name: 'Special Offer!', href: '/special-offer' },
  { name: 'Necklace', href: '/necklace' },
  { name: 'Rings', href: '/rings' },
  { name: 'Bracelets', href: '/bracelets' },
  { name: 'Earrings', href: '/earrings' },
  { name: 'Watches', href: '/watches' },
])
const selectTab = (selected: string) => {
  tab.value = selected
}
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  top: 0;
  left: -325px;
  width: 320px;
  height: 100vh;
  background-color: var(--background);
  transition: left 200ms ease-in-out;
  z-index: 1;
}
.show {
  left: 0;
}

.overlay {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.mobile-nav__logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8em;
}

.mobile-nav__logo h1 {
  font-weight: var(--font-normal);
}

.tab-wrapper {
  border-bottom: 1px solid var(--lightest);
}

button {
  position: relative;
  margin: 0 1em;
  padding-block: 1em;
  color: var(--secondary);
}

button:before {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: var(--secondary);
  transition: width 500ms ease;
}

button.active {
  color: var(--primary);
}

button.active::before {
  width: 100%;
  background-color: var(--primary);
}

section {
  margin: 1em;
}

section > div > a {
  padding: 6px 6px;
}

.social {
  display: flex;
  gap: 1em;
  margin: 1em;
}
</style>
