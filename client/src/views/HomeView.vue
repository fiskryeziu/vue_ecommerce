<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import CategoriesCarousel from '@/components/CategoriesCarousel.vue'
import FeaturedProducts from '../components/FeaturedProducts.vue'
import ProductsCarousel from '@/components/ProductsCarousel.vue'
import PromoBanner from '@/components/PromoBanner.vue'
import Brands from '@/components/Brands.vue'
import Socials from '@/components/Socials.vue'
</script>

<template>
  <Carousel />
  <CategoriesCarousel />
  <FeaturedProducts />
  <PromoBanner />
  <ProductsCarousel
    category="Necklase"
    title="New Earrings Arrival"
    featuredImage="/feature1.jpg"
  />
  <ProductsCarousel
    category="Charm & Dangles"
    title="Best Diamond Sets 2020"
    featuredImage="/feature1.jpg"
  />
  <ProductsCarousel
    category="Bracelets & Rings"
    title="Diamond Bow Bracelets"
    featuredImage="/feature1.jpg"
  />
  <Brands />
  <Socials />
</template>
