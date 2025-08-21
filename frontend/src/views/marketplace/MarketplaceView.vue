<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="container mx-auto px-4 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Products</h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            Shop from thousands of local businesses and sellers
          </p>

          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search for products, stores, or categories..."
                class="w-full px-6 py-4 text-gray-900 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
                @keyup.enter="handleSearch"
              />
              <button
                @click="handleSearch"
                class="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 class="text-lg font-semibold mb-4">Filters</h3>

            <!-- Categories -->
            <div class="mb-6">
              <h4 class="font-medium mb-3">Categories</h4>
              <div class="space-y-2">
                <label v-for="category in categories" :key="category.id" class="flex items-center">
                  <input
                    v-model="selectedCategories"
                    type="checkbox"
                    :value="category.id"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h4 class="font-medium mb-3">Price Range</h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Min Price</label>
                  <input
                    v-model="priceRange.min"
                    type="number"
                    placeholder="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Max Price</label>
                  <input
                    v-model="priceRange.max"
                    type="number"
                    placeholder="1000"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Rating -->
            <div class="mb-6">
              <h4 class="font-medium mb-3">Minimum Rating</h4>
              <div class="flex items-center space-x-2">
                <input v-model="minRating" type="range" min="0" max="5" step="0.5" class="flex-1" />
                <span class="text-sm text-gray-600">{{ minRating }}+</span>
              </div>
            </div>

            <!-- Apply Filters -->
            <button
              @click="applyFilters"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="w-full mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:w-3/4">
          <!-- Sort and View Options -->
          <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div class="flex items-center space-x-4 mb-4 sm:mb-0">
              <span class="text-sm text-gray-600"> {{ totalProducts }} products found </span>
            </div>

            <div class="flex items-center space-x-4">
              <select
                v-model="sortBy"
                @change="handleSort"
                class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>

              <div class="flex items-center space-x-2">
                <button
                  @click="viewMode = 'grid'"
                  :class="viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400'"
                  class="p-2 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="viewMode === 'list' ? 'text-blue-600' : 'text-gray-400'"
                  class="p-2 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="text-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
            ></div>
            <p class="mt-4 text-gray-600">Loading products...</p>
          </div>

          <!-- Products Grid -->
          <div
            v-else-if="products.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="product in products"
              :key="product.id"
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              @click="viewProduct(product.id)"
            >
              <!-- Product Image -->
              <div class="relative">
                <img
                  :src="product.images[0] || '/placeholder-product.jpg'"
                  :alt="product.name"
                  class="w-full h-48 object-cover rounded-t-lg"
                />
                <div class="absolute top-2 right-2">
                  <button
                    @click.stop="toggleWishlist(product.id)"
                    :class="isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'"
                    class="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {{ product.name }}
                </h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">
                  {{ product.description }}
                </p>

                <!-- Price -->
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-2">
                    <span class="text-lg font-bold text-gray-900">
                      ${{ product.price.toFixed(2) }}
                    </span>
                    <span v-if="product.comparePrice" class="text-sm text-gray-500 line-through">
                      ${{ product.comparePrice.toFixed(2) }}
                    </span>
                  </div>

                  <!-- Rating -->
                  <div class="flex items-center space-x-1">
                    <div class="flex items-center">
                      <svg
                        v-for="star in 5"
                        :key="star"
                        :class="star <= (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'"
                        class="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                    <span class="text-sm text-gray-600">({{ product._count?.reviews || 0 }})</span>
                  </div>
                </div>

                <!-- Store Info -->
                <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{{ product.seller?.businessName || 'Unknown Store' }}</span>
                  <span>{{ product.store?.city || 'Unknown Location' }}</span>
                </div>

                <!-- Add to Cart Button -->
                <button
                  @click.stop="addToCart(product.id)"
                  class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <button
                v-for="page in visiblePages"
                :key="page"
                @click="changePage(page)"
                :class="
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 bg-white hover:bg-gray-50'
                "
                class="px-3 py-2 text-sm font-medium border border-gray-300 rounded-md"
              >
                {{ page }}
              </button>

              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import type { Product, Category } from '@/types/marketplace'

const router = useRouter()

// State
const isLoading = ref(false)
const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('relevance')
const minRating = ref(0)
const selectedCategories = ref<string[]>([])
const currentPage = ref(1)
const totalProducts = ref(0)
const totalPages = ref(1)

// Mock data (replace with API calls)
const products = ref<Product[]>([])
const categories = ref<Category[]>([])

// Price range
const priceRange = reactive({
  min: '',
  max: '',
})

// Computed
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    currentPage.value = 1
    loadProducts()
  }
}

const applyFilters = () => {
  currentPage.value = 1
  loadProducts()
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  priceRange.min = ''
  priceRange.max = ''
  minRating.value = 0
  sortBy.value = 'relevance'
  currentPage.value = 1
  loadProducts()
}

const handleSort = () => {
  loadProducts()
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadProducts()
  }
}

const loadProducts = async () => {
  try {
    isLoading.value = true

    // TODO: Replace with actual API call
    // const response = await apiService.marketplace.getProducts({
    //   page: currentPage.value,
    //   search: searchQuery.value,
    //   categories: selectedCategories.value,
    //   minPrice: priceRange.min ? Number(priceRange.min) : undefined,
    //   maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
    //   minRating: minRating.value,
    //   sortBy: sortBy.value
    // })

    // Mock data for now
    await new Promise((resolve) => setTimeout(resolve, 1000))

    products.value = [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 199.99,
        comparePrice: 249.99,
        rating: 4.5,
        images: ['/placeholder-product.jpg'],
        seller: { businessName: 'TechStore' },
        store: { city: 'Manila' },
        _count: { reviews: 128 },
      } as Product,
      // Add more mock products...
    ]

    totalProducts.value = 150
    totalPages.value = 8
  } catch (error) {
    toast.error('Failed to load products')
  } finally {
    isLoading.value = false
  }
}

const viewProduct = (productId: string) => {
  router.push(`/products/${productId}`)
}

const toggleWishlist = (productId: string) => {
  // TODO: Implement wishlist toggle
  toast.success('Added to wishlist!')
}

const addToCart = (productId: string) => {
  // TODO: Implement add to cart
  toast.success('Added to cart!')
}

const isInWishlist = (productId: string) => {
  // TODO: Check if product is in wishlist
  return false
}

// Lifecycle
onMounted(() => {
  loadProducts()

  // Load categories
  categories.value = [
    { id: '1', name: 'Electronics', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', name: 'Fashion', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '3', name: 'Home & Garden', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '4', name: 'Sports', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '5', name: 'Books', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ]
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

.sticky {
  position: sticky;
  top: 1rem;
}
</style>
