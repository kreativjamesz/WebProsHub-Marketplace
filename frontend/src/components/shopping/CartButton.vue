<template>
  <button
    class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    aria-label="Shopping cart"
    @click="openCart"
  >
    <svg 
      class="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" 
      />
    </svg>
    <span
      v-if="cartCount > 0"
      class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
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
