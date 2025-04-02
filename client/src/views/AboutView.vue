<script setup lang="ts">
import Brands from '@/components/Brands.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { Heart, Rocket, Smile } from 'lucide-vue-next'
const items = [
  { label: 'Home', link: '/' },
  { label: 'About', link: '/about' },
]
</script>

<template>
  <main class="about">
    <Breadcrumb :items="items" />
    <section class="about__heading">
      <h1 class="heading">About Our Online Store</h1>
      <p>Alukas providing rare & beautiful items sourced both locally & globally.</p>
    </section>

    <div class="about__image">
      <div class="img">
        <img src="/about1.jpg" alt="" />
      </div>
      <div class="img">
        <img src="/about2.jpg" alt="" />
      </div>
    </div>

    <section class="about__story">
      <div>
        <h1>Our Story</h1>
      </div>
      <p>
        At Gold & Co, we believe that jewelry is more than just an accessory—it’s a symbol of
        elegance, heritage, and timeless beauty. Our journey began with a simple vision: to craft
        exquisite gold jewelry that tells a story of luxury and sophistication. Founded with a
        passion for fine craftsmanship, Gold & Co blends traditional artistry with modern design,
        creating pieces that stand the test of time. Every piece in our collection is meticulously
        designed, using only the finest materials, ensuring brilliance, durability, and a touch of
        opulence. From delicate everyday essentials to bold statement pieces, our jewelry is crafted
        to celebrate life’s special moments—whether it’s a milestone, a gift of love, or an
        indulgence in self-expression. At Gold & Co, we are committed to quality, authenticity, and
        excellence. Every gemstone is handpicked, every design is perfected, and every piece is made
        to shine as brightly as the person wearing it. <br /><b
          >Discover the art of fine jewelry. Wear gold. Shine always.</b
        >
      </p>
    </section>
    <section class="about__mission">
      <div class="img-wrapper">
        <img src="/about3.jpg" alt="" />
      </div>

      <div class="text-content">
        <span>Our Mission</span>
        <p>
          By in entirely securing suitable graceful at families improved. Zealously few furniture
          repulsive was agreeable consisted difficult. Collected breakfast estimable questions in to
          favourite it. Known he place worth words it as to. Spoke now noise off smart her ready.
        </p>
        <span>Our Vision</span>
        <p>
          We were supposed to head to California this weekend but last minute had to cancel and I’m
          so bummed I was so ready for the beach!! These pictures were from last weekend when the
          weather.
        </p>
      </div>
    </section>
    <section class="about__benefit">
      <h1 class="heading">Responsible and Sustainable Development</h1>
      <div class="benefit-wrapper">
        <div>
          <Smile :size="50" :strokeWidth="1" />
          <h2>Happy Customer</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, provident!</p>
        </div>
        <div>
          <Rocket :size="50" :strokeWidth="1" />
          <h2>Happy Customer</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, provident!</p>
        </div>
        <div>
          <Heart :size="50" :strokeWidth="1" />
          <h2>Happy Customer</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, provident!</p>
        </div>
      </div>
    </section>
    <Brands />
  </main>
</template>

<style>
.about {
  display: flex;
  flex-direction: column;
}

.about__heading {
  text-align: center;
}

.about__image {
  display: flex;
  padding: 5em 0 2em 0;
}

.about__image .img {
  display: flex;
  flex-basis: 50%;
}

.about__story {
  display: flex;
  margin: 2em;
}
.about__story div {
  flex-basis: 40%;
}

.about__story h1 {
  position: relative;
  font-size: clamp(1.87em, 3vw, 2.5em);
  font-weight: var(--font-medium);
}
.about__story h1::after {
  content: '';
  top: 50%;
  position: absolute;
  height: 2px;
  width: 3em;
  margin-left: 0.5em;
  background-color: var(--primary);
}
.about__story p {
  flex-basis: 70%;
}

.about__mission {
  display: flex;
  margin-block: 2em;
}

.about__mission > div {
  display: flex;
  flex-basis: 50%;
}
.about__mission .text-content {
  flex-direction: column;
  justify-content: center;
  gap: 2em;
  padding-left: 2em;
  color: var(--secondary);
  background-color: var(--light);
}

.about__mission span {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--primary);
}

.about__benefit h1 {
  margin-block: 1em;
}

.about__benefit .benefit-wrapper {
  display: flex;
  justify-content: center;
}
.about__benefit .benefit-wrapper div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5em;
  align-items: center;
  text-align: center;
  flex-basis: 30%;
  color: var(--secondary);
}

.benefit-wrapper h2,
svg {
  color: var(--primary);
  font-weight: var(--font-medium);
}

@media screen and (max-width: 1024px) {
  .about__image {
    display: flex;
    flex-direction: column;
    padding: 5em 1em 2em 1em;
  }

  .about__image .img {
    display: flex;
    flex-basis: 50%;
  }

  .about__story {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding-inline: 2em;
  }

  .about__mission {
    display: flex;
    flex-direction: column;
    margin-block: 2em;
  }

  .about__mission > div {
    display: flex;
    flex-basis: auto;
    padding: 1em;
  }

  .about__benefit .benefit-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2em;
    justify-content: center;
  }
}
</style>
