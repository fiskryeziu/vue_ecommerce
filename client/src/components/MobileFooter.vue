<template>
  <div class="accordion__wrapper">
    <nav class="accordion__panel" v-for="(item, index) in accordionItems" :key="index">
      <h2 class="accordion__trigger" @click="toggleAccordion(index)">
        <button :aria-expanded="activeIndex !== index">
          {{ item.title }}
          <ChevronDown />
        </button>
      </h2>
      <div class="accordion__content" :aria-hidden="activeIndex !== index">
        <div>
          <template v-if="item.type === 'links'">
            <a
              v-for="(link, linkIndex) in item.links"
              :key="linkIndex"
              :href="link.href"
              class="subtext"
            >
              {{ link.text }}
            </a>
          </template>
          <template v-else-if="item.type === 'text'">
            <p class="subtext" v-html="item.text"></p>
          </template>
          <template v-else-if="item.type === 'icons'">
            <div class="accordion__socials">
              <Facebook />
              <Instagram />
              <Twitter />
            </div>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, ChevronRight, Facebook, Instagram, Twitter } from 'lucide-vue-next'

const activeIndex = ref<number | null>(null)

const accordionItems = [
  {
    title: 'About Gold & Co',
    type: 'links',
    links: [
      { text: 'About Us', href: '#' },
      { text: 'Core Values', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Press Releases', href: '#' },
      { text: 'Blog', href: '#' },
      { text: 'Sitemap', href: '#' },
    ],
  },
  {
    title: 'Our Company',
    type: 'links',
    links: [
      { text: 'About Us', href: '#' },
      { text: 'Core Values', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Press Releases', href: '#' },
      { text: 'Blog', href: '#' },
      { text: 'Sitemap', href: '#' },
    ],
  },
  {
    title: 'Store Details',
    type: 'text',
    text: '<span>Address:</span> 502 Street 2,Prizren, Kosova<br /><span>Email:</span> example@example.com',
  },
  {
    title: 'Follow Us',
    type: 'icons',
  },
]

const toggleAccordion = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
.accordion__wrapper {
  display: none;
}
.accordion__panel {
  padding-block: 1em;
}
.accordion__content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms;
}

.accordion__content[aria-hidden='false'] {
  grid-template-rows: 1fr;
}

.accordion__content > div {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.accordion__trigger {
  cursor: pointer;
  font-size: var(--text-lg);
  color: var(--primary);
  font-weight: var(--font-medium);
}

button > svg {
  transition: rotate 300ms ease;
}

button[aria-expanded='false'] > svg {
  rotate: 180deg;
}

button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 1em;
}

.subtext {
  color: var(--secondary);
  transition: color 200ms ease;
}

.subtext:hover {
  color: var(--primary);
}

::v-deep(.subtext span) {
  color: var(--primary);
}

.accordion__socials {
  display: flex;
  gap: 1em;
  padding-block: 1em;
}

@media screen and (max-width: 576px) {
  .accordion__wrapper {
    display: block;
  }
}
</style>
