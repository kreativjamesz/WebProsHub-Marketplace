<template>
  <header
    class="bg-background text-foreground shadow-sm border-b border-border sticky top-0 z-40"
    role="banner"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <AppLogo :solo="isMobile" />

        <!-- Search Bar -->
        <SearchBar
          v-model="searchQuery"
          :show-mobile-search="showMobileSearch"
          @search="handleSearch"
          @toggle-mobile="showMobileSearch = !showMobileSearch"
        />

        <!-- User Section -->
        <div class="flex items-center space-x-4">
          <!-- Mobile Search Toggle -->
          <MobileSearchToggle
            v-if="isMobile"
            :is-active="showMobileSearch"
            @toggle="showMobileSearch = !showMobileSearch"
          />

          <!-- Color Theme -->
          <ColorThemeDropdown />

          <!-- Wishlist -->
          <WishlistButton :count="wishlistCount" />

          <!-- Shopping Cart -->
          <CartButton />

          <!-- User Menu or Auth Buttons -->
          <UserSection
            :is-authenticated="authStore.isAuthenticated"
            @close-mobile-menu="showMobileMenu = false"
          />

          <!-- Navigation Menu (Desktop Only) -->
          <NavigationMenu v-if="!isMobile" />

          <!-- Mobile Menu Button (Mobile Only) -->
          <MobileMenuButton
            v-if="isMobile"
            :is-active="showMobileMenu"
            @toggle="showMobileMenu = !showMobileMenu"
          />
        </div>
      </div>

      <!-- Mobile Search -->
      <MobileSearch
        v-if="showMobileSearch && isMobile"
        v-model="searchQuery"
        @search="handleSearch"
      />

      <!-- Mobile Menu -->
      <MobileMenu
        v-if="showMobileMenu && isMobile"
        :is-authenticated="authStore.isAuthenticated"
        @close="showMobileMenu = false"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { useWishlistStore } from '@/stores/wishlist'
import { debounce } from '@/utils/debounce'
import { useScreenSize } from '@/composables'
import AppLogo from '@/components/layout/AppLogo.vue'
import SearchBar from '@/components/layout/SearchBar.vue'
import MobileSearchToggle from '@/components/layout/MobileSearchToggle.vue'
import WishlistButton from '@/components/layout/WishlistButton.vue'
import CartButton from '@/components/shopping/CartButton.vue'
import UserSection from '@/components/layout/UserSection.vue'
import MobileMenuButton from '@/components/layout/MobileMenuButton.vue'
import MobileSearch from '@/components/layout/MobileSearch.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import ColorThemeDropdown from '@/components/ColorThemeDropdown.vue'
import NavigationMenu from './NavigationMenu.vue'

// Composables
const router = useRouter()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const { isMobile } = useScreenSize()

// State
const searchQuery = ref('')
const showMobileSearch = ref(false)
const showMobileMenu = ref(false)

// Computed properties for better performance
const wishlistCount = computed(() => wishlistStore.itemCount)

// Watch for screen size changes and auto-close mobile menus
watch(isMobile, (newIsMobile) => {
  if (!newIsMobile) {
    // Auto-close mobile menus when switching to desktop
    showMobileMenu.value = false
    showMobileSearch.value = false
  }
})

// Debounced search handler for better performance
const debouncedSearch = debounce((query: string) => {
  if (query.trim()) {
    router.push({
      path: '/marketplace',
      query: { search: query },
    })
    searchQuery.value = ''
    showMobileSearch.value = false
  }
}, 300)

// Methods
const handleSearch = () => {
  debouncedSearch(searchQuery.value)
}

// Close mobile menus when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.mobile-menu') && !target.closest('.mobile-search-toggle')) {
    showMobileMenu.value = false
    showMobileSearch.value = false
  }
}

// Close mobile menus on route change
const handleRouteChange = () => {
  showMobileMenu.value = false
  showMobileSearch.value = false
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  router.afterEach(handleRouteChange)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Custom scrollbar for mobile menu */
.mobile-menu::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu::-webkit-scrollbar-track {
  background: transparent;
}

.mobile-menu::-webkit-scrollbar-thumb {
  background: hsl(var(--muted) / 0.5);
  border-radius: 2px;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for better accessibility */
.focus-visible:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
</style>
