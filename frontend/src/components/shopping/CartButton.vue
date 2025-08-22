<template>
  <button
    @click="openGlobalCart"
    class="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    aria-label="Shopping cart"
  >
    <ShoppingCartIcon class="h-6 w-6" />
    
    <!-- Cart Badge -->
    <span
      v-if="cartItemCount > 0"
      class="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
      aria-label="Cart items count"
    >
      {{ cartItemCount > 99 ? '99+' : cartItemCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ShoppingCartIcon } from 'lucide-vue-next'
import { useGlobalCart } from '@/composables/useGlobalCart'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useGuestCartStore } from '@/stores/guestCart'

const { openGlobalCart } = useGlobalCart()
const authStore = useAuthStore()
const cartStore = useCartStore()
const guestCartStore = useGuestCartStore()

// Show cart count for both authenticated and guest users
const cartItemCount = computed(() => {
  if (authStore.isAuthenticated) {
    return cartStore.itemCount
  } else {
    return guestCartStore.itemCount
  }
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
