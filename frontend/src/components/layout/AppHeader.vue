<template>
  <header
    class="universe-header sticky top-0 z-40 backdrop-blur-xl border-b border-universe-border/20"
    role="banner"
  >
    <!-- Animated Universe Background -->
    <div class="universe-bg">
      <div class="stars"></div>
      <div class="nebula"></div>
      <div class="cosmic-dust"></div>
    </div>
    
    <!-- Glow Effect Overlay -->
    <div class="header-glow"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex items-center justify-between h-20">
        <!-- Logo and Brand with Glow -->
        <div class="logo-container">
          <AppLogo :solo="isMobile" />
          <div class="logo-glow"></div>
        </div>

        <!-- Search Bar with Universe Theme -->
        <SearchBar
          v-model="searchQuery"
          :show-mobile-search="showMobileSearch"
          @search="handleSearch"
          @toggle-mobile="showMobileSearch = !showMobileSearch"
        />

        <!-- User Section with Glowing Effects -->
        <div class="flex items-center space-x-6">
          <!-- Mobile Search Toggle -->
          <MobileSearchToggle
            v-if="isMobile"
            :is-active="showMobileSearch"
            @toggle="showMobileSearch = !showMobileSearch"
          />

          <!-- Color Theme with Glow -->
          <div class="theme-container">
            <ColorThemeDropdown />
            <div class="theme-glow"></div>
          </div>

          <!-- Wishlist with Pulse Effect -->
          <div class="wishlist-container">
            <WishlistButton :count="wishlistCount" />
            <div class="wishlist-pulse"></div>
          </div>

          <!-- Shopping Cart with Glow -->
          <div class="cart-container">
            <CartButton />
            <div class="cart-glow"></div>
          </div>

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

  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useColorMode } from '@vueuse/core'

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

// Theme system - CONNECTED TO ColorThemeDropdown
const mode = useColorMode()

// State
const searchQuery = ref('')
const showMobileSearch = ref(false)
const showMobileMenu = ref(false)

// Computed properties for better performance
const wishlistCount = computed(() => wishlistStore.itemCount)

// Check if we're in light mode - NOW CONNECTED TO useColorMode
const isLightMode = computed(() => {
  return mode.value === 'light' || 
         document.documentElement.classList.contains('light') ||
         document.documentElement.classList.contains('light-mode')
})

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
/* Universe Header Base Styles */
.universe-header {
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.8) 0%,
    rgba(30, 41, 59, 0.6) 50%,
    rgba(51, 65, 85, 0.8) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

/* Animated Universe Background */
.universe-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

/* Stars Animation */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
    radial-gradient(2px 2px at 40px 70px, #ffffff, transparent),
    radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
    radial-gradient(1px 1px at 130px 80px, #ffffff, transparent),
    radial-gradient(2px 2px at 160px 30px, #ffffff, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: twinkle 8s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* Nebula Effect */
.nebula {
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(
    ellipse at center,
    rgba(147, 51, 234, 0.1) 0%,
    rgba(79, 70, 229, 0.05) 40%,
    rgba(236, 72, 153, 0.03) 70%,
    transparent 100%
  );
  animation: nebula-drift 20s ease-in-out infinite;
}

@keyframes nebula-drift {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
}

/* Cosmic Dust */
.cosmic-dust {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 50px 50px, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1px 1px at 100px 100px, rgba(255, 255, 255, 0.2), transparent),
    radial-gradient(1px 1px at 150px 150px, rgba(255, 255, 255, 0.4), transparent);
  background-size: 200px 200px;
  animation: dust-float 15s linear infinite;
}

@keyframes dust-float {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-200px); }
}

/* Header Glow Effect */
.header-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(147, 51, 234, 0.1) 0%,
    transparent 50%,
    rgba(79, 70, 229, 0.05) 100%
  );
  z-index: 2;
  pointer-events: none;
}

/* Logo Container with Glow */
.logo-container {
  position: relative;
  display: flex;
  align-items: center;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 60px;
  background: radial-gradient(
    ellipse at center,
    rgba(147, 51, 234, 0.3) 0%,
    rgba(79, 70, 229, 0.2) 50%,
    transparent 100%
  );
  border-radius: 50%;
  filter: blur(20px);
  animation: logo-pulse 4s ease-in-out infinite;
  z-index: -1;
}

