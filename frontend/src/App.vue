<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const authStore = useAuthStore()
onMounted(async () => {
  await authStore.checkAuth()
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Loading overlay -->
    <div v-if="!authStore.isInitialized" class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-lg font-medium text-gray-700">Loading WebProsHubMarketplace...</p>
      </div>
    </div>

    <!-- Main app -->
    <div v-else class="flex flex-col min-h-screen">
      <!-- Navigation Header -->
      <AppHeader />

      <!-- Main Content -->
      <main class="flex-1">
        <router-view />
      </main>

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>