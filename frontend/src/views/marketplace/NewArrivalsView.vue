<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useMarketplaceStore } from '@/stores/marketplace'
import SafeImage from '@/components/ui/SafeImage.vue'

const router = useRouter()
const themeStore = useThemeStore()
const marketplaceStore = useMarketplaceStore()

const newProducts = ref<any[]>([])
const isLoading = ref(true)

const newArrivalsBackground = computed(() => {
  return themeStore.isLightMode 
    ? 'bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50'
    : 'bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900'
})

const loadNewArrivals = async () => {
  isLoading.value = true
  try {
    // Simulate API call - replace with actual data
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    newProducts.value = [
      {
        id: '1',
        name: 'Modern Abstract Painting',
        image: '/webproshub-logo.svg',
        price: 89.99,
        arrivalDate: '2 days ago',
        store: 'Contemporary Art Gallery',
        rating: 4.9,
        isNew: true
      },
      {
        id: '2',
        name: 'Digital Portrait Collection',
        image: '/webproshub-logo.svg',
        price: 59.99,
        arrivalDate: '1 day ago',
        store: 'Digital Art Studio',
        rating: 4.8,
        isNew: true
      },
      {
        id: '3',
        name: 'Handcrafted Jewelry Set',
        image: '/webproshub-logo.svg',
        price: 129.99,
        arrivalDate: '3 days ago',
        store: 'Artisan Crafts',
        rating: 4.7,
        isNew: true
      },
      {
        id: '4',
        name: 'Vintage Photography Prints',
        image: '/webproshub-logo.svg',
        price: 79.99,
        arrivalDate: '4 days ago',
        store: 'Heritage Photos',
        rating: 4.6,
        isNew: true
      },
      {
        id: '5',
        name: 'Contemporary Sculpture',
        image: '/webproshub-logo.svg',
        price: 299.99,
        arrivalDate: '5 days ago',
        store: 'Modern Sculptures',
        rating: 4.9,
        isNew: true
      },
      {
        id: '6',
        name: 'Abstract Digital Art',
        image: '/webproshub-logo.svg',
        price: 44.99,
        arrivalDate: '6 days ago',
        store: 'Digital Dreams',
        rating: 4.5,
        isNew: true
      },
      {
        id: '7',
        name: 'Handmade Ceramic Vase',
        image: '/webproshub-logo.svg',
        price: 89.99,
        arrivalDate: '1 week ago',
        store: 'Pottery Studio',
        rating: 4.8,
        isNew: false
      },
      {
        id: '8',
        name: 'Contemporary Wall Art',
        image: '/webproshub-logo.svg',
        price: 159.99,
        arrivalDate: '1 week ago',
        store: 'Wall Art Gallery',
        rating: 4.7,
        isNew: false
      }
    ]
  } catch (error) {
    console.error('Failed to load new arrivals:', error)
  } finally {
    isLoading.value = false
  }
}

const viewProduct = (productId: string) => {
  router.push(`/marketplace/products/${productId}`)
}

const getTimeAgo = (dateString: string) => {
  return dateString
}

onMounted(() => {
  loadNewArrivals()
})
</script>

<template>
  <div :class="['min-h-screen py-24 relative overflow-hidden', newArrivalsBackground]">
    <!-- Background Elements -->
    <div v-if="!themeStore.isLightMode" class="absolute inset-0">
      <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(16,185,129,0.03)_50%,transparent_100%)] opacity-20"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(16,185,129,0.02)_50%,transparent_100%)] opacity-15"></div>
      
      <!-- Floating Particles -->
      <div class="absolute top-20 left-20 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-pulse"></div>
      <div class="absolute top-40 right-32 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div class="absolute bottom-32 left-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-50 animate-pulse delay-2000"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Header -->
      <div class="text-center mb-20">
        <h1 
          class="text-5xl md:text-7xl font-bold mb-6"
          :class="themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'"
          v-motion="'slide-visible-once-bottom'"
        >
          New
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"
            >Arrivals</span
          >
        </h1>
        <p 
          class="text-xl max-w-3xl mx-auto leading-relaxed"
          :class="themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300'"
          v-motion="'slide-visible-once-bottom'"
          :motion-delay="200"
        >
          Be the first to discover the latest creative masterpieces from our talented artists
        </p>
      </div>

      <!-- New Arrivals Grid -->
      <div class="mb-20">
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="i in 8"
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
              <div :class="[
                'h-12 rounded',
                themeStore.isLightMode ? 'bg-slate-200' : 'bg-slate-700'
              ]"></div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(product, index) in newProducts"
            :key="product.id"
            class="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 cursor-pointer border overflow-hidden relative"
            :class="themeStore.isLightMode 
              ? 'bg-white border-slate-100' 
              : 'bg-slate-800 border-slate-700'"
            v-motion="'slide-visible-once-bottom'"
            :motion-delay="index * 100"
            @click="viewProduct(product.id)"
          >
            <!-- New Badge -->
            <div v-if="product.isNew" class="absolute top-4 left-4 z-10">
              <span class="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                NEW
              </span>
            </div>

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
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span
                  class="text-sm font-medium text-emerald-600"
                  :class="themeStore.isLightMode ? 'text-emerald-600' : 'text-emerald-400'"
                >
                  {{ getTimeAgo(product.arrivalDate) }}
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

              <h3
                class="font-bold mb-3 text-lg transition-colors duration-300 line-clamp-2"
                :class="themeStore.isLightMode 
                  ? 'text-slate-800 group-hover:text-slate-900' 
                  : 'text-slate-100 group-hover:text-slate-50'"
              >
                {{ product.name }}
              </h3>

              <div class="flex items-center justify-between mb-4">
                <span
                  class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"
                >
                  ₱{{ product.price }}
                </span>
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

      <!-- CTA Section -->
      <div class="text-center">
        <h2 
          class="text-3xl md:text-5xl font-bold mb-8"
          :class="themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'"
          v-motion="'slide-visible-once-bottom'"
        >
          Stay Updated
        </h2>
        <p 
          class="text-xl mb-12 max-w-2xl mx-auto"
          :class="themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300'"
        >
          Get notified about new arrivals and exclusive offers
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email address"
            class="px-8 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 max-w-md w-full"
            :class="themeStore.isLightMode 
              ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500' 
              : 'bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-emerald-400'"
          />
          <button
            class="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* VueUse Motion handles all animations */

.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
