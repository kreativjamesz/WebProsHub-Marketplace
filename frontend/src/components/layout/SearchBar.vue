<template>
  <div class="flex-1 max-w-lg mx-8 hidden lg:block">
    <div class="relative">
      <!-- Main Search Input with Universe Theme -->
      <div class="relative group" :class="{ 'light-mode': isLightMode }">
        <SearchIcon :class="[
          'absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none transition-all duration-300 group-hover:scale-110',
          isLightMode 
            ? 'text-cyan-600 group-hover:text-cyan-700' 
            : 'text-cyan-400 group-hover:text-cyan-300'
        ]" />
        <Input
          v-model="searchValue"
          type="text"
          placeholder="Search for products, stores, or categories..."
          :class="[
            'w-full pl-10 pr-12 py-2 h-10 text-sm transition-all duration-300 placeholder:text-muted-foreground/70 focus:ring-2 focus:shadow-lg',
            isLightMode
              ? 'bg-white/90 border-slate-200/50 focus:border-cyan-500 focus:ring-cyan-500/30 hover:border-slate-300/70 focus:shadow-cyan-500/20 placeholder:text-slate-500'
              : 'bg-slate-800/90 border-slate-600/50 focus:border-cyan-400 focus:ring-cyan-400/30 hover:border-slate-500/70 focus:shadow-cyan-400/20 placeholder:text-slate-400'
          ]"
          @focus="showSuggestions = true"
          @keydown="handleKeydown"
          @keyup.enter="handleSearch"
          aria-label="Search for products, stores, or categories"
        />
        
        <!-- Glow Effect for Search Input -->
        <div :class="[
          'absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
          isLightMode
            ? 'bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-cyan-500/10'
            : 'bg-gradient-to-r from-cyan-400/10 via-purple-400/5 to-cyan-400/10'
        ]"></div>
        
        <!-- Clear Button with Universe Theme -->
        <button
          v-if="searchValue"
          @click="clearSearch"
          :class="[
            'absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-sm transition-all duration-300 hover:scale-110',
            isLightMode
              ? 'hover:bg-cyan-500/15 text-cyan-600 hover:text-cyan-700'
              : 'hover:bg-cyan-400/10 text-cyan-400 hover:text-cyan-300'
          ]"
          aria-label="Clear search"
        >
          <XIcon class="h-4 w-4 transition-colors duration-300" />
        </button>
      </div>

      <!-- Search Suggestions Dropdown with Universe Theme -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-2 scale-95"
      >
        <div
          v-if="showSuggestions && (searchValue || recentSearches.length > 0)"
          :class="[
            'absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-hidden backdrop-blur-xl rounded-xl border',
            isLightMode
              ? 'bg-white/95 border-slate-200/40 shadow-2xl shadow-slate-900/10'
              : 'bg-slate-900/95 border-slate-600/40 shadow-2xl shadow-slate-900/50'
          ]"
        >
          <!-- Search Suggestions -->
          <div v-if="searchValue && filteredSuggestions.length > 0" class="p-3">
            <div :class="[
              'text-xs font-medium uppercase tracking-wider px-2 py-1 mb-3 flex items-center',
              isLightMode
                ? 'text-cyan-600'
                : 'text-cyan-400'
            ]">
              <div :class="[
                'w-2 h-2 rounded-full mr-2 animate-pulse',
                isLightMode ? 'bg-cyan-600' : 'bg-cyan-400'
              ]"></div>
              Quick Search
            </div>
            <div class="space-y-2">
              <button
                v-for="suggestion in filteredSuggestions.slice(0, 5)"
                :key="suggestion.id"
                @click="selectSuggestion(suggestion)"
                :class="[
                  'w-full flex items-center p-3 rounded-lg transition-all duration-300 text-left group border border-transparent hover:shadow-lg',
                  isLightMode
                    ? 'hover:bg-cyan-50 hover:border-cyan-200/50 hover:shadow-cyan-500/20'
                    : 'hover:bg-slate-800 hover:border-cyan-400/30 hover:shadow-cyan-400/20'
                ]"
              >
                <div :class="[
                  'p-2 rounded-full transition-all duration-300 mr-3',
                  isLightMode
                    ? 'bg-cyan-100 group-hover:bg-cyan-200'
                    : 'bg-cyan-900/50 group-hover:bg-cyan-800/50'
                ]">
                  <component :is="suggestion.icon" :class="[
                    'h-4 w-4 transition-all duration-300',
                    isLightMode
                      ? 'text-cyan-600 group-hover:text-cyan-700'
                      : 'text-cyan-400 group-hover:text-cyan-300'
                  ]" />
                </div>
                <div class="flex-1">
                  <div :class="[
                    'font-medium transition-colors duration-300',
                    isLightMode
                      ? 'text-slate-800 group-hover:text-cyan-700'
                      : 'text-slate-100 group-hover:text-cyan-300'
                  ]">{{ suggestion.label }}</div>
                  <div :class="[
                    'text-xs transition-colors duration-300',
                    isLightMode
                      ? 'text-slate-600 group-hover:text-cyan-600/70'
                      : 'text-slate-300 group-hover:text-cyan-400/70'
                  ]">{{ suggestion.description }}</div>
                </div>
                <ArrowRightIcon :class="[
                  'h-4 w-4 transition-all duration-300',
                  isLightMode
                    ? 'text-cyan-500/50 group-hover:text-cyan-600 group-hover:translate-x-1'
                    : 'text-cyan-400/50 group-hover:text-cyan-300 group-hover:translate-x-1'
                ]" />
              </button>
            </div>
          </div>

          <!-- Recent Searches -->
          <div v-if="recentSearches.length > 0" :class="[
            'p-3 border-t',
            isLightMode
              ? 'border-slate-200/20'
              : 'border-slate-600/20'
          ]">
            <div class="flex items-center justify-between mb-3">
              <div :class="[
                'text-xs font-medium uppercase tracking-wider px-2 py-1 flex items-center',
                isLightMode
                  ? 'text-purple-600'
                  : 'text-purple-400'
              ]">
                <div :class="[
                  'w-2 h-2 rounded-full mr-2 animate-pulse',
                  isLightMode ? 'bg-purple-600' : 'bg-purple-400'
                ]"></div>
                Recent Searches
              </div>
              <button
                @click="clearRecentSearches"
                :class="[
                  'text-xs transition-all duration-300 hover:scale-105',
                  isLightMode
                    ? 'text-purple-600/70 hover:text-purple-700'
                    : 'text-purple-400/70 hover:text-purple-300'
                ]"
              >
                Clear All
              </button>
            </div>
            <div class="space-y-2">
              <button
                v-for="search in recentSearches.slice(0, 3)"
                :key="search"
                @click="selectRecentSearch(search)"
                :class="[
                  'w-full flex items-center p-3 rounded-lg transition-all duration-300 text-left group border border-transparent',
                  isLightMode
                    ? 'hover:bg-purple-50 hover:border-purple-200/50'
                    : 'hover:bg-slate-800 hover:border-purple-400/30'
                ]"
              >
                <div :class="[
                  'p-2 rounded-full transition-all duration-300 mr-3',
                  isLightMode
                    ? 'bg-purple-100 group-hover:bg-purple-200'
                    : 'bg-purple-900/50 group-hover:bg-purple-800/50'
                ]">
                  <ClockIcon :class="[
                    'h-4 w-4 transition-all duration-300',
                    isLightMode
                      ? 'text-purple-600 group-hover:text-purple-700'
                      : 'text-purple-400 group-hover:text-purple-300'
                  ]" />
                </div>
                <span :class="[
                  'flex-1 text-sm transition-colors duration-300',
                  isLightMode
                    ? 'text-slate-800 group-hover:text-purple-700'
                    : 'text-slate-100 group-hover:text-purple-400'
                ]">{{ search }}</span>
                <button
                  @click.stop="removeRecentSearch(search)"
                  :class="[
                    'opacity-0 group-hover:opacity-100 p-1 rounded-sm transition-all duration-300 hover:scale-110',
                    isLightMode
                      ? 'hover:bg-purple-100'
                      : 'hover:bg-purple-900/50'
                  ]"
                  aria-label="Remove recent search"
                >
                  <XIcon :class="[
                    'h-3 w-3',
                    isLightMode
                      ? 'text-purple-600/70 hover:text-purple-700'
                      : 'text-purple-400/70 hover:text-purple-300'
                  ]" />
                </button>
              </button>
            </div>
          </div>

          <!-- Popular Searches -->
          <div v-if="!searchValue" :class="[
            'p-3 border-t',
            isLightMode
              ? 'border-slate-200/20'
              : 'border-slate-600/20'
          ]">
            <div :class="[
              'text-xs font-medium uppercase tracking-wider px-2 py-1 mb-3 flex items-center',
              isLightMode
                ? 'text-orange-600'
                : 'text-orange-400'
            ]">
              <div :class="[
                'w-2 h-2 rounded-full mr-2 animate-pulse',
                isLightMode ? 'bg-orange-600' : 'bg-orange-400'
              ]"></div>
              Popular Searches
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in popularTags"
                :key="tag"
                @click="selectPopularTag(tag)"
                :class="[
                  'px-3 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg',
                  isLightMode
                    ? 'bg-white/80 hover:bg-orange-50 hover:text-orange-700 text-slate-700 hover:shadow-orange-500/20 border border-slate-200/50 hover:border-orange-300'
                    : 'bg-slate-800/80 hover:bg-orange-900/30 hover:text-orange-300 text-slate-300 hover:shadow-orange-400/20 border border-slate-600/50 hover:border-orange-500'
                ]"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Input } from '@/components/ui/input'