@keyframes logo-pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
}

/* Theme Container with Glow */
.theme-container {
  position: relative;
  display: flex;
  align-items: center;
}

.theme-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: radial-gradient(
    circle at center,
    rgba(236, 72, 153, 0.2) 0%,
    rgba(147, 51, 234, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  filter: blur(15px);
  animation: theme-rotate 6s linear infinite;
  z-index: -1;
}

@keyframes theme-rotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Wishlist Container with Pulse */
.wishlist-container {
  position: relative;
  display: flex;
  align-items: center;
}

.wishlist-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: radial-gradient(
    circle at center,
    rgba(239, 68, 68, 0.3) 0%,
    rgba(239, 68, 68, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  filter: blur(10px);
  animation: wishlist-pulse 2s ease-in-out infinite;
  z-index: -1;
}

@keyframes wishlist-pulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}

/* Cart Container with Glow */
.cart-container {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: radial-gradient(
    circle at center,
    rgba(34, 197, 94, 0.3) 0%,
    rgba(34, 197, 94, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  filter: blur(15px);
  animation: cart-bounce 3s ease-in-out infinite;
  z-index: -1;
}

@keyframes cart-bounce {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
}

/* Border with Universe Theme */
.border-universe-border {
  border-color: rgba(147, 51, 234, 0.3);
}

/* Enhanced Hover Effects */
.universe-header *:hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .universe-header {
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }
  
  .logo-glow {
    width: 80px;
    height: 40px;
  }
  
  .theme-glow,
  .cart-glow {
    width: 40px;
    height: 40px;
  }
  
  .wishlist-pulse {
    width: 35px;
    height: 35px;
  }
}

/* Dark Mode Enhancements */
.dark .universe-header {
  background: linear-gradient(
    135deg,
    rgba(2, 6, 23, 0.9) 0%,
    rgba(15, 23, 42, 0.7) 50%,
    rgba(30, 41, 59, 0.9) 100%
  );
}

.dark .stars {
  opacity: 0.8;
}

.dark .nebula {
  opacity: 0.6;
}

.dark .cosmic-dust {
  opacity: 0.7;
}

/* Light Mode Enhancements */
/* Light Mode Enhancements */
.light .universe-header {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(245, 245, 250, 0.7) 50%,
    rgba(230, 230, 240, 0.85) 100%
  );
  border-bottom: 1px solid rgba(147, 51, 234, 0.12);
}

.light .stars {
  opacity: 0.4;
  background-image:
    radial-gradient(2px 2px at 20px 30px, #a3a3a3, transparent),
    radial-gradient(2px 2px at 40px 70px, #d1d5db, transparent),
    radial-gradient(1px 1px at 90px 40px, #e5e7eb, transparent),
    radial-gradient(1px 1px at 130px 80px, #cbd5e1, transparent),
    radial-gradient(2px 2px at 160px 30px, #f3f4f6, transparent);
}

.light .nebula {
  opacity: 0.2;
  background: radial-gradient(
    ellipse at center,
    rgba(147, 51, 234, 0.05) 0%,
    rgba(79, 70, 229, 0.03) 40%,
    rgba(236, 72, 153, 0.01) 70%,
    transparent 100%
  );
}

.light .cosmic-dust {
  opacity: 0.3;
  background-image:
    radial-gradient(1px 1px at 50px 50px, rgba(200, 200, 200, 0.2), transparent),
    radial-gradient(1px 1px at 100px 100px, rgba(220, 220, 220, 0.15), transparent),
    radial-gradient(1px 1px at 150px 150px, rgba(240, 240, 240, 0.25), transparent);
}

/* Smooth transitions for theme switching */
.dark .universe-header,
.dark .universe-header * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for better accessibility */
.focus-visible:focus-visible {
  outline: 2px solid rgba(147, 51, 234, 0.6);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Custom scrollbar for mobile menu */
.mobile-menu::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu::-webkit-scrollbar-track {
  background: transparent;
}

.mobile-menu::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.3);
  border-radius: 2px;
}

/* Glass morphism effect for child components */
.universe-header > * {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
