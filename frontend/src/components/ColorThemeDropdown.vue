<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useThemeStore } from '@/stores/theme'

// Props for customization
interface Props {
  showLabel?: boolean
  variant?: 'default' | 'compact'
}

const props = withDefaults(defineProps<Props>(), {
  showLabel: true,
  variant: 'default'
})

// Use our theme store
const themeStore = useThemeStore()

// Computed properties
const currentModeIcon = computed(() => {
  switch (themeStore.currentTheme) {
    case 'light': return 'radix-icons:sun'
    case 'dark': return 'radix-icons:moon'
    case 'auto': return 'radix-icons:gear'
    default: return 'radix-icons:moon'
  }
})

const currentModeLabel = computed(() => {
  switch (themeStore.currentTheme) {
    case 'light': return 'Light'
    case 'dark': return 'Dark'
    case 'auto': return 'System'
    default: return 'System'
  }
})

const currentModeColor = computed(() => {
  switch (themeStore.currentTheme) {
    case 'light': return 'text-yellow-400'
    case 'dark': return 'text-blue-400'
    case 'auto': return 'text-purple-400'
    default: return 'text-purple-400'
  }
})

// Check if we're in light mode
const isLightMode = computed(() => themeStore.isLightMode)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button 
          :variant="variant === 'compact' ? 'ghost' : 'outline'"
          :class="[
            'group relative transition-all duration-300',
            variant === 'default'
              ? isLightMode
                ? 'bg-gradient-to-r from-white via-slate-50 to-slate-100 border border-yellow-300 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-200 text-yellow-700 px-4 py-2 rounded-xl'
                : 'bg-gradient-to-r from-blue-950 via-purple-950 to-purple-900 border border-blue-700 hover:border-purple-400 hover:shadow-lg hover:shadow-blue-900 text-blue-100 px-4 py-2 rounded-xl'
              : isLightMode
                ? 'bg-transparent border-0 text-yellow-600 hover:text-yellow-700 p-2 rounded-lg'
                : 'bg-transparent border-0 text-purple-300 hover:text-purple-200 p-2 rounded-lg'
          ]"
      >
        <!-- Icon Container -->
        <div 
            :class="[
              'flex items-center justify-center transition-all duration-300',
              variant === 'default'
                ? isLightMode
                  ? 'w-8 h-8 bg-gradient-to-r from-yellow-100/80 to-yellow-200/80 rounded-lg border border-yellow-300 group-hover:scale-110 group-hover:border-yellow-400'
                  : 'w-8 h-8 bg-gradient-to-r from-blue-900/60 to-purple-900/60 rounded-lg border border-blue-700 group-hover:scale-110 group-hover:border-purple-400'
                : isLightMode
                  ? 'w-6 h-6 bg-yellow-50'
                  : 'w-6 h-6 bg-purple-950'
            ]"
        >
          <Icon 
              :icon="currentModeIcon"
              :class="[
                'transition-all duration-300',
                variant === 'default'
                  ? isLightMode
                    ? 'w-5 h-5 text-yellow-500'
                    : 'w-5 h-5 text-blue-300'
                  : isLightMode
                    ? 'w-5 h-5 text-yellow-600'
                    : 'w-5 h-5 text-purple-300'
              ]"
          />
        </div>
        
        <!-- Label (only show if showLabel is true and variant is default) -->
        <span 
            v-if="showLabel && variant === 'default'"
            :class="[
              'ml-3 font-semibold transition-colors duration-300',
              isLightMode
                ? 'text-yellow-700 group-hover:text-yellow-900'
                : 'text-blue-100 group-hover:text-purple-100'
            ]"
        >
          {{ currentModeLabel }}
        </span>
        
        <!-- Dropdown Arrow (only show if variant is default) -->
        <svg
            v-if="variant === 'default'"
            :class="[
              'ml-2 w-4 h-4 transition-colors duration-300',
              isLightMode
                ? 'text-yellow-500 group-hover:text-yellow-700'
                : 'text-purple-300 group-hover:text-purple-200'
            ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
    </DropdownMenuTrigger>
    
    <DropdownMenuContent 
        align="end"
        :class="[
          'border rounded-2xl shadow-2xl backdrop-blur-xl py-2 min-w-[160px] transition-all duration-300',
          isLightMode
            ? 'bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-yellow-300'
            : 'bg-gradient-to-br from-blue-950 via-purple-950 to-purple-900 border-blue-700'
        ]"
    >
      <!-- Light Mode -->
      <DropdownMenuItem 
        @click="themeStore.setTheme('light')"
        :class="[
          'group flex items-center px-4 py-3 text-sm transition-all duration-300 cursor-pointer',
          themeStore.currentTheme === 'light'
            ? isLightMode
              ? 'bg-yellow-500/20 text-yellow-800 border-l-4 border-yellow-400'
              : 'bg-yellow-500/20 text-yellow-200 border-l-4 border-yellow-400'
            : isLightMode
              ? 'text-slate-700 hover:bg-yellow-500/20 hover:text-yellow-800 hover:border-l-4 hover:border-yellow-400/50'
              : 'text-purple-200 hover:bg-yellow-500/20 hover:text-yellow-200 hover:border-l-4 hover:border-yellow-400/50'
        ]"
      >
        <div :class="[
          'w-6 h-6 rounded-lg flex items-center justify-center mr-3 border transition-transform duration-300 group-hover:scale-110',
          isLightMode
            ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-400/30'
            : 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-400/30'
        ]">
          <Icon icon="radix-icons:sun" :class="[
            'w-4 h-4',
            isLightMode ? 'text-yellow-600' : 'text-yellow-300'
          ]" />
        </div>
        <span class="font-medium">Light</span>
        <div v-if="themeStore.currentTheme === 'light'" :class="[
          'ml-auto w-2 h-2 rounded-full',
          isLightMode ? 'bg-yellow-500' : 'bg-yellow-400'
        ]"></div>
      </DropdownMenuItem>
      
      <!-- Dark Mode -->
      <DropdownMenuItem 
        @click="themeStore.setTheme('dark')"
        :class="[
          'group flex items-center px-4 py-3 text-sm transition-all duration-300 cursor-pointer',
          themeStore.currentTheme === 'dark'
            ? isLightMode
              ? 'bg-blue-500/20 text-blue-800 border-l-4 border-blue-400'
              : 'bg-blue-500/20 text-blue-200 border-l-4 border-blue-400'
            : isLightMode
              ? 'text-slate-700 hover:bg-blue-500/20 hover:text-blue-800 hover:border-l-4 hover:border-blue-400/50'
              : 'text-purple-200 hover:bg-blue-500/20 hover:text-blue-200 hover:border-l-4 hover:border-blue-400/50'
        ]"
      >
        <div :class="[
          'w-6 h-6 rounded-lg flex items-center justify-center mr-3 border transition-transform duration-300 group-hover:scale-110',
          isLightMode
            ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-400/30'
            : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border-blue-400/30'
        ]">
          <Icon icon="radix-icons:moon" :class="[
            'w-4 h-4',
            isLightMode ? 'text-blue-600' : 'text-blue-300'
          ]" />
        </div>
        <span class="font-medium">Dark</span>
        <div v-if="themeStore.currentTheme === 'dark'" :class="[
          'ml-auto w-2 h-2 rounded-full',
          isLightMode ? 'bg-blue-500' : 'bg-blue-400'
        ]"></div>
      </DropdownMenuItem>
      
      <!-- System Mode -->
      <DropdownMenuItem 
        @click="themeStore.setTheme('auto')"
        :class="[
          'group flex items-center px-4 py-3 text-sm transition-all duration-300 cursor-pointer',
          themeStore.currentTheme === 'auto'
            ? isLightMode
              ? 'bg-universe-primary/20 text-universe-primary/80 border-l-4 border-universe-primary'
              : 'bg-purple-500/20 text-purple-200 border-l-4 border-purple-400'
            : isLightMode
              ? 'text-slate-700 hover:bg-universe-primary/20 hover:text-universe-primary/80 hover:border-l-4 hover:border-universe-primary/50'
              : 'text-purple-200 hover:bg-purple-500/20 hover:text-purple-200 hover:border-l-4 hover:border-purple-400/50'
        ]"
      >
        <div :class="[
          'w-6 h-6 rounded-lg flex items-center justify-center mr-3 border transition-transform duration-300 group-hover:scale-110',
          isLightMode
            ? 'bg-gradient-to-r from-universe-primary/30 to-universe-accent/30 border-universe-primary/30'
            : 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400/30'
        ]">
          <Icon icon="radix-icons:gear" :class="[
            'w-4 h-4',
            isLightMode ? 'text-universe-primary' : 'text-purple-300'
          ]" />
        </div>
        <span class="font-medium">System</span>
        <div v-if="themeStore.currentTheme === 'auto'" :class="[
          'ml-auto w-2 h-2 rounded-full',
          isLightMode ? 'bg-universe-primary' : 'bg-purple-400'
        ]"></div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>
/* Light Mode Enhancements */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Smooth transitions for theme switching */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for accessibility */
:focus-visible {
  outline: 2px solid rgba(147, 51, 234, 0.6);
  outline-offset: 2px;
  border-radius: 6px;
}

/* Light Mode Specific Hover Effects */
.light-mode .group:hover {
  transform: translateY(-1px);
}

/* Dark Mode Specific Hover Effects */
.dark .group:hover {
  transform: translateY(-1px);
}

/* Performance optimizations */
* {
  will-change: transform, opacity;
}
</style>