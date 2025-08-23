<template>
  <div class="min-h-screen bg-background py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Product Categories
        </h1>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
          Browse products by category to find exactly what you're looking for. Discover amazing products organized by main categories and subcategories.
        </p>
      </div>

      <!-- Search -->
      <div class="mb-8 max-w-2xl mx-auto">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search categories..."
            class="w-full px-6 py-4 border border-border rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary bg-background text-foreground placeholder:text-muted-foreground text-lg shadow-lg shadow-primary/5"
          />
          <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
        <p class="text-xl text-muted-foreground">Loading categories...</p>
      </div>

      <!-- Main Categories Sections -->
      <div v-else-if="groupedCategories.length > 0">
        <MainCategorySection
          v-for="group in groupedCategories"
          :key="group.mainCategory.id"
          :main-category="group.mainCategory"
          :categories="group.categories"
          @category-click="navigateToCategory"
          @view-all="navigateToMainCategory"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-muted-foreground mb-6">
          <svg class="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-foreground mb-2">No categories found</h3>
        <p class="text-muted-foreground text-lg">Try adjusting your search criteria or check back later.</p>
      </div>

      <!-- Featured Categories Section -->
      <div v-if="featuredCategories.length > 0" class="mt-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">Featured Categories</h2>
          <p class="text-muted-foreground text-lg">Most popular categories with the highest product counts</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="category in featuredCategories"
            :key="category.id"
            class="bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl p-8 text-primary-foreground hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            @click="navigateToCategory(category.id)"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold">{{ category.productCount || 0 }}</div>
                <div class="text-sm text-primary-foreground/80">Products</div>
              </div>
            </div>
            
            <h3 class="text-2xl font-bold mb-3">{{ category.name }}</h3>
            <p class="text-primary-foreground/90 text-sm mb-6 line-clamp-2">{{ category.description }}</p>
            
            <div class="flex items-center justify-between">
              <span class="text-sm text-primary-foreground/80">{{ category.storeCount || 0 }} stores</span>
              <div class="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
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
import type { MainCategory, Category } from '@/types/marketplace'
import { useMarketplaceStore } from '@/stores/marketplace'
import MainCategorySection from '@/components/marketplace/MainCategorySection.vue'

const router = useRouter()
const marketplaceStore = useMarketplaceStore()

// Reactive data
const searchQuery = ref('')
const loading = ref(false)

// Computed properties
const groupedCategories = computed(() => {
  if (!searchQuery.value) {
    return marketplaceStore.mainCategories.map(mainCat => ({
      mainCategory: mainCat,
      categories: marketplaceStore.categories.filter(cat => cat.mainCategoryId === mainCat.id)
    })).filter(group => group.categories.length > 0)
  }
  
  // Filter by search query
  const filteredCategories = marketplaceStore.categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (category.description?.toLowerCase() || '').includes(searchQuery.value.toLowerCase())
  )
  
  // Group filtered categories by main category
  const grouped = marketplaceStore.mainCategories.map(mainCat => ({
    mainCategory: mainCat,
    categories: filteredCategories.filter(cat => cat.mainCategoryId === mainCat.id)
  })).filter(group => group.categories.length > 0)
  
  return grouped
})

const featuredCategories = computed(() => {
  // Return top 6 categories by product count
  return [...marketplaceStore.categories]
    .sort((a, b) => (b.productCount || 0) - (a.productCount || 0))
    .slice(0, 6)
})

// Methods
const navigateToCategory = (categoryId: number) => {
  router.push({
    path: '/marketplace',
    query: { category: categoryId }
  })
}

const navigateToMainCategory = (mainCategoryId: number) => {
  router.push({
    path: '/marketplace',
    query: { mainCategory: mainCategoryId }
  })
}

const loadCategories = async () => {
  loading.value = true
  try {
    await marketplaceStore.fetchCategories()
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
