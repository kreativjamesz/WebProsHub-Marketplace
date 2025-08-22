<template>
  <div class="min-h-screen bg-background py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">Product Categories</h1>
        <p class="mt-2 text-muted-foreground">Browse products by category to find exactly what you're looking for</p>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search categories..."
          class="w-full max-w-md px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in filteredCategories"
          :key="category.id"
          class="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group border border-border"
          @click="navigateToCategory(category.id)"
        >
          <div class="p-6">
            <!-- Category Icon -->
            <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  v-if="category.name.toLowerCase().includes('electronics')"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
                <path
                  v-else-if="category.name.toLowerCase().includes('fashion')"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
                <path
                  v-else-if="category.name.toLowerCase().includes('home')"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  v-else-if="category.name.toLowerCase().includes('sports')"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                />
                <path
                  v-else-if="category.name.toLowerCase().includes('book')"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>

            <!-- Category Info -->
            <h3 class="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
              {{ category.name }}
            </h3>
            <p class="text-muted-foreground text-sm mb-4 line-clamp-2">{{ category.description }}</p>

            <!-- Category Stats -->
            <div class="flex items-center justify-between text-sm text-muted-foreground">
              <span>{{ category.productCount || 0 }} products</span>
              <span>{{ category.storeCount || 0 }} stores</span>
            </div>

            <!-- Popular Products Preview -->
            <div v-if="category.popularProducts && category.popularProducts.length > 0" class="mt-4 pt-4 border-t border-border">
              <p class="text-xs text-muted-foreground mb-2">Popular products:</p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="product in category.popularProducts.slice(0, 3)"
                  :key="product.id"
                  class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                >
                  {{ product.name }}
                </span>
                <span v-if="category.popularProducts.length > 3" class="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  +{{ category.popularProducts.length - 3 }} more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCategories.length === 0" class="text-center py-12">
        <div class="text-muted-foreground mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-foreground mb-2">No categories found</h3>
        <p class="text-muted-foreground">Try adjusting your search criteria.</p>
      </div>

      <!-- Featured Categories Section -->
      <div v-if="featuredCategories.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold text-foreground mb-6">Featured Categories</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="category in featuredCategories"
            :key="category.id"
            class="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            @click="navigateToCategory(category.id)"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
                <p class="text-primary-foreground/80 text-sm mb-4">{{ category.description }}</p>
                <div class="flex items-center text-sm text-primary-foreground/90">
                  <span class="mr-4">{{ category.productCount || 0 }} products</span>
                  <span>{{ category.storeCount || 0 }} stores</span>
                </div>
              </div>
              <div class="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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
import type { Category } from '@/types/marketplace'
import { mockCategories } from '@/mocks/categories'

const router = useRouter()

// Reactive data
const categories = ref<Category[]>([])
const searchQuery = ref('')
const loading = ref(false)

// Computed properties
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value
  
  return categories.value.filter(category =>
    category.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (category.description?.toLowerCase() || '').includes(searchQuery.value.toLowerCase())
  )
})

const featuredCategories = computed(() => {
  // Return top 4 categories by product count
  return [...categories.value]
    .sort((a, b) => (b.productCount || 0) - (a.productCount || 0))
    .slice(0, 4)
})

// Methods
const navigateToCategory = (categoryId: string) => {
  router.push({
    path: '/marketplace',
    query: { category: categoryId }
  })
}

const loadCategories = async () => {
  loading.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.marketplace.getCategories()
    // categories.value = response.data
    
    // Using mock data for now
    categories.value = mockCategories
  } catch (error) {
    console.error('Error loading categories:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadCategories()
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
