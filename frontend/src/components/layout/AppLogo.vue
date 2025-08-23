<template>
  <div class="flex items-center">
    <router-link 
      to="/" 
      class="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg group"
      aria-label="Go to homepage"
    >
      <!-- Lightning W Logo -->
      <div class="logo-container">
        <div class="logo-background">
          <!-- Lightning W SVG -->
          <svg 
            class="w-6 h-6 logo-svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <!-- Lightning bolt with W shape -->
            <path 
              d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
              fill="url(#lightningGradient)" 
              class="lightning-bolt"
            />
            <!-- W letter overlay -->
            <path 
              d="M7 8l2-3 2 3 2-3 2 3v2l-2 3-2-3-2 3-2-3V8z" 
              fill="url(#wGradient)" 
              class="w-letter"
            />
            <!-- Lightning glow effect -->
            <path 
              d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
              fill="none" 
              stroke="url(#glowGradient)" 
              stroke-width="0.5" 
              class="lightning-glow"
            />
          </svg>
          
          <!-- Gradients -->
          <defs>
            <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#FFA500;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FF6B35;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="wGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:#F0F0F0;stop-opacity:0.8" />
            </linearGradient>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFD700;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#FF6B35;stop-opacity:0.6" />
            </linearGradient>
          </defs>
        </div>
        
        <!-- Animated sparkles -->
        <div class="sparkle sparkle-1"></div>
        <div class="sparkle sparkle-2"></div>
        <div class="sparkle sparkle-3"></div>
      </div>
      
      <!-- Company Name -->
      <span v-if="!solo" class="text-foreground text-xl font-bold tracking-tight group-hover:text-blue-600 transition-colors duration-300">
        WebProsHub
      </span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  solo?: boolean
}>()
</script>

<style scoped>
.logo-container {
  position: relative;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-background {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
  width: 4px;
  height: 4px;
  background: #FFD700;
  border-radius: 50%;
  opacity: 0;
}

.sparkle-1 {
  top: 10%;
  left: 20%;
  animation: sparkle 2s ease-in-out infinite 0.5s;
}

.sparkle-2 {
  top: 60%;
  right: 15%;
  animation: sparkle 2s ease-in-out infinite 1s;
}

.sparkle-3 {
  bottom: 20%;
  left: 50%;
  animation: sparkle 2s ease-in-out infinite 1.5s;
}

/* Keyframe animations */
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

/* Hover effects */
.logo-container:hover .logo-background {
  transform: scale(1.05);
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.logo-container:hover .lightning-bolt {
  animation: lightning 0.5s ease-in-out infinite;
}

.logo-container:hover .sparkle {
  animation-duration: 1s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .logo-container {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .logo-svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}

@media (max-width: 480px) {
  .logo-container {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .logo-svg {
    width: 1rem;
    height: 1rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .logo-background {
    background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%);
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.3),
      0 2px 4px -1px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}
</style>
