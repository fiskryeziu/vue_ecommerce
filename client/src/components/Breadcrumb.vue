<template>
  <nav>
    <ul class="breadcrumb">
      <li v-for="(item, index) in items" :key="index">
        <router-link v-if="index !== items.length - 1" :to="item.link">
          {{ item.label }}
        </router-link>
        <span v-else class="last">{{ item.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
type TBreadcrumb = {
  label: string
  link: string
}
defineProps<{
  items: TBreadcrumb[]
}>()
</script>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding-inline: 2em;
}

.breadcrumb li {
  margin-right: 5px;
}

.breadcrumb li:not(:last-child)::after {
  content: ' > ';
  margin-left: 5px;
}

.breadcrumb .last {
  color: var(--secondary);
}
</style>
