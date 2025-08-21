<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Search Results</h1>
        <p class="mt-2 text-gray-600">{{ totalResults }} results found for "{{ searchQuery }}"</p>
      </div>

      <!-- Search Form -->
      <div class="mb-6">
        <form @submit.prevent="performSearch" class="flex gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products, stores, or categories..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          <button
            type="submit"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Search
          </button>
        </form>
      </div>

      <!-- Filters and Results -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

            <!-- Category Filter -->
            <div class="mb-6">
              <h4 class="font-medium text-gray-700 mb-3">Category</h4>
              <div class="space-y-2">
                <label v-for="category in categories" :key="category.id" class="flex items-center">
                  <input
                    v-model="selectedCategories"
                    :value="category.id"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range Filter -->
            <div class="mb-6">
              <h4 class="font-medium text-gray-700 mb-3">Price Range</h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Min Price</label>
                  <input
                    v-model.number="minPrice"
                    type="number"
                    placeholder="₱0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Max Price</label>
                  <input
                    v-model.number="maxPrice"
                    type="number"
                    placeholder="₱∞"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <!-- Rating Filter -->
            <div class="mb-6">
              <h4 class="font-medium text-gray-700 mb-3">Minimum Rating</h4>
              <div class="space-y-2">
                <label v-for="rating in [4, 3, 2, 1]" :key="rating" class="flex items-center">
                  <input
                    v-model="minRating"
                    :value="rating"
                    type="radio"
                    name="rating"
                    class="border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ rating }}+ stars</span>
                </label>
              </div>
            </div>

            <!-- Store Filter -->
            <div class="mb-6">
              <h4 class="font-medium text-gray-700 mb-3">Store</h4>
              <div class="space-y-2">
                <label v-for="store in stores" :key="store.id" class="flex items-center">
                  <input
                    v-model="selectedStores"
                    :value="store.id"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ store.name }}</span>
                </label>
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-3">
          <!-- Results Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-4">
              <span class="text-gray-600">{{ totalResults }} results</span>
              <span class="text-gray-400">|</span>
              <span class="text-gray-600">{{ currentPage }} of {{ totalPages }} pages</span>
            </div>

            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-600">Sort by:</label>
              <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
            ></div>
            <p class="mt-4 text-gray-600">Searching...</p>
          </div>

          <!-- Results Grid -->
          <div
            v-else-if="results.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="result in results"
              :key="result.id"
              class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              @click="navigateToResult(result)"
            >
              <div class="aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg">
                <img
                  v-if="result.images && result.images.length > 0"
                  :src="result.images[0]"
                  :alt="result.name"
                  class="w-full h-48 object-cover rounded-t-lg"
                />
                <div
                  v-else
                  class="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-lg flex items-center justify-center"
                >
                  <svg
                    class="w-16 h-16 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ result.name }}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ result.description }}</p>

                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm text-gray-500">{{ result.stock }} in stock</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-blue-600"
                    >₱{{ result.price.toFixed(2) }}</span
                  >
                  <span class="text-sm text-gray-500">{{ result.store?.name || 'Store' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Results State -->
          <div v-else class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p class="text-gray-500">Try adjusting your search terms or filters.</p>
            <div class="mt-4 space-y-2">
              <p class="text-sm text-gray-600">Suggestions:</p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• Check your spelling</li>
                <li>• Try more general keywords</li>
                <li>• Remove some filters</li>
                <li>• Try different categories</li>
              </ul>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-md',
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="currentPage++"
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Product, Category, Store } from '@/types/marketplace'

const router = useRouter()
const route = useRoute()

// Reactive data
const searchQuery = ref('')
const results = ref<Product[]>([])
const categories = ref<Category[]>([])
const stores = ref<Store[]>([])
const selectedCategories = ref<string[]>([])
const selectedStores = ref<string[]>([])
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const minRating = ref<number | null>(null)
const sortBy = ref('relevance')
const currentPage = ref(1)
const totalPages = ref(1)
const totalResults = ref(0)
const loading = ref(false)

// Mock data for now
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Clothing and accessories',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Home improvement and garden supplies',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Sports',
    description: 'Sports equipment and athletic wear',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Books',
    description: 'Books, magazines, and educational materials',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mockStores: Store[] = [
  {
    id: '1',
    name: 'Tech Gadgets Store',
    description: 'Tech store',
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
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Fashion Boutique',
    description: 'Fashion store',
    address: '456 Fashion Ave',
    city: 'Quezon City',
    state: 'Metro Manila',
    country: 'Philippines',
    postalCode: '1100',
    latitude: 14.676,
    longitude: 121.0437,
    phone: '+63 2 2345 6789',
    email: 'info@fashionboutique.com',
    website: 'https://fashionboutique.com',
    sellerId: 'seller2',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
]

const mockResults: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 89999.0,
    stock: 25,
    images: [],
    categoryId: '1',
    storeId: '1',
    sellerId: 'seller1',
    isActive: true,
    isFeatured: false,
    minStock: 5,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    store: mockStores[0],
    category: mockCategories[0],
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    description: 'Ultra-thin laptop with M2 chip for incredible performance',
    price: 129999.0,
    stock: 15,
    images: [],
    categoryId: '1',
    storeId: '1',
    sellerId: 'seller1',
    isActive: true,
    isFeatured: false,
    minStock: 3,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    store: mockStores[0],
    category: mockCategories[0],
  },
  {
    id: '3',
    name: 'AirPods Pro',
    description: 'Active noise cancellation with spatial audio',
    price: 24999.0,
    stock: 50,
    images: [],
    categoryId: '1',
    storeId: '1',
    sellerId: 'seller1',
    isActive: true,
    isFeatured: false,
    minStock: 10,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    store: mockStores[0],
    category: mockCategories[0],
  },
]

