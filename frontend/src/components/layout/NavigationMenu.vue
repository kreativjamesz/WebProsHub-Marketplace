<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="hidden md:flex bg-muted hover:bg-muted/80 rounded-full transition-all duration-200 hover:scale-105"
      >
        <MenuIcon class="h-6 w-6 text-foreground" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-80 p-2 max-h-[80vh] overflow-y-auto">
      <!-- Main Navigation Section -->
      <div class="mb-4">
        <DropdownMenuLabel
          class="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1"
        >
          Main Navigation
        </DropdownMenuLabel>
        <div class="space-y-1">
          <DropdownMenuItem v-for="item in mainNavigation" :key="item.path" as-child>
            <router-link
              :to="item.path"
              class="w-full flex items-center p-3 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <component :is="item.icon" class="mr-3 h-5 w-5 text-primary" />
              <div class="flex-1 text-left">
                <div class="font-medium text-foreground">{{ item.label }}</div>
                <div class="text-xs text-muted-foreground">{{ item.description }}</div>
              </div>
              <component
                v-if="item.rightIcon"
                :is="item.rightIcon"
                class="h-4 w-4 text-muted-foreground"
              />
            </router-link>
          </DropdownMenuItem>
        </div>
      </div>

      <!-- Marketplace Features Section -->
      <div class="mb-4">
        <DropdownMenuLabel
          class="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1"
        >
          Marketplace Features
        </DropdownMenuLabel>
        <div class="space-y-1">
          <DropdownMenuItem v-for="item in marketplaceFeatures" :key="item.path" as-child>
            <router-link
              :to="item.path"
              class="w-full flex items-center p-3 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <component :is="item.icon" class="mr-3 h-5 w-5 text-primary" />
              <div class="flex-1 text-left">
                <div class="font-medium text-foreground">{{ item.label }}</div>
                <div class="text-xs text-muted-foreground">{{ item.description }}</div>
              </div>
              <component
                v-if="item.rightIcon"
                :is="item.rightIcon"
                class="h-4 w-4 text-muted-foreground"
              />
            </router-link>
          </DropdownMenuItem>
        </div>
      </div>

      <!-- Information Section -->
      <div class="mb-4">
        <DropdownMenuLabel
          class="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1"
        >
          Information
        </DropdownMenuLabel>
        <div class="space-y-1">
          <DropdownMenuItem v-for="item in information" :key="item.path" as-child>
            <router-link
              :to="item.path"
              class="w-full flex items-center p-3 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <component :is="item.icon" class="mr-3 h-5 w-5 text-primary" />
              <div class="flex-1 text-left">
                <div class="font-medium text-foreground">{{ item.label }}</div>
                <div class="text-xs text-muted-foreground">{{ item.description }}</div>
              </div>
              <component
                v-if="item.rightIcon"
                :is="item.rightIcon"
                class="h-4 w-4 text-muted-foreground"
              />
            </router-link>
          </DropdownMenuItem>
        </div>
      </div>

      <!-- Business Section -->
      <div class="mb-4">
        <DropdownMenuLabel
          class="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1"
        >
          Business
        </DropdownMenuLabel>
        <div class="space-y-1">
          <DropdownMenuItem v-for="item in business" :key="item.path" as-child>
            <router-link
              :to="item.path"
              class="w-full flex items-center p-3 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <component :is="item.icon" class="mr-3 h-5 w-5 text-primary" />
              <div class="flex-1 text-left">
                <div class="font-medium text-foreground">{{ item.label }}</div>
                <div class="text-xs text-muted-foreground">{{ item.description }}</div>
              </div>
              <component
                v-if="item.rightIcon"
                :is="item.rightIcon"
                class="h-4 w-4 text-muted-foreground"
              />
            </router-link>
          </DropdownMenuItem>
        </div>
      </div>

      <!-- Authentication Section -->
      <template v-if="!authStore.isAuthenticated">
        <DropdownMenuSeparator class="my-3" />
        <div class="space-y-1">
          <DropdownMenuItem v-for="item in authItems" :key="item.path" as-child>
            <router-link
              :to="item.path"
              class="w-full flex items-center p-3 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <component :is="item.icon" class="mr-3 h-5 w-5 text-primary" />
              <div class="flex-1 text-left">
                <div class="font-medium text-foreground">{{ item.label }}</div>
                <div class="text-xs text-muted-foreground">{{ item.description }}</div>
              </div>
              <component
                v-if="item.rightIcon"
                :is="item.rightIcon"
                class="h-4 w-4 text-muted-foreground"
              />
            </router-link>
          </DropdownMenuItem>
        </div>
      </template>

      <!-- Quick Actions Footer -->
      <template v-if="authStore.isAuthenticated">
        <DropdownMenuSeparator class="my-3" />
        <div class="space-y-1">
          <DropdownMenuItem v-for="item in userActions" :key="item.path" as-child>
            <router-link
              :to="item.path"
              class="w-full flex items-center p-3 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <component :is="item.icon" class="mr-3 h-5 w-5 text-primary" />
              <div class="flex-1 text-left">
                <div class="font-medium text-foreground">{{ item.label }}</div>
                <div class="text-xs text-muted-foreground">{{ item.description }}</div>
              </div>
              <component
                v-if="item.rightIcon"
                :is="item.rightIcon"
                class="h-4 w-4 text-muted-foreground"
              />
            </router-link>
          </DropdownMenuItem>
        </div>
      </template>
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

<style scoped>
/* Custom scrollbar for dropdown if needed */
:deep(.dropdown-menu-content) {
  max-height: 80vh;
  overflow-y: auto;
}

/* Smooth transitions */
:deep(.dropdown-menu-item) {
  transition: all 0.2s ease-in-out;
}

:deep(.dropdown-menu-item:hover) {
  transform: translateX(4px);
}
</style>
