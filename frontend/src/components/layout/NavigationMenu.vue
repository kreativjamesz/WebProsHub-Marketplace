<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="navigation-trigger hidden md:flex glass-universe hover:bg-universe-primary/20 rounded-full transition-all duration-300 hover:scale-105 border border-universe-border/30 hover:border-universe-primary/50 group"
      >
        <div class="relative">
          <MenuIcon
            class="h-6 w-6 text-universe-primary group-hover:text-universe-accent transition-all duration-300"
          />
          <!-- Animated glow effect -->
          <div
            class="absolute inset-0 w-6 h-6 bg-universe-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
        </div>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      class="navigation-mega-menu w-[900px] p-6 max-h-[70vh] overflow-y-auto backdrop-blur-xl border border-universe-border/40 shadow-2xl shadow-universe-primary/20"
    >
      <!-- Cosmic Background Elements -->
      <div class="cosmic-bg-elements">
        <div class="cosmic-star cosmic-star-1"></div>
        <div class="cosmic-star cosmic-star-2"></div>
        <div class="cosmic-star cosmic-star-3"></div>
        <div class="cosmic-nebula"></div>
      </div>

      <!-- Horizontal Mega Menu Layout -->
      <div class="grid grid-cols-5 gap-6 relative z-10">
        <!-- Column 1: Main Navigation -->
        <div class="space-y-4">
          <DropdownMenuLabel class="section-header">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-universe-primary rounded-full mr-3 animate-pulse"></div>
              <span class="text-sm font-semibold text-universe-primary uppercase tracking-wider"
                >Main Navigation</span
              >
            </div>
          </DropdownMenuLabel>
          <div class="space-y-2">
            <DropdownMenuItem v-for="item in mainNavigation" :key="item.path" as-child>
              <router-link :to="item.path" class="navigation-item group">
                <div
                  class="icon-container bg-universe-primary/10 group-hover:bg-universe-primary/20"
                >
                  <component
                    :is="item.icon"
                    class="h-4 w-4 text-universe-primary group-hover:text-universe-accent"
                  />
                </div>
                <div class="flex-1 text-left">
                  <div
                    class="font-medium text-foreground group-hover:text-universe-primary text-sm transition-colors duration-300"
                  >
                    {{ item.label }}
                  </div>
                  <div
                    class="text-xs text-muted-foreground group-hover:text-universe-primary/70 transition-colors duration-300"
                  >
                    {{ item.description }}
                  </div>
                </div>
                <div v-if="item.rightIcon" class="arrow-indicator">
                  <component
                    :is="item.rightIcon"
                    class="h-3 w-3 text-universe-primary/50 group-hover:text-universe-primary group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </router-link>
            </DropdownMenuItem>
          </div>
        </div>

        <!-- Column 2: Marketplace Features -->
        <div class="space-y-4">
          <DropdownMenuLabel class="section-header">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-universe-secondary rounded-full mr-3 animate-pulse"></div>
              <span class="text-sm font-semibold text-universe-secondary uppercase tracking-wider"
                >Marketplace</span
              >
            </div>
          </DropdownMenuLabel>
          <div class="space-y-2">
            <DropdownMenuItem v-for="item in marketplaceFeatures" :key="item.path" as-child>
              <router-link :to="item.path" class="navigation-item group">
                <div
                  class="icon-container bg-universe-secondary/10 group-hover:bg-universe-secondary/20"
                >
                  <component
                    :is="item.icon"
                    class="h-4 w-4 text-universe-secondary group-hover:text-universe-secondary/80"
                  />
                </div>
                <div class="flex-1 text-left">
                  <div
                    class="font-medium text-foreground group-hover:text-universe-secondary text-sm transition-colors duration-300"
                  >
                    {{ item.label }}
                  </div>
                  <div
                    class="text-xs text-muted-foreground group-hover:text-universe-secondary/70 transition-colors duration-300"
                  >
                    {{ item.description }}
                  </div>
                </div>
                <div v-if="item.rightIcon" class="arrow-indicator">
                  <component
                    :is="item.rightIcon"
                    class="h-3 w-3 text-universe-secondary/50 group-hover:text-universe-secondary group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </router-link>
            </DropdownMenuItem>
          </div>
        </div>

        <!-- Column 3: Information -->
        <div class="space-y-4">
          <DropdownMenuLabel class="section-header">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-universe-accent rounded-full mr-3 animate-pulse"></div>
              <span class="text-sm font-semibold text-universe-accent uppercase tracking-wider"
                >Information</span
              >
            </div>
          </DropdownMenuLabel>
          <div class="space-y-2">
            <DropdownMenuItem v-for="item in information" :key="item.path" as-child>
              <router-link :to="item.path" class="navigation-item group">
                <div class="icon-container bg-universe-accent/10 group-hover:bg-universe-accent/20">
                  <component
                    :is="item.icon"
                    class="h-4 w-4 text-universe-accent group-hover:text-universe-accent/80"
                  />
                </div>
                <div class="flex-1 text-left">
                  <div
                    class="font-medium text-foreground group-hover:text-universe-accent text-sm transition-colors duration-300"
                  >
                    {{ item.label }}
                  </div>
                  <div
                    class="text-xs text-muted-foreground group-hover:text-universe-accent/70 transition-colors duration-300"
                  >
                    {{ item.description }}
                  </div>
                </div>
                <div v-if="item.rightIcon" class="arrow-indicator">
                  <component
                    :is="item.rightIcon"
                    class="h-3 w-3 text-universe-accent/50 group-hover:text-universe-accent group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </router-link>
            </DropdownMenuItem>
          </div>
        </div>

        <!-- Column 4: Business -->
        <div class="space-y-4">
          <DropdownMenuLabel class="section-header">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-universe-primary rounded-full mr-3 animate-pulse"></div>
              <span class="text-sm font-semibold text-universe-primary uppercase tracking-wider"
                >Business</span
              >
            </div>
          </DropdownMenuLabel>
          <div class="space-y-2">
            <DropdownMenuItem v-for="item in business" :key="item.path" as-child>
              <router-link :to="item.path" class="navigation-item group">
                <div
                  class="icon-container bg-universe-primary/10 group-hover:bg-universe-primary/20"
                >
                  <component
                    :is="item.icon"
                    class="h-4 w-4 text-universe-primary group-hover:text-universe-accent"
                  />
                </div>
                <div class="flex-1 text-left">
                  <div
                    class="font-medium text-foreground group-hover:text-universe-primary text-sm transition-colors duration-300"
                  >
                    {{ item.label }}
                  </div>
                  <div
                    class="text-xs text-muted-foreground group-hover:text-universe-primary/70 transition-colors duration-300"
                  >
                    {{ item.description }}
                  </div>
                </div>
                <div v-if="item.rightIcon" class="arrow-indicator">
                  <component
                    :is="item.rightIcon"
                    class="h-3 w-3 text-universe-primary/50 group-hover:text-universe-primary group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </router-link>
            </DropdownMenuItem>
          </div>
        </div>

        <!-- Column 5: User Actions -->
        <div class="space-y-4">
          <DropdownMenuLabel class="section-header">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-universe-accent rounded-full mr-3 animate-pulse"></div>
              <span class="text-sm font-semibold text-universe-accent uppercase tracking-wider"
                >Account</span
              >
            </div>
          </DropdownMenuLabel>
          <div class="space-y-2">
            <DropdownMenuItem v-for="item in userActions" :key="item.path" as-child>
              <router-link :to="item.path" class="navigation-item group">
                <div class="icon-container bg-universe-accent/10 group-hover:bg-universe-accent/20">
                  <component
                    :is="item.icon"
                    class="h-4 w-4 text-universe-accent group-hover:text-universe-accent/80"
                  />
                </div>
                <div class="flex-1 text-left">
                  <div
                    class="font-medium text-foreground group-hover:text-universe-accent text-sm transition-colors duration-300"
                  >
                    {{ item.label }}
                  </div>
                  <div
                    class="text-xs text-muted-foreground group-hover:text-universe-accent/70 transition-colors duration-300"
                  >
                    {{ item.description }}
                  </div>
                </div>
                <div v-if="item.rightIcon" class="arrow-indicator">
                  <component
                    :is="item.rightIcon"
                    class="h-3 w-3 text-universe-accent/50 group-hover:text-universe-accent group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </router-link>
            </DropdownMenuItem>
          </div>
        </div>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  MenuIcon,
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