import { useThemeStore } from '@/stores/theme'
import {
  SearchIcon,
  XIcon,
  ArrowRightIcon,
  ClockIcon,
  StoreIcon,
  PackageIcon,
  FolderIcon,
  TagIcon,
} from 'lucide-vue-next'

// Types
interface SearchSuggestion {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly icon: any
  readonly type: 'product' | 'store' | 'category'
  readonly path: string
}

interface Props {
  readonly modelValue: string
  readonly showMobileSearch?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
  (e: 'toggle-mobile'): void
}

// Props & Emits
const props = withDefaults(defineProps<Props>(), {
  showMobileSearch: false
})

const emit = defineEmits<Emits>()

// Theme store
const themeStore = useThemeStore()

// Reactive State
const searchValue = ref('')
const showSuggestions = ref(false)
const recentSearches = ref<string[]>([])

// Theme-aware computed properties
const isLightMode = computed(() => themeStore.isLightMode)

// Constants
const POPULAR_TAGS = [
  'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive'
] as const

const SEARCH_SUGGESTIONS: readonly SearchSuggestion[] = [
  {
    id: '1',
    label: 'iPhone 15 Pro',
    description: 'Latest smartphone from Apple',
    icon: PackageIcon,
    type: 'product',
    path: '/product/iphone-15-pro'
  },
  {
    id: '2',
    label: 'Tech Store',
    description: 'Premium electronics retailer',
    icon: StoreIcon,
    type: 'store',
    path: '/store/tech-store'
  },
  {
    id: '3',
    label: 'Electronics',
    description: 'Browse electronic products',
    icon: FolderIcon,
    type: 'category',
    path: '/category/electronics'
  },
  {
    id: '4',
    label: 'Gaming Laptop',
    description: 'High-performance gaming computers',
    icon: PackageIcon,
    type: 'product',
    path: '/product/gaming-laptop'
  },
  {
    id: '5',
    label: 'Fashion Boutique',
    description: 'Trendy clothing and accessories',
    icon: StoreIcon,
    type: 'store',
    path: '/store/fashion-boutique'
  }
]

