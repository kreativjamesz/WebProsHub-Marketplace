<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useGuestCartStore } from '@/stores/guestCart'
import { useThemeStore } from '@/stores/theme'
import {
  DefaultLayout,
  AuthLayout,
  AdminLayout,
  SellerLayout,
  BuyerLayout,
  BlankLayout,
  GuestLayout
} from '@/layouts'
import { AuthDialog } from '@/components/auth'
import { authDialogState } from '@/utils/authEvents'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const guestCartStore = useGuestCartStore()
const themeStore = useThemeStore()

// Color mode management - now handled by theme store
const mode = useColorMode()

// Determine which layout to use based on route
const currentLayout = computed(() => {
  if (route.meta.layout) {
    switch (route.meta.layout) {
      case 'auth':
        return DefaultLayout
      case 'admin':
        return AdminLayout
      case 'seller':
        return SellerLayout
      case 'buyer':
        return BuyerLayout
      case 'blank':
        return BlankLayout
      case 'guest':
        return GuestLayout
      default:
        return DefaultLayout
    }
  }
  
  // Auto-detect layout based on route path
  if (route.path.startsWith('/admin')) {
    return AdminLayout
  } else if (route.path.startsWith('/seller')) {
    return SellerLayout
  } else if (route.path.startsWith('/buyer')) {
    return BuyerLayout
  } else if (route.path.startsWith('/login') || route.path.startsWith('/register')) {
    return AuthLayout
  } else if (!authStore.isAuthenticated && isGuestRoute(route.path)) {
    return GuestLayout
  }
  
  return DefaultLayout
})

// Check if route should use guest layout
const isGuestRoute = (path: string) => {
  const guestRoutes = [
    '/',
    '/marketplace',
    '/stores', 
    '/categories',
    '/deals',
    '/about',
    '/contact',
    '/help'
  ]
  return guestRoutes.includes(path) || path.startsWith('/marketplace/')
}

onMounted(async () => {
  // Initialize theme store
  themeStore.initializeTheme()
  
  await authStore.checkAuth()
})

// Handle cart data when authentication status changes
watch(() => authStore.isAuthenticated, async (isAuthenticated) => {
  if (isAuthenticated) {
    // User logged in - migrate guest cart data
    const guestCartData = guestCartStore.migrateToUserCart()
    if (guestCartData.length > 0) {
      // Add guest cart items to user cart
      for (const item of guestCartData) {
        await cartStore.addItem(item.product, item.quantity)
      }
      console.log(`Migrated ${guestCartData.length} items from guest cart`)
    }
    
    // Load user's cart from backend
    await cartStore.loadCart()
  } else {
    // User logged out - clear user cart and load guest cart
    cartStore.items = []
    guestCartStore.loadFromLocalStorage()
  }
}, { immediate: true })
</script>

<template>
  <div id="app" class="min-h-screen" :class="themeStore.currentTheme">
    <!-- Loading overlay -->
    <div v-if="!authStore.isInitialized" class="fixed inset-0 bg-background/90 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-lg font-medium text-foreground">Loading WebProsHubMarketplace...</p>
      </div>
    </div>

    <!-- Dynamic Layout -->
    <component :is="currentLayout" v-else>
      <router-view />
    </component>
  </div>
</template>