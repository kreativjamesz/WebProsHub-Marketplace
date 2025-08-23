<template>
  <div
    class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/80 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer transform hover:-translate-y-1"
    @click="$emit('click', category.id)"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <!-- Content -->
    <div class="relative p-6">
      <!-- Icon Container -->
      <div class="w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/25">
        <component :is="getCategoryIcon(category.name)" class="w-8 h-8 text-primary-foreground" />
      </div>

      <!-- Category Info -->
      <div class="mb-4">
        <h3 class="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {{ category.name }}
        </h3>
        <p class="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {{ category.description }}
        </p>
      </div>

      <!-- Stats -->
      <div class="flex items-center justify-between text-sm mb-4">
        <div class="flex items-center space-x-4">
          <span class="flex items-center text-muted-foreground">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            {{ category.productCount || 0 }}
          </span>
          <span class="flex items-center text-muted-foreground">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {{ category.storeCount || 0 }}
          </span>
        </div>
        
        <!-- Arrow Indicator -->
        <div class="w-8 h-8 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
          <svg class="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Subcategories Preview -->
      <div v-if="category.subcategories && category.subcategories.length > 0" class="pt-4 border-t border-border/30">
        <p class="text-xs text-muted-foreground mb-2 font-medium">Subcategories:</p>
        <div class="flex flex-wrap gap-1">
          <span
            v-for="subcategory in category.subcategories.slice(0, 3)"
            :key="subcategory.id"
            class="px-2 py-1 bg-gradient-to-r from-primary/10 to-primary/20 text-primary text-xs rounded-full font-medium"
          >
            {{ subcategory.name }}
          </span>
          <span 
            v-if="category.subcategories.length > 3" 
            class="px-2 py-1 bg-gradient-to-r from-muted to-muted/80 text-muted-foreground text-xs rounded-full"
          >
            +{{ category.subcategories.length - 3 }} more
          </span>
        </div>
      </div>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/marketplace'
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
  category: Category
}

defineProps<Props>()
defineEmits<{
  click: [id: number]
}>()

const getCategoryIcon = (categoryName: string) => {
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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
