<template>
  <div class="relative">
    <!-- User Menu Button -->
    <button
      @click="isOpen = !isOpen"
      class="group flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-950/80 via-purple-950/80 to-purple-900/80 border border-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 backdrop-blur-xl"
    >
      <div
        class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300"
      >
        <span class="text-white text-sm font-bold">
          {{ userInitials }}
        </span>
      </div>
      <div class="hidden md:block text-left">
        <p class="text-sm font-bold text-white group-hover:text-purple-200 transition-colors duration-300">{{ authStore.user?.name }}</p>
        <p class="text-xs text-purple-300 group-hover:text-purple-200 transition-colors duration-300">{{ userRoleLabel }}</p>
      </div>
      <svg
        :class="isOpen ? 'rotate-180' : ''"
        class="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-3 w-64 bg-gradient-to-br from-blue-950/95 via-purple-950/95 to-purple-900/95 rounded-2xl shadow-2xl border border-purple-500/30 py-3 z-50 backdrop-blur-xl"
    >
      <!-- User Info -->
      <div class="px-5 py-4 border-b border-purple-500/20">
        <p class="text-sm font-bold text-white mb-1">{{ authStore.user?.name }}</p>
        <p class="text-sm text-purple-300 mb-3">{{ authStore.user?.email }}</p>
        <div>
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border border-blue-400/30 shadow-lg shadow-blue-500/20"
          >
            {{ userRoleLabel }}
          </span>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="py-2">
        <!-- Profile -->
        <router-link
          to="/profile"
          class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          @click="isOpen = false"
        >
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg flex items-center justify-center mr-3 border border-purple-400/30 group-hover:scale-110 group-hover:border-purple-400/50 transition-all duration-300">
            <svg
              class="w-4 h-4 text-purple-300 group-hover:text-purple-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span class="font-medium">My Profile</span>
        </router-link>

        <!-- Orders -->
        <router-link
          to="/orders"
          class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          @click="isOpen = false"
        >
          <div class="w-8 h-8 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg flex items-center justify-center mr-3 border border-green-400/30 group-hover:scale-110 group-hover:border-green-400/50 transition-all duration-300">
            <svg
              class="w-4 h-4 text-green-300 group-hover:text-green-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <span class="font-medium">My Orders</span>
        </router-link>

        <!-- Wishlist -->
        <router-link
          to="/wishlist"
          class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          @click="isOpen = false"
        >
          <div class="w-8 h-8 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-lg flex items-center justify-center mr-3 border border-pink-400/30 group-hover:scale-110 group-hover:border-pink-400/50 transition-all duration-300">
            <svg
              class="w-4 h-4 text-pink-300 group-hover:text-pink-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <span class="font-medium">Wishlist</span>
        </router-link>

        <!-- Settings -->
        <router-link
          to="/settings"
          class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          @click="isOpen = false"
        >
          <div class="w-8 h-8 bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-lg flex items-center justify-center mr-3 border border-indigo-400/30 group-hover:scale-110 group-hover:border-indigo-400/50 transition-all duration-300">
            <svg
              class="w-4 h-4 text-indigo-300 group-hover:text-indigo-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span class="font-medium">Settings</span>
        </router-link>

        <!-- Role-specific menu items -->
        <template v-if="authStore.isSeller">
          <div class="border-t border-purple-500/20 my-2 mx-2"></div>
          <router-link
            to="/seller/dashboard"
            class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            @click="isOpen = false"
          >
            <div class="w-8 h-8 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-lg flex items-center justify-center mr-3 border border-yellow-400/30 group-hover:scale-110 group-hover:border-yellow-400/50 transition-all duration-300">
              <svg
                class="w-4 h-4 text-yellow-300 group-hover:text-yellow-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span class="font-medium">Store Dashboard</span>
          </router-link>
          <router-link
            to="/seller/products"
            class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            @click="isOpen = false"
          >
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center mr-3 border border-blue-400/30 group-hover:scale-110 group-hover:border-blue-400/50 transition-all duration-300">
              <svg
                class="w-4 h-4 text-blue-300 group-hover:text-blue-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span class="font-medium">Manage Products</span>
          </router-link>
          <router-link
            to="/seller/orders"
            class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            @click="isOpen = false"
          >
            <div class="w-8 h-8 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-lg flex items-center justify-center mr-3 border border-emerald-400/30 group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300">
              <svg
                class="w-4 h-4 text-emerald-300 group-hover:text-emerald-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span class="font-medium">Store Orders</span>
          </router-link>
        </template>

        <template v-if="authStore.isAdmin">
          <div class="border-t border-purple-500/20 my-2 mx-2"></div>
          <router-link
            to="/admin/dashboard"
            class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            @click="isOpen = false"
          >
            <div class="w-8 h-8 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-lg flex items-center justify-center mr-3 border border-red-400/30 group-hover:scale-110 group-hover:border-red-400/50 transition-all duration-300">
              <svg
                class="w-4 h-4 text-red-300 group-hover:text-red-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <span class="font-medium">Admin Dashboard</span>
          </router-link>
          <router-link
            to="/admin/users"
            class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            @click="isOpen = false"
          >
            <div class="w-8 h-8 bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-lg flex items-center justify-center mr-3 border border-violet-400/30 group-hover:scale-110 group-hover:border-violet-400/50 transition-all duration-300">
              <svg
                class="w-4 h-4 text-violet-300 group-hover:text-violet-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <span class="font-medium">Manage Users</span>
          </router-link>
          <router-link
            to="/admin/stores"
            class="group flex items-center px-5 py-3 text-sm text-purple-200 hover:bg-purple-500/20 hover:text-white rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            @click="isOpen = false"
          >
            <div class="w-8 h-8 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-lg flex items-center justify-center mr-3 border border-amber-400/30 group-hover:scale-110 group-hover:border-amber-400/50 transition-all duration-300">
              <svg
                class="w-4 h-4 text-amber-300 group-hover:text-amber-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span class="font-medium">Manage Stores</span>
          </router-link>
        </template>

        <!-- Theme Toggle -->
        <div class="border-t border-purple-500/20 my-2 mx-2"></div>
        <div class="px-5 py-2">
          <ColorThemeDropdown />
        </div>

        <!-- Logout -->
        <div class="border-t border-purple-500/20 my-2 mx-2"></div>
        <button
          @click="handleLogout"
          class="group w-full flex items-center px-5 py-3 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl mx-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
        >
          <div class="w-8 h-8 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-lg flex items-center justify-center mr-3 border border-red-400/30 group-hover:scale-110 group-hover:border-red-400/50 transition-all duration-300">
            <svg
              class="w-4 h-4 text-red-300 group-hover:text-red-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <span class="font-medium">Sign Out</span>
        </button>
      </div>
    </div>

    <!-- Click outside to close -->
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="isOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import ColorThemeDropdown from '@/components/ColorThemeDropdown.vue'

const router = useRouter()
const authStore = useAuthStore()

// State
const isOpen = ref(false)

// Computed
const userInitials = computed(() => {
  if (!authStore.user?.name) return 'U'
  return authStore.user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const userRoleLabel = computed(() => {
  if (authStore.isAdmin) return 'Administrator'
  if (authStore.isSeller) return 'Seller'
  if (authStore.isBuyer) return 'Buyer'
  if (authStore.isStaff) return 'Staff'
  return 'User'
})

// Methods
const handleLogout = async () => {
  try {
    await authStore.logout()
    isOpen.value = false
    router.push('/login')
    toast.success('Logged out successfully')
  } catch (error) {
    toast.error('Logout failed')
  }
}
</script>
