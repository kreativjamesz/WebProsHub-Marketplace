<template>
  <div class="lg:hidden pb-4 mobile-search-universe">
    <!-- Cosmic Background Elements -->
    <div class="mobile-search-cosmic-bg">
      <div class="mobile-search-star"></div>
      <div class="mobile-search-nebula"></div>
    </div>
    
    <div class="relative z-10">
      <input
        :value="modelValue"
        type="text"
        placeholder="Search for products, stores, or categories..."
        class="mobile-search-input"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keyup.enter="$emit('search')"
        aria-label="Search for products, stores, or categories"
      />
      <div class="mobile-search-icon">
        <SearchIcon class="h-5 w-5 text-universe-primary" />
      </div>
      
      <!-- Glow Effect for Search Input -->
      <div class="mobile-search-glow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'

interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
/* Mobile Search Universe Theme Styles */
.mobile-search-universe {
  position: relative;
  overflow: hidden;
  padding: 1rem;
}

/* Mobile Search Cosmic Background */
.mobile-search-cosmic-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

/* Mobile Search Star */
.mobile-search-star {
  position: absolute;
  top: 20%;
  right: 15%;
  width: 2px;
  height: 2px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 0.6;
  animation: mobile-search-twinkle 4s ease-in-out infinite;
}

@keyframes mobile-search-twinkle {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.4);
    filter: brightness(1.5);
  }
}

/* Mobile Search Nebula */
.mobile-search-nebula {
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
  background: radial-gradient(
    ellipse at center,
    rgba(147, 51, 234, 0.04) 0%,
    rgba(79, 70, 229, 0.02) 40%,
    rgba(236, 72, 153, 0.01) 70%,
    transparent 100%
  );
  animation: mobile-search-nebula-float 15s ease-in-out infinite;
}

@keyframes mobile-search-nebula-float {
  0%, 100% { 
    transform: rotate(0deg) scale(1) translateY(0px); 
  }
  50% { 
    transform: rotate(45deg) scale(1.02) translateY(-3px); 
  }
}

/* Mobile Search Input */
.mobile-search-input {
  @apply w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(147, 51, 234, 0.3);
  color: #ffffff;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  font-size: 1rem;
}

.mobile-search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.mobile-search-input:focus {
  outline: none;
  border-color: rgba(147, 51, 234, 0.6);
  box-shadow: 
    0 0 0 3px rgba(147, 51, 234, 0.1),
    0 8px 25px rgba(147, 51, 234, 0.2);
  background: rgba(255, 255, 255, 0.08);
}

.mobile-search-input:hover {
  border-color: rgba(147, 51, 234, 0.5);
  background: rgba(255, 255, 255, 0.06);
}

/* Mobile Search Icon */
.mobile-search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  z-index: 2;
  transition: all 0.3s ease;
}

.mobile-search-input:focus + .mobile-search-icon {
  transform: translateY(-50%) scale(1.1);
}

/* Mobile Search Glow */
.mobile-search-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(147, 51, 234, 0.1) 0%,
    rgba(79, 70, 229, 0.05) 50%,
    rgba(236, 72, 153, 0.03) 100%
  );
  border-radius: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
}

.mobile-search-input:focus ~ .mobile-search-glow {
  opacity: 1;
}

/* Dark Mode Enhancements */
.dark .mobile-search-input {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(168, 85, 247, 0.4);
}

.dark .mobile-search-input:focus {
  border-color: rgba(168, 85, 247, 0.7);
  box-shadow: 
    0 0 0 3px rgba(168, 85, 247, 0.15),
    0 8px 25px rgba(168, 85, 247, 0.25);
}

.dark .mobile-search-input:hover {
  border-color: rgba(168, 85, 247, 0.6);
}

/* Smooth transitions */
.mobile-search-universe,
.mobile-search-universe * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for accessibility */
.mobile-search-input:focus-visible {
  outline: 2px solid rgba(147, 51, 234, 0.6);
  outline-offset: 2px;
}
</style>
