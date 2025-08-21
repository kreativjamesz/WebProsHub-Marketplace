<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Seller Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Navigation -->
          <div class="flex items-center">
            <router-link to="/seller/dashboard" class="flex items-center">
              <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">Seller Hub</span>
            </router-link>
          </div>

          <!-- Navigation Menu -->
          <nav class="hidden md:flex space-x-8">
            <router-link
              to="/seller/dashboard"
              class="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-green-600 bg-green-50"
            >
              Dashboard
            </router-link>
            <router-link
              to="/seller/products"
              class="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-green-600 bg-green-50"
            >
              Products
            </router-link>
            <router-link
              to="/seller/orders"
              class="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-green-600 bg-green-50"
            >
              Orders
            </router-link>
            <router-link
              to="/seller/stores"
              class="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-green-600 bg-green-50"
            >
              My Stores
            </router-link>
            <router-link
              to="/seller/analytics"
              class="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-green-600 bg-green-50"
            >
              Analytics
            </router-link>
          </nav>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M9 11h.01M9 8h.01M15 14h.01M15 11h.01M15 8h.01M15 5h.01M12 5h.01M12 8h.01M12 11h.01M12 14h.01M12 17h.01" />
              </svg>
              <span
                v-if="notificationCount > 0"
                class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"
              ></span>
            </button>

            <!-- Messages -->
            <button class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span
                v-if="messageCount > 0"
                class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-400 ring-2 ring-white"
              ></span>
            </button>

            <!-- User Menu -->
            <div class="relative">
              <button
                @click="toggleUserMenu"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-green-600">
                    {{ userInitials }}
                  </span>
                </div>
                <span class="hidden md:block text-sm font-medium">{{ user?.name || 'Seller' }}</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- User Dropdown Menu -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <router-link
                  to="/seller/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile Settings
                </router-link>
                <router-link
                  to="/seller/account"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Account Settings
                </router-link>
                <router-link
                  to="/seller/billing"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Billing & Plans
                </router-link>
                <div class="border-t border-gray-100"></div>
                <router-link
                  to="/"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View Storefront
                </router-link>
                <div class="border-t border-gray-100"></div>
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <div class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-gray-200">
        <router-link
          to="/seller/dashboard"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
          active-class="text-green-600 bg-green-50"
        >
          Dashboard
        </router-link>
        <router-link
          to="/seller/products"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
          active-class="text-green-600 bg-green-50"
        >
          Products
        </router-link>
        <router-link
          to="/seller/orders"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
          active-class="text-green-600 bg-green-50"
        >
          Orders
        </router-link>
        <router-link
          to="/seller/stores"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
          active-class="text-green-600 bg-green-50"
        >
          My Stores
        </router-link>
        <router-link
          to="/seller/analytics"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
          active-class="text-green-600 bg-green-50"
        >
          Analytics
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Seller Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">Seller Hub</span>
            </div>
            <p class="text-gray-600 mb-4">
              Empowering sellers to grow their businesses online with powerful tools, analytics, and support.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <router-link to="/seller/dashboard" class="text-gray-600 hover:text-green-600 text-sm">
                  Dashboard
                </router-link>
              </li>
              <li>
                <router-link to="/seller/products" class="text-gray-600 hover:text-green-600 text-sm">
                  Products
                </router-link>
              </li>
              <li>
                <router-link to="/seller/orders" class="text-gray-600 hover:text-green-600 text-sm">
                  Orders
                </router-link>
              </li>
              <li>
                <router-link to="/seller/stores" class="text-gray-600 hover:text-green-600 text-sm">
                  My Stores
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-green-600 text-sm">Help Center</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-green-600 text-sm">Contact Support</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-green-600 text-sm">Seller Guidelines</a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-green-600 text-sm">API Documentation</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200">
          <p class="text-center text-gray-400 text-sm">
            © 2024 WebProsHub Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()

// Reactive data
const showUserMenu = ref(false)
const notificationCount = ref(3)
const messageCount = ref(1)

// Computed properties
const user = computed(() => authStore.user)
const userInitials = computed(() => {
  if (!user.value?.name) return 'S'
  return user.value.name
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

// Close user menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // Set page title
  document.title = 'Seller Hub - WebProsHub Marketplace'
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
