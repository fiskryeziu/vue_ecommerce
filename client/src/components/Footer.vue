<template>
  <footer>
    <section>
      <div>
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

      <div>
        <p class="footer__title">Follow Us</p>
        <div class="footer__socials">
          <Facebook />
          <Instagram />
          <Twitter />
        </div>
      </div>
    </section>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Instagram, Twitter } from 'lucide-vue-next'
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  padding-block: 2em;
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
  font-size: clamp(1.5em, 4vw, 2.3em);
  line-height: 1;
  padding-bottom: 0.4em;
}

section:first-child {
  padding-left: 1em;
}

.footer__socials {
  display: flex;
  gap: 2em;
}
</style>
