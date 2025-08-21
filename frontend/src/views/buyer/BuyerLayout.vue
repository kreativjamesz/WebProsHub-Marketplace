<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Buyer Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Navigation -->
          <div class="flex items-center space-x-8">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">W</span>
              </div>
              <span class="text-xl font-bold text-gray-900">WebProsHub</span>
            </router-link>
            
            <nav class="hidden md:flex space-x-6">
              <router-link
                to="/buyer/dashboard"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                :class="{ 'text-blue-600 bg-blue-50': $route.name === 'buyer-dashboard' }"
              >
                Dashboard
              </router-link>
              <router-link
                to="/buyer/orders"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                :class="{ 'text-blue-600 bg-blue-50': $route.name === 'buyer-orders' }"
              >
                My Orders
              </router-link>
              <router-link
                to="/buyer/wishlist"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                :class="{ 'text-blue-600 bg-blue-50': $route.name === 'buyer-wishlist' }"
              >
                Wishlist
              </router-link>
              <router-link
                to="/buyer/profile"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                :class="{ 'text-blue-600 bg-blue-50': $route.name === 'buyer-profile' }"
              >
                Profile
              </router-link>
            </nav>
          </div>

          <!-- User Actions -->
          <div class="flex items-center space-x-4">
            <!-- Cart -->
            <router-link
              to="/buyer/cart"
              class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartItemCount }}
              </span>
            </router-link>

            <!-- Notifications -->
            <button class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.19 4.47A19.916 19.916 0 0112 2c5.523 0 10.012 4.477 10.012 9.986 0 5.508-4.489 9.986-10.012 9.986-5.523 0-10.012-4.477-10.012-9.986 0-1.847.5-3.608 1.38-5.133l1.812 1.812z" />
              </svg>
              <span
                v-if="notificationCount > 0"
                class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ notificationCount }}
              </span>
            </button>

            <!-- User Menu -->
            <div class="relative">
              <button
                @click="userMenuOpen = !userMenuOpen"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 font-semibold text-sm">{{ userInitials }}</span>
                </div>
                <span class="hidden md:block text-sm font-medium">{{ user?.name || 'User' }}</span>
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <router-link
                  to="/buyer/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="userMenuOpen = false"
                >
                  Profile Settings
                </router-link>
                <router-link
                  to="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="userMenuOpen = false"
                >
                  Account Settings
                </router-link>
                <router-link
                  to="/marketplace"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="userMenuOpen = false"
                >
                  Back to Marketplace
                </router-link>
                <hr class="my-1">
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

        <!-- Mobile Navigation -->
        <div class="md:hidden">
          <nav class="flex space-x-4 overflow-x-auto py-2">
            <router-link
              to="/buyer/dashboard"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'buyer-dashboard' }"
            >
              Dashboard
            </router-link>
            <router-link
              to="/buyer/orders"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'buyer-orders' }"
            >
              Orders
            </router-link>
            <router-link
              to="/buyer/wishlist"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'buyer-wishlist' }"
            >
              Wishlist
            </router-link>
            <router-link
              to="/buyer/profile"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'buyer-profile' }"
            >
              Profile
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Buyer Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Buyer Support</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm">Help Center</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm">Contact Support</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm">Returns & Refunds</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-900 text-sm">Shipping Info</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Account</h3>
            <ul class="space-y-2">
              <li><router-link to="/buyer/profile" class="text-gray-600 hover:text-gray-900 text-sm">Profile</router-link></li>
              <li><router-link to="/buyer/orders" class="text-gray-600 hover:text-gray-900 text-sm">Order History</router-link></li>
              <li><router-link to="/buyer/wishlist" class="text-gray-600 hover:text-gray-900 text-sm">Wishlist</router-link></li>
              <li><router-link to="/settings" class="text-gray-600 hover:text-gray-900 text-sm">Settings</router-link></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Marketplace</h3>
            <ul class="space-y-2">
              <li><router-link to="/marketplace" class="text-gray-600 hover:text-gray-900 text-sm">Browse Products</router-link></li>
              <li><router-link to="/stores" class="text-gray-600 hover:text-gray-900 text-sm">Discover Stores</router-link></li>
              <li><router-link to="/categories" class="text-gray-600 hover:text-gray-900 text-sm">Categories</router-link></li>
              <li><router-link to="/search" class="text-gray-600 hover:text-gray-900 text-sm">Search</router-link></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Stay Connected</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Instagram</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.153-1.772 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.054.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
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
const userMenuOpen = ref(false)
const cartItemCount = ref(0)
const notificationCount = ref(3)

// Computed properties
const user = computed<User | null>(() => authStore.user)
const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Methods
const logout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

// Close user menu when clicking outside
const closeUserMenu = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    userMenuOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Add click outside listener
  document.addEventListener('click', closeUserMenu)
  
  // Load cart item count
  // TODO: Replace with actual cart store
  cartItemCount.value = 3
})

// Cleanup
onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>
