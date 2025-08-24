import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  shadow: string
}

export const useThemeStore = defineStore('theme', () => {
  // Use VueUse's color mode for persistence and system preference detection
  const colorMode = useColorMode()
  
  // Local state
  const currentTheme = ref<ThemeMode>(colorMode.value as ThemeMode)
  const isTransitioning = ref(false)

  // Computed properties
  const isLightMode = computed(() => {
    return currentTheme.value === 'light' || 
           (currentTheme.value === 'auto' && window.matchMedia('(prefers-color-scheme: light)').matches)
  })

  const isDarkMode = computed(() => {
    return currentTheme.value === 'dark' || 
           (currentTheme.value === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  // Theme color schemes
  const lightThemeColors: ThemeColors = {
    primary: 'from-cyan-500 to-purple-600',
    secondary: 'from-slate-50 to-white',
    accent: 'from-yellow-400 to-orange-500',
    background: 'bg-white',
    surface: 'bg-slate-50',
    text: 'text-slate-800',
    textSecondary: 'text-slate-600',
    border: 'border-slate-200',
    shadow: 'shadow-lg'
  }

  const darkThemeColors: ThemeColors = {
    primary: 'from-cyan-400 to-purple-500',
    secondary: 'from-slate-900 to-slate-800',
    accent: 'from-yellow-300 to-orange-400',
    background: 'bg-slate-900',
    surface: 'bg-slate-800',
    text: 'text-slate-100',
    textSecondary: 'text-slate-300',
    border: 'border-slate-700',
    shadow: 'shadow-2xl shadow-slate-900/50'
  }

  // Get current theme colors
  const themeColors = computed(() => {
    return isLightMode.value ? lightThemeColors : darkThemeColors
  })

  // Methods
  const setTheme = async (theme: ThemeMode) => {
    if (currentTheme.value === theme) return
    
    isTransitioning.value = true
    currentTheme.value = theme
    colorMode.value = theme
    
    // Add transition class to body
    document.body.classList.add('theme-transitioning')
    
    // Wait for transition to complete
    await new Promise(resolve => setTimeout(resolve, 300))
    
    document.body.classList.remove('theme-transitioning')
    isTransitioning.value = false
  }

  const toggleTheme = () => {
    const newTheme = isLightMode.value ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // Watch for system preference changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (currentTheme.value === 'auto') {
      // Trigger reactivity by updating the computed
      currentTheme.value = currentTheme.value
    }
  })

  // Initialize theme
  const initializeTheme = () => {
    // Set initial theme class on HTML element
    const html = document.documentElement
    if (isLightMode.value) {
      html.classList.add('light')
      html.classList.remove('dark')
    } else {
      html.classList.add('dark')
      html.classList.remove('light')
    }
  }

  // Watch for theme changes and update HTML classes
  watch(currentTheme, (newTheme) => {
    const html = document.documentElement
    if (newTheme === 'light') {
      html.classList.add('light')
      html.classList.remove('dark')
    } else if (newTheme === 'dark') {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      // Auto mode - remove both classes to let CSS handle it
      html.classList.remove('light')
      html.classList.remove('dark')
    }
  }, { immediate: true })

  // Initialize on store creation
  initializeTheme()

  return {
    // State
    currentTheme,
    isTransitioning,
    
    // Computed
    isLightMode,
    isDarkMode,
    themeColors,
    
    // Methods
    setTheme,
    toggleTheme,
    initializeTheme
  }
})
