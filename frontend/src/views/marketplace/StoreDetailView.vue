<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading store details...</p>
      </div>

      <!-- Store Details -->
      <div v-else-if="store" class="space-y-8">
        <!-- Store Header -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
            <img
              v-if="store.banner"
              :src="store.banner"
              :alt="store.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="text-white text-6xl font-bold">{{ store.name.charAt(0) }}</span>
            </div>
            
            <!-- Store Info Overlay -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div class="flex items-end justify-between">
                <div>
                  <h1 class="text-3xl font-bold text-white mb-2">{{ store.name }}</h1>
                  <p class="text-white/90 text-lg">{{ store.description }}</p>
                </div>
                <div class="text-right text-white">
                  <div class="flex items-center mb-2">
                    <span class="text-white/80">{{ store.products?.length || 0 }} products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Store Meta -->
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Location</p>
                  <p class="font-medium text-gray-900">{{ store.city }}, {{ store.state }}, {{ store.country }}</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Category</p>
                  <p class="font-medium text-gray-900">Store</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Joined</p>
                  <p class="font-medium text-gray-900">{{ formatDate(new Date(store.createdAt)) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Products</h2>
            <div class="flex gap-2">
              <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="product in sortedProducts"
              :key="product.id"
              class="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
              @click="navigateToProduct(product.id)"
            >
              <div class="aspect-w-1 aspect-h-1 bg-gray-200">
                <img
                  v-if="product.images && product.images.length > 0"
                  :src="product.images[0]"
                  :alt="product.name"
                  class="w-full h-48 object-cover"
                />
                <div
                  v-else
                  class="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
                >
                  <svg class="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
                
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="flex text-yellow-400">
                                              <span class="text-sm text-gray-600">Product</span>
                  </div>
                  <span class="text-sm text-gray-500">{{ product.stock }} in stock</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-blue-600">₱{{ product.price.toFixed(2) }}</span>
                  <button
                    @click.stop="addToCart(product)"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Products State -->
          <div v-else class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No products available</h3>
            <p class="text-gray-500">This store hasn't added any products yet.</p>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          
          <div v-if="reviews.length > 0" class="space-y-6">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-gray-600 font-semibold">{{ review.buyer?.name?.charAt(0) || 'U' }}</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ review.buyer?.name || 'User' }}</p>
                        <p class="text-sm text-gray-500">{{ formatDate(new Date(review.createdAt)) }}</p>
                      </div>
                    </div>
                  </div>
                  <p class="text-gray-700">{{ review.comment || 'No comment provided' }}</p>
            </div>
          </div>

          <!-- Empty Reviews State -->
          <div v-else class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p class="text-gray-500">Be the first to review this store!</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-12">
        <div class="text-red-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Store not found</h3>
        <p class="text-gray-500">The store you're looking for doesn't exist or has been removed.</p>
        <button
          @click="router.push('/stores')"
          class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Stores
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Store, Product, Review } from '@/types/marketplace'
import { mockProducts, mockReviews } from '@/mocks'

const router = useRouter()
const route = useRoute()

// Reactive data
const store = ref<Store | null>(null)
const products = ref<Product[]>([])
const reviews = ref<Review[]>([])
const sortBy = ref('name')
const loading = ref(true)

// Mock data for now
const mockStore: Store = {
  id: '1',
  name: 'Tech Gadgets Store',
  description: 'Your one-stop shop for all things tech. From smartphones to laptops, we have it all. We offer competitive prices and excellent customer service.',
  address: '123 Tech Street',
  city: 'Manila',
  state: 'Metro Manila',
  country: 'Philippines',
  postalCode: '1000',
  latitude: 14.5995,
  longitude: 120.9842,
  phone: '+63 2 1234 5678',
  email: 'info@techgadgets.com',
  website: 'https://techgadgets.com',
  sellerId: 'seller1',
  isActive: true,
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z'
}

// Computed properties
const sortedProducts = computed(() => {
  const sorted = [...products.value]
  
  switch (sortBy.value) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
})

// Methods
const navigateToProduct = (productId: string) => {
  router.push(`/products/${productId}`)
}

const addToCart = (product: Product) => {
  // TODO: Implement add to cart functionality
  console.log('Adding to cart:', product)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const loadStoreDetails = async () => {
  loading.value = true
  try {
    const storeId = route.params.id as string
    
    // TODO: Replace with actual API call
    // const response = await apiService.marketplace.getStore(storeId)
    // store.value = response.data
    
    // Using mock data for now
    store.value = mockStore
    products.value = mockProducts
    reviews.value = mockReviews
  } catch (error) {
    console.error('Error loading store details:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadStoreDetails()
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
