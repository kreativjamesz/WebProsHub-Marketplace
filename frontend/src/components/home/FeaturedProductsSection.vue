<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { toast } from 'vue3-toastify'
import SafeImage from '@/components/ui/SafeImage.vue'

const router = useRouter()
const themeStore = useThemeStore()

// Props
interface Props {
  featuredProducts: Array<any>
  loading: boolean
}

const props = defineProps<Props>()

const featuredProductsBackground = computed(() => {
  return themeStore.isLightMode ? 'bg-white' : 'bg-gradient-to-b from-zinc-900 to-slate-900'
})

// Methods
const viewProduct = (productId: string) => {
  router.push(`/marketplace/products/${productId}`)
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
</script>

<template>
  <!-- Products Grid Section - Displays Featured Products from Database -->
  <div :class="[
    'py-24 relative overflow-hidden',
    featuredProductsBackground
  ]">
    <!-- Dark theme background elements -->
    <div v-if="!themeStore.isLightMode" class="absolute inset-0">
      <!-- Floating Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(147,51,234,0.02)_50%,transparent_100%)] opacity-20"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(147,51,234,0.015)_50%,transparent_100%)] opacity-15"></div>
      
      <!-- Floating Particles -->
      <div class="absolute top-20 left-20 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
      <div class="absolute top-40 right-32 w-1 h-1 bg-pink-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div class="absolute bottom-32 left-1/4 w-0.5 h-0.5 bg-indigo-400 rounded-full opacity-40 animate-pulse delay-2000"></div>
      <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-violet-400 rounded-full opacity-25 animate-pulse delay-1500"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="flex items-center justify-between mb-16">
        <div>
          <h2
            :class="[
              'text-4xl md:text-6xl font-bold mb-4',
              themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'
            ]"
            v-motion="'slide-visible-once-bottom'"
          >
            Featured
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
              >Products</span
            >
          </h2>
          <p :class="['text-xl max-w-2xl', themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300']">
            Handpicked products from our top sellers, curated for exceptional quality and value
          </p>
        </div>
        <router-link
          to="/marketplace"
          class="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <span class="relative z-10">View All</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
          ></div>
        </router-link>
      </div>

      <!-- Loading state for products -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="i in 4"
          :key="i"
          :class="[
            'rounded-2xl shadow-lg border animate-pulse overflow-hidden',
            themeStore.isLightMode 
              ? 'bg-white border-slate-100' 
              : 'bg-slate-800 border-slate-700'
          ]"
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

      <!-- Real products from database -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(product, index) in featuredProducts"
          :key="product.id"
          :class="[
            'group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 cursor-pointer border overflow-hidden',
            themeStore.isLightMode 
              ? 'bg-white border-slate-100' 
              : 'bg-slate-800 border-slate-700'
          ]"
          v-motion="'slide-visible-once-bottom'"
          :motion-delay="index * 100"
          @click="viewProduct(product.id)"
        >
          <div class="relative overflow-hidden">
            <SafeImage
              :src="product.images?.[0] || '/webproshub-logo.svg'"
              :alt="product.name"
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              fallback="/zig-logo.svg"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <!-- Wishlist Button -->
            <div class="absolute top-4 right-4">
              <button
                @click.stop="toggleWishlist(product.id)"
                :class="isInWishlist(product.id) ? 'text-red-500' : 'text-white'"
                class="p-3 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-6">
            <h3
              :class="[
                'font-bold mb-3 text-lg line-clamp-2 transition-colors duration-300',
                themeStore.isLightMode 
                  ? 'text-slate-800 group-hover:text-slate-900' 
                  : 'text-slate-100 group-hover:text-slate-50'
              ]"
            >
              {{ product.name }}
            </h3>

            <div class="flex items-center justify-between mb-4">
              <span
                class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
              >
                ₱{{ Number(product.price).toFixed(2) }}
              </span>
              <div class="flex items-center space-x-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="star <= 4 ? 'text-yellow-400' : 'text-slate-300'"
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="text-sm text-slate-500">({{ product.reviews?.length || 0 }})</span>
              </div>
            </div>

            <div
              :class="[
                'text-sm mb-6 transition-colors duration-300',
                themeStore.isLightMode 
                  ? 'text-slate-600 group-hover:text-slate-700' 
                  : 'text-slate-300 group-hover:text-slate-200'
              ]"
            >
              {{ product.store?.name || 'Store' }}
            </div>

            <button
              @click.stop="addToCart(product.id)"
              class="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- No products message -->
      <div v-if="!loading && featuredProducts.length === 0" class="text-center py-16">
        <div :class="[
          'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6',
          themeStore.isLightMode ? 'bg-slate-100' : 'bg-slate-800'
        ]">
          <svg
            :class="[
              'w-12 h-12',
              themeStore.isLightMode ? 'text-slate-400' : 'text-slate-500'
            ]"
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
        </div>
        <p :class="[
          'text-xl',
          themeStore.isLightMode ? 'text-slate-500' : 'text-slate-400'
        ]">No featured products available at the moment.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* VueUse Motion handles all animations */

/* Line Clamp Utility */
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
