import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, Category, Store } from '@/types/marketplace'
import { apiService } from '@/services/api'

export const useMarketplaceStore = defineStore('marketplace', () => {
  // State
  const stores = ref<Store[]>([])
  const mainCategories = ref<any[]>([])
  const categories = ref<any[]>([])
  const subcategories = ref<any[]>([])
  const products = ref<Product[]>([])
  const searchResults = ref<Product[]>([])

  // Loading states
  const loading = ref({
    stores: false,
    categories: false,
    products: false,
    search: false,
  })

  // Error states
  const errors = ref({
    stores: null as string | null,
    categories: null as string | null,
    products: null as string | null,
    search: null as string | null,
  })

  // Pagination
  const pagination = ref({
    stores: { page: 1, total: 0, pages: 1 },
    products: { page: 1, total: 0, pages: 1 },
  })

  // Getters (computed)
  const getStores = computed(() => stores.value)
  const getMainCategories = computed(() => mainCategories.value)
  const getCategories = computed(() => categories.value)
  const getSubcategories = computed(() => subcategories.value)
  const getProducts = computed(() => products.value)
  const getSearchResults = computed(() => searchResults.value)

  const isLoading = computed(() => Object.values(loading.value).some(Boolean))
  const hasErrors = computed(() => Object.values(errors.value).some(Boolean))

  // Category helpers
  const getCategoriesByMainCategory = computed(() => (mainCategoryId: number) => {
    return categories.value.filter((cat) => cat.mainCategoryId === mainCategoryId)
  })

  const getSubcategoriesByCategory = computed(() => (categoryId: number) => {
    return subcategories.value.filter((sub) => sub.categoryId === categoryId)
  })

  const getProductsByCategory = computed(() => (categoryId: number) => {
    return products.value.filter((prod) => prod.categoryId === categoryId)
  })

  const getProductsByMainCategory = computed(() => (mainCategoryId: number) => {
    return products.value.filter((prod) => prod.mainCategoryId && Number(prod.mainCategoryId) === mainCategoryId)
  })

  // Actions
  const fetchStores = async (params?: {
    page?: number
    search?: string
    category?: number
    sortBy?: string
  }) => {
    loading.value.stores = true
    errors.value.stores = null

    try {
      const response = await apiService.marketplace.getStores(params)
      stores.value = response.data.stores || response.data
      pagination.value.stores = response.data.pagination || {
        page: 1,
        total: stores.value.length,
        pages: 1,
      }
    } catch (error) {
      console.error('Error fetching stores:', error)
      errors.value.stores = 'Failed to load stores. Please try again.'
      throw error
    } finally {
      loading.value.stores = false
    }
  }

  const fetchCategories = async () => {
    loading.value.categories = true
    errors.value.categories = null

    try {
      const response = await apiService.marketplace.getCategories()

      // Handle the new 3-level category structure
      if (response.data.mainCategories) {
        mainCategories.value = response.data.mainCategories
        categories.value = response.data.categories
        subcategories.value = response.data.subcategories
      } else {
        // Fallback for old structure
        categories.value = response.data
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      errors.value.categories = 'Failed to load categories. Please try again.'
      throw error
    } finally {
      loading.value.categories = false
    }
  }

  const fetchProducts = async (params?: {
    page?: number
    search?: string
    category?: number
    mainCategory?: number
    subcategory?: number
    sortBy?: string
    priceMin?: number
    priceMax?: number
    rating?: number
    limit?: number
    featured?: boolean
  }) => {
    loading.value.products = true
    errors.value.products = null

    try {
      const response = await apiService.marketplace.getProducts(params)
      products.value = response.data.products || response.data
      pagination.value.products = response.data.pagination || {
        page: 1,
        total: products.value.length,
        pages: 1,
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      errors.value.products = 'Failed to load products. Please try again.'
      throw error
    } finally {
      loading.value.products = false
    }
  }

  const searchProducts = async (params: {
    query: string
    page?: number
    mainCategories?: number[]
    categories?: number[]
    subcategories?: number[]
    stores?: string[]
    priceMin?: number | null
    priceMax?: number | null
    rating?: number | null
    sortBy?: string
  }) => {
    loading.value.search = true
    errors.value.search = null

    try {
      const response = await apiService.marketplace.search(params)
      searchResults.value = response.data.products || response.data
      pagination.value.products = response.data.pagination || {
        page: 1,
        total: searchResults.value.length,
        pages: 1,
      }
    } catch (error) {
      console.error('Error searching products:', error)
      errors.value.search = 'Failed to perform search. Please try again.'
      throw error
    } finally {
      loading.value.search = false
    }
  }

  const getFeaturedProducts = async () => {
    try {
      const response = await apiService.marketplace.getProducts({ featured: true, limit: 8 })
      return response.data.products || response.data
    } catch (error) {
      console.error('Error fetching featured products:', error)
      return []
    }
  }

  const getProductsByStore = async (storeId: string) => {
    try {
      const response = await apiService.marketplace.getProducts({ storeId })
      return response.data.products || response.data
    } catch (error) {
      console.error('Error fetching store products:', error)
      return []
    }
  }

  const clearErrors = () => {
    Object.keys(errors.value).forEach((key) => {
      errors.value[key as keyof typeof errors.value] = null
    })
  }

  const resetState = () => {
    stores.value = []
    mainCategories.value = []
    categories.value = []
    subcategories.value = []
    products.value = []
    searchResults.value = []
    clearErrors()
    pagination.value = {
      stores: { page: 1, total: 0, pages: 1 },
      products: { page: 1, total: 0, pages: 1 },
    }
  }

  return {
    // State
    stores,
    mainCategories,
    categories,
    subcategories,
    products,
    searchResults,
    loading,
    errors,
    pagination,

    // Getters
    getStores,
    getMainCategories,
    getCategories,
    getSubcategories,
    getProducts,
    getSearchResults,
    isLoading,
    hasErrors,

    // Category helpers
    getCategoriesByMainCategory,
    getSubcategoriesByCategory,
    getProductsByCategory,
    getProductsByMainCategory,

    // Actions
    fetchStores,
    fetchCategories,
    fetchProducts,
    searchProducts,
    getFeaturedProducts,
    getProductsByStore,
    clearErrors,
    resetState,
  }
})
