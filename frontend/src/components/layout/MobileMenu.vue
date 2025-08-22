<template>
  <div class="md:hidden border-t border-gray-200 py-4 mobile-menu">
    <div class="space-y-1">
      <router-link
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        @click="$emit('close')"
      >
        {{ item.label }}
      </router-link>
      
      <!-- Mobile Theme Toggle -->
      <div class="pt-4 border-t border-gray-200">
        <div class="px-3 py-2">
          <ColorThemeDropdown />
        </div>
      </div>
      
      <!-- Mobile Auth -->
      <div v-if="!isAuthenticated" class="pt-4 border-t border-gray-200">
        <router-link
          to="/login"
          class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          @click="$emit('close')"
        >
          Sign In
        </router-link>
        <router-link
          to="/register"
          class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          @click="$emit('close')"
        >
          Sign Up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorThemeDropdown from '@/components/ColorThemeDropdown.vue'

interface Props {
  isAuthenticated: boolean
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
defineEmits<Emits>()

// Navigation items configuration
const navigationItems = [
  { path: '/marketplace', label: 'Marketplace' },
  { path: '/stores', label: 'Stores' },
  { path: '/categories', label: 'Categories' },
  { path: '/deals', label: 'Deals' },
  { path: '/wishlist', label: 'Wishlist' }
] as const
</script>
