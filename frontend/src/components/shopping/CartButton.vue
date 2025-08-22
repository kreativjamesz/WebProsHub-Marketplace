<template>
  <button
    class="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    aria-label="Shopping cart"
    @click="openCart"
  >
    <ShoppingCartIcon class="w-6 h-6" />
    <span
      v-if="cartCount > 0"
      class="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
      aria-label="Cart items count"
    >
      {{ cartCount > 99 ? '99+' : cartCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useGlobalCart } from '@/composables/useGlobalCart'
import { ShoppingCartIcon } from 'lucide-vue-next'

// Stores
const cartStore = useCartStore()
const { openGlobalCart } = useGlobalCart()

// Computed
const cartCount = computed(() => cartStore.items.length)

// Methods
const openCart = () => {
  openGlobalCart()
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