const authStore = useAuthStore()

// Type definition for navigation items
interface NavigationItem {
  path: string
  label: string
  description: string
  icon: any
  rightIcon?: any
}

// Navigation items configuration
const mainNavigation: NavigationItem[] = [
  {
    path: '/',
    label: 'Home',
    description: 'Back to homepage',
    icon: HomeIcon,
  },
  {
    path: '/marketplace',
    label: 'Marketplace',
    description: 'Browse all products',
    icon: StoreIcon,
  },
  {
    path: '/search',
    label: 'Advanced Search',
    description: 'Find specific products',
    icon: SearchIcon,
  },
]

const marketplaceFeatures: NavigationItem[] = [
  {
    path: '/stores',
    label: 'Stores',
    description: 'Discover amazing stores',
    icon: Building2Icon,
  },
  {
    path: '/categories',
    label: 'Categories',
    description: 'Shop by category',
    icon: FolderIcon,
  },
  {
    path: '/deals',
    label: 'Deals & Promotions',
    description: 'Best offers & discounts',
    icon: TagIcon,
  },
  {
    path: '/trending',
    label: 'Trending Products',
    description: "What's popular now",
    icon: TrendingUpIcon,
  },
  {
    path: '/new-arrivals',
    label: 'New Arrivals',
    description: 'Latest products',
    icon: SparklesIcon,
  },
  {
    path: '/wishlist',
    label: 'Wishlist',
    description: 'Your saved items',
    icon: HeartIcon,
  },
  {
    path: '/recently-viewed',
    label: 'Recently Viewed',
    description: 'Your browsing history',
    icon: ClockIcon,
  },
]

