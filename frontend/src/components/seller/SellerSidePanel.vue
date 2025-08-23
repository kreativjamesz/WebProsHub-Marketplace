<template>
  <div class="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-950 via-purple-950 to-purple-900 border-r border-purple-500/30 z-50 backdrop-blur-xl">
    <!-- Universe Background Elements -->
    <div class="absolute inset-0">
      <!-- Floating Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(147,51,234,0.03)_50%,transparent_100%)] opacity-20"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(147,51,234,0.02)_50%,transparent_100%)] opacity-15"></div>
      
      <!-- Side Panel Particles -->
      <div class="side-particle side-particle-1"></div>
      <div class="side-particle side-particle-2"></div>
      <div class="side-particle side-particle-3"></div>
    </div>

    <!-- Content -->
    <div class="relative h-full flex flex-col">
      <!-- Logo Section -->
      <div class="p-6 border-b border-purple-500/20">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold text-white">Seller Hub</h1>
            <p class="text-xs text-purple-300">Dashboard</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <router-link
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-400/50',
            $route.path === item.path
              ? 'bg-purple-500/20 border border-purple-400/50 shadow-lg shadow-purple-500/30'
              : 'border border-transparent hover:shadow-lg hover:shadow-purple-500/20'
          ]"
        >
          <div :class="`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`">
            <component :is="item.icon" :class="`w-5 h-5 ${item.iconColor}`" />
          </div>
          <span :class="`font-medium transition-colors duration-300 ${
            $route.path === item.path ? 'text-white' : 'text-gray-300 group-hover:text-white'
          }`">
            {{ item.label }}
          </span>
        </router-link>
      </nav>

      <!-- User Profile Section -->
      <div class="p-4 border-t border-purple-500/20">
        <div class="flex items-center space-x-3 p-3 bg-purple-800/30 rounded-xl border border-purple-700/50">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-sm">{{ userInitials }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ user?.name || 'Seller' }}</p>
            <p class="text-xs text-purple-300 truncate">{{ user?.email || 'seller@example.com' }}</p>
          </div>
          <button
            @click="logout"
            class="w-8 h-8 bg-red-900/30 border border-red-500/30 rounded-lg flex items-center justify-center hover:bg-red-900/50 hover:border-red-400/50 transition-all duration-300"
          >
            <svg class="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  Home as HomeIcon,
  Package as PackageIcon,
  ShoppingBag as OrdersIcon,
  Store as StoreIcon,
  BarChart3 as AnalyticsIcon,
  Settings as SettingsIcon,
  User as ProfileIcon
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const userInitials = computed(() => {
  if (!user.value?.name) return 'S'
  return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/seller/dashboard',
    icon: HomeIcon,
    iconBg: 'bg-purple-900/30 border-purple-500/30',
    iconColor: 'text-purple-400'
  },
  {
    label: 'Products',
    path: '/seller/products',
    icon: PackageIcon,
    iconBg: 'bg-blue-900/30 border-blue-500/30',
    iconColor: 'text-blue-400'
  },
  {
    label: 'Orders',
    path: '/seller/orders',
    icon: OrdersIcon,
    iconBg: 'bg-green-900/30 border-green-500/30',
    iconColor: 'text-green-400'
  },
  {
    label: 'Stores',
    path: '/seller/stores',
    icon: StoreIcon,
    iconBg: 'bg-yellow-900/30 border-yellow-500/30',
    iconColor: 'text-yellow-400'
  },
  {
    label: 'Analytics',
    path: '/seller/analytics',
    icon: AnalyticsIcon,
    iconBg: 'bg-red-900/30 border-red-500/30',
    iconColor: 'text-red-400'
  },
  {
    label: 'Profile',
    path: '/seller/profile',
    icon: ProfileIcon,
    iconBg: 'bg-indigo-900/30 border-indigo-500/30',
    iconColor: 'text-indigo-400'
  },
  {
    label: 'Settings',
    path: '/seller/settings',
    icon: SettingsIcon,
    iconBg: 'bg-purple-900/30 border-purple-500/30',
    iconColor: 'text-purple-400'
  }
]

const logout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
/* Side Panel Particle Animations */
.side-particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: sideFloat 10s infinite ease-in-out;
}

.side-particle-1 {
  width: 6px;
  height: 6px;
  background: linear-gradient(45deg, #a855f7, #ec4899);
  animation-delay: 0s;
  animation-duration: 12s;
}

.side-particle-2 {
  width: 4px;
  height: 4px;
  background: linear-gradient(45deg, #ec4899, #8b5cf6);
  animation-delay: 3s;
  animation-duration: 15s;
}

.side-particle-3 {
  width: 5px;
  height: 5px;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  animation-delay: 6s;
  animation-duration: 18s;
}

@keyframes sideFloat {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
  }
  25% {
    opacity: 0.6;
    transform: translate(10px, -20px) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-5px, -40px) scale(1.2);
  }
  75% {
    opacity: 0.4;
    transform: translate(15px, -30px) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .fixed {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }
  
  .fixed.show {
    transform: translateX(0);
  }
}
</style>
