<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useMarketplaceStore } from '@/stores/marketplace'
import SafeImage from '@/components/ui/SafeImage.vue'

const router = useRouter()
const themeStore = useThemeStore()
const marketplaceStore = useMarketplaceStore()

const trendingProducts = ref<any[]>([])
const trendingCategories = ref<any[]>([])
const isLoading = ref(true)

const trendingBackground = computed(() => {
  return themeStore.isLightMode 
    ? 'bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50'
    : 'bg-gradient-to-br from-slate-900 via-pink-900 to-rose-900'
})

const trendingMetrics = [
  {
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    label: 'Trending Products',
    value: '2.4K+',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    label: 'Hot Categories',
    value: '15+',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16 9 16 10c2 1 2.657 2.657 2.657 2.657z',
    label: 'Trending Searches',
    value: '8.9K+',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Active Users',
    value: '12.5K+',
    color: 'from-cyan-500 to-blue-500'
  }
]

const loadTrendingData = async () => {
  isLoading.value = true
  try {
    // Simulate API call - replace with actual data
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    trendingProducts.value = [
      {
        id: '1',
        name: 'Cyberpunk Art Print',
        image: '/webproshub-logo.svg',
        price: 39.99,
        trend: '+245%',
        store: 'Digital Dreams',
        rating: 4.9
      },
      {
        id: '2',
        name: 'Neon Light Design',
        image: '/webproshub-logo.svg',
        price: 29.99,
        trend: '+189%',
        store: 'Luminous Art',
        rating: 4.8
      },
      {
        id: '3',
        name: 'Abstract Canvas',
        image: '/webproshub-logo.svg',
        price: 49.99,
        trend: '+156%',
        store: 'Modern Canvas',
        rating: 4.7
      },
      {
        id: '4',
        name: 'Geometric Patterns',
        image: '/webproshub-logo.svg',
        price: 24.99,
        trend: '+134%',
        store: 'Pattern Studio',
        rating: 4.6
      }
    ]
    
    trendingCategories.value = [
      { name: 'Digital Art', trend: '+89%', icon: '🎨' },
      { name: 'Photography', trend: '+67%', icon: '📸' },
      { name: 'Illustrations', trend: '+54%', icon: '✏️' },
      { name: 'Typography', trend: '+43%', icon: '🔤' }
    ]
  } catch (error) {
    console.error('Failed to load trending data:', error)
  } finally {
    isLoading.value = false
  }
}

const viewProduct = (productId: string) => {
  router.push(`/marketplace/products/${productId}`)
}

onMounted(() => {
  loadTrendingData()
})
</script>

