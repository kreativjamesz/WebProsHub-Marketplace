<template>
  <div class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <!-- Floating Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(147,51,234,0.03)_50%,transparent_100%)] opacity-30"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(147,51,234,0.02)_50%,transparent_100%)] opacity-20"></div>
      
      <!-- Floating Particles -->
      <div class="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
      <div class="absolute top-40 right-32 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div class="absolute bottom-32 left-1/4 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-pulse delay-2000"></div>
      <div class="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-30 animate-pulse delay-1500"></div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-20 relative z-10">
      <div class="text-center">
        <!-- Main Title with Glow Effect -->
        <h1 class="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
          {{ title }}
        </h1>
        
        <!-- Subtitle with Modern Typography -->
        <p class="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
          {{ subtitle }}
        </p>

        <!-- Enhanced Search Bar -->
        <div class="max-w-3xl mx-auto mb-12">
          <div class="relative group">
            <!-- Search Input with Glass Effect -->
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full px-8 py-6 text-white placeholder-gray-400 rounded-2xl text-xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 bg-black/40 backdrop-blur-xl border border-purple-500/20 transition-all duration-300 group-hover:border-purple-500/40 group-hover:bg-black/50"
              @keyup.enter="handleSearch"
            />
            
            <!-- Search Icon -->
            <div class="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <!-- Search Button with Hover Effects -->
            <button
              @click="handleSearch"
              class="absolute right-2 top-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 border border-purple-400/30"
            >
              <span class="flex items-center space-x-2">
                <span>Search</span>
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <!-- Quick Actions with Modern Design -->
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <!-- Cart Button with Enhanced Styling -->
          <div class="group">
            <CartButton class="transform group-hover:scale-110 transition-all duration-300" />
            <span class="block text-gray-400 text-sm mt-2 group-hover:text-purple-400 transition-colors duration-300">
              Quick access to your cart
            </span>
          </div>
          
          <!-- Divider -->
          <div class="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
          
          <!-- Featured Categories -->
          <div class="text-center">
            <div class="flex items-center space-x-3 text-gray-400 hover:text-purple-400 transition-colors duration-300 cursor-pointer group">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <span class="font-medium">Browse Categories</span>
            </div>
            <span class="block text-gray-500 text-sm mt-1">Explore our product catalog</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Glow Effect -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CartButton from '@/components/shopping/CartButton.vue'

interface Props {
  title?: string
  subtitle?: string
  searchPlaceholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Discover Amazing Products',
  subtitle: 'Shop from thousands of local businesses and sellers',
  searchPlaceholder: 'Search for products, stores, or categories...'
})

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}
</script>

<style scoped>
/* Custom Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Enhanced Text Shadow */
.drop-shadow-2xl {
  filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
}

/* Glass Morphism Enhancement */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}
</style>