// Computed properties
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
const performSearch = async () => {
  if (!searchQuery.value.trim()) return

  loading.value = true
  currentPage.value = 1

  try {
    // TODO: Replace with actual API call
    // const response = await apiService.marketplace.search({
    //   query: searchQuery.value,
    //   page: currentPage.value,
    //   categories: selectedCategories.value,
    //   stores: selectedStores.value,
    //   minPrice: minPrice.value,
    //   maxPrice: maxPrice.value,
    //   minRating: minRating.value,
    //   sortBy: sortBy.value
    // })
    // results.value = response.data
    // totalResults.value = response.meta.total
    // totalPages.value = response.meta.totalPages

    // Using mock data for now
    results.value = mockResults.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (product.description || '').toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
    totalResults.value = results.value.length
    totalPages.value = 1

    // Update URL
    router.push({
      query: {
        q: searchQuery.value,
        page: currentPage.value.toString(),
      },
    })
  } catch (error) {
    console.error('Error performing search:', error)
  } finally {
    loading.value = false
  }
}

const navigateToResult = (result: Product) => {
  router.push(`/products/${result.id}`)
}

const clearFilters = () => {
  selectedCategories.value = []
  selectedStores.value = []
  minPrice.value = null
  maxPrice.value = null
  minRating.value = null
  performSearch()
}

const loadInitialData = async () => {
  try {
    // TODO: Replace with actual API calls
    // const [categoriesResponse, storesResponse] = await Promise.all([
    //   apiService.marketplace.getCategories(),
    //   apiService.marketplace.getStores()
    // ])
    // categories.value = categoriesResponse.data
    // stores.value = storesResponse.data

    // Using mock data for now
    categories.value = mockCategories
    stores.value = mockStores
  } catch (error) {
    console.error('Error loading initial data:', error)
  }
}

// Watchers
watch([selectedCategories, selectedStores, minPrice, maxPrice, minRating, sortBy], () => {
  if (searchQuery.value) {
    performSearch()
  }
})

watch(currentPage, () => {
  if (searchQuery.value) {
    performSearch()
  }
})

// Lifecycle
onMounted(() => {
  // Load initial data
  loadInitialData()

  // Check if there's a search query in the URL
  const query = route.query.q as string
  if (query) {
    searchQuery.value = query
    performSearch()
  }

  // Check for page parameter
  const page = route.query.page as string
  if (page) {
    currentPage.value = parseInt(page) || 1
  }
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
