<template>
  <div class="flex items-center">
    <router-link 
      to="/" 
      class="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 rounded-lg group"
      aria-label="Go to homepage"
    >
      <!-- Cyberpunk W Logo -->
      <div class="logo-container">
        <div class="logo-background">
          <!-- Main Cyberpunk W SVG -->
          <svg 
            class="w-8 h-8 logo-svg" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <!-- Outer glow ring -->
            <circle 
              cx="16" 
              cy="16" 
              r="15" 
              class="glow-ring"
              stroke-width="2"
            />
            
            <!-- Inner cyberpunk frame -->
            <rect 
              x="4" 
              y="4" 
              width="24" 
              height="24" 
              rx="3" 
              class="cyber-frame"
              stroke-width="1.5"
            />
            
            <!-- Main W letter with cyberpunk style -->
            <path 
              d="M8 24L12 8L16 20L20 8L24 24L22 24L20 10L16 22L12 10L10 24H8Z" 
              class="cyber-w"
            />
            
            <!-- Circuit board lines -->
            <path 
              d="M6 6L10 6M22 6L26 6M6 26L10 26M22 26L26 26" 
              class="circuit-lines"
              stroke-width="1"
            />
            
            <!-- Corner accents -->
            <path d="M6 6L8 8M26 6L24 8M6 26L8 24M26 26L24 24" class="corner-accents" stroke-width="1.5"/>
            
            <!-- Central energy core -->
            <circle cx="16" cy="16" r="3" class="energy-core"/>
            <circle cx="16" cy="16" r="1.5" class="core-inner"/>
            
            <!-- Energy particles -->
            <circle cx="16" cy="12" r="0.8" class="energy-particle particle-1"/>
            <circle cx="16" cy="20" r="0.8" class="energy-particle particle-2"/>
            <circle cx="12" cy="16" r="0.8" class="energy-particle particle-3"/>
            <circle cx="20" cy="16" r="0.8" class="energy-particle particle-4"/>
            
            <!-- Glow effects -->
            <defs>
              <!-- Main glow filter -->
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <!-- Cyberpunk gradients -->
              <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#7c3aed;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
              </linearGradient>
              
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
              </linearGradient>
              
              <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <!-- Animated energy waves -->
        <div class="energy-wave wave-1"></div>
        <div class="energy-wave wave-2"></div>
        <div class="energy-wave wave-3"></div>
        
        <!-- Floating tech particles -->
        <div class="tech-particle particle-a"></div>
        <div class="tech-particle particle-b"></div>
        <div class="tech-particle particle-c"></div>
      </div>
      
      <!-- Title Section - Only show for icon-title and icon-stacked variants -->
      <div v-if="variant !== 'icon-only'" class="title-section">
        <!-- Main Title -->
        <div class="main-title">
          <span class="title-text">WebPros</span>
          <span class="title-accent">Hub</span>
        </div>
        
        <!-- Marketplace Subtitle - Only show for icon-stacked variant -->
        <div v-if="variant === 'icon-stacked'" class="marketplace-subtitle">
          <span class="marketplace-text">Marketplace</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'icon-only' | 'icon-title' | 'icon-stacked'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'icon-title'
})

/*
  USAGE EXAMPLES:
  
  <!-- Icon only -->
  <AppLogo variant="icon-only" />
  
  <!-- Icon with title -->
  <AppLogo variant="icon-title" />
  
  <!-- Icon with title and marketplace subtitle -->
  <AppLogo variant="icon-stacked" />
  
  <!-- Default (icon-title) -->
  <AppLogo />
*/
</script>

<style lang="scss" scoped>
/* CSS Custom Properties for Theme Switching */
:root {
  --title-text-color: #ffffff; /* White text for dark theme */
  --title-accent-color: #00d4ff; /* Cyan accent for dark theme */
  --marketplace-text-color: #cbd5e1; /* Light slate for dark theme */
  --logo-bg: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  --core-inner-color: #ffffff;
}

