<template>
  <div class="md:hidden border-t border-border py-4 mobile-menu">
    <div class="space-y-1">
      <!-- Main Navigation -->
      <div class="px-3 py-2">
        <h3 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Main Navigation
        </h3>
        <div class="space-y-1">
          <router-link
            v-for="item in mainNavigation"
            :key="item.path"
            :to="item.path"
            class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            @click="$emit('close')"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>

      <!-- Marketplace Features -->
      <div class="px-3 py-2">
        <h3 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Marketplace Features
        </h3>
        <div class="space-y-1">
          <router-link
            v-for="item in marketplaceFeatures"
            :key="item.path"
            :to="item.path"
            class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            @click="$emit('close')"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>

      <!-- Information -->
      <div class="px-3 py-2">
        <h3 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Information
        </h3>
        <div class="space-y-1">
          <router-link
            v-for="item in information"
            :key="item.path"
            :to="item.path"
            class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            @click="$emit('close')"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>

      <!-- Business -->
      <div class="px-3 py-2">
        <h3 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Business
        </h3>
        <div class="space-y-1">
          <router-link
            v-for="item in business"
            :key="item.path"
            :to="item.path"
            class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            @click="$emit('close')"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>

      <!-- User Actions (if authenticated) -->
      <div v-if="isAuthenticated" class="px-3 py-2">
        <h3 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          My Account
        </h3>
        <div class="space-y-1">
          <router-link
            v-for="item in userActions"
            :key="item.path"
            :to="item.path"
            class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            @click="$emit('close')"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
      
      <!-- Mobile Theme Toggle -->
      <div class="pt-4 border-t border-border">
        <div class="px-3 py-2">
          <ColorThemeDropdown />
        </div>
      </div>
      
      <!-- Mobile Auth -->
      <div v-if="!isAuthenticated" class="pt-4 border-t border-border">
        <div class="px-3 py-2">
          <h3 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Account
          </h3>
          <div class="space-y-1">
            <router-link
              to="/login"
              class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              @click="$emit('close')"
            >
              Sign In
            </router-link>
            <router-link
              to="/register"
              class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              @click="$emit('close')"
            >
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorThemeDropdown from '@/components/ColorThemeDropdown.vue'

interface Props {
  isAuthenticated: boolean
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
defineEmits<Emits>()

// Navigation items configuration
const mainNavigation = [
  { path: '/', label: 'Home' },
  { path: '/marketplace', label: 'Marketplace' },
  { path: '/search', label: 'Advanced Search' }
] as const

const marketplaceFeatures = [
  { path: '/stores', label: 'Stores' },
  { path: '/categories', label: 'Categories' },
  { path: '/deals', label: 'Deals & Promotions' },
  { path: '/trending', label: 'Trending Products' },
  { path: '/new-arrivals', label: 'New Arrivals' },
  { path: '/wishlist', label: 'Wishlist' },
  { path: '/recently-viewed', label: 'Recently Viewed' }
] as const

const information = [
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
  { path: '/help', label: 'Help & Support' },
  { path: '/blog', label: 'Blog & News' },
  { path: '/reviews', label: 'Customer Reviews' }
] as const

const business = [
  { path: '/seller/onboarding', label: 'Become a Seller' },
  { path: '/business/partnership', label: 'Partnership' },
  { path: '/business/analytics', label: 'Analytics Dashboard' },
  { path: '/business/inventory', label: 'Inventory Management' }
] as const

const userActions = [
  { path: '/profile', label: 'My Profile' },
  { path: '/orders', label: 'My Orders' },
  { path: '/buyer/cart', label: 'Shopping Cart' },
  { path: '/account/settings', label: 'Settings' },
  { path: '/account/payments', label: 'Payment Methods' },
  { path: '/account/addresses', label: 'Address Book' },
  { path: '/account/reviews', label: 'My Reviews' }
] as const
</script>
