<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading product details...</p>
      </div>

      <!-- Product Details -->
      <div v-else-if="product" class="space-y-8">
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-500 mb-6">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span class="mx-2">/</span></li>
            <li><a href="/marketplace" class="hover:text-blue-600">Marketplace</a></li>
            <li><span class="mx-2">/</span></li>
            <li><a :href="`/stores/${product.storeId}`" class="hover:text-blue-600">{{ product.store?.name || 'Store' }}</a></li>
            <li><span class="mx-2">/</span></li>
            <li class="text-gray-900">{{ product.name }}</li>
          </ol>
        </nav>

        <!-- Product Main Section -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <!-- Product Images -->
            <div class="space-y-4">
              <div class="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  v-if="selectedImage"
                  :src="selectedImage"
                  :alt="product.name"
                  class="w-full h-96 object-cover"
                />
                <div
                  v-else
                  class="w-full h-96 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
                >
                  <svg class="w-24 h-24 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <!-- Thumbnail Images -->
              <div v-if="product.images && product.images.length > 1" class="flex space-x-2">
                <button
                  v-for="(image, index) in product.images"
                  :key="index"
                  @click="selectedImage = image"
                  :class="[
                    'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200',
                    selectedImage === image
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <img
                    :src="image"
                    :alt="`${product.name} - Image ${index + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            <!-- Product Info -->
            <div class="space-y-6">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
                <p class="text-gray-600 text-lg">{{ product.description }}</p>
              </div>

              <!-- Stock Info -->
              <div class="flex items-center space-x-4">
                <span class="text-gray-600">{{ product.stock }} in stock</span>
              </div>

              <!-- Price -->
              <div class="text-3xl font-bold text-blue-600">₱{{ product.price.toFixed(2) }}</div>

              <!-- Quantity and Add to Cart -->
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <label class="text-gray-700 font-medium">Quantity:</label>
                  <div class="flex items-center border border-gray-300 rounded-lg">
                    <button
                      @click="quantity > 1 && quantity--"
                      :disabled="quantity <= 1"
                      class="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      v-model.number="quantity"
                      type="number"
                      min="1"
                      :max="product.stock"
                      class="w-16 text-center border-0 focus:ring-0 focus:outline-none"
                    />
                    <button
                      @click="quantity < product.stock && quantity++"
                      :disabled="quantity >= product.stock"
                      class="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="flex space-x-4">
                  <button
                    @click="addToCart"
                    class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Add to Cart
                  </button>
                  <button
                    @click="addToWishlist"
                    class="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Store Info -->
              <div class="border-t border-gray-200 pt-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Sold by</p>
                      <a
                        :href="`/stores/${product.storeId}`"
                        class="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {{ product.store?.name || 'Store' }}
                      </a>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center text-yellow-400">
                      <span class="text-sm text-gray-600">Store Information</span>
                      <span class="text-sm text-gray-600">{{ product.store?.name || 'Store' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Details Tabs -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8 px-6">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <div class="p-6">
            <!-- Description Tab -->
            <div v-if="activeTab === 'description'" class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Product Description</h3>
              <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
              
              <div class="mt-6">
                <h4 class="font-medium text-gray-900 mb-3">Product Information</h4>
                <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
              </div>
            </div>

            <!-- Specifications Tab -->
            <div v-if="activeTab === 'specifications'" class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Product Specifications</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="font-medium text-gray-700">Category</span>
                  <span class="text-gray-600">{{ product.category?.name || 'General' }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="font-medium text-gray-700">Stock</span>
                  <span class="text-gray-600">{{ product.stock }} units</span>
                </div>
              </div>
            </div>

            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                <button
                  @click="showReviewForm = true"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Write a Review
                </button>
              </div>

              <!-- Review Summary -->
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="text-center">
                                      <div class="text-3xl font-bold text-gray-900">Reviews</div>
                  <p class="text-sm text-gray-600">Customer feedback</p>
                  </div>
                </div>
              </div>

              <!-- Reviews List -->
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
                <p class="text-gray-500">Be the first to review this product!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div v-if="relatedProducts.length > 0" class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              class="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
              @click="navigateToProduct(relatedProduct.id)"
            >
              <div class="aspect-w-1 aspect-h-1 bg-gray-200">
                <img
                  v-if="relatedProduct.images && relatedProduct.images.length > 0"
                  :src="relatedProduct.images[0]"
                  :alt="relatedProduct.name"
                  class="w-full h-32 object-cover"
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
                <h3 class="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{{ relatedProduct.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-blue-600 font-semibold">₱{{ relatedProduct.price.toFixed(2) }}</span>
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
              </div>
            </div>
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
        <h3 class="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
        <p class="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
        <button
          @click="router.push('/marketplace')"
          class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Marketplace
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Product, Review } from '@/types/marketplace'
import { mockProducts, mockReviews } from '@/mocks'

const router = useRouter()
const route = useRoute()

// Reactive data
const product = ref<Product | null>(null)
const reviews = ref<Review[]>([])
const relatedProducts = ref<Product[]>([])
const selectedImage = ref<string>('')
const quantity = ref(1)
const activeTab = ref('description')
const showReviewForm = ref(false)
const loading = ref(true)

// Tabs configuration
const tabs = [
  { id: 'description', name: 'Description' },
  { id: 'specifications', name: 'Specifications' },
  { id: 'reviews', name: 'Reviews' }
]

// Use centralized mock data
const mockProduct = mockProducts[0] // iPhone 15 Pro

const mockRelatedProducts = mockProducts.slice(1, 3) // MacBook Air M2 and AirPods Pro

// Methods
const navigateToProduct = (productId: string) => {
  router.push(`/products/${productId}`)
}

const addToCart = () => {
  // TODO: Implement add to cart functionality
  console.log('Adding to cart:', { product: product.value, quantity: quantity.value })
}

const addToWishlist = () => {
  // TODO: Implement add to wishlist functionality
  console.log('Adding to wishlist:', product.value)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const loadProductDetails = async () => {
  loading.value = true
  try {
    const productId = route.params.id as string
    
    // TODO: Replace with actual API call
    // const response = await apiService.marketplace.getProduct(productId)
    // product.value = response.data
    // reviews.value = response.reviews
    // relatedProducts.value = response.relatedProducts
    
    // Using mock data for now
    product.value = mockProduct
    reviews.value = mockReviews
    relatedProducts.value = mockRelatedProducts
    
    // Set first image as selected if available
    if (product.value.images && product.value.images.length > 0) {
      selectedImage.value = product.value.images[0]
    }
  } catch (error) {
    console.error('Error loading product details:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadProductDetails()
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
