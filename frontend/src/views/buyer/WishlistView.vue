<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p class="mt-2 text-gray-600">{{ wishlistItems.length }} items saved for later</p>
      </div>

      <!-- Wishlist Content -->
      <div v-if="wishlistItems.length > 0" class="space-y-6">
        <!-- Wishlist Items -->
        <div
          v-for="item in wishlistItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <div class="flex items-start space-x-6">
            <!-- Product Image -->
            <div class="flex-shrink-0">
              <div class="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                <SafeImage
                  v-if="item.product.images && item.product.images.length > 0"
                  :src="item.product.images[0]"
                  :alt="item.product.name"
                  class="w-full h-full"
                  object-fit="cover"
                />
                <div
                  v-else
                  class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
                >
                  <svg class="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900 mb-2">{{ item.product.name }}</h3>
                  <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ item.product.description }}</p>
                  
                  <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>Store: {{ item.product.store?.name || 'Unknown Store' }}</span>
                    <span>•</span>
                    <span>{{ item.product.stock }} in stock</span>
                  </div>

                  <div class="flex items-center space-x-4">
                    <span class="text-2xl font-bold text-blue-600">₱{{ item.product.price.toFixed(2) }}</span>
                    <span class="text-sm text-gray-500">Added {{ formatDate(new Date(item.createdAt)) }}</span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col space-y-2 ml-4">
                  <button
                    @click="addToCart(item.product)"
                    :disabled="item.product.stock === 0"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ item.product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
                  </button>
                  
                  <button
                    @click="removeFromWishlist(item.id)"
                    class="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors duration-200 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bulk Actions -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button
                @click="selectAll"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Select All
              </button>
              <button
                @click="clearSelection"
                class="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Clear Selection
              </button>
            </div>
            
            <div class="flex space-x-3">
              <button
                @click="addSelectedToCart"
                :disabled="selectedItems.length === 0"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Selected to Cart ({{ selectedItems.length }})
              </button>
              
              <button
                @click="removeSelected"
                :disabled="selectedItems.length === 0"
                class="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove Selected
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Wishlist State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
        <p class="text-gray-500 mb-6">Start adding products you love to your wishlist!</p>
        <router-link
          to="/marketplace"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Browse Products
        </router-link>
      </div>

      <!-- Recommendations -->
      <div v-if="recommendations.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="product in recommendations"
            :key="product.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            @click="navigateToProduct(product.id)"
          >
            <div class="aspect-w-1 aspect-h-1 bg-gray-200">
              <SafeImage
                v-if="product.images && product.images.length > 0"
                :src="product.images[0]"
                :alt="product.name"
                class="w-full h-32"
                object-fit="cover"
              />
              <div
                v-else
                class="w-full h-32 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
              >
                <svg class="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <div class="p-3">
              <h3 class="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{{ product.name }}</h3>
              <div class="flex items-center justify-between mb-2">
                <span class="text-blue-600 font-semibold">₱{{ product.price.toFixed(2) }}</span>
                <div class="flex text-yellow-400">
                  <span v-for="i in 5" :key="i" class="text-xs">
                    <svg
                      class="w-3 h-3 fill-current text-gray-300"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div class="flex space-x-2">
                <button
                  @click.stop="addToCart(product)"
                  :disabled="product.stock === 0"
                  class="flex-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
                </button>
                <button
                  @click.stop="addToWishlist(product)"
                  class="px-3 py-1 text-red-600 border border-red-600 text-xs rounded hover:bg-red-50 transition-colors duration-200"
                >
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { WishlistItem, Product } from '@/types/marketplace'
import { mockWishlistItems, mockRecommendations } from '@/mocks'
import SafeImage from '@/components/ui/SafeImage.vue'

const router = useRouter()

// Reactive data
const wishlistItems = ref<WishlistItem[]>([])
const selectedItems = ref<string[]>([])
const recommendations = ref<Product[]>([])

// Use centralized mock data

// Methods
const addToCart = (product: Product) => {
  // TODO: Implement add to cart logic
  console.log('Adding to cart:', product)
}

const removeFromWishlist = (itemId: string) => {
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== itemId)
  selectedItems.value = selectedItems.value.filter(id => id !== itemId)
  // TODO: Remove from wishlist in backend
}

const selectAll = () => {
  selectedItems.value = wishlistItems.value.map(item => item.id)
}

const clearSelection = () => {
  selectedItems.value = []
}

const addSelectedToCart = () => {
  const selectedProducts = wishlistItems.value
    .filter(item => selectedItems.value.includes(item.id))
    .map(item => item.product)
  
  selectedProducts.forEach(product => {
    if (product.stock > 0) {
      addToCart(product)
    }
  })
  
  // TODO: Show success message
  console.log('Added selected items to cart')
}

const removeSelected = () => {
  selectedItems.value.forEach(itemId => {
    removeFromWishlist(itemId)
  })
  selectedItems.value = []
}

const navigateToProduct = (productId: string) => {
  router.push(`/products/${productId}`)
}

const addToWishlist = (product: Product) => {
  // TODO: Implement add to wishlist logic
  console.log('Adding to wishlist:', product)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const loadWishlistData = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.buyers.getWishlist()
    // wishlistItems.value = response.data
    
    // Using mock data for now
    wishlistItems.value = mockWishlistItems
    recommendations.value = mockRecommendations
  } catch (error) {
    console.error('Error loading wishlist data:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadWishlistData()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
