import { ref, computed, onMounted, watch } from 'vue'
import { useMarketplaceStore } from '@/stores/marketplace'
import type { Product, Category, Store } from '@/types/marketplace'

export function useMarketplace() {
  const store = useMarketplaceStore()
  
  // Component-specific reactive state
  const searchQuery = ref('')
  const selectedCategories = ref<string[]>([])
  const selectedStores = ref<string[]>([])
  const minPrice = ref<number | null>(null)
  const maxPrice = ref<number | null>(null)
  const minRating = ref<number | null>(null)
  const sortBy = ref('relevance')
  const currentPage = ref(1)

  // Computed properties from store
  const stores = computed(() => store.getStores)
  const categories = computed(() => store.getCategories)
  const products = computed(() => store.getProducts)
  const searchResults = computed(() => store.getSearchResults)
  const loading = computed(() => store.loading)
  const errors = computed(() => store.errors)
  const pagination = computed(() => store.pagination)

  // Computed for pagination
  const totalPages = computed(() => pagination.value.products.pages)
  const totalResults = computed(() => pagination.value.products.total)

  // Computed for visible pages
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
  const loadStores = async (params?: {
    page?: number
    search?: string
    category?: string
    sortBy?: string
  }) => {
    try {
      await store.fetchStores(params)
    } catch (error) {
      // Error is already handled in store
      console.error('Error in loadStores:', error)
    }
  }

  const loadCategories = async () => {
    try {
      await store.fetchCategories()
    } catch (error) {
      console.error('Error in loadCategories:', error)
    }
  }

  const loadProducts = async (params?: {
    page?: number
    search?: string
    category?: string
    sortBy?: string
  }) => {
    try {
      await store.fetchProducts(params)
    } catch (error) {
      console.error('Error in loadProducts:', error)
    }
  }

  const performSearch = async () => {
    if (!searchQuery.value.trim()) return

    try {
      await store.searchProducts({
        query: searchQuery.value,
        page: currentPage.value,
        categories: selectedCategories.value,
        stores: selectedStores.value,
        priceMin: minPrice.value,
        priceMax: maxPrice.value,
        rating: minRating.value,
        sortBy: sortBy.value
      })
    } catch (error) {
      console.error('Error in performSearch:', error)
    }
  }

  const clearFilters = () => {
    selectedCategories.value = []
    selectedStores.value = []
    minPrice.value = null
    maxPrice.value = null
    minRating.value = null
    currentPage.value = 1
    
    if (searchQuery.value) {
      performSearch()
    }
  }

  const clearErrors = () => {
    store.clearErrors()
  }

  const resetState = () => {
    store.resetState()
    searchQuery.value = ''
    selectedCategories.value = []
    selectedStores.value = []
    minPrice.value = null
    maxPrice.value = null
    minRating.value = null
    sortBy.value = 'relevance'
    currentPage.value = 1
  }

  // Watchers for automatic search
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

  // Auto-load data on mount
  const initialize = async () => {
    await Promise.all([
      loadCategories(),
      loadStores()
    ])
  }

  return {
    // State
    searchQuery,
    selectedCategories,
    selectedStores,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    currentPage,
    
    // Computed from store
    stores,
    categories,
    products,
    searchResults,
    loading,
    errors,
    pagination,
    totalPages,
    totalResults,
    visiblePages,
    
    // Methods
    loadStores,
    loadCategories,
    loadProducts,
    performSearch,
    clearFilters,
    clearErrors,
    resetState,
    initialize
  }
}
