<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import SafeImage from '@/components/ui/SafeImage.vue'

const router = useRouter()
const themeStore = useThemeStore()

// Props
interface Props {
  featuredCategories: Array<{
    id: number
    name: string
    icon: string
    productCount: number
    description: string
  }>
  loading: boolean
}

const props = defineProps<Props>()

// Theme-aware computed properties
const categoriesBackground = computed(() => {
  return themeStore.isLightMode 
    ? 'bg-gradient-to-br from-slate-100 via-purple-50 to-cyan-50'
    : 'bg-gradient-to-b from-slate-800 to-zinc-900'
})

// Methods
const navigateToCategory = (categoryId: number) => {
  router.push(`/marketplace?mainCategory=${categoryId}`)
}
</script>

<template>
  <!-- Featured Categories with Hover Effects -->
  <div :class="['py-24 relative overflow-hidden', categoriesBackground]">
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2
          :class="[
            'text-4xl md:text-6xl font-bold mb-6',
            themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100'
          ]"
          v-motion="'slide-visible-once-bottom'"
        >
          Shop by
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600"
            >Category</span
          >
        </h2>
        <p :class="['text-xl max-w-3xl mx-auto', themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300']">
          Explore our curated collection of product categories, each designed to enhance your
          shopping experience
        </p>
      </div>

      <!-- Loading state for categories -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="i in 4"
          :key="i"
          class="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center animate-pulse"
        >
          <div class="w-20 h-20 bg-slate-200 rounded-2xl mx-auto mb-6"></div>
          <div class="h-6 bg-slate-200 rounded mb-3"></div>
          <div class="h-4 bg-slate-200 rounded"></div>
        </div>
      </div>

      <!-- Real categories from database -->
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(category, index) in featuredCategories"
          :key="category.id"
          :class="[
            'group backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center cursor-pointer transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl',
            themeStore.isLightMode 
              ? 'bg-white/70 hover:bg-white/90' 
              : 'bg-slate-800/70 hover:bg-slate-800/90'
          ]"
          v-motion="'slide-visible-once-bottom'"
          :motion-delay="index * 150"
          @click="navigateToCategory(category.id)"
        >
          <div class="relative mb-6">
            <div
              class="w-20 h-20 mx-auto group-hover:scale-110 transition-transform duration-300"
            >
              <SafeImage
                :src="category.icon"
                :alt="category.name"
                class="w-full h-full rounded-2xl object-cover shadow-lg"
                fallback="/zig-logo.svg"
              />
            </div>
            <div
              class="absolute -inset-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
            ></div>
          </div>
          <h3
            :class="[
              'text-xl font-bold mb-3 transition-colors duration-300',
              themeStore.isLightMode 
                ? 'text-slate-800 group-hover:text-slate-900' 
                : 'text-slate-100 group-hover:text-slate-50'
            ]"
          >
            {{ category.name }}
          </h3>
          <p :class="[
            'transition-colors duration-300',
            themeStore.isLightMode 
              ? 'text-slate-600 group-hover:text-slate-700' 
              : 'text-slate-300 group-hover:text-slate-200'
          ]">
            {{ category.productCount }} products
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* VueUse Motion handles all animations */
</style>