// Computed Properties
const popularTags = computed(() => POPULAR_TAGS)

const filteredSuggestions = computed(() => {
  if (!searchValue.value) return []
  
  const query = searchValue.value.toLowerCase()
  return SEARCH_SUGGESTIONS.filter(suggestion =>
    suggestion.label.toLowerCase().includes(query) ||
    suggestion.description.toLowerCase().includes(query)
  )
})

// Methods
const handleSearch = () => {
  if (searchValue.value.trim()) {
    addToRecentSearches(searchValue.value)
    emit('search')
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    showSuggestions.value = false
  }
}

const clearSearch = () => {
  searchValue.value = ''
  showSuggestions.value = false
  emit('update:modelValue', '')
}

const selectSuggestion = (suggestion: SearchSuggestion) => {
  searchValue.value = suggestion.label
  addToRecentSearches(suggestion.label)
  showSuggestions.value = false
  emit('update:modelValue', suggestion.label)
  emit('search')
}

const selectRecentSearch = (search: string) => {
  searchValue.value = search
  emit('update:modelValue', search)
  emit('search')
}

const selectPopularTag = (tag: string) => {
  searchValue.value = tag
  addToRecentSearches(tag)
  emit('update:modelValue', tag)
  emit('search')
}

const addToRecentSearches = (search: string) => {
  const trimmedSearch = search.trim()
  if (!trimmedSearch) return
  
  // Remove if already exists
  const index = recentSearches.value.indexOf(trimmedSearch)
  if (index > -1) {
    recentSearches.value.splice(index, 1)
  }
  
  // Add to beginning
  recentSearches.value.unshift(trimmedSearch)
  
  // Keep only last 10 searches
  if (recentSearches.value.length > 10) {
    recentSearches.value = recentSearches.value.slice(0, 10)
  }
  
  // Save to localStorage
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
}

const removeRecentSearch = (search: string) => {
  const index = recentSearches.value.indexOf(search)
  if (index > -1) {
    recentSearches.value.splice(index, 1)
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
  }
}

const clearRecentSearches = () => {
  recentSearches.value = []
  localStorage.removeItem('recentSearches')
}

// Watch for external value changes
watch(() => props.modelValue, (newValue) => {
  searchValue.value = newValue
})

// Watch for search value changes
watch(searchValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// Lifecycle
onMounted(() => {
  // Load recent searches from localStorage
  const saved = localStorage.getItem('recentSearches')
  if (saved) {
    try {
      recentSearches.value = JSON.parse(saved)
    } catch (error) {
      console.error('Failed to parse recent searches:', error)
    }
  }
  
  // Close suggestions when clicking outside
  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.search-bar')) {
      showSuggestions.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  // Cleanup
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
/* Theme-aware background styles */
.glass-universe {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(6, 182, 212, 0.3);
  color: #f9fafb;
}

.card-cosmic {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(6, 182, 212, 0.4);
  border-radius: 12px;
  color: #f9fafb;
}

/* Light Mode Enhancements */
.light-mode .glass-universe-light {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.light-mode .card-cosmic-light {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 12px;
}

/* Smooth transitions for theme switching */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for accessibility */
:focus-visible {
  outline: 2px solid rgba(6, 182, 212, 0.6);
  outline-offset: 2px;
  border-radius: 6px;
}

/* Performance optimizations */
* {
  will-change: transform, opacity;
}

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(24px);
  }
}
</style>
