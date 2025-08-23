<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div class="container mx-auto px-4 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">🎉 Amazing Deals & Promotions</h1>
          <p class="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Discover incredible offers, discounts, and special promotions from our trusted sellers
          </p>
        </div>
      </div>
    </div>

    <!-- Deals Grid -->
    <div class="container mx-auto px-4 py-12">
      <!-- Featured Deals -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-8 text-center">🔥 Featured Deals</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="deal in featuredDeals"
            :key="deal.id"
            class="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div class="relative">
              <img :src="deal.image" :alt="deal.title" class="w-full h-48 object-cover" />
              <div class="absolute top-4 left-4">
                <span
                  class="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold"
                >
                  {{ deal.discount }}% OFF
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span
                  class="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium"
                >
                  Limited Time
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-foreground mb-2">
                {{ deal.title }}
              </h3>
              <p class="text-muted-foreground mb-4 line-clamp-2">
                {{ deal.description }}
              </p>
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-2">
                  <span class="text-2xl font-bold text-foreground">
                    ${{ deal.discountedPrice }}
                  </span>
                  <span class="text-muted-foreground line-through">
                    ${{ deal.originalPrice }}
                  </span>
                </div>
                <div class="text-sm text-muted-foreground">
                  {{ deal.store }}
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-sm text-muted-foreground">Ends: {{ deal.endDate }}</div>
                <button
                  class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Category Deals -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-8 text-center">📱 Category Deals</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="category in categoryDeals"
            :key="category.id"
            class="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <span class="text-2xl">{{ category.icon }}</span>
            </div>
            <h3 class="text-lg font-semibold text-foreground mb-2">
              {{ category.name }}
            </h3>
            <p class="text-muted-foreground mb-4">{{ category.dealCount }} active deals</p>
            <button
              class="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors duration-200 w-full"
            >
              View Deals
            </button>
          </div>
        </div>
      </section>

      <!-- Flash Sales -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-8 text-center">⚡ Flash Sales</h2>
        <div class="bg-card border border-border rounded-lg p-6">
          <div class="text-center mb-6">
            <div class="text-4xl font-bold text-destructive mb-2">
              {{ flashSaleTime }}
            </div>
            <p class="text-muted-foreground">Time remaining for flash sale</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="item in flashSaleItems"
              :key="item.id"
              class="border border-border rounded-lg p-4 text-center bg-background"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-20 h-20 mx-auto mb-3 object-cover rounded"
              />
              <h4 class="font-semibold text-foreground mb-2">{{ item.name }}</h4>
              <div class="flex items-center justify-center space-x-2 mb-3">
                <span class="text-lg font-bold text-destructive"> ${{ item.flashPrice }} </span>
                <span class="text-muted-foreground line-through"> ${{ item.regularPrice }} </span>
              </div>
              <button
                class="bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm hover:bg-destructive/90 transition-colors duration-200 w-full"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter Signup -->
      <section class="text-center">
        <div class="bg-card border border-border rounded-lg p-8">
          <h2 class="text-2xl font-bold text-foreground mb-4">🎁 Never Miss a Deal!</h2>
          <p class="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive deals and
            promotions
          </p>
          <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200 placeholder-muted-foreground"
            />
            <button
              class="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'

// Theme
const mode = useColorMode()

// Mock data for deals
const featuredDeals = ref([
  {
    id: 1,
    title: 'iPhone 15 Pro Max - Limited Edition',
    description: 'Get the latest iPhone with exclusive deals and free AirPods Pro',
    image: '/api/placeholder/400/300',
    discount: 25,
    originalPrice: 1199,
    discountedPrice: 899,
    store: 'TechStore Pro',
    endDate: 'Dec 31, 2024',
  },
  {
    id: 2,
    title: 'MacBook Air M3 - Student Discount',
    description: 'Perfect for students with extended warranty and free software bundle',
    image: '/api/placeholder/400/300',
    discount: 15,
    originalPrice: 1099,
    discountedPrice: 934,
    store: 'Apple Premium',
    endDate: 'Jan 15, 2025',
  },
  {
    id: 3,
    title: 'Designer Fashion Collection',
    description: 'Luxury fashion items with up to 70% off retail prices',
    image: '/api/placeholder/400/300',
    discount: 70,
    originalPrice: 500,
    discountedPrice: 150,
    store: 'Fashion Elite',
    endDate: 'Dec 25, 2024',
  },
])

const categoryDeals = ref([
  { id: 1, name: 'Electronics', icon: '📱', dealCount: 45 },
  { id: 2, name: 'Fashion', icon: '👗', dealCount: 32 },
  { id: 3, name: 'Home & Garden', icon: '🏠', dealCount: 28 },
  { id: 4, name: 'Sports', icon: '⚽', dealCount: 19 },
])

const flashSaleItems = ref([
  {
    id: 1,
    name: 'Wireless Earbuds',
    image: '/api/placeholder/80/80',
    flashPrice: 29,
    regularPrice: 89,
  },
  {
    id: 2,
    name: 'Smart Watch',
    image: '/api/placeholder/80/80',
    flashPrice: 99,
    regularPrice: 199,
  },
  {
    id: 3,
    name: 'Gaming Headset',
    image: '/api/placeholder/80/80',
    flashPrice: 49,
    regularPrice: 129,
  },
])

// Flash sale countdown
const flashSaleTime = ref('02:45:30')
let countdownInterval: NodeJS.Timeout | null = null

onMounted(() => {
  // Start countdown timer
  countdownInterval = setInterval(() => {
    // Mock countdown logic
    const [hours, minutes, seconds] = flashSaleTime.value.split(':').map(Number)
    if (seconds > 0) {
      flashSaleTime.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${(seconds - 1).toString().padStart(2, '0')}`
    } else if (minutes > 0) {
      flashSaleTime.value = `${hours.toString().padStart(2, '0')}:${(minutes - 1).toString().padStart(2, '0')}:59`
    } else if (hours > 0) {
      flashSaleTime.value = `${(hours - 1).toString().padStart(2, '0')}:59:59`
    } else {
      flashSaleTime.value = '00:00:00'
    }
  }, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Dark mode adjustments for images */
:global(.dark) img {
  filter: brightness(0.9) contrast(1.1);
}

/* Smooth transitions for theme switching */
.container {
  transition: all 0.3s ease;
}

/* Enhanced hover effects for dark mode */
:global(.dark) .hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

:global(.dark) .hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
}
</style>
