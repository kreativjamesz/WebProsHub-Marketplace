<template>
  <div class="relative">
    <!-- User Menu Button -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div
        class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
      >
        <span class="text-white text-sm font-medium">
          {{ userInitials }}
        </span>
      </div>
      <div class="hidden md:block text-left">
        <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
        <p class="text-xs text-gray-500">{{ userRoleLabel }}</p>
      </div>
      <svg
        :class="isOpen ? 'rotate-180' : ''"
        class="w-4 h-4 text-gray-500 transition-transform"
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
      class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
    >
      <!-- User Info -->
      <div class="px-4 py-3 border-b border-gray-100">
        <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
        <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
        <div class="mt-2">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {{ userRoleLabel }}
          </span>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="py-1">
        <!-- Profile -->
        <router-link
          to="/profile"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          @click="isOpen = false"
        >
          <svg
            class="w-4 h-4 mr-3 text-gray-400"
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
          My Profile
        </router-link>

        <!-- Orders -->
        <router-link
          to="/orders"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          @click="isOpen = false"
        >
          <svg
            class="w-4 h-4 mr-3 text-gray-400"
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
          My Orders
        </router-link>

        <!-- Wishlist -->
        <router-link
          to="/wishlist"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          @click="isOpen = false"
        >
          <svg
            class="w-4 h-4 mr-3 text-gray-400"
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
          Wishlist
        </router-link>

        <!-- Settings -->
        <router-link
          to="/settings"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          @click="isOpen = false"
        >
          <svg
            class="w-4 h-4 mr-3 text-gray-400"
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
          Settings
        </router-link>

        <!-- Role-specific menu items -->
        <template v-if="authStore.isSeller">
          <div class="border-t border-gray-100 my-1"></div>
          <router-link
            to="/seller/dashboard"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            @click="isOpen = false"
          >
            <svg
              class="w-4 h-4 mr-3 text-gray-400"
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
            Store Dashboard
          </router-link>
          <router-link
            to="/seller/products"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            @click="isOpen = false"
          >
            <svg
              class="w-4 h-4 mr-3 text-gray-400"
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
            Manage Products
          </router-link>
          <router-link
            to="/seller/orders"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            @click="isOpen = false"
          >
            <svg
              class="w-4 h-4 mr-3 text-gray-400"
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
            Store Orders
          </router-link>
        </template>

        <template v-if="authStore.isAdmin">
          <div class="border-t border-gray-100 my-1"></div>
          <router-link
            to="/admin/dashboard"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            @click="isOpen = false"
          >
            <svg
              class="w-4 h-4 mr-3 text-gray-400"
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
            Admin Dashboard
          </router-link>
          <router-link
            to="/admin/users"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            @click="isOpen = false"
          >
            <svg
              class="w-4 h-4 mr-3 text-gray-400"
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
            Manage Users
          </router-link>
          <router-link
            to="/admin/stores"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            @click="isOpen = false"
          >
            <svg
              class="w-4 h-4 mr-3 text-gray-400"
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
            Manage Stores
          </router-link>
        </template>

        <!-- Theme Toggle -->
        <div class="border-t border-gray-100 my-1"></div>
        <div class="px-4 py-2">
          <ColorThemeDropdown />
        </div>

        <!-- Logout -->
        <div class="border-t border-gray-100 my-1"></div>
        <button
          @click="handleLogout"
          class="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <svg
            class="w-4 h-4 mr-3 text-red-400"
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
          Sign Out
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
