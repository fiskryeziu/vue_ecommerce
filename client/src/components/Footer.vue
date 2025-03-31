<template>
  <footer>
    <section>
      <div class="footer__logo">
        <h1 class="uppercase text-light">Gold & Co</h1>
        <p class="subtext">Gold & Diamond</p>
      </div>
      <nav>
        <p class="footer__title">About Gold & Co</p>
        <a href="#" class="subtext">About Us</a>
        <a href="#" class="subtext">Core Values</a>
        <a href="#" class="subtext">Careers</a>
        <a href="#" class="subtext">Press Releases</a>
        <a href="#" class="subtext">Blog</a>
        <a href="#" class="subtext">Sitemap</a>
      </nav>
      <nav>
        <p class="footer__title">Our Company</p>
        <a href="#" class="subtext">About Us</a>
        <a href="#" class="subtext">Core Values</a>
        <a href="#" class="subtext">Careers</a>
        <a href="#" class="subtext">Press Releases</a>
        <a href="#" class="subtext">Blog</a>
        <a href="#" class="subtext">Sitemap</a>
      </nav>
      <nav>
        <p class="footer__title">Store Details</p>
        <p class="subtext">
          <span>Address:</span> 502 Street 2,<br />
          Prizren Kosova
        </p>
        <p class="subtext"><span>Email:</span>example@example.com</p>
      </nav>

      <nav>
        <p class="footer__title">Follow Us</p>
        <div class="footer__socials">
          <Facebook />
          <Instagram />
          <Twitter />
        </div>
      </nav>
      <MobileFooter />
    </section>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Instagram, Twitter } from 'lucide-vue-next'
import MobileFooter from './MobileFooter.vue'
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  padding-block: 5em;
}

section {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-content: center;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
}

.footer__title {
  font-size: var(--text-lg);
  color: var(--primary);
  font-weight: var(--font-medium);
  padding-bottom: 0.4em;
}
.subtext {
  color: var(--secondary);
}
span {
  color: var(--primary);
}

h1 {
  font-size: clamp(1.9em, 4vw, 2.3em);
  line-height: 1;
  padding-bottom: 0.4em;
}

section {
  padding-left: 1em;
}

.footer__socials {
  display: flex;
  gap: 2em;
}

@media screen and (max-width: 1024px) {
  section {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2em;
  }
}

@media screen and (max-width: 576px) {
  nav {
    display: none;
  }
  section {
    grid-template-columns: 1fr;
    row-gap: 2em;
  }
}
</style>
