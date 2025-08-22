<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p class="mt-2 text-gray-600">Save products you love for later</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">
              {{ wishlistItems.length }} item{{ wishlistItems.length !== 1 ? 's' : '' }}
            </span>
            <button
              v-if="wishlistItems.length > 0"
              @click="clearWishlist"
              class="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Empty State -->
      <div v-if="wishlistItems.length === 0" class="text-center py-16">
        <div class="mx-auto h-24 w-24 text-gray-300">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
        <p class="mt-2 text-gray-500">Start adding products you love to your wishlist</p>
        <div class="mt-6">
          <router-link
            to="/marketplace"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse Products
          </router-link>
        </div>
      </div>

      <!-- Wishlist Items -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in wishlistItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <!-- Product Image -->
          <div class="aspect-w-1 aspect-h-1 w-full">
            <img
              :src="item.product.images[0] || '/placeholder-product.jpg'"
              :alt="item.product.name"
              class="w-full h-48 object-cover"
              @error="handleImageError"
            />
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-900 line-clamp-2 mb-2">
              {{ item.product.name }}
            </h3>
            
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-2">
                <span class="text-2xl font-bold text-gray-900">
                  ₱{{ formatPrice(item.product.price) }}
                </span>
                <span v-if="item.product.comparePrice" class="text-sm text-gray-500 line-through">
                  ₱{{ formatPrice(item.product.comparePrice) }}
                </span>
              </div>
              
              <!-- Remove from Wishlist -->
              <button
                @click="removeFromWishlist(item.id)"
                class="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                title="Remove from wishlist"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <!-- Store Info -->
            <div class="text-sm text-gray-600 mb-3">
              <span class="font-medium">{{ item.product.store?.name || 'Store' }}</span>
            </div>

            <!-- Stock Status -->
            <div class="mb-4">
              <span
                v-if="item.product.stock > 0"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                In Stock ({{ item.product.stock }})
              </span>
              <span
                v-else
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
              >
                Out of Stock
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button
                @click="addToCart(item.product.id)"
                :disabled="item.product.stock === 0"
                class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              
              <router-link
                :to="`/marketplace/product/${item.product.id}`"
                class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 text-center"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More (if pagination is needed) -->
      <div v-if="hasMoreItems" class="text-center mt-8">
        <button
          @click="loadMore"
          :disabled="isLoading"
          class="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          {{ isLoading ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span class="text-gray-700">Loading wishlist...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'

const router = useRouter()
const authStore = useAuthStore()

// State
const wishlistItems = ref<any[]>([])
const isLoading = ref(false)
const hasMoreItems = ref(false)

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Methods
const loadWishlist = async () => {
  try {
    isLoading.value = true
    
    // Mock data for now - replace with actual API call
    const mockWishlistItems = [
      {
        id: '1',
        product: {
          id: '1',
          name: 'iPhone 15 Pro Max',
          price: 89999,
          comparePrice: 99999,
          stock: 25,
          images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
          store: { name: 'TechStore Pro' }
        }
      },
      {
        id: '2',
        product: {
          id: '2',
          name: 'MacBook Air M3',
          price: 129999,
          comparePrice: 149999,
          stock: 15,
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
          store: { name: 'TechStore Pro' }
        }
      },
      {
        id: '3',
        product: {
          id: '3',
          name: 'Premium Running Shoes',
          price: 8500,
          comparePrice: 12000,
          stock: 0,
          images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
          store: { name: 'FashionHub Elite' }
        }
      }
    ]
    
    wishlistItems.value = mockWishlistItems
    hasMoreItems.value = false
    
  } catch (error) {
    console.error('Error loading wishlist:', error)
    toast.error('Failed to load wishlist')
  } finally {
    isLoading.value = false
  }
}

const removeFromWishlist = async (itemId: string) => {
  try {
    // Mock API call - replace with actual API
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== itemId)
    toast.success('Removed from wishlist')
  } catch (error) {
    console.error('Error removing item:', error)
    toast.error('Failed to remove item')
  }
}

const addToCart = async (productId: string) => {
  try {
    // Mock API call - replace with actual API
    toast.success('Added to cart')
  } catch (error) {
    console.error('Error adding to cart:', error)
    toast.error('Failed to add to cart')
  }
}

const clearWishlist = async () => {
  try {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      // Mock API call - replace with actual API
      wishlistItems.value = []
      toast.success('Wishlist cleared')
    }
  } catch (error) {
    console.error('Error clearing wishlist:', error)
    toast.error('Failed to clear wishlist')
  }
}

const loadMore = async () => {
  // Implement pagination if needed
  console.log('Loading more items...')
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-product.jpg'
}

const formatPrice = (price: number) => {
  return price.toLocaleString('en-PH')
}

// Lifecycle
onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  
  loadWishlist()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-w-1 {
  position: relative;
  padding-bottom: 100%;
}

.aspect-w-1 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
