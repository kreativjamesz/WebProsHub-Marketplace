<template>
  <button
    @click="$emit('toggle')"
    class="mobile-menu-button-universe md:hidden p-2 transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-universe-primary/50 focus-visible:ring-offset-2"
    :class="[
      isActive 
        ? 'bg-universe-accent/20 text-universe-accent border border-universe-accent/30 shadow-lg shadow-universe-accent/20' 
        : 'glass-universe text-universe-primary hover:text-universe-accent border border-universe-border/30 hover:border-universe-primary/50 hover:bg-universe-primary/10'
    ]"
    :aria-expanded="isActive"
    aria-label="Toggle mobile menu"
  >
    <div class="relative">
      <MenuIcon 
        v-if="!isActive"
        class="w-6 h-6 transition-all duration-300" 
      />
      <XIcon 
        v-else
        class="w-6 h-6 transition-all duration-300" 
      />
      
      <!-- Animated glow effect when active -->
      <div 
        v-if="isActive"
        class="absolute inset-0 w-6 h-6 bg-universe-accent/30 rounded-full blur-md animate-pulse"
      ></div>
      
      <!-- Hover glow effect -->
      <div class="absolute inset-0 w-6 h-6 bg-universe-primary/20 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { MenuIcon, XIcon } from 'lucide-vue-next'

interface Props {
  isActive: boolean
}

interface Emits {
  (e: 'toggle'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
/* Mobile Menu Button Universe Theme Styles */
.mobile-menu-button-universe {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.mobile-menu-button-universe::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(147, 51, 234, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.mobile-menu-button-universe:hover::before {
  left: 100%;
}

/* Active state animations */
.mobile-menu-button-universe:active {
  transform: scale(0.95);
}

/* Hover state animations */
.mobile-menu-button-universe:hover {
  transform: scale(1.05);
}

/* Focus state enhancements */
.mobile-menu-button-universe:focus-visible {
  outline: 2px solid rgba(147, 51, 234, 0.6);
  outline-offset: 2px;
}

/* Dark mode enhancements */
.dark .mobile-menu-button-universe {
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

/* Smooth transitions */
.mobile-menu-button-universe,
.mobile-menu-button-universe * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
