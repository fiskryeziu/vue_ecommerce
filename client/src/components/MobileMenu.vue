<template>
  <aside class="mobile-nav" :class="{ show: open }">
    <div class="mobile-nav__logo">
      <h1>Gold & Co</h1>
      <X @click="$emit('toggle')"></X>
    </div>
    <div>
      <div class="tab-wrapper">
        <button
          @click="selectTab('menu')"
          class="uppercase text-sm"
          :class="{ active: menu === 'menu' }"
        >
          Menu
        </button>
        <button
          @click="selectTab('categories')"
          class="uppercase text-sm"
          :class="{ active: menu === 'categories' }"
        >
          Categories
        </button>
      </div>
      <section>
        <h1 v-if="menu === 'menu'">Menu is selected</h1>
        <h1 v-if="menu === 'categories'">Category is selected</h1>
      </section>
      <!-- tab for menu and category -->
    </div>
    <div><!-- social icons  --></div>
  </aside>
  <div class="overlay" v-if="open" @click="$emit('toggle')"></div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps({ open: Boolean })
defineEmits(['toggle'])

const menu = ref('menu')
const selectTab = (selected: string) => {
  menu.value = selected
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
</style>
