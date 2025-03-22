<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import CategoriesCarousel from '@/components/CategoriesCarousel.vue'
import FeaturedProducts from '../components/FeaturedProducts.vue'
import ProductsCarousel from '@/components/ProductsCarousel.vue'
import PromoBanner from '@/components/PromoBanner.vue'
</script>

<template>
  <Carousel />
  <CategoriesCarousel />
  <FeaturedProducts />
  <ProductsCarousel
    category="Necklase"
    title="New Earrings Arrival"
    featuredImage="/feature1.jpg"
  />
  <PromoBanner />
</template>
