<template>
  <div class="mb-12">
    <!-- Section Header -->
    <div class="mb-8">
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
          <component :is="getMainCategoryIcon(mainCategory.name)" class="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 class="text-3xl font-bold text-foreground">{{ mainCategory.name }}</h2>
          <p class="text-muted-foreground">{{ mainCategory.description }}</p>
        </div>
      </div>
      
      <!-- Stats Bar -->
      <div class="flex items-center space-x-6 text-sm text-muted-foreground">
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          {{ totalProducts }} products
        </span>
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {{ totalStores }} stores
        </span>
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {{ categories.length }} categories
        </span>
      </div>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @click="handleCategoryClick"
      />
    </div>

    <!-- View All Button -->
    <div class="mt-8 text-center">
      <button
        @click="viewAllCategories"
        class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
      >
        View All {{ mainCategory.name }} Categories
        <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MainCategory, Category } from '@/types/marketplace'
import CategoryCard from './CategoryCard.vue'
import {
  HomeIcon,
  ShoppingBagIcon,
  SmartphoneIcon,
  HeartIcon,
  BookOpenIcon,
  CarIcon,
  Gamepad2Icon,
  UtensilsIcon,
  PaletteIcon,
  LeafIcon,
  WrenchIcon,
  GraduationCapIcon,
  BabyIcon,
  CameraIcon,
  MusicIcon,
  SparklesIcon
} from 'lucide-vue-next'

interface Props {
  mainCategory: MainCategory
  categories: Category[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  categoryClick: [id: number]
  viewAll: [mainCategoryId: number]
}>()

// Computed properties for stats
const totalProducts = computed(() => 
  props.categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0)
)

const totalStores = computed(() => 
  props.categories.reduce((sum, cat) => sum + (cat.storeCount || 0), 0)
)

const getMainCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  
  if (name.includes('electronics') || name.includes('gadget')) return SmartphoneIcon
  if (name.includes('fashion') || name.includes('clothing')) return ShoppingBagIcon
  if (name.includes('home') || name.includes('garden')) return HomeIcon
  if (name.includes('sports') || name.includes('fitness')) return HeartIcon
  if (name.includes('book') || name.includes('education')) return BookOpenIcon
  if (name.includes('automotive') || name.includes('car')) return CarIcon
  if (name.includes('gaming') || name.includes('toy')) return Gamepad2Icon
  if (name.includes('food') || name.includes('beverage')) return UtensilsIcon
  if (name.includes('art') || name.includes('craft')) return PaletteIcon
  if (name.includes('health') || name.includes('beauty')) return SparklesIcon
  if (name.includes('baby') || name.includes('kids')) return BabyIcon
  if (name.includes('camera') || name.includes('photo')) return CameraIcon
  if (name.includes('music') || name.includes('instrument')) return MusicIcon
  if (name.includes('outdoor') || name.includes('nature')) return LeafIcon
  if (name.includes('tools') || name.includes('hardware')) return WrenchIcon
  if (name.includes('professional') || name.includes('business')) return GraduationCapIcon
  
  return SparklesIcon
}

const handleCategoryClick = (categoryId: number) => {
  emit('categoryClick', categoryId)
}

const viewAllCategories = () => {
  emit('viewAll', props.mainCategory.id)
}
</script>
