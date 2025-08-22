<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900">Wishlist</h1>
          <p class="mt-2 text-gray-600">Save products you love for later</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <!-- Heart Icon -->
        <div class="mx-auto h-24 w-24 text-gray-300 mb-6">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        <!-- Message -->
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Sign in to access your wishlist
        </h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Create an account or sign in to save products you love and access your personalized wishlist.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/login"
            class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Sign In
          </router-link>
          
          <router-link
            to="/register"
            class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Create Account
          </router-link>
        </div>

        <!-- Benefits -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Save Products</h3>
            <p class="text-gray-600 text-sm">Keep track of items you love but aren't ready to buy yet</p>
          </div>

          <div class="text-center">
            <div class="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Get Notifications</h3>
            <p class="text-gray-600 text-sm">Be notified when wishlist items go on sale or come back in stock</p>
          </div>

          <div class="text-center">
            <div class="mx-auto h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Quick Access</h3>
            <p class="text-gray-600 text-sm">Easily find and purchase your saved items when you're ready</p>
          </div>
        </div>

        <!-- Browse Products CTA -->
        <div class="mt-12 pt-8 border-t border-gray-200">
          <p class="text-gray-600 mb-4">Want to start shopping?</p>
          <router-link
            to="/marketplace"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Browse Products
            <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Lifecycle
onMounted(() => {
  // If user is already authenticated, redirect to their wishlist
  if (authStore.isAuthenticated) {
    if (authStore.isBuyer) {
      router.push('/buyer/wishlist')
    } else {
      router.push('/')
    }
  }
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