/* Light Theme Overrides */
.light {
  --title-text-color: #1e293b; /* Dark text for light theme */
  --title-accent-color: #0891b2; /* Darker cyan for light theme */
  --marketplace-text-color: #475569; /* Dark slate for light theme */
  --logo-bg: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
  --core-inner-color: #1e293b;

  /* Light theme specific styles */
  .logo-background {
    box-shadow: 
      0 8px 32px rgba(0, 212, 255, 0.2),
      0 4px 16px rgba(124, 58, 237, 0.15),
      inset 0 1px 0 rgba(0, 0, 0, 0.05);
  }

  /* Light theme hover effects */
  .group:hover .title-text {
    color: #0f172a; /* Even darker on hover for light theme */
    filter: 
      drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))
      drop-shadow(0 4px 8px rgba(0, 212, 255, 0.3))
      drop-shadow(0 6px 12px rgba(124, 58, 237, 0.25))
      drop-shadow(0 8px 16px rgba(0, 212, 255, 0.2));
  }

  .group:hover .title-accent {
    filter: 
      drop-shadow(0 2px 4px rgba(0, 212, 255, 0.5))
      drop-shadow(0 4px 8px rgba(0, 212, 255, 0.4))
      drop-shadow(0 6px 12px rgba(124, 58, 237, 0.3))
      drop-shadow(0 8px 16px rgba(0, 212, 255, 0.25));
  }

  .group:hover .marketplace-text {
    filter: 
      drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
      drop-shadow(0 4px 8px rgba(0, 212, 255, 0.25))
      drop-shadow(0 6px 12px rgba(124, 58, 237, 0.2));
  }
}

/* Dark Theme (Default) */
.dark {
  /* Dark theme specific styles can go here if needed */
}

/* Base Logo Container */
.logo-container {
  position: relative;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    .logo-background {
      transform: scale(1.05);
      box-shadow: 
        0 12px 40px rgba(0, 212, 255, 0.4),
        0 6px 20px rgba(124, 58, 237, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .cyber-w {
      animation: cyberPulse 0.8s ease-in-out infinite;
    }

    .energy-core {
      animation: corePulse 0.6s ease-in-out infinite;
    }

    .energy-wave {
      animation-duration: 2s;
    }
  }
}

/* Logo Background */
.logo-background {
  width: 100%;
  height: 100%;
  background: var(--logo-bg);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(0, 212, 255, 0.3),
    0 4px 16px rgba(124, 58, 237, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.1) 50%, transparent 70%);
    animation: cyberShine 4s ease-in-out infinite;
  }
}

.logo-svg {
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 4px 8px rgba(0, 212, 255, 0.4));
}

/* Title Section Styling */
.title-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
}

.main-title {
  display: flex;
  align-items: baseline;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.title-text {
  font-size: 1.5rem;
  color: var(--title-text-color);
  filter: 
    drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))
    drop-shadow(0 2px 4px rgba(0, 212, 255, 0.2))
    drop-shadow(0 4px 8px rgba(124, 58, 237, 0.15));
  transition: all 0.3s ease;
}

.title-accent {
  font-size: 1.5rem;
  color: var(--title-accent-color);
  filter: 
    drop-shadow(0 1px 2px rgba(0, 212, 255, 0.4))
    drop-shadow(0 2px 4px rgba(0, 212, 255, 0.3))
    drop-shadow(0 4px 8px rgba(124, 58, 237, 0.2));
  transition: all 0.3s ease;
}

.marketplace-subtitle {
  margin-top: -0.125rem;
  opacity: 0.8;
}

.marketplace-text {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--marketplace-text-color);
  filter: 
    drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))
    drop-shadow(0 2px 4px rgba(0, 212, 255, 0.15))
    drop-shadow(0 3px 6px rgba(124, 58, 237, 0.1));
  transition: all 0.3s ease;
}

/* Hover Effects for Title */
.group:hover {
  .title-text {
    color: #f8fafc; /* Light white on hover for dark theme */
    filter: 
      drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))
      drop-shadow(0 4px 8px rgba(0, 212, 255, 0.3))
      drop-shadow(0 6px 12px rgba(124, 58, 237, 0.25))
      drop-shadow(0 8px 16px rgba(0, 212, 255, 0.2));
  }

  .title-accent {
    color: #06b6d4; /* Brighter cyan on hover */
    filter: 
      drop-shadow(0 2px 4px rgba(0, 212, 255, 0.5))
      drop-shadow(0 4px 8px rgba(0, 212, 255, 0.4))
      drop-shadow(0 6px 12px rgba(124, 58, 237, 0.3))
      drop-shadow(0 8px 16px rgba(0, 212, 255, 0.25));
  }

  .marketplace-text {
    color: #64748b; /* Brighter slate on hover */
    filter: 
      drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
      drop-shadow(0 4px 8px rgba(0, 212, 255, 0.25))
      drop-shadow(0 6px 12px rgba(124, 58, 237, 0.2));
  }
}

