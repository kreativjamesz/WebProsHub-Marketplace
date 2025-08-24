<template>
  <div class="mobile-menu-universe md:hidden border-t border-universe-border/30 py-4 backdrop-blur-xl">
    <!-- Cosmic Background Elements -->
    <div class="mobile-cosmic-bg">
      <div class="mobile-star mobile-star-1"></div>
      <div class="mobile-star mobile-star-2"></div>
      <div class="mobile-nebula"></div>
    </div>
    
    <div class="space-y-3 relative z-10">
      <!-- Main Navigation -->
      <div class="mobile-section">
        <h3 class="mobile-section-header">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-universe-primary rounded-full mr-3 animate-pulse"></div>
            <span class="text-sm font-semibold text-universe-primary uppercase tracking-wider">Main Navigation</span>
          </div>
        </h3>
        <div class="mobile-nav-items">
          <router-link
            v-for="item in mainNavigation"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item group"
            @click="$emit('close')"
          >
            <div class="mobile-icon-container bg-universe-primary/10 group-hover:bg-universe-primary/20">
              <component :is="item.icon" class="h-4 w-4 text-universe-primary group-hover:text-universe-accent" />
            </div>
            <span class="mobile-nav-text">{{ item.label }}</span>
            <div class="mobile-arrow">
              <ArrowRightIcon class="h-3 w-3 text-universe-primary/50 group-hover:text-universe-primary group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </router-link>
        </div>
      </div>

      <!-- Marketplace Features -->
      <div class="mobile-section">
        <h3 class="mobile-section-header">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-universe-secondary rounded-full mr-3 animate-pulse"></div>
            <span class="text-sm font-semibold text-universe-secondary uppercase tracking-wider">Marketplace</span>
          </div>
        </h3>
        <div class="mobile-nav-items">
          <router-link
            v-for="item in marketplaceFeatures"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item group"
            @click="$emit('close')"
          >
            <div class="mobile-icon-container bg-universe-secondary/10 group-hover:bg-universe-secondary/20">
              <component :is="item.icon" class="h-4 w-4 text-universe-secondary group-hover:text-universe-secondary/80" />
            </div>
            <span class="mobile-nav-text">{{ item.label }}</span>
            <div class="mobile-arrow">
              <ArrowRightIcon class="h-3 w-3 text-universe-secondary/50 group-hover:text-universe-secondary group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </router-link>
        </div>
      </div>

      <!-- Information -->
      <div class="mobile-section">
        <h3 class="mobile-section-header">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-universe-accent rounded-full mr-3 animate-pulse"></div>
            <span class="text-sm font-semibold text-universe-accent uppercase tracking-wider">Information</span>
          </div>
        </h3>
        <div class="mobile-nav-items">
          <router-link
            v-for="item in information"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item group"
            @click="$emit('close')"
          >
            <div class="mobile-icon-container bg-universe-accent/10 group-hover:bg-universe-accent/20">
              <component :is="item.icon" class="h-4 w-4 text-universe-accent group-hover:text-universe-accent/80" />
            </div>
            <span class="mobile-nav-text">{{ item.label }}</span>
            <div class="mobile-arrow">
              <ArrowRightIcon class="h-3 w-3 text-universe-accent/50 group-hover:text-universe-accent group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </router-link>
        </div>
      </div>

      <!-- Business -->
      <div class="mobile-section">
        <h3 class="mobile-section-header">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-gradient-to-r from-universe-primary to-universe-secondary rounded-full mr-3 animate-pulse"></div>
            <span class="text-sm font-semibold bg-gradient-to-r from-universe-primary to-universe-secondary bg-clip-text text-transparent uppercase tracking-wider">Business</span>
          </div>
        </h3>
        <div class="mobile-nav-items">
          <router-link
            v-for="item in business"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item group"
            @click="$emit('close')"
          >
            <div class="mobile-icon-container bg-gradient-to-r from-universe-primary/10 to-universe-secondary/10 group-hover:from-universe-primary/20 group-hover:to-universe-secondary/20">
              <component :is="item.icon" class="h-4 w-4 text-universe-primary group-hover:text-universe-secondary" />
            </div>
            <span class="mobile-nav-text">{{ item.label }}</span>
            <div class="mobile-arrow">
              <ArrowRightIcon class="h-3 w-3 text-universe-primary/50 group-hover:text-universe-primary group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </router-link>
        </div>
      </div>

      <!-- User Actions (if authenticated) -->
      <div v-if="isAuthenticated" class="mobile-section">
        <h3 class="mobile-section-header">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-gradient-to-r from-universe-primary to-universe-accent rounded-full mr-3 animate-pulse"></div>
            <span class="text-sm font-semibold bg-gradient-to-r from-universe-primary to-universe-accent bg-clip-text text-transparent uppercase tracking-wider">My Account</span>
          </div>
        </h3>
        <div class="mobile-nav-items">
          <router-link
            v-for="item in userActions"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item group"
            @click="$emit('close')"
          >
            <div class="mobile-icon-container bg-gradient-to-r from-universe-primary/10 to-universe-accent/10 group-hover:from-universe-primary/20 group-hover:to-universe-accent/20">
              <component :is="item.icon" class="h-4 w-4 text-universe-primary group-hover:text-universe-accent" />
            </div>
            <span class="mobile-nav-text">{{ item.label }}</span>
            <div class="mobile-arrow">
              <ArrowRightIcon class="h-3 w-3 text-universe-primary/50 group-hover:text-universe-primary group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </router-link>
        </div>
      </div>
      
      <!-- Mobile Theme Toggle -->
      <div class="mobile-section border-t border-universe-border/30">
        <div class="px-3 py-2">
          <ColorThemeDropdown />
        </div>
      </div>
      
      <!-- Mobile Auth -->
      <div v-if="!isAuthenticated" class="mobile-section border-t border-universe-border/30">
        <div class="px-3 py-2">
          <h3 class="mobile-section-header">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-gradient-to-r from-universe-accent to-universe-primary rounded-full mr-3 animate-pulse"></div>
              <span class="text-sm font-semibold bg-gradient-to-r from-universe-accent to-universe-primary bg-clip-text text-transparent uppercase tracking-wider">Account</span>
            </div>
          </h3>
          <div class="mobile-nav-items">
            <router-link
              to="/login"
              class="mobile-nav-item group"
              @click="$emit('close')"
            >
              <div class="mobile-icon-container bg-gradient-to-r from-universe-accent/10 to-universe-primary/10 group-hover:from-universe-accent/20 group-hover:to-universe-primary/20">
                <LogInIcon class="h-4 w-4 text-universe-accent group-hover:text-universe-primary" />
              </div>
              <span class="mobile-nav-text">Sign In</span>
              <div class="mobile-arrow">
                <ArrowRightIcon class="h-3 w-3 text-universe-accent/50 group-hover:text-universe-accent group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </router-link>
            <router-link
              to="/register"
              class="mobile-nav-item group"
              @click="$emit('close')"
            >
              <div class="mobile-icon-container bg-gradient-to-r from-universe-accent/10 to-universe-primary/10 group-hover:from-universe-accent/20 group-hover:to-universe-primary/20">
                <UserPlusIcon class="h-4 w-4 text-universe-accent group-hover:text-universe-primary" />
              </div>
              <span class="mobile-nav-text">Sign Up</span>
              <div class="mobile-arrow">
                <ArrowRightIcon class="h-3 w-3 text-universe-accent/50 group-hover:text-universe-accent group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  StoreIcon,
  SearchIcon,
  Building2Icon,
  FolderIcon,
  TagIcon,
  TrendingUpIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  InfoIcon,
  MailIcon,
  HelpCircleIcon,
  FileTextIcon,
  StarIcon,
  UserPlusIcon,
  HandshakeIcon,
  BarChart3Icon,
  PackageIcon,
  LogInIcon,
  UserIcon,
  SettingsIcon,
  CreditCardIcon,
  MapPinIcon,
  ArrowRightIcon,
} from 'lucide-vue-next'

