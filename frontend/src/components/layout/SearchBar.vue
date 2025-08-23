<template>
  <div class="flex-1 max-w-lg mx-8 hidden lg:block">
    <div class="relative">
      <!-- Main Search Input with Universe Theme -->
      <div class="relative group">
        <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-universe-primary pointer-events-none transition-all duration-300 group-hover:text-universe-accent group-hover:scale-110" />
        <Input
          v-model="searchValue"
          type="text"
          placeholder="Search for products, stores, or categories..."
          class="w-full pl-10 pr-12 py-2 h-10 text-sm glass-universe border-universe-border/30 focus:border-universe-primary focus:ring-2 focus:ring-universe-primary/30 transition-all duration-300 placeholder:text-muted-foreground/70 hover:border-universe-border/50 focus:shadow-lg focus:shadow-universe-primary/20"
          @focus="showSuggestions = true"
          @keydown="handleKeydown"
          @keyup.enter="handleSearch"
          aria-label="Search for products, stores, or categories"
        />
        
        <!-- Glow Effect for Search Input -->
        <div class="absolute inset-0 rounded-md bg-gradient-to-r from-universe-primary/10 via-universe-secondary/5 to-universe-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        <!-- Clear Button with Universe Theme -->
        <button
          v-if="searchValue"
          @click="clearSearch"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-universe-primary/10 rounded-sm transition-all duration-300 hover:scale-110"
          aria-label="Clear search"
        >
          <XIcon class="h-4 w-4 text-universe-primary hover:text-universe-accent transition-colors duration-300" />
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
          class="absolute top-full left-0 right-0 mt-2 card-cosmic border-universe-border/40 shadow-2xl shadow-universe-primary/20 z-50 max-h-96 overflow-hidden backdrop-blur-xl"
        >
          <!-- Search Suggestions -->
          <div v-if="searchValue && filteredSuggestions.length > 0" class="p-3">
            <div class="text-xs font-medium text-universe-primary uppercase tracking-wider px-2 py-1 mb-3 flex items-center">
              <div class="w-2 h-2 bg-universe-primary rounded-full mr-2 animate-pulse"></div>
              Quick Search
            </div>
            <div class="space-y-2">
              <button
                v-for="suggestion in filteredSuggestions.slice(0, 5)"
                :key="suggestion.id"
                @click="selectSuggestion(suggestion)"
                class="w-full flex items-center p-3 rounded-lg hover:bg-universe-primary/10 transition-all duration-300 text-left group border border-transparent hover:border-universe-border/30 hover:shadow-lg hover:shadow-universe-primary/20"
              >
                <div class="p-2 rounded-full bg-universe-primary/10 group-hover:bg-universe-primary/20 transition-all duration-300 mr-3">
                  <component :is="suggestion.icon" class="h-4 w-4 text-universe-primary group-hover:text-universe-accent transition-all duration-300" />
                </div>
                <div class="flex-1">
                  <div class="font-medium text-foreground group-hover:text-universe-primary transition-colors duration-300">{{ suggestion.label }}</div>
                  <div class="text-xs text-muted-foreground group-hover:text-universe-primary/70 transition-colors duration-300">{{ suggestion.description }}</div>
                </div>
                <ArrowRightIcon class="h-4 w-4 text-universe-primary/50 group-hover:text-universe-primary group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </div>
          </div>

          <!-- Recent Searches -->
          <div v-if="recentSearches.length > 0" class="p-3 border-t border-universe-border/20">
            <div class="flex items-center justify-between mb-3">
              <div class="text-xs font-medium text-universe-secondary uppercase tracking-wider px-2 py-1 flex items-center">
                <div class="w-2 h-2 bg-universe-secondary rounded-full mr-2 animate-pulse"></div>
                Recent Searches
              </div>
              <button
                @click="clearRecentSearches"
                class="text-xs text-universe-secondary/70 hover:text-universe-secondary transition-all duration-300 hover:scale-105"
              >
                Clear All
              </button>
            </div>
            <div class="space-y-2">
              <button
                v-for="search in recentSearches.slice(0, 3)"
                :key="search"
                @click="selectRecentSearch(search)"
                class="w-full flex items-center p-3 rounded-lg hover:bg-universe-secondary/10 transition-all duration-300 text-left group border border-transparent hover:border-universe-border/30"
              >
                <div class="p-2 rounded-full bg-universe-secondary/10 group-hover:bg-universe-secondary/20 transition-all duration-300 mr-3">
                  <ClockIcon class="h-4 w-4 text-universe-secondary group-hover:text-universe-secondary/80 transition-all duration-300" />
                </div>
                <span class="flex-1 text-sm text-foreground group-hover:text-universe-secondary transition-colors duration-300">{{ search }}</span>
                <button
                  @click.stop="removeRecentSearch(search)"
                  class="opacity-0 group-hover:opacity-100 p-1 hover:bg-universe-secondary/10 rounded-sm transition-all duration-300 hover:scale-110"
                  aria-label="Remove recent search"
                >
                  <XIcon class="h-3 w-3 text-universe-secondary/70 hover:text-universe-secondary" />
                </button>
              </button>
            </div>
          </div>

          <!-- Popular Searches -->
          <div v-if="!searchValue" class="p-3 border-t border-universe-border/20">
            <div class="text-xs font-medium text-universe-accent uppercase tracking-wider px-2 py-1 mb-3 flex items-center">
              <div class="w-2 h-2 bg-universe-accent rounded-full mr-2 animate-pulse"></div>
              Popular Searches
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in popularTags"
                :key="tag"
                @click="selectPopularTag(tag)"
                class="px-3 py-1 text-xs glass-universe hover:bg-universe-accent/20 hover:text-universe-accent text-muted-foreground rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-universe-accent/20 border border-universe-border/20 hover:border-universe-accent/40"
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

