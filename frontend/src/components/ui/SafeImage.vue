<template>
  <div class="safe-image-container" :class="containerClass">
    <img
      v-if="!hasError && imageSrc"
      :src="imageSrc"
      :alt="alt"
      :class="imageClass"
      @error="handleImageError"
      @load="handleImageLoad"
      @click="$emit('click', $event)"
    />
    
    <!-- Fallback SVG when image fails to load -->
    <div
      v-else
      class="fallback-container"
      :class="fallbackClass"
      @click="$emit('click', $event)"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="fallback-svg"
      >
        <rect width="200" height="200" rx="20" fill="#1E40AF"/>
        <circle cx="100" cy="80" r="25" fill="#FBBF24"/>
        <path d="M60 120 Q100 100 140 120" stroke="#FBBF24" stroke-width="8" stroke-linecap="round"/>
        <text x="100" y="170" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">WebProSHub</text>
      </svg>
    </div>
    
    <!-- Loading skeleton -->
    <div
      v-if="isLoading"
      class="loading-skeleton"
      :class="skeletonClass"
    >
      <div class="skeleton-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useImageFallback, type UseImageFallbackOptions } from '@/composables/useImageFallback'

interface Props extends UseImageFallbackOptions {
  src: string
  width?: string | number
  height?: string | number
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  borderRadius?: string
}

interface Emits {
  (e: 'click', event: MouseEvent): void
  (e: 'error'): void
  (e: 'load'): void
}

const props = withDefaults(defineProps<Props>(), {
  objectFit: 'cover',
  borderRadius: '0',
  width: 'auto',
  height: 'auto'
})

const emit = defineEmits<Emits>()

const {
  imageSrc,
  hasError,
  isLoading,
  handleImageError,
  handleImageLoad,
  setImageSrc,
  reset
} = useImageFallback({
  fallbackSrc: props.fallbackSrc,
  alt: props.alt,
  className: props.className
})

// Watch for src changes
watch(() => props.src, (newSrc) => {
  if (newSrc !== imageSrc.value) {
    setImageSrc(newSrc)
  }
}, { immediate: true })

// Computed classes
const containerClass = computed(() => ({
  'safe-image-container': true,
  'has-error': hasError.value,
  'is-loading': isLoading.value
}))

const imageClass = computed(() => ({
  'safe-image': true,
  [`object-${props.objectFit}`]: true
}))

const fallbackClass = computed(() => ({
  'fallback-container': true,
  'custom-fallback': !!props.fallbackSrc
}))

const skeletonClass = computed(() => ({
  'loading-skeleton': true,
  'custom-skeleton': !!props.className
}))

// Enhanced error handling
const handleImageErrorWithEmit = () => {
  handleImageError()
  emit('error')
}

// Enhanced load handling
const handleImageLoadWithEmit = () => {
  handleImageLoad()
  emit('load')
}

// Expose methods for external use
defineExpose({
  reset,
  setImageSrc,
  hasError,
  isLoading
})
</script>

<style scoped>
.safe-image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.safe-image {
  display: block;
  max-width: 100%;
  height: auto;
}

.safe-image.object-cover {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.safe-image.object-contain {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.safe-image.object-fill {
  object-fit: fill;
  width: 100%;
  height: 100%;
}

.safe-image.object-none {
  object-fit: none;
  width: 100%;
  height: 100%;
}

.safe-image.object-scale-down {
  object-fit: scale-down;
  width: 100%;
  height: 100%;
}

.fallback-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: v-bind(borderRadius);
  /* min-height: 100px;
  min-width: 100px; */
  width: 100%;
  height: 100%;
}

.fallback-svg {
  max-width: 80%;
  max-height: 80%;
}

.loading-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: v-bind(borderRadius);
}

.skeleton-content {
  width: 100%;
  height: 100%;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .fallback-container {
    min-height: 80px;
    min-width: 80px;
  }
}
</style>
