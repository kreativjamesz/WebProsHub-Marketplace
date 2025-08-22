<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navigation Header (Simplified for guests) -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Global Cart Sheet -->
    <GlobalCartSheet />

    <!-- Guest Conversion Banner (Optional) -->
    <div v-if="showConversionBanner" class="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg max-w-sm">
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div class="flex-1">
          <h4 class="font-medium">Create an Account</h4>
          <p class="text-sm opacity-90 mt-1">Save your cart, wishlist, and get personalized recommendations</p>
          <div class="flex space-x-2 mt-3">
            <router-link 
              to="/register" 
              class="bg-primary-foreground text-primary px-3 py-1 rounded text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
            >
              Sign Up
            </router-link>
            <router-link 
              to="/login" 
              class="border border-primary-foreground/30 text-primary-foreground px-3 py-1 rounded text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              Sign In
            </router-link>
          </div>
        </div>
        <button 
          @click="showConversionBanner = false"
          class="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import GlobalCartSheet from '@/components/shopping/GlobalCartSheet.vue'

const showConversionBanner = ref(false)

onMounted(() => {
  // Show conversion banner after 30 seconds for guest users
  setTimeout(() => {
    showConversionBanner.value = true
  }, 30000)
})
</script>
