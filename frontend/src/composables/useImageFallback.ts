import { ref, onMounted } from 'vue'

export interface UseImageFallbackOptions {
  fallbackSrc?: string
  alt?: string
  className?: string
}

export function useImageFallback(options: UseImageFallbackOptions = {}) {
  const { fallbackSrc, alt = 'Image', className = '' } = options
  
  const imageSrc = ref<string>('')
  const hasError = ref(false)
  const isLoading = ref(true)
  
  // Default WebProSHub logo SVG as fallback
  const defaultFallbackSvg = `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="20" fill="#1E40AF"/>
      <circle cx="100" cy="80" r="25" fill="#FBBF24"/>
      <path d="M60 120 Q100 100 140 120" stroke="#FBBF24" stroke-width="8" stroke-linecap="round"/>
      <text x="100" y="170" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">WebProSHub</text>
    </svg>
  `)}`
  
  const handleImageError = () => {
    hasError.value = true
    isLoading.value = false
    imageSrc.value = fallbackSrc || defaultFallbackSvg
  }
  
  const handleImageLoad = () => {
    hasError.value = false
    isLoading.value = false
  }
  
  const setImageSrc = (src: string) => {
    if (!src) {
      handleImageError()
      return
    }
    
    imageSrc.value = src
    isLoading.value = true
    hasError.value = false
  }
  
  const reset = () => {
    imageSrc.value = ''
    hasError.value = false
    isLoading.value = true
  }
  
  return {
    imageSrc,
    hasError,
    isLoading,
    handleImageError,
    handleImageLoad,
    setImageSrc,
    reset
  }
}
