<template>
  <div class="mb-6">
    <nav class="flex items-center space-x-2 text-sm text-muted-foreground">
      <router-link to="/" class="hover:text-foreground transition-colors">
        Home
      </router-link>
      <span>/</span>
      <router-link to="/marketplace" class="hover:text-foreground transition-colors">
        Marketplace
      </router-link>
      
      <!-- Main Category -->
      <span v-if="mainCategoryId" v-text="'/'"></span>
      <span v-if="mainCategoryId" class="text-foreground font-medium">
        {{ getMainCategoryName(mainCategoryId) }}
      </span>
      
      <!-- Category -->
      <span v-if="categoryId" v-text="'/'"></span>
      <span v-if="categoryId" class="text-foreground font-medium">
        {{ getCategoryName(categoryId) }}
      </span>
      
      <!-- Subcategory -->
      <span v-if="subcategoryId" v-text="'/'"></span>
      <span v-if="subcategoryId" class="text-foreground font-medium">
        {{ getSubcategoryName(subcategoryId) }}
      </span>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMarketplaceStore } from '@/stores/marketplace'

interface Props {
  mainCategoryId?: number
  categoryId?: number
  subcategoryId?: number
}

const props = defineProps<Props>()
const marketplaceStore = useMarketplaceStore()

const getMainCategoryName = (id: number) => {
  return marketplaceStore.mainCategories.find(c => c.id === id)?.name || 'Category'
}

const getCategoryName = (id: number) => {
  return marketplaceStore.categories.find(c => c.id === id)?.name || 'Subcategory'
}

const getSubcategoryName = (id: number) => {
  return marketplaceStore.subcategories.find(c => c.id === id)?.name || 'Product Type'
}
</script>