/* SVG Element Classes */
.glow-ring {
  stroke: url(#cyberGradient);
  filter: url(#glow);
  opacity: 0.8;
  animation: pulse 3s ease-in-out infinite;
}

.cyber-frame {
  stroke: url(#cyberGradient);
  fill: none;
  filter: url(#glow);
  animation: frameGlow 4s ease-in-out infinite;
}

.cyber-w {
  fill: url(#cyberGradient);
  filter: url(#glow);
  animation: cyberPulse 2s ease-in-out infinite;
}

.circuit-lines {
  stroke: #00d4ff;
  opacity: 0.6;
  animation: circuitFlow 3s ease-in-out infinite;
}

.corner-accents {
  stroke: #f59e0b;
  opacity: 0.8;
  animation: cornerPulse 2.5s ease-in-out infinite;
}

.energy-core {
  fill: url(#energyGradient);
  filter: url(#glow);
  animation: corePulse 1.5s ease-in-out infinite;
}

.core-inner {
  fill: var(--core-inner-color);
  animation: innerPulse 1s ease-in-out infinite;
}

.energy-particle {
  fill: #fbbf24;
  animation: particleFloat 2s ease-in-out infinite;
}

.particle-1 { animation-delay: 0s; }
.particle-2 { animation-delay: 0.5s; }
.particle-3 { animation-delay: 1s; }
.particle-4 { animation-delay: 1.5s; }

/* Energy Waves */
.energy-wave {
  position: absolute;
  border: 2px solid transparent;
  border-radius: 50%;
  opacity: 0;
}

.wave-1 {
  width: 100%;
  height: 100%;
  border-color: #00d4ff;
  animation: energyWave 3s ease-in-out infinite;
}

.wave-2 {
  width: 80%;
  height: 80%;
  border-color: #7c3aed;
  animation: energyWave 3s ease-in-out infinite 1s;
}

.wave-3 {
  width: 60%;
  height: 60%;
  border-color: #f59e0b;
  animation: energyWave 3s ease-in-out infinite 2s;
}

/* Tech Particles */
.tech-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #00d4ff;
  border-radius: 50%;
  opacity: 0;
}

.particle-a {
  top: 15%;
  left: 25%;
  animation: techFloat 4s ease-in-out infinite 0s;
}

.particle-b {
  top: 70%;
  right: 20%;
  animation: techFloat 4s ease-in-out infinite 1.5s;
}

.particle-c {
  bottom: 25%;
  left: 60%;
  animation: techFloat 4s ease-in-out infinite 3s;
}

/* Keyframe Animations */
@keyframes cyberShine {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

@keyframes frameGlow {
  0%, 100% { filter: url(#glow) brightness(1); }
  50% { filter: url(#glow) brightness(1.3); }
}

@keyframes cyberPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes circuitFlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes cornerPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes corePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes innerPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.9); opacity: 0.8; }
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
  50% { transform: translateY(-4px) scale(1.2); opacity: 1; }
}

@keyframes energyWave {
  0% { transform: scale(0.8); opacity: 0; }
  50% { opacity: 0.6; }
  100% { transform: scale(1.2); opacity: 0; }
}

@keyframes techFloat {
  0%, 100% { transform: translateY(0) scale(0); opacity: 0; }
  25% { opacity: 1; transform: translateY(-8px) scale(1); }
  75% { opacity: 0.8; transform: translateY(-12px) scale(0.8); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .logo-container {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .logo-svg {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .title-text,
  .title-accent {
    font-size: 1.25rem;
  }
  
  .marketplace-text {
    font-size: 0.625rem;
  }
}

@media (max-width: 480px) {
  .logo-container {
    width: 2rem;
    height: 2rem;
  }
  
  .logo-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .title-text,
  .title-accent {
    font-size: 1.125rem;
  }
  
  .marketplace-text {
    font-size: 0.5rem;
  }
}

/* Performance Optimizations */
* {
  will-change: transform, opacity;
}

/* Smooth transitions */
.logo-container * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
