<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Props for customization
interface Props {
  showLabel?: boolean
  variant?: 'default' | 'compact'
}

const props = withDefaults(defineProps<Props>(), {
  showLabel: true,
  variant: 'default'
})

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()

// Computed properties
const currentModeIcon = computed(() => {
  switch (mode.value) {
    case 'light': return 'radix-icons:sun'
    case 'dark': return 'radix-icons:moon'
    case 'auto': return 'radix-icons:gear'
    default: return 'radix-icons:moon'
  }
})

const currentModeLabel = computed(() => {
  switch (mode.value) {
    case 'light': return 'Light'
    case 'dark': return 'Dark'
    case 'auto': return 'System'
    default: return 'System'
  }
})

const currentModeColor = computed(() => {
  switch (mode.value) {
    case 'light': return 'text-yellow-400'
    case 'dark': return 'text-blue-400'
    case 'auto': return 'text-purple-400'
    default: return 'text-purple-400'
  }
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button 
        :variant="variant === 'compact' ? 'ghost' : 'outline'"
        :class="[
          'group relative transition-all duration-300',
          variant === 'default' 
            ? 'bg-gradient-to-r from-blue-950/80 via-purple-950/80 to-purple-900/80 border border-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/30 text-white backdrop-blur-xl px-4 py-2 rounded-xl'
            : 'bg-transparent border-0 text-purple-300 hover:text-purple-200 p-2 rounded-lg'
        ]"
      >
        <!-- Icon Container -->
        <div 
          :class="[
            'flex items-center justify-center transition-all duration-300',
            variant === 'default' 
              ? 'w-8 h-8 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-lg border border-purple-400/30 group-hover:scale-110 group-hover:border-purple-400/50'
              : 'w-6 h-6'
          ]"
        >
          <Icon 
            :icon="currentModeIcon" 
            :class="[
              'transition-all duration-300',
              variant === 'default' 
                ? `w-5 h-5 ${currentModeColor}`
                : `w-5 h-5 ${currentModeColor}`
            ]" 
          />
        </div>
        
        <!-- Label (only show if showLabel is true and variant is default) -->
        <span 
          v-if="showLabel && variant === 'default'" 
          class="ml-3 font-medium text-purple-200 group-hover:text-white transition-colors duration-300"
        >
          {{ currentModeLabel }}
        </span>
        
        <!-- Dropdown Arrow (only show if variant is default) -->
        <svg
          v-if="variant === 'default'"
          class="ml-2 w-4 h-4 text-purple-300 group-hover:text-purple-200 transition-colors duration-300"
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
      class="bg-gradient-to-br from-blue-950/95 via-purple-950/95 to-purple-900/95 border border-purple-500/30 rounded-2xl shadow-2xl backdrop-blur-xl py-2 min-w-[160px]"
    >
      <!-- Light Mode -->
      <DropdownMenuItem 
        @click="mode = 'light'"
        :class="[
          'group flex items-center px-4 py-3 text-sm transition-all duration-300 cursor-pointer',
          mode === 'light'
            ? 'bg-yellow-500/20 text-yellow-200 border-l-4 border-yellow-400'
            : 'text-purple-200 hover:bg-yellow-500/20 hover:text-yellow-200 hover:border-l-4 hover:border-yellow-400/50'
        ]"
      >
        <div class="w-6 h-6 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-lg flex items-center justify-center mr-3 border border-yellow-400/30 group-hover:scale-110 transition-transform duration-300">
          <Icon icon="radix-icons:sun" class="w-4 h-4 text-yellow-300" />
        </div>
        <span class="font-medium">Light</span>
        <div v-if="mode === 'light'" class="ml-auto w-2 h-2 bg-yellow-400 rounded-full"></div>
      </DropdownMenuItem>
      
      <!-- Dark Mode -->
      <DropdownMenuItem 
        @click="mode = 'dark'"
        :class="[
          'group flex items-center px-4 py-3 text-sm transition-all duration-300 cursor-pointer',
          mode === 'dark'
            ? 'bg-blue-500/20 text-blue-200 border-l-4 border-blue-400'
            : 'text-purple-200 hover:bg-blue-500/20 hover:text-blue-200 hover:border-l-4 hover:border-blue-400/50'
        ]"
      >
        <div class="w-6 h-6 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center mr-3 border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
          <Icon icon="radix-icons:moon" class="w-4 h-4 text-blue-300" />
        </div>
        <span class="font-medium">Dark</span>
        <div v-if="mode === 'dark'" class="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
      </DropdownMenuItem>
      
      <!-- System Mode -->
      <DropdownMenuItem 
        @click="mode = 'auto'"
        :class="[
          'group flex items-center px-4 py-3 text-sm transition-all duration-300 cursor-pointer',
          mode === 'auto'
            ? 'bg-purple-500/20 text-purple-200 border-l-4 border-purple-400'
            : 'text-purple-200 hover:bg-purple-500/20 hover:text-purple-200 hover:border-l-4 hover:border-purple-400/50'
        ]"
      >
        <div class="w-6 h-6 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg flex items-center justify-center mr-3 border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
          <Icon icon="radix-icons:gear" class="w-4 h-4 text-purple-300" />
        </div>
        <span class="font-medium">System</span>
        <div v-if="mode === 'auto'" class="ml-auto w-2 h-2 bg-purple-400 rounded-full"></div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>