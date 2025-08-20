<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">WebProsHub</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/marketplace"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
          >
            Marketplace
          </router-link>
          <router-link
            to="/stores"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
          >
            Stores
          </router-link>
          <router-link
            to="/categories"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
          >
            Categories
          </router-link>
          <router-link
            to="/deals"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
          >
            Deals
          </router-link>
        </nav>

        <!-- Search Bar -->
        <div class="flex-1 max-w-lg mx-8 hidden lg:block">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for products, stores, or categories..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="handleSearch"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Button for Mobile -->
          <button
            @click="showMobileSearch = !showMobileSearch"
            class="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Wishlist -->
          <router-link
            to="/wishlist"
            class="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span
              v-if="wishlistCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ wishlistCount }}
            </span>
          </router-link>

          <!-- Shopping Cart -->
          <CartDrawer :cart-items="cartItems" />

          <!-- User Menu or Auth Buttons -->
          <div v-if="authStore.isAuthenticated">
            <UserMenu />
          </div>
          <div v-else class="flex items-center space-x-2">
            <router-link
              to="/login"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              Sign In
            </router-link>
            <router-link
              to="/register"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search -->
      <div v-if="showMobileSearch" class="lg:hidden pb-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for products, stores, or categories..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @keyup.enter="handleSearch"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-4">
        <div class="space-y-1">
          <router-link
            to="/marketplace"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            @click="showMobileMenu = false"
          >
            Marketplace
          </router-link>
          <router-link
            to="/stores"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            @click="showMobileMenu = false"
          >
            Stores
          </router-link>
          <router-link
            to="/categories"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            @click="showMobileMenu = false"
          >
            Categories
          </router-link>
          <router-link
            to="/deals"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            @click="showMobileMenu = false"
          >
            Deals
          </router-link>
          
          <!-- Mobile Auth -->
          <div v-if="!authStore.isAuthenticated" class="pt-4 border-t border-gray-200">
            <router-link
              to="/login"
              class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              @click="showMobileMenu = false"
            >
              Sign In
            </router-link>
            <router-link
              to="/register"
              class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              @click="showMobileMenu = false"
            >
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CartDrawer from '@/components/shopping/CartDrawer.vue'
import UserMenu from '@/components/layout/UserMenu.vue'

const router = useRouter()
const authStore = useAuthStore()

// State
const searchQuery = ref('')
const showMobileSearch = ref(false)
const showMobileMenu = ref(false)

// Mock data (replace with actual store data)
const cartItems = ref([])
const wishlistCount = ref(3)

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/marketplace',
      query: { search: searchQuery.value }
    })
    searchQuery.value = ''
    showMobileSearch.value = false
  }
}
</script>
