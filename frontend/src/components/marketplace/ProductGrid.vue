<template>
  <div class="lg:w-3/4">
    <!-- Sort and View Options -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <div class="flex items-center space-x-4 mb-4 sm:mb-0">
        <span class="text-sm text-muted-foreground"> {{ totalProducts }} products found </span>
      </div>

      <div class="flex items-center space-x-4">
        <select
          v-model="sortBy"
          @change="handleSort"
          class="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
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
            :class="viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'"
            class="p-2 hover:text-primary transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'"
            class="p-2 hover:text-primary transition-colors"
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
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
      ></div>
      <p class="mt-4 text-muted-foreground">Loading products...</p>
    </div>

    <!-- Products Grid -->
    <div
      v-else-if="products.length > 0"
      :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :view-mode="viewMode"
        @view-product="viewProduct"
        @toggle-wishlist="toggleWishlist"
        @add-to-cart="addToCart"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg
        class="mx-auto h-12 w-12 text-muted-foreground"
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
      <h3 class="mt-2 text-sm font-medium text-foreground">No products found</h3>
      <p class="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="changePage(page)"
          :class="
            page === currentPage
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground bg-card hover:bg-accent'
          "
          class="px-3 py-2 text-sm font-medium border border-border rounded-md"
        >
          {{ page }}
        </button>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/types/marketplace'
import SafeImage from '@/components/ui/SafeImage.vue'
import ProductCard from '@/components/marketplace/ProductCard.vue'

interface Props {
  products: Product[]
  isLoading: boolean
  totalProducts: number
  totalPages: number
  currentPage: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewProduct: [id: string]
  toggleWishlist: [id: string]
  addToCart: [id: string]
  sortChanged: [sortBy: string]
  pageChanged: [page: number]
}>()

const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('relevance')

// Computed
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, props.currentPage - 2)
  const end = Math.min(props.totalPages, props.currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const handleSort = () => {
  emit('sortChanged', sortBy.value)
}

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('pageChanged', page)
  }
}

const viewProduct = (productId: string) => {
  emit('viewProduct', productId)
}

const toggleWishlist = (productId: string) => {
  emit('toggleWishlist', productId)
}

const addToCart = (productId: string) => {
  emit('addToCart', productId)
}

const isInWishlist = (productId: string) => {
  // TODO: Check if product is in wishlist
  return false
}
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
