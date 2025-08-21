<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <!-- 404 Icon -->
      <div class="mb-8">
        <div class="mx-auto w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-20 h-20 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      </div>

      <!-- Error Message -->
      <div class="mb-8">
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p class="text-gray-500">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
      </div>

      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative">
          <input
            v-model="searchQuery"
            @keyup.enter="performSearch"
            type="text"
            placeholder="Search for products, stores, or categories..."
            class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <button
          @click="performSearch"
          class="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Search
        </button>
      </div>

      <!-- Quick Links -->
      <div class="mb-8">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Quick Links</h3>
        <div class="grid grid-cols-2 gap-3">
          <router-link
            to="/"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
          >
            Home
          </router-link>
          <router-link
            to="/marketplace"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
          >
            Marketplace
          </router-link>
          <router-link
            to="/stores"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
          >
            Stores
          </router-link>
          <router-link
            to="/categories"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
          >
            Categories
          </router-link>
        </div>
      </div>

      <!-- Popular Categories -->
      <div class="mb-8">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Popular Categories</h3>
        <div class="flex flex-wrap justify-center gap-2">
          <router-link
            v-for="category in popularCategories"
            :key="category.id"
            :to="`/marketplace?category=${category.slug}`"
            class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200"
          >
            {{ category.name }}
          </router-link>
        </div>
      </div>

      <!-- Help Section -->
      <div class="mb-8">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Need Help?</h3>
        <div class="space-y-3">
          <router-link
            to="/help"
            class="block px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200 text-sm font-medium"
          >
            Help Center
          </router-link>
          <router-link
            to="/contact"
            class="block px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200 text-sm font-medium"
          >
            Contact Support
          </router-link>
        </div>
      </div>

      <!-- Back Button -->
      <div>
        <button
          @click="goBack"
          class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

// Popular categories for quick navigation
const popularCategories = ref([
  { id: 1, name: 'Electronics', slug: 'electronics' },
  { id: 2, name: 'Fashion', slug: 'fashion' },
  { id: 3, name: 'Home & Garden', slug: 'home-garden' },
  { id: 4, name: 'Sports', slug: 'sports' },
  { id: 5, name: 'Books', slug: 'books' },
  { id: 6, name: 'Beauty', slug: 'beauty' },
  { id: 7, name: 'Toys', slug: 'toys' },
  { id: 8, name: 'Automotive', slug: 'automotive' }
])

// Methods
const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value.trim() }
    })
  }
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

// Set page title
document.title = '404 - Page Not Found - WebProsHub Marketplace'
</script>