interface Props {
  isAuthenticated: boolean
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
defineEmits<Emits>()

// Navigation items configuration
const mainNavigation = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/marketplace', label: 'Marketplace', icon: StoreIcon },
  { path: '/search', label: 'Advanced Search', icon: SearchIcon }
] as const

const marketplaceFeatures = [
  { path: '/stores', label: 'Stores', icon: Building2Icon },
  { path: '/categories', label: 'Categories', icon: FolderIcon },
  { path: '/deals', label: 'Deals & Promotions', icon: TagIcon },
  { path: '/trending', label: 'Trending Products', icon: TrendingUpIcon },
  { path: '/new-arrivals', label: 'New Arrivals', icon: SparklesIcon },
  { path: '/wishlist', label: 'Wishlist', icon: HeartIcon },
  { path: '/recently-viewed', label: 'Recently Viewed', icon: ClockIcon }
] as const

const information = [
  { path: '/about', label: 'About Us', icon: InfoIcon },
  { path: '/contact', label: 'Contact', icon: MailIcon },
  { path: '/help', label: 'Help & Support', icon: HelpCircleIcon },
  { path: '/blog', label: 'Blog & News', icon: FileTextIcon },
  { path: '/reviews', label: 'Customer Reviews', icon: StarIcon }
] as const