<template>
  <div :class="['min-h-screen py-24 relative overflow-hidden', trendingBackground]">
    <!-- Background Elements -->
    <div v-if="!themeStore.isLightMode" class="absolute inset-0">
      <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(236,72,153,0.03)_50%,transparent_100%)] opacity-20"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(236,72,153,0.02)_50%,transparent_100%)] opacity-15"></div>
      
      <!-- Floating Particles -->
      <div class="absolute top-20 left-20 w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-pulse"></div>
      <div class="absolute top-40 right-32 w-1.5 h-1.5 bg-rose-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div class="absolute bottom-32 left-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-pulse delay-2000"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Header -->
      <div class="text-center mb-20">
        <h1 
          class="text-5xl md:text-7xl font-bold mb-6"
          :class="themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'"
          v-motion="'slide-visible-once-bottom'"
        >
          What's
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"
            >Trending</span
          >
        </h1>
        <p 
          class="text-xl max-w-3xl mx-auto leading-relaxed"
          :class="themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300'"
          v-motion="'slide-visible-once-bottom'"
          :motion-delay="200"
        >
          Discover the hottest products and categories that everyone is talking about
        </p>
      </div>

      <!-- Trending Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div
          v-for="(metric, index) in trendingMetrics"
          :key="index"
          class="group text-center"
          v-motion="'slide-visible-once-bottom'"
          :motion-delay="index * 150"
        >
          <div class="relative mb-6">
            <div class="w-20 h-20 mx-auto mb-4 relative group-hover:scale-110 transition-transform duration-300">
              <div
                class="absolute inset-0 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-full blur-xl"
                :class="metric.color"
              ></div>
              <div
                class="relative w-full h-full bg-gradient-to-r rounded-full flex items-center justify-center shadow-2xl"
                :class="metric.color"
              >
                <svg
                  class="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="metric.icon"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h3
            class="text-3xl font-bold mb-2 transition-colors duration-300"
            :class="themeStore.isLightMode 
              ? 'text-slate-800 group-hover:text-slate-900' 
              : 'text-slate-100 group-hover:text-slate-50'"
          >
            {{ metric.value }}
          </h3>
          <p
            class="text-lg transition-colors duration-300"
            :class="themeStore.isLightMode 
              ? 'text-slate-600 group-hover:text-slate-700' 
              : 'text-slate-300 group-hover:text-slate-200'"
          >
            {{ metric.label }}
          </p>
        </div>
      </div>

      <!-- Trending Products -->
      <div class="mb-20">
        <h2 
          class="text-3xl md:text-5xl font-bold text-center mb-12"
          :class="themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'"
          v-motion="'slide-visible-once-bottom'"
        >
          Trending Products
        </h2>
        
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="i in 4"
            :key="i"
            class="rounded-2xl shadow-lg border animate-pulse overflow-hidden"
            :class="themeStore.isLightMode 
              ? 'bg-white border-slate-100' 
              : 'bg-slate-800 border-slate-700'"
          >
            <div :class="[
              'w-full h-64',
              themeStore.isLightMode ? 'bg-slate-200' : 'bg-slate-700'
            ]"></div>
            <div class="p-6">
              <div :class="[
                'h-6 rounded mb-3',
                themeStore.isLightMode ? 'bg-slate-200' : 'bg-slate-700'
              ]"></div>
              <div :class="[
                'h-4 rounded mb-4',
                themeStore.isLightMode ? 'bg-slate-200' : 'bg-slate-700'
              ]"></div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(product, index) in trendingProducts"
            :key="product.id"
            class="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 cursor-pointer border overflow-hidden"
            :class="themeStore.isLightMode 
              ? 'bg-white border-slate-100' 
              : 'bg-slate-800 border-slate-700'"
            v-motion="'slide-visible-once-bottom'"
            :motion-delay="index * 100"
            @click="viewProduct(product.id)"
          >
            <div class="relative overflow-hidden">
              <SafeImage
                :src="product.image"
                :alt="product.name"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                fallback="/webproshub-logo.svg"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              
              <!-- Trend Badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold rounded-full shadow-lg">
                  {{ product.trend }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <h3
                class="font-bold mb-3 text-lg transition-colors duration-300"
                :class="themeStore.isLightMode 
                  ? 'text-slate-800 group-hover:text-slate-900' 
                  : 'text-slate-100 group-hover:text-slate-50'"
              >
                {{ product.name }}
              </h3>

              <div class="flex items-center justify-between mb-4">
                <span
                  class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"
                >
                  ₱{{ product.price }}
                </span>
                <div class="flex items-center space-x-1">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    :class="star <= product.rating ? 'text-yellow-400' : 'text-slate-300'"
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="text-sm text-slate-500">({{ product.rating }})</span>
                </div>
              </div>

              <div
                class="text-sm transition-colors duration-300"
                :class="themeStore.isLightMode 
                  ? 'text-slate-600 group-hover:text-slate-700' 
                  : 'text-slate-300 group-hover:text-slate-200'"
              >
                {{ product.store }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trending Categories -->
      <div class="max-w-4xl mx-auto">
        <h2 
          class="text-3xl md:text-5xl font-bold text-center mb-12"
          :class="themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'"
          v-motion="'slide-visible-once-bottom'"
        >
          Hot Categories
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(category, index) in trendingCategories"
            :key="index"
            class="group text-center p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
            :class="themeStore.isLightMode 
              ? 'bg-white/70 hover:bg-white/90 shadow-lg hover:shadow-xl' 
              : 'bg-slate-800/70 hover:bg-slate-800/90 shadow-lg hover:shadow-xl'"
            v-motion="'slide-visible-once-bottom'"
            :motion-delay="index * 100"
          >
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ category.icon }}
            </div>
            <h3
              class="text-xl font-bold mb-2 transition-colors duration-300"
              :class="themeStore.isLightMode 
                ? 'text-slate-800 group-hover:text-slate-900' 
                : 'text-slate-100 group-hover:text-slate-50'"
            >
              {{ category.name }}
            </h3>
            <p
              class="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"
            >
              {{ category.trend }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* VueUse Motion handles all animations */
</style>
