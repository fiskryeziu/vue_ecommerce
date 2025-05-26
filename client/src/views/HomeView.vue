<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import CategoriesCarousel from '@/components/CategoriesCarousel.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import ProductsCarousel from '@/components/ProductsCarousel.vue'
import PromoBanner from '@/components/PromoBanner.vue'
import Brands from '@/components/Brands.vue'
import Socials from '@/components/Socials.vue'
import Benefits from '@/components/Benefits.vue'
</script>

<template>
  <Carousel />
  <CategoriesCarousel />
  <FeaturedProducts />
  <PromoBanner />
  <ProductsCarousel
    category="necklaces"
    title="Necklase"
    subtitle="New Earrings Arrival"
    featuredImage="/feature1.jpg"
  />
  <ProductsCarousel
    category="charms-dangles"
    title="Charm & Dangles"
    subtitle="Best Diamond Sets 2020"
    featuredImage="/feature1.jpg"
  />
  <ProductsCarousel
    category="rings"
    title="Bracelets & Rings"
    subtitle="Diamond Bow Bracelets"
    featuredImage="/feature1.jpg"
  />
  <Brands />
  <Socials />
  <Benefits />
</template>