const business = [
  { path: '/seller/onboarding', label: 'Become a Seller', icon: UserPlusIcon },
  { path: '/business/partnership', label: 'Partnership', icon: HandshakeIcon },
  { path: '/business/analytics', label: 'Analytics Dashboard', icon: BarChart3Icon },
  { path: '/business/inventory', label: 'Inventory Management', icon: PackageIcon }
] as const

const userActions = [
  { path: '/profile', label: 'My Profile', icon: UserIcon },
  { path: '/orders', label: 'My Orders', icon: PackageIcon },
  { path: '/buyer/cart', label: 'Shopping Cart', icon: PackageIcon },
  { path: '/account/settings', label: 'Settings', icon: SettingsIcon },
  { path: '/account/payments', label: 'Payment Methods', icon: CreditCardIcon },
  { path: '/account/addresses', label: 'Address Book', icon: MapPinIcon },
  { path: '/account/reviews', label: 'My Reviews', icon: StarIcon }
] as const
</script>

<style scoped lang="postcss">
/* Mobile Menu Universe Theme Styles */
.mobile-menu-universe {
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.9) 50%,
    rgba(51, 65, 85, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  border-radius: 0 0 1rem 1rem;
}

/* Mobile Cosmic Background Elements */
.mobile-cosmic-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

/* Mobile Animated Stars */
.mobile-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 0.5;
  animation: mobile-twinkle 3s ease-in-out infinite;
}

.mobile-star-1 {
  top: 15%;
  left: 20%;
  animation-delay: 0s;
}

.mobile-star-2 {
  top: 45%;
  right: 25%;
  animation-delay: 1.5s;
}

@keyframes mobile-twinkle {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.3);
    filter: brightness(1.5);
  }
}

/* Mobile Nebula Effect */
.mobile-nebula {
  position: absolute;
  top: -20%;
  left: -20%;
  right: -20%;
  bottom: -20%;
  background: radial-gradient(
    ellipse at center,
    rgba(147, 51, 234, 0.06) 0%,
    rgba(79, 70, 229, 0.03) 40%,
    rgba(236, 72, 153, 0.02) 70%,
    transparent 100%
  );
  animation: mobile-nebula-float 20s ease-in-out infinite;
}

@keyframes mobile-nebula-float {
  0%, 100% { 
    transform: rotate(0deg) scale(1) translateY(0px); 
  }
  50% { 
    transform: rotate(90deg) scale(1.05) translateY(-5px); 
  }
}

/* Mobile Sections */
.mobile-section {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
}

/* Mobile Section Headers */
.mobile-section-header {
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(147, 51, 234, 0.2);
}

