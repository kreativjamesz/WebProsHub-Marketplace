<template>
  <div class="min-h-screen bg-background py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">All Stores</h1>
        <p class="mt-2 text-muted-foreground">Discover amazing stores and businesses in our marketplace</p>
      </div>

      <!-- Search and Filters -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search stores..."
            class="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="selectedCategory"
            class="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
          >
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
            <option value="products">Sort by Products</option>
          </select>
        </div>
      </div>

      <!-- Stores Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="store in filteredStores"
          :key="store.id"
          class="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-border"
          @click="navigateToStore(store.id)"
        >
          <div class="aspect-w-16 aspect-h-9 bg-muted rounded-t-lg">
            <img
              v-if="store.banner"
              :src="store.banner"
              :alt="store.name"
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div
              v-else
              class="w-full h-48 bg-gradient-to-br from-primary to-primary/80 rounded-t-lg flex items-center justify-center"
            >
              <span class="text-primary-foreground text-2xl font-bold">{{ store.name.charAt(0) }}</span>
            </div>
          </div>

          <div class="p-4">
            <h3 class="text-lg font-semibold text-foreground mb-2">{{ store.name }}</h3>
            <p class="text-muted-foreground text-sm mb-3 line-clamp-2">{{ store.description }}</p>

            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-muted-foreground">{{ store.products?.length || 0 }} products</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-muted-foreground">Store</span>
              <span class="text-sm text-muted-foreground">{{ store.city }}, {{ store.state }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredStores.length === 0" class="text-center py-12">
        <div class="text-muted-foreground mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-foreground mb-2">No stores found</h3>
        <p class="text-muted-foreground">Try adjusting your search or filter criteria.</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
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
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground bg-card border border-border hover:bg-accent',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMarketplace } from '@/composables'

const router = useRouter()

// Use the marketplace composable - all logic is here!
const {
  // State
  searchQuery,
  currentPage,
  
  // Computed from store
  stores,
  categories,
  loading,
  errors,
  totalPages,
  
  // Methods
  loadStores,
  loadCategories,
  initialize
} = useMarketplace()

// Component-specific state
const selectedCategory = ref('')
const sortBy = ref('name')

// Computed properties
const filteredStores = computed(() => {
  let filtered = [...stores.value]

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(
      (store) =>
        store.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (store.description || '').toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter((store) => store.id === selectedCategory.value)
  }

  // Sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'rating':
        return a.name.localeCompare(b.name)
      case 'products':
        return (b.products?.length || 0) - (a.products?.length || 0)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return filtered
})

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
const navigateToStore = (storeId: string) => {
  router.push(`/stores/${storeId}`)
}

// Watchers for automatic reloading
watch([searchQuery, selectedCategory, sortBy, currentPage], () => {
  loadStores({
    page: currentPage.value,
    search: searchQuery.value,
    category: selectedCategory.value,
    sortBy: sortBy.value
  })
})

// Lifecycle
onMounted(async () => {
  await initialize()
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
