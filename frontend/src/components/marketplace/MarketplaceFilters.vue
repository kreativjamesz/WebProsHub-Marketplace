<template>
  <div class="lg:w-1/4">
    <div class="card sticky top-4">
      <h3 class="text-lg font-semibold mb-4">Filters</h3>

      <!-- Categories -->
      <div class="mb-6">
        <h4 class="font-medium mb-3">Categories</h4>
        <div class="space-y-2">
          <div
            v-for="category in categories"
            :key="category.id"
            class="flex items-center space-x-2 min-h-[24px]"
          >
            <Checkbox
              :id="`category-${category.id}`"
              :model-value="selectedCategories.includes(category.id)"
              @update:model-value="(checked: boolean | 'indeterminate') => toggleCategory(category.id, checked === true)"
            />
                         <label
               :for="`category-${category.id}`"
               class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
             >
               {{ category.name }}
             </label>
             <Badge v-if="getCategoryProductCount(category.id) > 0" variant="default" >
               {{ getCategoryProductCount(category.id) }}
             </Badge>
          </div>
        </div>
      </div>

      <!-- Price Range -->
      <div class="mb-6">
        <h4 class="font-medium mb-3">Price Range</h4>
        <div class="space-y-3">
          <div>
            <label class="block text-sm text-muted-foreground mb-1">Min Price</label>
            <input v-model="priceRange.min" type="number" placeholder="0" class="form-input" />
          </div>
          <div>
            <label class="block text-sm text-muted-foreground mb-1">Max Price</label>
            <input v-model="priceRange.max" type="number" placeholder="1000" class="form-input" />
          </div>
        </div>
      </div>

      <!-- Rating -->
      <div class="mb-6">
        <h4 class="font-medium mb-3">Minimum Rating</h4>
        <div class="flex items-center space-x-2">
          <input v-model="minRating" type="range" min="0" max="5" step="0.5" class="flex-1" />
          <span class="text-sm text-muted-foreground">{{ minRating }}+</span>
        </div>
      </div>

      <!-- Apply Filters -->
      <button @click="applyFilters" class="btn-primary w-full">Apply Filters</button>

      <!-- Clear Filters -->
      <button @click="clearFilters" class="btn-secondary w-full mt-2">Clear All</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { Category, Product } from '@/types/marketplace'
import { Checkbox } from '@/components/ui/checkbox'
import Badge from '../ui/badge/Badge.vue'

interface Props {
  categories: Category[]
  products: Product[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  filtersChanged: [
    filters: {
      categories: number[]
      priceRange: { min: string; max: string }
      minRating: number
    },
  ]
}>()

const selectedCategories = ref<number[]>([])
const priceRange = reactive({
  min: '',
  max: '',
})
const minRating = ref(0)

const getCategoryProductCount = (categoryId: number): number => {
  return props.products.filter(product => product.categoryId === categoryId).length
}

const toggleCategory = (categoryId: number, checked: boolean) => {
  if (checked) {
    if (!selectedCategories.value.includes(categoryId)) {
      selectedCategories.value.push(categoryId)
    }
  } else {
    selectedCategories.value = selectedCategories.value.filter((id) => id !== categoryId)
  }
}

const applyFilters = () => {
  emit('filtersChanged', {
    categories: selectedCategories.value,
    priceRange: { ...priceRange },
    minRating: minRating.value,
  })
}

const clearFilters = () => {
  selectedCategories.value = []
  priceRange.min = ''
  priceRange.max = ''
  minRating.value = 0
  applyFilters()
}

// Watch for changes and auto-apply
watch(
  [selectedCategories, priceRange, minRating],
  () => {
    applyFilters()
  },
  { deep: true },
)
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 1rem;
}
</style>
