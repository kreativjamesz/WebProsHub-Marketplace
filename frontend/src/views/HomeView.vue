<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useMarketplaceStore } from '@/stores/marketplace'
import {
  HeroSection,
  ServicesSection,
  CategoriesSection,
  FeaturedProductsSection,
  StatsSection,
  CTASection
} from '@/components/home'

const marketplaceStore = useMarketplaceStore()

// State
const featuredProducts = ref<any[]>([])
const featuredCategories = ref<any[]>([]) // Make this a ref instead of computed
const loading = ref({
  categories: false,
  products: false,
  stores: false,
})

// Computed properties for real data from API
const totalProducts = computed(() => marketplaceStore.products.length)
const totalStores = computed(() => marketplaceStore.stores.length)
const totalCategories = computed(() => featuredCategories.value.length)

// Load data from database
const loadHomeData = async () => {
  try {
    loading.value.categories = true
    loading.value.products = true
    loading.value.stores = true

    // Load categories, products, and stores in parallel
    const [categoriesResult, productsResult, storesResult] = await Promise.allSettled([
      marketplaceStore.fetchCategories(),
      marketplaceStore.fetchProducts({ limit: 8, featured: true }),
      marketplaceStore.fetchStores(),
    ])

    // Handle categories
    if (categoriesResult.status === 'fulfilled') {
      console.log('Categories loaded successfully')
      
      // Populate featuredCategories with proper structure
      featuredCategories.value = marketplaceStore.mainCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        icon: cat.image || '/category-placeholder.svg',
        productCount: marketplaceStore.getProductsByMainCategory(cat.id).length,
        description: cat.description || 'Explore amazing products in this category',
      }))
      
      console.log('Featured categories populated:', featuredCategories.value)
    } else {
      console.error('Categories failed to load:', categoriesResult.reason)
      toast.error('Failed to load categories')
    }

    // Handle products
    if (productsResult.status === 'fulfilled') {
      featuredProducts.value = marketplaceStore.products.slice(0, 8)
      console.log('Products loaded successfully')
    } else {
      console.error('Products failed to load:', productsResult.reason)
      toast.error('Failed to load products')
      
      // Try fallback method
      try {
        const fallbackProducts = await marketplaceStore.getFeaturedProductsWithFallback()
        if (fallbackProducts.length > 0) {
          featuredProducts.value = fallbackProducts.slice(0, 8)
          console.log('Fallback products loaded successfully')
        }
      } catch (fallbackError) {
        console.error('Fallback method also failed:', fallbackError)
      }
    }

    // Handle stores
    if (storesResult.status === 'fulfilled') {
      console.log('Stores loaded successfully')
    } else {
      console.error('Stores failed to load:', storesResult.reason)
      toast.error('Failed to load stores')
    }

  } catch (error) {
    console.error('Error loading home data:', error)
    toast.error('Failed to load homepage data')
  } finally {
    loading.value.categories = false
    loading.value.products = false
    loading.value.stores = false
    
    // Log data source for debugging
    console.log('HomeView data loaded from API')
    console.log(`Featured Products: ${featuredProducts.value.length}`)
    console.log(`Categories: ${featuredCategories.value.length}`)
    console.log(`Total Products: ${totalProducts.value}`)
    console.log(`Total Stores: ${totalStores.value}`)
  }
}

// Lifecycle
onMounted(async () => {
  await loadHomeData()
})
</script>

<template>
  <div class="min-h-screen overflow-hidden">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Services Section -->
    <ServicesSection />

    <!-- Categories Section -->
    <CategoriesSection 
      :featured-categories="featuredCategories"
      :loading="loading.categories"
    />

    <!-- Products Section -->
    <FeaturedProductsSection 
      :featured-products="featuredProducts"
      :loading="loading.products"
    />

    <!-- Stats Section -->
    <StatsSection 
      :total-products="totalProducts"
      :total-stores="totalStores"
      :total-categories="totalCategories"
    />

    <!-- CTA Section -->
    <CTASection />
  </div>
</template>

<style scoped>
/* Theme Transition Support */
.theme-transitioning * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #0891b2, #7c3aed);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Performance Optimizations */
* {
  will-change: transform;
}

/* Backdrop Blur Support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }

  .backdrop-blur-md {
    backdrop-filter: blur(12px);
  }
}
</style>
