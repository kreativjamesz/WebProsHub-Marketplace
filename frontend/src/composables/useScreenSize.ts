import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

/**
 * Composable for detecting screen sizes and device types
 * Uses Tailwind CSS breakpoints as reference
 */
export function useScreenSize() {
  // Breakpoint queries
  const isMobile = useMediaQuery('(max-width: 767px)')        // < 768px
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')  // 768px - 1023px
  const isDesktop = useMediaQuery('(min-width: 1024px)')      // >= 1024px
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)') // >= 1280px
  const isXLargeDesktop = useMediaQuery('(min-width: 1536px)') // >= 1536px

  // Specific breakpoint checks
  const isSmallMobile = useMediaQuery('(max-width: 639px)')   // < 640px
  const isMediumMobile = useMediaQuery('(min-width: 640px) and (max-width: 767px)') // 640px - 767px

  // Computed device type
  const deviceType = computed(() => {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    if (isDesktop.value) return 'desktop'
    return 'unknown'
  })

  // Computed screen size category
  const screenSize = computed(() => {
    if (isSmallMobile.value) return 'xs'
    if (isMediumMobile.value) return 'sm'
    if (isTablet.value) return 'md'
    if (isDesktop.value && !isLargeDesktop.value) return 'lg'
    if (isLargeDesktop.value && !isXLargeDesktop.value) return 'xl'
    if (isXLargeDesktop.value) return '2xl'
    return 'unknown'
  })

  // Helper functions
  const isAtLeast = (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
    switch (breakpoint) {
      case 'sm': return !isSmallMobile.value
      case 'md': return !isMobile.value
      case 'lg': return isDesktop.value
      case 'xl': return isLargeDesktop.value
      case '2xl': return isXLargeDesktop.value
      default: return false
    }
  }

  const isAtMost = (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
    switch (breakpoint) {
      case 'sm': return isSmallMobile.value || isMediumMobile.value
      case 'md': return isMobile.value || isTablet.value
      case 'lg': return isMobile.value || isTablet.value || (isDesktop.value && !isLargeDesktop.value)
      case 'xl': return isMobile.value || isTablet.value || (isDesktop.value && !isXLargeDesktop.value)
      case '2xl': return true
      default: return false
    }
  }

  return {
    // Reactive breakpoint states
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isXLargeDesktop,
    isSmallMobile,
    isMediumMobile,
    
    // Computed values
    deviceType,
    screenSize,
    
    // Helper functions
    isAtLeast,
    isAtMost
  }
}
