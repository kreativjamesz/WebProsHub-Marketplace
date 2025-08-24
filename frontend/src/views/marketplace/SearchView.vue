<template>
  <div :class="['min-h-screen py-24 relative overflow-hidden', searchBackground]">
    <!-- Background Elements -->
    <div v-if="!themeStore.isLightMode" class="absolute inset-0">
      <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(147,51,234,0.03)_50%,transparent_100%)] opacity-20"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(147,51,234,0.02)_50%,transparent_100%)] opacity-15"></div>
      
      <!-- Floating Particles -->
      <div class="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
      <div class="absolute top-40 right-32 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div class="absolute bottom-32 left-1/4 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-pulse delay-2000"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Search Header -->
      <div class="text-center mb-16">
        <h1 
          class="text-5xl md:text-7xl font-bold mb-6"
          :class="themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'"
          v-motion="'slide-visible-once-bottom'"
        >
          Search
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600"
            >Everything</span
          >
        </h1>
        <p 
          class="text-xl max-w-3xl mx-auto leading-relaxed mb-12"
          :class="themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300'"
          v-motion="'slide-visible-once-bottom'"
          :motion-delay="200"
        >
          Discover amazing products, stores, and categories on Zig
        </p>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto relative" v-motion="'slide-visible-once-bottom'" :motion-delay="400">
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Search for products, stores, or categories..."
              class="w-full px-8 py-6 text-xl rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20"
              :class="themeStore.isLightMode 
                ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500' 
                : 'bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-purple-400'"
            />
            <button
              @click="handleSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Search Filters -->
      <div class="flex flex-wrap justify-center gap-4 mb-12" v-motion="'slide-visible-once-bottom'" :motion-delay="600">
        <button
          v-for="filter in filters"
          :key="filter.id"
          @click="selectFilter(filter.id)"
          class="group flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
          :class="activeFilter === filter.id 
            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg' 
            : themeStore.isLightMode 
              ? 'bg-white/70 text-slate-700 hover:bg-white/90 shadow-md hover:shadow-lg' 
              : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800/90 shadow-md hover:shadow-lg'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="filter.icon"></path>
          </svg>
          <span class="font-medium">{{ filter.label }}</span>
        </button>
      </div>

      <!-- Search Results -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p :class="themeStore.isLightMode ? 'text-slate-600' : 'text-slate-400'">Searching...</p>
      </div>

      <div v-else-if="searchResults.length > 0" class="space-y-8">
        <div
          v-for="(result, index) in searchResults"
          :key="result.id"
          class="group p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
          :class="themeStore.isLightMode 
            ? 'bg-white/70 hover:bg-white/90 shadow-lg hover:shadow-xl' 
            : 'bg-slate-800/70 hover:bg-slate-800/90 shadow-lg hover:shadow-xl'"
          v-motion="'slide-visible-once-bottom'"
          :motion-delay="index * 100"
        >
          <div class="flex items-start space-x-6">
            <div class="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
              <SafeImage
                :src="result.image"
                :alt="result.name"
                class="w-full h-full object-cover"
                fallback="/webproshub-logo.svg"
              />
            </div>
            <div class="flex-1">
              <h3 
                class="text-2xl font-bold mb-2 transition-colors duration-300"
                :class="themeStore.isLightMode 
                  ? 'text-slate-800 group-hover:text-slate-900' 
                  : 'text-slate-100 group-hover:text-slate-50'"
              >
                {{ result.name }}
              </h3>
              <p 
                class="text-lg mb-3 transition-colors duration-300"
                :class="themeStore.isLightMode 
                  ? 'text-slate-600 group-hover:text-slate-700' 
                  : 'text-slate-300 group-hover:text-slate-200'"
              >
                {{ result.description }}
              </p>
              <div class="flex items-center space-x-4">
                <span 
                  v-if="result.price"
                  class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600"
                >
                  ₱{{ result.price }}
                </span>
                <span 
                  v-if="result.rating"
                  class="flex items-center space-x-1 text-slate-500"
                >
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span>{{ result.rating }}</span>
                </span>
                <span 
                  v-if="result.store"
                  class="text-slate-500"
                >
                  by {{ result.store }}
                </span>
                <span 
                  v-if="result.productCount"
                  class="text-slate-500"
                >
                  {{ result.productCount }} products
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="searchQuery && !isLoading" class="text-center py-20">
        <div class="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 
          class="text-2xl font-bold mb-4"
          :class="themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'"
        >
          No results found
        </h3>
        <p :class="themeStore.isLightMode ? 'text-slate-600' : 'text-slate-400'">
          Try adjusting your search terms or browse our categories
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useMarketplaceStore } from '@/stores/marketplace'
import SafeImage from '@/components/ui/SafeImage.vue'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const marketplaceStore = useMarketplaceStore()

const searchQuery = ref('')
const searchResults = ref<any[]>([])
const isLoading = ref(false)
const activeFilter = ref('all') // all, products, stores, categories

const searchBackground = computed(() => {
  return themeStore.isLightMode 
    ? 'bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50'
    : 'bg-gradient-to-br from-slate-900 via-purple-900 to-cyan-900'
})

const filters = [
  { id: 'all', label: 'All', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { id: 'products', label: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id: 'stores', label: 'Stores', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'categories', label: 'Categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' }
]

const performSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  isLoading.value = true
  try {
    // Simulate search - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock results for now
    searchResults.value = [
      {
        id: '1',
        type: 'product',
        name: 'Creative Art Print',
        description: 'Beautiful hand-drawn artwork',
        image: '/webproshub-logo.svg',
        price: 29.99,
        store: 'Artistic Creations'
      },
      {
        id: '2',
        type: 'store',
        name: 'Digital Design Studio',
        description: 'Professional graphic design services',
        image: '/webproshub-logo.svg',
        rating: 4.8,
        productCount: 45
      }
    ]
  } catch (error) {
    console.error('Search failed:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    performSearch()
  }
}

const selectFilter = (filterId: string) => {
  activeFilter.value = filterId
  if (searchQuery.value.trim()) {
    performSearch()
  }
}

onMounted(() => {
  // Get search query from route params
  if (route.query.q) {
    searchQuery.value = route.query.q as string
    performSearch()
  }
})
</script>

<style scoped>
/* VueUse Motion handles all animations */
</style>
