<template>
  <img
    :src="imageSrc"
    :alt="alt"
    :class="imageClass"
    @error="handleImageError"
    @load="handleImageLoad"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  src: string
  alt: string
  fallback?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  fallback: '/zig-logo.svg',
  class: ''
})

const hasError = ref(false)
const hasLoaded = ref(false)

const imageSrc = computed(() => {
  if (hasError.value) {
    return props.fallback
  }
  return props.src
})

const imageClass = computed(() => {
  const baseClasses = props.class
  if (!hasLoaded.value && !hasError.value) {
    return `${baseClasses} animate-pulse bg-muted`
  }
  return baseClasses
})

const handleImageError = () => {
  hasError.value = true
}

const handleImageLoad = () => {
  hasLoaded.value = true
}

// Reset error state when src changes
watch(() => props.src, () => {
  hasError.value = false
  hasLoaded.value = false
})
</script>

<style scoped>
.safe-image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8fafc;
}

.safe-image-container:hover {
  transform: translateY(-2px);
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.safe-image {
  display: block;
  max-width: 100%;
  height: auto;
  transition: all 0.3s ease;
}

.safe-image.lazy {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.safe-image.lazy.loaded {
  opacity: 1;
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

/* Modern Fallback Container */
.fallback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  gap: 1rem;
}

.fallback-container:hover {
  border-color: #94a3b8;
  background: linear-gradient(135deg, #f1f5f9 0%, #dbeafe 100%);
}

/* WebProsHub Logo Fallback */
.fallback-logo {
  position: relative;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-background {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.logo-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  animation: shine 3s ease-in-out infinite;
}

.logo-svg {
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.lightning-bolt {
  animation: lightning 2s ease-in-out infinite;
}

.w-letter {
  animation: wFloat 3s ease-in-out infinite;
}

.lightning-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Sparkle animations */
.sparkle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #FFD700;
  border-radius: 50%;
  opacity: 0;
}

.sparkle-1 {
  top: 15%;
  left: 25%;
  animation: sparkle 2s ease-in-out infinite 0.5s;
}

.sparkle-2 {
  top: 65%;
  right: 20%;
  animation: sparkle 2s ease-in-out infinite 1s;
}

.sparkle-3 {
  bottom: 25%;
  left: 55%;
  animation: sparkle 2s ease-in-out infinite 1.5s;
}

.fallback-text {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  text-align: center;
  max-width: 80%;
}

/* Enhanced Loading Skeleton */
.loading-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f8fafc;
  border-radius: 1rem;
  overflow: hidden;
}

.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

.skeleton-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-icon {
  width: 100%;
  height: 100%;
  background: #94a3b8;
  border-radius: 50%;
  opacity: 0.3;
}

/* Image Overlay */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.safe-image-container:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  text-align: center;
  padding: 1rem;
}

/* Animations */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Logo animations */
@keyframes lightning {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05) rotate(1deg);
    filter: brightness(1.2);
  }
}

@keyframes wFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1px);
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .fallback-container {
    min-height: 100px;
    min-width: 100px;
    gap: 0.75rem;
  }
  
  .fallback-logo {
    width: 3rem;
    height: 3rem;
  }
  
  .fallback-text {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .fallback-container {
    min-height: 80px;
    min-width: 80px;
    gap: 0.5rem;
  }
  
  .fallback-logo {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .logo-background {
    border-radius: 0.75rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .safe-image-container {
    background: #1e293b;
  }
  
  .fallback-container {
    background: linear-gradient(135deg, #334155 0%, #475569 100%);
    border-color: #64748b;
  }
  
  .fallback-container:hover {
    background: linear-gradient(135deg, #475569 0%, #64748b 100%);
    border-color: #94a3b8;
  }
  
  .fallback-text {
    color: #cbd5e1;
  }
  
  .logo-background {
    background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%);
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.3),
      0 2px 4px -1px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  .loading-skeleton {
    background: #334155;
  }
  
  .skeleton-placeholder {
    background: linear-gradient(135deg, #475569 0%, #64748b 100%);
  }
}
</style>
