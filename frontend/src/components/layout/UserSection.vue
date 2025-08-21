<template>
  <div v-if="isAuthenticated">
    <UserMenu />
  </div>
  <div v-else class="flex items-center space-x-2">
    <router-link
      to="/login"
      class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      Sign In
    </router-link>
    <router-link
      to="/register"
      class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      Sign Up
    </router-link>
  </div>
</template>

<script setup lang="ts">
import UserMenu from './UserMenu.vue'

interface Props {
  isAuthenticated: boolean
}

interface Emits {
  (e: 'close-mobile-menu'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