/* Mobile Navigation Items */
.mobile-nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.mobile-nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(147, 51, 234, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.mobile-nav-item:hover::before {
  left: 100%;
}

.mobile-nav-item:hover {
  background: rgba(147, 51, 234, 0.05);
  border-color: rgba(147, 51, 234, 0.3);
  transform: translateX(4px) scale(1.01);
  box-shadow: 
    0 4px 15px rgba(147, 51, 234, 0.15),
    0 2px 8px rgba(147, 51, 234, 0.1);
}

/* Mobile Icon Containers */
.mobile-icon-container {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(147, 51, 234, 0.2);
}

.mobile-nav-item:hover .mobile-icon-container {
  transform: scale(1.1) rotate(3deg);
  border-color: rgba(147, 51, 234, 0.4);
  box-shadow: 0 3px 12px rgba(147, 51, 234, 0.3);
}

/* Mobile Navigation Text */
.mobile-nav-text {
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
  color: hsl(var(--foreground));
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav-item:hover .mobile-nav-text {
  color: rgba(147, 51, 234, 1);
}

/* Mobile Arrow Indicators */
.mobile-arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.mobile-nav-item:hover .mobile-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Enhanced Hover Effects for Different Sections */
.mobile-nav-item:hover .mobile-icon-container.bg-universe-primary\/10 {
  background: rgba(147, 51, 234, 0.2);
  box-shadow: 0 3px 12px rgba(147, 51, 234, 0.3);
}

.mobile-nav-item:hover .mobile-icon-container.bg-universe-secondary\/10 {
  background: rgba(79, 70, 229, 0.2);
  box-shadow: 0 3px 12px rgba(79, 70, 229, 0.3);
}

.mobile-nav-item:hover .mobile-icon-container.bg-universe-accent\/10 {
  background: rgba(236, 72, 153, 0.2);
  box-shadow: 0 3px 12px rgba(236, 72, 153, 0.3);
}

/* Gradient Icon Containers */
.mobile-nav-item:hover .mobile-icon-container.bg-gradient-to-r.from-universe-primary\/10.to-universe-secondary\/10 {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2));
  box-shadow: 
    0 3px 12px rgba(147, 51, 234, 0.3),
    0 3px 12px rgba(79, 70, 229, 0.3);
}

.mobile-nav-item:hover .mobile-icon-container.bg-gradient-to-r.from-universe-accent\/10.to-universe-primary\/10 {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2));
  box-shadow: 
    0 3px 12px rgba(236, 72, 153, 0.3),
    0 3px 12px rgba(147, 51, 234, 0.3);
}

/* Dark Mode Enhancements */
.dark .mobile-menu-universe {
  background: linear-gradient(
    135deg,
    rgba(2, 6, 23, 0.98) 0%,
    rgba(15, 23, 42, 0.95) 50%,
    rgba(30, 41, 59, 0.98) 100%
  );
}

.dark .mobile-star {
  opacity: 0.7;
}

.dark .mobile-nebula {
  opacity: 0.5;
}

/* Smooth transitions for theme switching */
.mobile-menu-universe,
.mobile-menu-universe * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for better accessibility */
.mobile-nav-item:focus-visible {
  outline: 2px solid rgba(147, 51, 234, 0.6);
  outline-offset: 2px;
  border-radius: 0.75rem;
}

/* Hover state animations */
.mobile-nav-item:hover .mobile-icon-container {
  animation: mobile-icon-bounce 0.5s ease-in-out;
}

@keyframes mobile-icon-bounce {
  0%, 100% { transform: scale(1.1) rotate(3deg); }
  50% { transform: scale(1.15) rotate(5deg); }
}

/* Section header animations */
.mobile-section-header:hover .w-2 {
  animation: mobile-pulse-glow 1s ease-in-out infinite;
}

@keyframes mobile-pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 3px currentColor;
  }
  50% { 
    box-shadow: 0 0 15px currentColor, 0 0 25px currentColor;
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .mobile-section {
    padding: 0.5rem 0.75rem;
  }
  
  .mobile-nav-item {
    padding: 0.75rem;
  }
  
  .mobile-icon-container {
    width: 2rem;
    height: 2rem;
  }
  
  .mobile-nav-text {
    font-size: 0.875rem;
  }
}

/* Glass morphism effect for child components */
.mobile-menu-universe > * {
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}
</style>
