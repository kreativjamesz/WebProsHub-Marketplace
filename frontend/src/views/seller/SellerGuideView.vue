<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const guideBackground = computed(() => {
  return themeStore.isLightMode 
    ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    : 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900'
})

const guideSteps = [
  {
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4',
    title: 'Create Your Store',
    description: 'Set up your store profile with business details, logo, and branding',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    title: 'Add Your Products',
    description: 'Upload product images, set prices, and manage inventory',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Get Verified',
    description: 'Complete verification process to build customer trust',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Start Selling',
    description: 'Launch your store and start receiving orders',
    color: 'from-orange-500 to-red-500'
  }
]

const tips = [
  'Use high-quality product images',
  'Write compelling product descriptions',
  'Set competitive pricing',
  'Offer excellent customer service',
  'Keep inventory updated',
  'Use relevant keywords for SEO'
]
</script>

<template>
  <div :class="['min-h-screen py-24 relative overflow-hidden', guideBackground]">
    <!-- Background Elements -->
    <div v-if="!themeStore.isLightMode" class="absolute inset-0">
      <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.03)_50%,transparent_100%)] opacity-20"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(59,130,246,0.02)_50%,transparent_100%)] opacity-15"></div>
      
      <!-- Floating Particles -->
      <div class="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
      <div class="absolute top-40 right-32 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div class="absolute bottom-32 left-1/4 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-pulse delay-2000"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Header -->
      <div class="text-center mb-20">
        <h1 
          class="text-5xl md:text-7xl font-bold mb-6"
          :class="themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'"
          v-motion="'slide-visible-once-bottom'"
        >
          Seller
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
            >Guide</span
          >
        </h1>
        <p 
          class="text-xl max-w-3xl mx-auto leading-relaxed"
          :class="themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300'"
          v-motion="'slide-visible-once-bottom'"
          :motion-delay="200"
        >
          Everything you need to know to start selling on Zig and grow your creative business
        </p>
      </div>

      <!-- Guide Steps -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <div
          v-for="(step, index) in guideSteps"
          :key="index"
          class="group text-center"
          v-motion="'slide-visible-once-bottom'"
          :motion-delay="index * 200"
        >
          <div class="relative mb-8">
            <div class="w-24 h-24 mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300">
              <div
                class="absolute inset-0 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-full blur-xl"
                :class="step.color"
              ></div>
              <div
                class="relative w-full h-full bg-gradient-to-r rounded-full flex items-center justify-center shadow-2xl"
                :class="step.color"
              >
                <svg
                  class="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="step.icon"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h3
            class="text-2xl font-bold mb-4 transition-colors duration-300"
            :class="themeStore.isLightMode 
              ? 'text-slate-800 group-hover:text-slate-900' 
              : 'text-slate-100 group-hover:text-slate-50'"
          >
            {{ step.title }}
          </h3>
          <p
            class="leading-relaxed transition-colors duration-300"
            :class="themeStore.isLightMode 
              ? 'text-slate-600 group-hover:text-slate-700' 
              : 'text-slate-300 group-hover:text-slate-200'"
          >
            {{ step.description }}
          </p>
        </div>
      </div>

      <!-- Tips Section -->
      <div class="max-w-4xl mx-auto">
        <h2 
          class="text-3xl md:text-5xl font-bold text-center mb-12"
          :class="themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'"
          v-motion="'slide-visible-once-bottom'"
        >
          Pro Tips for Success
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(tip, index) in tips"
            :key="index"
            class="group p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
            :class="themeStore.isLightMode 
              ? 'bg-white/70 hover:bg-white/90 shadow-lg hover:shadow-xl' 
              : 'bg-slate-800/70 hover:bg-slate-800/90 shadow-lg hover:shadow-xl'"
            v-motion="'slide-visible-once-bottom'"
            :motion-delay="index * 100"
          >
            <div class="flex items-start space-x-4">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p 
                class="text-lg font-medium"
                :class="themeStore.isLightMode 
                  ? 'text-slate-800 group-hover:text-slate-900' 
                  : 'text-slate-100 group-hover:text-slate-50'"
              >
                {{ tip }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-20">
        <router-link
          to="/register"
          class="inline-block group px-12 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-cyan-600"
        >
          <span class="relative z-10">Start Selling Now</span>
        </router-link>
        <p 
          class="mt-6 text-lg"
          :class="themeStore.isLightMode ? 'text-slate-600' : 'text-slate-400'"
        >
          Ready to turn your creativity into profit?
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* VueUse Motion handles all animations */
</style>
