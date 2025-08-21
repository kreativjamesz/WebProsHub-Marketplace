<template>
  <nav 
    class="hidden md:flex items-center space-x-8" 
    role="navigation"
    aria-label="Main navigation"
  >
    <router-link
      v-for="item in navigationItems"
      :key="item.path"
      :to="item.path"
      class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      :aria-current="isCurrentRoute(item.path) ? 'page' : undefined"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Navigation items configuration
const navigationItems = [
  { path: '/marketplace', label: 'Marketplace' },
  { path: '/stores', label: 'Stores' },
  { path: '/categories', label: 'Categories' },
  { path: '/deals', label: 'Deals' }
] as const

// Check if current route matches navigation item
const isCurrentRoute = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>