// Reactive State
const searchValue = ref('')
const showSuggestions = ref(false)
const recentSearches = ref<string[]>([])

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
    description: 'Browse electronics category',
    icon: FolderIcon,
    type: 'category',
    path: '/category/electronics'
  },
  {
    id: '4',
    label: 'Gaming Accessories',
    description: 'Gaming gear and accessories',
    icon: TagIcon,
    type: 'product',
    path: '/search?q=gaming+accessories'
  }
] as const

// Computed
const filteredSuggestions = computed((): readonly SearchSuggestion[] => {
  if (!searchValue.value) return []
  
  const query = searchValue.value.toLowerCase()
  return SEARCH_SUGGESTIONS.filter(suggestion =>
    suggestion.label.toLowerCase().includes(query) ||
    suggestion.description.toLowerCase().includes(query)
  )
})

const popularTags = computed(() => POPULAR_TAGS)

// Watchers
watch(searchValue, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.modelValue, (newValue) => {
  if (searchValue.value !== newValue) {
    searchValue.value = newValue
  }
}, { immediate: true })

// Methods
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    showSuggestions.value = false
  }
}

const handleSearch = (): void => {
  if (searchValue.value.trim()) {
    addToRecentSearches(searchValue.value)
    emit('search')
    showSuggestions.value = false
  }
}

const selectSuggestion = (suggestion: SearchSuggestion): void => {
  searchValue.value = suggestion.label
  addToRecentSearches(suggestion.label)
  showSuggestions.value = false
  // TODO: Navigate to suggestion path when router is available
  // router.push(suggestion.path)
}

const selectRecentSearch = (search: string): void => {
  searchValue.value = search
  emit('search')
  showSuggestions.value = false
}

const selectPopularTag = (tag: string): void => {
  searchValue.value = tag
  emit('search')
  showSuggestions.value = false
}

const clearSearch = (): void => {
  searchValue.value = ''
  showSuggestions.value = false
}

const addToRecentSearches = (search: string): void => {
  const trimmedSearch = search.trim()
  if (!trimmedSearch) return
  
  // Remove if already exists and add to beginning
  const filtered = recentSearches.value.filter(s => s !== trimmedSearch)
  recentSearches.value = [trimmedSearch, ...filtered].slice(0, 5)
  
  // Persist to localStorage
  persistRecentSearches()
}

const removeRecentSearch = (search: string): void => {
  recentSearches.value = recentSearches.value.filter(s => s !== search)
  persistRecentSearches()
}

const clearRecentSearches = (): void => {
  recentSearches.value = []
  localStorage.removeItem('recentSearches')
}

const persistRecentSearches = (): void => {
  try {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
  } catch (error) {
    console.warn('Failed to persist recent searches:', error)
  }
}

const loadRecentSearches = (): void => {
  try {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        recentSearches.value = parsed.slice(0, 5)
      }
    }
  } catch (error) {
    console.warn('Failed to load recent searches:', error)
  }
}

const handleClickOutside = (event: Event): void => {
  const target = event.target as HTMLElement
  if (!target.closest('.search-bar')) {
    showSuggestions.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadRecentSearches()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Custom scrollbar for suggestions */
:deep(.search-suggestions) {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted)) transparent;
}

:deep(.search-suggestions::-webkit-scrollbar) {
  width: 6px;
}

:deep(.search-suggestions::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.search-suggestions::-webkit-scrollbar-thumb) {
  background: hsl(var(--muted));
  border-radius: 3px;
}

/* Smooth animations */
.search-bar {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus ring animation */
:deep(.search-input:focus) {
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
}
</style>
