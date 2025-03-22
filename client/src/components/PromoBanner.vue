<template>
  <section class="promo">
    <div class="promo__image">
      <img src="/banner4.jpg" alt="" />
      <div class="overlay"></div>
    </div>
    <div class="promo__content">
      <div>
        <span class="promo__title text-center">READY, SET, <br />SUMMER!</span>
        <h3 class="promo__subtitle">Avon Flourish Honey Blossom Set</h3>
        <p class="promo__text">Buy 1 Get 1 Free</p>
        <button class="promo__button">Shop Now</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.promo {
  position: relative;
  display: flex;
  min-height: 200px;
  margin-block: 5em;
}

.promo__content {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.promo__image {
  position: relative;
  overflow: hidden;
}
.promo__image .overlay {
  position: absolute;
  inset: 0;
  background-color: black;
  width: 100%;
  height: 100%;
  opacity: 40%;
  pointer-events: none;
}
.promo__image img {
  display: block;
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.promo__image img:hover {
  transform: scale(1.09);
}

.promo__content {
  display: flex;
  align-items: center;

  padding-left: clamp(1em, 8vw, 10em);
  /* pointer-events: none; */
}

.promo__content div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.promo__title {
  font-size: clamp(1.62em, 4vw, 2.3em);
  color: var(--background);
}
.promo__subtitle {
  font-size: var(--text-xl);
  color: var(--background);
  font-weight: var(--font-light);
}
.promo__text {
  font-size: clamp(1.62em, 4vw, 2em);
  color: var(--background);
  font-weight: var(--font-extralight);
  padding-block: 0.5em;
}

.promo__button {
  background-color: var(--background);
  padding: 0.5em 2em;
  color: var(--primary);
  font-weight: var(--font-medium);
  cursor: pointer;
  pointer-events: initial;
}

@media screen and (max-width: 1024px) {
  .promo {
    min-height: 300px;
  }
}

@media screen and (max-width: 768px) {
  .promo__content {
    justify-content: center;
  }
}
</style>
