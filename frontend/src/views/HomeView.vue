<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()

// State
const featuredCategories = ref([
  {
    id: '1',
    name: 'Electronics',
    icon: '/category-electronics.jpg',
    productCount: 1247
  },
  {
    id: '2',
    name: 'Fashion',
    icon: '/category-fashion.jpg',
    productCount: 892
  },
  {
    id: '3',
    name: 'Home & Garden',
    icon: '/category-home.jpg',
    productCount: 654
  },
  {
    id: '4',
    name: 'Sports',
    icon: '/category-sports.jpg',
    productCount: 456
  }
])

const featuredProducts = ref([
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    rating: 4.5,
    reviewCount: 128,
    image: '/product-headphones.jpg',
    store: 'TechStore'
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    rating: 4.8,
    reviewCount: 89,
    image: '/product-tshirt.jpg',
    store: 'FashionHub'
  },
  {
    id: '3',
    name: 'Smart Home Security Camera',
    price: 149.99,
    rating: 4.6,
    reviewCount: 203,
    image: '/product-camera.jpg',
    store: 'SmartHome'
  },
  {
    id: '4',
    name: 'Professional Yoga Mat',
    price: 49.99,
    rating: 4.7,
    reviewCount: 156,
    image: '/product-yoga.jpg',
    store: 'FitnessPro'
  }
])

// Methods
const navigateToCategory = (categoryId: string) => {
  router.push(`/marketplace?category=${categoryId}`)
}

const viewProduct = (productId: string) => {
  router.push(`/products/${productId}`)
}

const toggleWishlist = (productId: string) => {
  // TODO: Implement wishlist toggle
  toast.success('Added to wishlist!')
}

const addToCart = (productId: string) => {
  // TODO: Implement add to cart
  toast.success('Added to cart!')
}

const isInWishlist = (productId: string) => {
  // TODO: Check if product is in wishlist
  return false
}

// Lifecycle
onMounted(() => {
  // Load featured data
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="container mx-auto px-4 py-20">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            Welcome to WebProsHub
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            Your premier marketplace for local businesses and unique products
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/marketplace"
              class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </router-link>
            <router-link
              to="/register"
              class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Become a Seller
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose WebProsHub?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the benefits of shopping and selling on our platform
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Local Discovery</h3>
            <p class="text-gray-600">Find amazing products from businesses in your area</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Trusted Quality</h3>
            <p class="text-gray-600">Verified sellers and quality products you can rely on</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Fast & Secure</h3>
            <p class="text-gray-600">Quick delivery and secure payment processing</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p class="text-lg text-gray-600">
            Explore our wide range of product categories
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="category in featuredCategories"
            :key="category.id"
            @click="navigateToCategory(category.id)"
            class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div class="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
              <img
                :src="category.icon"
                :alt="category.name"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ category.name }}</h3>
            <p class="text-sm text-gray-600">{{ category.productCount }} products</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p class="text-lg text-gray-600">
              Handpicked products from our top sellers
            </p>
          </div>
          <router-link
            to="/marketplace"
            class="text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All →
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="product in featuredProducts"
            :key="product.id"
            @click="viewProduct(product.id)"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
          >
            <div class="relative">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-48 object-cover rounded-t-lg"
              />
              <div class="absolute top-2 right-2">
                <button
                  @click.stop="toggleWishlist(product.id)"
                  :class="isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'"
                  class="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
                {{ product.name }}
              </h3>
              <div class="flex items-center justify-between mb-3">
                <span class="text-lg font-bold text-gray-900">
                  ${{ product.price.toFixed(2) }}
                </span>
                <div class="flex items-center space-x-1">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    :class="star <= product.rating ? 'text-yellow-400' : 'text-gray-300'"
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm text-gray-600">({{ product.reviewCount }})</span>
                </div>
              </div>
              
              <div class="text-sm text-gray-500 mb-3">
                {{ product.store }}
              </div>
              
              <button
                @click.stop="addToCart(product.id)"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Selling?
        </h2>
        <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of successful sellers on WebProsHub and grow your business with our powerful marketplace platform.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/register"
            class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Create Store
          </router-link>
          <router-link
            to="/seller/guide"
            class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
          >
            Learn More
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
