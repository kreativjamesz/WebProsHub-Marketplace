<template>
  <div
    :class="viewMode === 'grid' ? 'card-hover cursor-pointer border border-purple-400/20 rounded-xl overflow-hidden relative group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'card-hover cursor-pointer flex border border-purple-400/20 rounded-xl overflow-hidden relative group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'"
    @click="viewProduct(product.id)"
  >
    <!-- Subtle Hover Effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    
    <!-- Product Image -->
    <div :class="viewMode === 'grid' ? 'relative' : 'relative w-32 h-32 flex-shrink-0'">
      <SafeImage
        :src="product.images[0] || '/placeholder-product.jpg'"
        :alt="product.name"
        :class="viewMode === 'grid' ? 'w-full h-40 object-cover' : 'w-full h-full object-cover'"
      />
      
      <!-- Wishlist Button -->
      <div class="absolute top-2 right-2">
        <button
          @click.stop="toggleWishlist(product.id)"
          :class="isInWishlist(product.id) ? 'text-red-400' : 'text-purple-400'"
          class="p-1.5 rounded-full hover:bg-black/30 transition-all duration-200"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Discount Badge -->
      <div v-if="product.comparePrice && Number(product.comparePrice) > Number(product.price)" class="absolute top-2 left-2">
        <div class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          {{ Math.round(((Number(product.comparePrice) - Number(product.price)) / Number(product.comparePrice)) * 100) }}% OFF
        </div>
      </div>
    </div>

    <!-- Product Info -->
    <div :class="viewMode === 'grid' ? 'p-4' : 'p-4 flex-1 flex flex-col'">
      <!-- Category -->
      <div class="text-xs text-gray-400 mb-2">
        <span v-if="product.category?.name" class="hover:text-purple-400 transition-colors cursor-pointer">
          {{ product.category.name }}
        </span>
      </div>

      <!-- Product Name -->
      <h3 class="font-semibold text-white mb-2 line-clamp-2 text-sm group-hover:text-purple-300 transition-colors leading-tight">
        {{ product.name }}
      </h3>
      
      <!-- Rating & Reviews -->
      <div class="flex items-center space-x-2 mb-3">
        <div class="flex items-center space-x-0.5">
          <svg
            v-for="star in 5"
            :key="star"
            :class="star <= (product.rating || 0) ? 'text-white' : 'text-gray-600'"
            class="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
        <span class="text-xs text-gray-400">({{ product._count?.reviews || 0 }})</span>
      </div>

      <!-- Price Section -->
      <div class="flex items-center space-x-2 mb-3">
        <span class="text-lg font-bold text-purple-400">
          ₱{{ Number(product.price).toFixed(2) }}
        </span>
        <span v-if="product.comparePrice" class="text-sm text-gray-500 line-through">
          ₱{{ Number(product.comparePrice).toFixed(2) }}
        </span>
      </div>

      <!-- Store & Location -->
      <div class="flex items-center justify-between text-xs text-gray-400 mb-3">
        <div class="flex items-center space-x-1">
          <svg class="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span class="truncate max-w-20">{{ product.seller?.businessName || 'Unknown Store' }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <svg class="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="truncate max-w-16">{{ product.store?.city || 'Unknown' }}</span>
        </div>
      </div>

      <!-- Stock Status -->
      <div v-if="product.stock <= 0" class="mb-3">
        <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-900/50 text-red-300">
          <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Out of Stock
        </span>
      </div>
      <div v-else-if="product.stock <= (product.minStock || 5)" class="mb-3">
        <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-900/50 text-yellow-300">
          <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Low Stock
        </span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click.stop="addToCart(product.id)"
        :disabled="product.stock <= 0"
        class="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <div class="flex items-center justify-center space-x-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          <span>{{ product.stock <= 0 ? 'Out of Stock' : 'Add to Cart' }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/marketplace'
import { useCartStore } from '@/stores/cart'
import { useGuestCartStore } from '@/stores/guestCart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import SafeImage from '@/components/ui/SafeImage.vue'

interface Props {
  product: Product
  viewMode: 'grid' | 'list'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewProduct: [id: string]
  toggleWishlist: [id: string]
  addToCart: [id: string]
}>()

const cartStore = useCartStore()
const guestCartStore = useGuestCartStore()
const authStore = useAuthStore()
const router = useRouter()

const isInWishlist = (productId: string): boolean => {
  // TODO: Implement wishlist logic
  return false
}

const viewProduct = (productId: string) => {
  // Navigate directly to product details page
  router.push(`/marketplace/products/${productId}`)
}

const toggleWishlist = (productId: string) => {
  emit('toggleWishlist', productId)
}

const addToCart = (productId: string) => {
  if (authStore.isAuthenticated) {
    cartStore.addItem(props.product, 1)
  } else {
    guestCartStore.addItem(props.product, 1)
  }
  emit('addToCart', productId)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
