<template>
  <div class="lg:w-1/4">
    <div class="card sticky top-4 overflow-hidden">
      <!-- Cosmic Header -->
      <div
        class="relative p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"
        ></div>
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_50%)]"
        ></div>

        <div class="relative flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25"
          >
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
              />
            </svg>
          </div>
          <div>
            <h3
              class="text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent"
            >
              Cosmic Filters
            </h3>
            <p class="text-purple-200/80 text-sm">Discover your perfect products</p>
          </div>
        </div>
      </div>

      <!-- Filters Content -->
      <div class="py-6 space-y-8">
        <!-- Categories Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2 mb-4">
            <div
              class="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center"
            >
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h4 class="font-semibold text-foreground text-lg">Categories</h4>
          </div>

          <div class="space-y-0">
            <div v-for="category in categories" :key="category.id" class="group">
              <label
                :for="`category-${category.id}`"
                class="flex items-center space-x-3 w-full px-2 py-3 rounded-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-200/30 group-hover:bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_50%)] group-hover:text-blue-700"
              >
                <Checkbox
                  :id="`category-${category.id}`"
                  :model-value="selectedCategories.includes(category.id)"
                  @update:model-value="
                    (checked: boolean | 'indeterminate') =>
                      toggleCategory(category.id, checked === true)
                  "
                  class="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500 data-[state=checked]:border-0"
                />
                <span class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 transition-colors duration-200">
                  {{ category.name }}
                </span>
                
                <Badge
                  v-if="getCategoryProductCount(category.id) > 0"
                  variant="default"
                  class="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300"
                >
                  {{ getCategoryProductCount(category.id) }}
                </Badge>
              </label>
            </div>
          </div>
        </div>

        <!-- Price Range Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2 mb-4">
            <div
              class="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center"
            >
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h4 class="font-semibold text-foreground text-lg">Price Range</h4>
          </div>

          <div class="space-y-4">
            <div class="relative">
              <label class="block text-sm text-muted-foreground mb-2 font-medium">Min Price</label>
              <div class="relative">
                <input
                  v-model="priceRange.min"
                  type="number"
                  placeholder="0"
                  class="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-green-500/30 focus:border-green-500 bg-background text-foreground placeholder:text-muted-foreground transition-all duration-300 shadow-sm hover:shadow-md hover:border-green-300"
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="relative">
              <label class="block text-sm text-muted-foreground mb-2 font-medium">Max Price</label>
              <div class="relative">
                <input
                  v-model="priceRange.max"
                  type="number"
                  placeholder="1000"
                  class="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-green-500/30 focus:border-green-500 bg-background text-foreground placeholder:text-muted-foreground transition-all duration-300 shadow-sm hover:shadow-md hover:border-green-300"
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rating Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2 mb-4">
            <div
              class="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center"
            >
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h4 class="font-semibold text-foreground text-lg">Minimum Rating</h4>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-muted-foreground">{{ minRating }}+ Stars</span>
              <span class="text-lg font-bold text-foreground">{{ minRating }}</span>
            </div>

            <div class="relative">
              <input
                v-model="minRating"
                type="range"
                min="0"
                max="5"
                step="0.5"
                class="w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg appearance-none cursor-pointer slider"
              />

              <!-- Rating Stars Display -->
              <div class="flex items-center justify-center mt-3 space-x-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="star <= minRating ? 'text-yellow-400' : 'text-muted'"
                  class="w-5 h-5 transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3 pt-4">
          <button
            @click="applyFilters"
            class="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 hover:from-purple-600 hover:via-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 active:scale-95"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                />
              </svg>
              <span>Apply Cosmic Filters</span>
            </div>
          </button>

          <button
            @click="clearFilters"
            class="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-slate-500/25 active:scale-95"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Reset All</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Cosmic Background Pattern -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none"
      ></div>
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
  return props.products.filter((product) => product.categoryId === categoryId).length
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

.card {
  background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.98) 100%);
  border: 1px solid hsl(var(--border) / 0.1);
  box-shadow:
    0 10px 25px -5px rgb(0 0 0 / 0.1),
    0 4px 6px -2px rgb(0 0 0 / 0.05);
  backdrop-filter: blur(10px);
}

/* Custom Slider Styling */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(251, 191, 36, 0.3);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(251, 191, 36, 0.4);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 8px rgba(251, 191, 36, 0.3);
  transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(251, 191, 36, 0.4);
}

/* Hover Effects */
.group:hover .bg-gradient-to-r {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));
}

/* Animated Background */
@keyframes cosmic-float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
  }
}

.cosmic-bg {
  animation: cosmic-float 20s ease-in-out infinite;
}
</style>
