<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <MarketplaceHero :title="heroTitle" :subtitle="heroSubtitle" @search="handleSearch" />

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumb Navigation -->
      <MarketplaceBreadcrumb
        :main-category-id="mainCategoryId"
        :category-id="categoryId"
        :subcategory-id="subcategoryId"
      />

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <MarketplaceFilters
          :categories="filteredCategories"
          :products="products"
          @filters-changed="handleFiltersChanged"
        />

        <!-- Products Grid -->
        <ProductGrid
          :products="products"
          :is-loading="isLoading"
          :total-products="totalProducts"
          :total-pages="totalPages"
          :current-page="currentPage"
          @view-product="viewProduct"
          @toggle-wishlist="toggleWishlist"
          @add-to-cart="addToCart"
          @sort-changed="handleSort"
          @page-changed="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import type { AxiosError } from 'axios'
import type { Product, Category } from '@/types/marketplace'
import { useCartStore } from '@/stores/cart'
import { useGuestCartStore } from '@/stores/guestCart'
import { useAuthStore } from '@/stores'
import { useMarketplaceStore } from '@/stores/marketplace'

// Import components
import MarketplaceHero from '@/components/marketplace/MarketplaceHero.vue'
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters.vue'
import ProductGrid from '@/components/marketplace/ProductGrid.vue'
import MarketplaceBreadcrumb from '@/components/marketplace/MarketplaceBreadcrumb.vue'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const guestCartStore = useGuestCartStore()
const authStore = useAuthStore()
const marketplaceStore = useMarketplaceStore()

// State
const isLoading = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const totalProducts = ref(0)
const totalPages = ref(1)
const filters = ref<{
  categories: number[]
  priceRange: { min: string; max: string }
  minRating: number
}>({
  categories: [],
  priceRange: { min: '', max: '' },
  minRating: 0
})
const sortBy = ref('relevance')

// Real data from store
const products = computed(() => marketplaceStore.products)
const categories = computed(() => marketplaceStore.categories)
const subcategories = computed(() => marketplaceStore.subcategories)

// Get URL parameters
const mainCategoryId = computed(() => {
  const id = route.query.mainCategory
  return id ? Number(id) : undefined
})

const categoryId = computed(() => {
  const id = route.query.category
  return id ? Number(id) : undefined
})

const subcategoryId = computed(() => {
  const id = route.query.subcategory
  return id ? Number(id) : undefined
})

// Filter categories based on selected main category
const filteredCategories = computed(() => {
  if (mainCategoryId.value) {
    return categories.value.filter((cat) => cat.mainCategoryId === mainCategoryId.value)
  }
  return categories.value
})

// Hero content based on context
const heroTitle = computed(() => {
  if (mainCategoryId.value) {
    const mainCat = marketplaceStore.mainCategories.find((c) => c.id === mainCategoryId.value)
    return `Shop ${mainCat?.name || 'Category'}`
  }
  return 'Discover Amazing Products'
})

const heroSubtitle = computed(() => {
  if (mainCategoryId.value) {
    const mainCat = marketplaceStore.mainCategories.find((c) => c.id === mainCategoryId.value)
    return `Find the best ${mainCat?.name?.toLowerCase() || 'products'} from local businesses`
  }
  return 'Shop from thousands of local businesses and sellers'
})

// Methods
const loadProducts = async () => {
  try {
    isLoading.value = true

    // Build API parameters
    const params: any = {
      page: currentPage.value,
      limit: 20,
    }

    // Add search query
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim()
    }

    // Add category filters
    if (mainCategoryId.value) {
      params.mainCategory = mainCategoryId.value
    }
    if (categoryId.value) {
      params.category = categoryId.value
    }
    if (subcategoryId.value) {
      params.subcategory = subcategoryId.value
    }
    if (filters.value.categories.length > 0) {
      params.category = filters.value.categories[0] // For now, use first selected
    }

    // Add price filters
    if (filters.value.priceRange.min) {
      params.minPrice = Number(filters.value.priceRange.min)
    }
    if (filters.value.priceRange.max) {
      params.maxPrice = Number(filters.value.priceRange.max)
    }

    // Add rating filter
    if (filters.value.minRating && filters.value.minRating > 0) {
      params.rating = filters.value.minRating
    }

    // Add sorting
    if (sortBy.value !== 'relevance') {
      switch (sortBy.value) {
        case 'price-low':
          params.sortBy = 'price'
          params.sortOrder = 'asc'
          break
        case 'price-high':
          params.sortBy = 'price'
          params.sortOrder = 'desc'
          break
        case 'rating':
          params.sortBy = 'rating'
          params.sortOrder = 'desc'
          break
        case 'newest':
          params.sortBy = 'createdAt'
          params.sortOrder = 'desc'
          break
      }
    }

    // Fetch products from API
    await marketplaceStore.fetchProducts(params)

    // Update pagination from store
    totalProducts.value = marketplaceStore.pagination.products.total
    totalPages.value = marketplaceStore.pagination.products.pages
  } catch (error) {
    console.error('Failed to load products:', error)
    toast.error('Failed to load products')
  } finally {
    isLoading.value = false
  }
}

const loadCategories = async () => {
  try {
    await marketplaceStore.fetchCategories()
  } catch (error) {
    console.error('Failed to load categories:', error)
    toast.error('Failed to load categories')
  }
}

const handleSearch = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
  loadProducts()
}

const handleFiltersChanged = (newFilters: {
  categories: number[]
  priceRange: { min: string; max: string }
  minRating: number
}) => {
  filters.value = newFilters
  currentPage.value = 1
  loadProducts()
}

const handleSort = (newSortBy: string) => {
  sortBy.value = newSortBy
  loadProducts()
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadProducts()
  }
}

// Watch for route changes
watch(
  [mainCategoryId, categoryId, subcategoryId],
  () => {
    currentPage.value = 1
    loadProducts()
  },
  { immediate: true },
)

const viewProduct = (productId: string) => {
  router.push(`/marketplace/products/${productId}`)
}

const toggleWishlist = (productId: string) => {
  // TODO: Implement wishlist toggle
  toast.success('Added to wishlist!')
}

const addToCart = async (productId: string) => {
  try {
    const product = products.value.find((p) => p.id === productId)
    if (!product) {
      toast.error('Product not found')
      return
    }

    if (authStore.isAuthenticated) {
      await cartStore.addItem(product, 1)
      toast.success('Added to cart!')
    } else {
      // Guest user - add to guest cart
      guestCartStore.addItem(product, 1)
      toast.success('Added to cart! Sign in to save your cart.')
    }
  } catch (error) {
    console.error('Failed to add to cart:', error)
    if ((error as AxiosError).response?.status === 401) {
      toast.error('Please login to add items to cart')
    } else {
      toast.error('Failed to add to cart')
    }
  }
}

// Lifecycle
onMounted(async () => {
  // Load categories first
  await loadCategories()

  // Then load products (this will respect URL parameters)
  await loadProducts()
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