const information: NavigationItem[] = [
  {
    path: '/about',
    label: 'About Us',
    description: 'Learn about WebProsHub',
    icon: InfoIcon,
  },
  {
    path: '/contact',
    label: 'Contact',
    description: 'Get in touch with us',
    icon: MailIcon,
  },
  {
    path: '/help',
    label: 'Help & Support',
    description: 'FAQs & assistance',
    icon: HelpCircleIcon,
  },
  {
    path: '/blog',
    label: 'Blog & News',
    description: 'Latest updates & tips',
    icon: FileTextIcon,
  },
  {
    path: '/reviews',
    label: 'Customer Reviews',
    description: 'What others say',
    icon: StarIcon,
  },
]

const business: NavigationItem[] = [
  {
    path: '/seller/onboarding',
    label: 'Become a Seller',
    description: 'Start selling on our platform',
    icon: UserPlusIcon,
    rightIcon: ArrowRightIcon,
  },
  {
    path: '/business/partnership',
    label: 'Partnership',
    description: 'Business collaboration opportunities',
    icon: HandshakeIcon,
  },
  {
    path: '/business/analytics',
    label: 'Analytics Dashboard',
    description: 'Business insights & metrics',
    icon: BarChart3Icon,
  },
  {
    path: '/business/inventory',
    label: 'Inventory Management',
    description: 'Manage your products',
    icon: PackageIcon,
  },
]

const authItems: NavigationItem[] = [
  {
    path: '/login',
    label: 'Login',
    description: 'Access your account',
    icon: LogInIcon,
  },
  {
    path: '/register',
    label: 'Register',
    description: 'Create new account',
    icon: UserPlusIcon,
  },
]

const userActions: NavigationItem[] = [
  {
    path: '/profile',
    label: 'My Profile',
    description: 'Manage your account',
    icon: UserIcon,
  },
  {
    path: '/orders',
    label: 'My Orders',
    description: 'Track your purchases',
    icon: PackageIcon,
  },
  {
    path: '/account/settings',
    label: 'Settings',
    description: 'Preferences & security',
    icon: SettingsIcon,
  },
  {
    path: '/account/payments',
    label: 'Payment Methods',
    description: 'Manage your cards',
    icon: CreditCardIcon,
  },
  {
    path: '/account/addresses',
    label: 'Address Book',
    description: 'Shipping addresses',
    icon: MapPinIcon,
  },
  {
    path: '/account/reviews',
    label: 'My Reviews',
    description: "Products you've reviewed",
    icon: StarIcon,
  },
]
</script>

<style scoped lang="css">
/* Navigation Menu Universe Theme Styles */
.navigation-mega-menu {
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.9) 50%,
    rgba(51, 65, 85, 0.95) 100%
  );
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
}

/* Cosmic Background Elements */
.cosmic-bg-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

/* Animated Cosmic Stars */
.cosmic-star {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 0.6;
  animation: cosmic-twinkle 4s ease-in-out infinite;
}

.cosmic-star-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.cosmic-star-2 {
  top: 60%;
  right: 20%;
  animation-delay: 1.5s;
}

.cosmic-star-3 {
  bottom: 30%;
  left: 50%;
  animation-delay: 3s;
}

@keyframes cosmic-twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    filter: brightness(1.5);
  }
}

/* Cosmic Nebula Effect */
.cosmic-nebula {
  position: absolute;
  top: -30%;
  left: -30%;
  right: -30%;
  bottom: -30%;
  background: radial-gradient(
    ellipse at center,
    rgba(147, 51, 234, 0.08) 0%,
    rgba(79, 70, 229, 0.04) 40%,
    rgba(236, 72, 153, 0.02) 70%,
    transparent 100%
  );
  animation: nebula-float 25s ease-in-out infinite;
}

@keyframes nebula-float {
  0%,
  100% {
    transform: rotate(0deg) scale(1) translateY(0px);
  }
  50% {
    transform: rotate(180deg) scale(1.1) translateY(-10px);
  }
}

