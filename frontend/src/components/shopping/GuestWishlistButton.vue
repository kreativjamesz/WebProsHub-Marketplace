<template>
  <button
    @click="toggleWishlist"
    class="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    :aria-label="isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
  >
    <!-- Heart Icon -->
    <svg v-if="!isInWishlist" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.172-1.171a4 4 0 00-6.364 0z"
      />
    </svg>

    <!-- Filled Heart Icon -->
    <svg v-else class="h-6 w-6 text-destructive" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="M4.318 6.318a4 4 0 000 6.364L12 20.364l7.682-7.682a4 4 0 00-6.364-6.364L12 7.636l-1.172-1.171a4 4 0 00-6.364 0z"
      />
    </svg>

    <!-- Wishlist Count Badge -->
    <span
      v-if="wishlistCount > 0"
      class="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
      aria-label="Wishlist items count"
    >
      {{ wishlistCount > 99 ? '99+' : wishlistCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useWishlistStore } from '@/stores/wishlist'
import { useGuestWishlistStore } from '@/stores/guestWishlist'
import { toast } from 'vue3-toastify'
import type { Product } from '@/types/marketplace'

interface Props {
  productId: string
  product: Product // Required for guest users to work properly
}

const props = defineProps<Props>()
const router = useRouter()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const guestWishlistStore = useGuestWishlistStore()

// Computed properties
const isInWishlist = computed(() => {
  if (authStore.isAuthenticated) {
    return wishlistStore.hasItem(props.productId)
  } else {
    return guestWishlistStore.hasItem(props.productId)
  }
})

const wishlistCount = computed(() => {
  if (authStore.isAuthenticated) {
    return wishlistStore.itemCount
  } else {
    return guestWishlistStore.itemCount
  }
})

// Methods
const toggleWishlist = () => {
  if (!authStore.isAuthenticated) {
    // Guest user - always has product object
    if (isInWishlist.value) {
      guestWishlistStore.removeItem(props.productId)
      toast.success('Removed from wishlist')
    } else {
      guestWishlistStore.addItem(props.product)
      toast.success('Added to wishlist! Sign in to save permanently.')
    }
    return
  }

  // Authenticated user
  if (isInWishlist.value) {
    wishlistStore.removeItem(props.productId)
    toast.success('Removed from wishlist')
  } else {
    wishlistStore.addItem(props.productId)
    toast.success('Added to wishlist!')
  }
}
</script>
