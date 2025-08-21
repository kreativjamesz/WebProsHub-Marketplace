<template>
  <header
    class="bg-background text-foreground shadow-sm border-b border-gray-200 sticky top-0 z-40"
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

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Mobile Search Toggle -->
          <MobileSearchToggle
            :is-active="showMobileSearch"
            @toggle="showMobileSearch = !showMobileSearch"
          />

          <!-- Color Theme -->
          <ColorThemeDropdown />

          <!-- Wishlist -->
          <WishlistButton :count="wishlistCount" />

          <!-- Shopping Cart -->
          <CartDrawer :cart-items="cartItems" />

          <!-- User Menu or Auth Buttons -->
          <UserSection
            :is-authenticated="authStore.isAuthenticated"
            @close-mobile-menu="showMobileMenu = false"
          />

          <!-- Navigation Dropdown Menu -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                class="hidden md:flex bg-neutral-100 hover:bg-neutral-200 rounded-full"
              >
                <MenuIcon class="h-6 w-6 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-48">
              <!-- Be a Seller Section -->
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem as-child>
                <router-link
                  to="/seller/onboarding"
                  class="w-full flex items-center justify-between"
                >
                  <div class="flex flex-col items-start justify-start">
                    <h4 class="text-lg font-bold">Be a seller</h4>
                    <p class="text-sm text-gray-500">
                      Join our marketplace and start selling your products.
                    </p>
                  </div>
                  <ArrowRightIcon class="h-4 w-4" />
                </router-link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              <!-- Navigation Links -->
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem as-child>
                <router-link to="/marketplace" class="w-full">
                  <StoreIcon class="mr-2 h-4 w-4" />
                  Marketplace
                </router-link>
              </DropdownMenuItem>
              <DropdownMenuItem as-child>
                <router-link to="/stores" class="w-full">
                  <Building2Icon class="mr-2 h-4 w-4" />
                  Stores
                </router-link>
              </DropdownMenuItem>
              <DropdownMenuItem as-child>
                <router-link to="/categories" class="w-full">
                  <FolderIcon class="mr-2 h-4 w-4" />
                  Categories
                </router-link>
              </DropdownMenuItem>
              <DropdownMenuItem as-child>
                <router-link to="/deals" class="w-full">
                  <TagIcon class="mr-2 h-4 w-4" />
                  Deals
                </router-link>
              </DropdownMenuItem>
              
              <!-- Auth Section (only show when not authenticated) -->
              <template v-if="!authStore.isAuthenticated">
                <DropdownMenuSeparator />
                <DropdownMenuItem as-child>
                  <router-link to="/login" class="w-full">
                    <LogInIcon class="mr-2 h-4 w-4" />
                    Login
                  </router-link>
                </DropdownMenuItem>
                <DropdownMenuItem as-child>
                  <router-link to="/register" class="w-full">
                    <UserPlusIcon class="mr-2 h-4 w-4" />
                    Register
                  </router-link>
                </DropdownMenuItem>
              </template>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- Mobile Menu Button -->
          <MobileMenuButton
            :is-active="showMobileMenu"
            @toggle="showMobileMenu = !showMobileMenu"
          />
        </div>
      </div>

      <!-- Mobile Search -->
      <MobileSearch v-if="showMobileSearch" v-model="searchQuery" @search="handleSearch" />

      <!-- Mobile Menu -->
      <MobileMenu
        v-if="showMobileMenu"
        :is-authenticated="authStore.isAuthenticated"
        @close="showMobileMenu = false"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { debounce } from '@/utils/debounce'
import { useScreenSize } from '@/composables'
import AppLogo from '@/components/layout/AppLogo.vue'
import SearchBar from '@/components/layout/SearchBar.vue'
import MobileSearchToggle from '@/components/layout/MobileSearchToggle.vue'
import WishlistButton from '@/components/layout/WishlistButton.vue'
import CartDrawer from '@/components/shopping/CartDrawer.vue'
import UserSection from '@/components/layout/UserSection.vue'
import MobileMenuButton from '@/components/layout/MobileMenuButton.vue'
import MobileSearch from '@/components/layout/MobileSearch.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import ColorThemeDropdown from '@/components/ColorThemeDropdown.vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StoreIcon, Building2Icon, FolderIcon, TagIcon, MenuIcon, UserPlusIcon, ArrowRightIcon, LogInIcon } from 'lucide-vue-next'

// Composables
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { isMobile } = useScreenSize()

// State
const searchQuery = ref('')
const showMobileSearch = ref(false)
const showMobileMenu = ref(false)

// Computed properties for better performance
const cartItems = computed(() => cartStore.items)
const wishlistCount = computed(() => wishlistStore.count)

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
  background: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for better accessibility */
.focus-visible:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
