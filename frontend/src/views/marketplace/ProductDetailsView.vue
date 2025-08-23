<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-red-400 mb-4">Product Not Found</h2>
        <p class="text-gray-400 mb-6">{{ error }}</p>
        <router-link
          to="/marketplace"
          class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Marketplace
        </router-link>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-400">
          <li>
            <router-link to="/marketplace" class="hover:text-purple-400 transition-colors">
              Marketplace
            </router-link>
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <router-link
              v-if="product.category?.name"
              :to="`/marketplace/categories/${product.category.id}`"
              class="hover:text-purple-400 transition-colors"
            >
              {{ product.category.name }}
            </router-link>
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-white">{{ product.name }}</span>
          </li>
        </ol>
      </nav>

      <!-- Main Product Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Product Images -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="relative aspect-square rounded-xl overflow-hidden bg-slate-800">
            <SafeImage
              :src="selectedImage || product.images[0] || '/placeholder-product.jpg'"
              :alt="product.name"
              class="w-full h-full object-cover"
            />

            <!-- Wishlist Button -->
            <button
              @click="toggleWishlist"
              :class="isInWishlist ? 'text-red-400' : 'text-purple-400'"
              class="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Discount Badge -->
            <div
              v-if="product.comparePrice && Number(product.comparePrice) > Number(product.price)"
              class="absolute top-4 left-4"
            >
              <div class="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                {{
                  Math.round(
                    ((Number(product.comparePrice) - Number(product.price)) /
                      Number(product.comparePrice)) *
                      100,
                  )
                }}% OFF
              </div>
            </div>
          </div>

          <!-- Thumbnail Images -->
          <div
            v-if="product.images && product.images.length > 1"
            class="flex space-x-2 overflow-x-auto"
          >
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImage = image"
              :class="selectedImage === image ? 'ring-2 ring-purple-400' : 'ring-1 ring-gray-600'"
              class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-slate-800 hover:ring-purple-400 transition-all"
            >
              <SafeImage
                :src="image"
                :alt="`${product.name} - Image ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Category & Rating -->
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-400">
              <span v-if="product.category?.name" class="hover:text-purple-400 cursor-pointer">
                {{ product.category.name }}
              </span>
            </div>

            <!-- Rating -->
            <div class="flex items-center space-x-2">
              <div class="flex items-center space-x-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="star <= (product.rating || 0) ? 'text-yellow-400' : 'text-gray-600'"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <span class="text-sm text-gray-400"
                >({{ product._count?.reviews || 0 }} reviews)</span
              >
            </div>
          </div>

          <!-- Product Name -->
          <h1 class="text-3xl font-bold text-white leading-tight">
            {{ product.name }}
          </h1>

          <!-- Price Section -->
          <div class="space-y-2">
            <div class="flex items-center space-x-3">
              <span class="text-3xl font-bold text-purple-400">
                ₱{{ Number(product.price).toFixed(2) }}
              </span>
              <span v-if="product.comparePrice" class="text-xl text-gray-500 line-through">
                ₱{{ Number(product.comparePrice).toFixed(2) }}
              </span>
            </div>

            <div v-if="product.comparePrice" class="text-sm text-green-400">
              You save ₱{{ (Number(product.comparePrice) - Number(product.price)).toFixed(2) }}
            </div>
          </div>

          <!-- Stock Status -->
          <div
            v-if="product.stock <= 0"
            class="p-4 bg-red-900/30 border border-red-500/30 rounded-lg"
          >
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-red-300 font-medium">Out of Stock</span>
            </div>
          </div>
          <div
            v-else-if="product.stock <= (product.minStock || 5)"
            class="p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg"
          >
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <span class="text-yellow-300 font-medium"
                >Low Stock - Only {{ product.stock }} left!</span
              >
            </div>
          </div>

          <!-- Quantity & Add to Cart -->
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <label class="text-sm font-medium text-gray-300">Quantity:</label>
              <div class="flex items-center border border-gray-600 rounded-lg">
                <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span class="px-4 py-2 text-white font-medium min-w-[3rem] text-center">{{
                  quantity
                }}</span>
                <button
                  @click="increaseQuantity"
                  :disabled="quantity >= product.stock"
                  class="p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button
              @click="addToCart"
              :disabled="product.stock <= 0"
              class="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
            >
              <div class="flex items-center justify-center space-x-3">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
                <span class="text-lg">{{
                  product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'
                }}</span>
              </div>
            </button>
          </div>

          <!-- Store Info -->
          <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-white">
                    {{ product.seller?.businessName || 'Unknown Store' }}
                  </h3>
                  <p class="text-sm text-gray-400">
                    {{ product.store?.city || 'Unknown Location' }}
                  </p>
                </div>
              </div>
              <router-link
                :to="`/stores/${product.store?.id || 'unknown'}`"
                class="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
              >
                View Store
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details Tabs -->
      <div class="mb-12">
        <div class="border-b border-gray-700">
          <nav class="flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="
                activeTab === tab.id
                  ? 'border-purple-400 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              "
              class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="py-8">
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'" class="prose prose-invert max-w-none">
            <p class="text-gray-300 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Reviews Tab -->
          <div v-if="activeTab === 'reviews'" class="space-y-6">
            <div v-if="product.reviews && product.reviews.length > 0" class="space-y-4">
              <div
                v-for="review in product.reviews"
                :key="review.id"
                class="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white text-sm font-medium">
                        {{ review.buyer?.name?.charAt(0) || 'U' }}
                      </span>
                    </div>
                    <div>
                      <p class="font-medium text-white">{{ review.buyer?.name || 'Anonymous' }}</p>
                      <div class="flex items-center space-x-1">
                        <svg
                          v-for="star in 5"
                          :key="star"
                          :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-600'"
                          class="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <span class="text-sm text-gray-400">
                    {{ new Date(review.createdAt).toLocaleDateString() }}
                  </span>
                </div>
                <p v-if="review.comment" class="text-gray-300">{{ review.comment }}</p>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <p class="text-gray-400">No reviews yet. Be the first to review this product!</p>
            </div>
          </div>

          <!-- Specifications Tab -->
          <div v-if="activeTab === 'specifications'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 class="font-medium text-white mb-2">Product Details</h4>
                <div class="space-y-2 text-sm text-gray-300">
                  <div class="flex justify-between">
                    <span>SKU:</span>
                    <span>{{ product.sku || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Stock:</span>
                    <span>{{ product.stock }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Category:</span>
                    <span>{{ product.category?.name || 'N/A' }}</span>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 class="font-medium text-white mb-2">Store Information</h4>
                <div class="space-y-2 text-sm text-gray-300">
                  <div class="flex justify-between">
                    <span>Store:</span>
                    <span>{{ product.store?.name || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Location:</span>
                    <span>{{ product.store?.city || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Seller:</span>
                    <span>{{ product.seller?.businessName || 'N/A' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Related Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
            view-mode="grid"
            @view-product="viewProduct"
            @toggle-wishlist="toggleWishlist"
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useGuestCartStore } from '@/stores/guestCart'
import { useAuthStore } from '@/stores/auth'
import { apiService } from '@/services/api'
import type { Product } from '@/types/marketplace'
import SafeImage from '@/components/ui/SafeImage.vue'
import ProductCard from '@/components/marketplace/ProductCard.vue'

const route = useRoute()
const router = useRouter()

// State
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const selectedImage = ref<string | null>(null)
const quantity = ref(1)
const activeTab = ref('description')
const relatedProducts = ref<Product[]>([])

// Tabs configuration
const tabs = [
  { id: 'description', name: 'Description' },
  { id: 'reviews', name: 'Reviews' },
  { id: 'specifications', name: 'Specifications' },
]

// Stores
const cartStore = useCartStore()
const guestCartStore = useGuestCartStore()
const authStore = useAuthStore()

// Computed
const isInWishlist = computed(() => {
  // TODO: Implement wishlist logic
  return false
})

// Methods
const fetchProduct = async () => {
  try {
    loading.value = true
    error.value = null

    const productId = route.params.id as string
    const response = await apiService.marketplace.getProduct(productId)

    product.value = response.data.product
    selectedImage.value = product.value?.images?.[0] || null

    // Fetch related products
    await fetchRelatedProducts()
  } catch (err: any) {
    console.error('Error fetching product:', err)
    error.value = err.response?.data?.error || 'Failed to load product'
  } finally {
    loading.value = false
  }
}

const fetchRelatedProducts = async () => {
  try {
    if (!product.value?.categoryId) return

    const response = await apiService.marketplace.getProducts({
      categoryId: product.value.categoryId,
      limit: 4,
      exclude: product.value.id,
    })

    relatedProducts.value = response.data.products || []
  } catch (err) {
    console.error('Error fetching related products:', err)
  }
}

const toggleWishlist = () => {
  // TODO: Implement wishlist toggle
  console.log('Toggle wishlist')
}

const increaseQuantity = () => {
  if (quantity.value < (product.value?.stock || 1)) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (!product.value) return

  if (authStore.isAuthenticated) {
    cartStore.addItem(product.value, quantity.value)
  } else {
    guestCartStore.addItem(product.value, quantity.value)
  }

  // Reset quantity
  quantity.value = 1
}

const viewProduct = (productId: string) => {
  router.push(`/marketplace/products/${productId}`)
}

// Lifecycle
onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.prose {
  color: inherit;
}

.prose p {
  margin: 0;
}
</style>