/* Navigation Trigger Button */
.navigation-trigger {
  position: relative;
  overflow: hidden;
}

.navigation-trigger::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.2), transparent);
  transition: left 0.5s ease;
}

.navigation-trigger:hover::before {
  left: 100%;
}

/* Section Headers */
.section-header {
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(147, 51, 234, 0.2);
}

/* Navigation Items */
.navigation-item {
  /* @apply w-full flex items-center rounded-xl transition-all duration-300 cursor-pointer; */
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.navigation-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.navigation-item:hover::before {
  left: 100%;
}

.navigation-item:hover {
  background: rgba(147, 51, 234, 0.05);
  border-color: rgba(147, 51, 234, 0.3);
  transform: translateX(8px) scale(1.02);
  box-shadow:
    0 8px 25px rgba(147, 51, 234, 0.15),
    0 4px 10px rgba(147, 51, 234, 0.1);
}

/* Icon Containers */
.icon-container {
  /* @apply w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300; */
  border: 1px solid rgba(147, 51, 234, 0.2);
}

.navigation-item:hover .icon-container {
  transform: scale(1.1) rotate(5deg);
  border-color: rgba(147, 51, 234, 0.4);
  box-shadow: 0 4px 15px rgba(147, 51, 234, 0.3);
}

/* Arrow Indicators */
.arrow-indicator {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.navigation-item:hover .arrow-indicator {
  opacity: 1;
  transform: translateX(0);
}

/* Enhanced Hover Effects for Different Sections */
.navigation-item:hover .icon-container.bg-universe-primary\/10 {
  background: rgba(147, 51, 234, 0.2);
  box-shadow: 0 4px 15px rgba(147, 51, 234, 0.3);
}

.navigation-item:hover .icon-container.bg-universe-secondary\/10 {
  background: rgba(79, 70, 229, 0.2);
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
}

.navigation-item:hover .icon-container.bg-universe-accent\/10 {
  background: rgba(236, 72, 153, 0.2);
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
}

/* Gradient Icon Containers */
.navigation-item:hover
  .icon-container.bg-gradient-to-r.from-universe-primary\/10.to-universe-secondary\/10 {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2));
  box-shadow:
    0 4px 15px rgba(147, 51, 234, 0.3),
    0 4px 15px rgba(79, 70, 229, 0.3);
}

.navigation-item:hover
  .icon-container.bg-gradient-to-r.from-universe-accent\/10.to-universe-primary\/10 {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2));
  box-shadow:
    0 4px 15px rgba(236, 72, 153, 0.3),
    0 4px 15px rgba(147, 51, 234, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .navigation-mega-menu {
    width: 700px;
    padding: 1rem;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .navigation-mega-menu {
    width: 90vw;
    max-width: 500px;
    padding: 0.75rem;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .navigation-item {
    padding: 0.75rem;
  }

  .icon-container {
    width: 2rem;
    height: 2rem;
  }
}

/* Dark Mode Enhancements */
.dark .navigation-mega-menu {
  background: linear-gradient(
    135deg,
    rgba(2, 6, 23, 0.98) 0%,
    rgba(15, 23, 42, 0.95) 50%,
    rgba(30, 41, 59, 0.98) 100%
  );
}

.dark .cosmic-star {
  opacity: 0.8;
}

.dark .cosmic-nebula {
  opacity: 0.6;
}

/* Smooth transitions for theme switching */
.navigation-mega-menu,
.navigation-mega-menu * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for better accessibility */
.navigation-item:focus-visible {
  outline: 2px solid rgba(147, 51, 234, 0.6);
  outline-offset: 2px;
  border-radius: 0.75rem;
}

/* Custom scrollbar */
.navigation-mega-menu::-webkit-scrollbar {
  width: 6px;
}

.navigation-mega-menu::-webkit-scrollbar-track {
  background: transparent;
}

.navigation-mega-menu::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.3);
  border-radius: 3px;
}

.navigation-mega-menu::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.5);
}

/* Glass morphism effect for child components */
.navigation-mega-menu > * {
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

/* Hover state animations */
.navigation-item:hover .icon-container {
  animation: icon-bounce 0.6s ease-in-out;
}

@keyframes icon-bounce {
  0%,
  100% {
    transform: scale(1.1) rotate(5deg);
  }
  50% {
    transform: scale(1.2) rotate(10deg);
  }
}

/* Section header animations */
.section-header:hover .w-2 {
  animation: pulse-glow 1s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 5px currentColor;
  }
  50% {
    box-shadow:
      0 0 20px currentColor,
      0 0 30px currentColor;
  }
}
</style>
