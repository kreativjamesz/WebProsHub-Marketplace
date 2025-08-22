<template>
  <div v-if="isAuthenticated">
    <UserMenu />
  </div>
  <div v-else class="flex items-center space-x-2">
    <router-link
      to="/login"
      class="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Sign In
    </router-link>
    <router-link
      to="/register"
      class="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
