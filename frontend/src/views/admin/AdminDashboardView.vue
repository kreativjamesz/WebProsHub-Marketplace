<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="bg-card shadow-sm border-b border-border">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p class="text-sm text-muted-foreground">Manage your marketplace platform</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-muted-foreground">
              Welcome back, {{ authStore.user?.name }}
            </span>
            <button
              @click="logout"
              class="px-4 py-2 text-sm text-destructive hover:text-destructive/80 font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center">
            <div class="p-3 bg-primary/10 rounded-lg">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-muted-foreground">Total Users</p>
              <p class="text-2xl font-bold text-foreground">{{ stats.totalUsers }}</p>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-green-600 font-medium">+{{ stats.newUsersThisMonth }} this month</span>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p class="text-2xl font-bold text-foreground">{{ stats.totalOrders }}</p>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-green-600 font-medium">+{{ stats.newOrdersThisMonth }} this month</span>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center">
            <div class="p-3 bg-secondary/10 rounded-lg">
              <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-muted-foreground">Total Stores</p>
              <p class="text-2xl font-bold text-foreground">{{ stats.totalStores }}</p>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-green-600 font-medium">+{{ stats.newStoresThisMonth }} this month</span>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-muted-foreground">Revenue</p>
              <p class="text-2xl font-bold text-foreground">${{ stats.totalRevenue.toLocaleString() }}</p>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-green-600 font-medium">+{{ stats.revenueGrowth }}% this month</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">Quick Actions</h2>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="navigateToUsers"
              class="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg text-left transition-colors duration-200 group"
            >
              <div class="flex items-center">
                <div class="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span class="ml-3 text-sm font-medium text-foreground">Manage Users</span>
              </div>
            </button>
            
            <button
              @click="navigateToOrders"
              class="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg text-left transition-colors duration-200 group"
            >
              <div class="flex items-center">
                <div class="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-200">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span class="ml-3 text-sm font-medium text-foreground">View Orders</span>
              </div>
            </button>
            
            <button
              @click="navigateToProducts"
              class="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg text-left transition-colors duration-200 group"
            >
              <div class="flex items-center">
                <div class="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors duration-200">
                  <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span class="ml-3 text-sm font-medium text-foreground">Manage Products</span>
              </div>
            </button>
            
            <button
              @click="navigateToReports"
              class="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg text-left transition-colors duration-200 group"
            >
              <div class="flex items-center">
                <div class="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-200">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span class="ml-3 text-sm font-medium text-foreground">View Reports</span>
              </div>
            </button>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">Recent Activity</h2>
          <div class="space-y-3">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="flex items-center p-3 bg-muted/30 rounded-lg"
            >
              <div class="flex-shrink-0">
                <div
                  :class="[
                    'w-2 h-2 rounded-full',
                    getActivityColor(activity.type)
                  ]"
                ></div>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm text-foreground">{{ activity.description }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.timestamp }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">User Growth</h2>
          <div class="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p class="text-muted-foreground">Chart placeholder</p>
              <p class="text-xs text-muted-foreground">Integration with chart library needed</p>
            </div>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 class="text-lg font-medium text-foreground mb-4">Revenue Trends</h2>
          <div class="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <p class="text-muted-foreground">Chart placeholder</p>
              <p class="text-xs text-muted-foreground">Integration with chart library needed</p>
            </div>
          </div>
        </div>
      </div>

      <!-- System Status -->
      <div class="bg-card rounded-xl shadow-sm border border-border p-6">
        <h2 class="text-lg font-medium text-foreground mb-4">System Status</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex items-center p-3 bg-green-50 rounded-lg">
            <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span class="text-sm text-foreground">Database: Online</span>
          </div>
          <div class="flex items-center p-3 bg-green-50 rounded-lg">
            <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span class="text-sm text-foreground">API: Operational</span>
          </div>
          <div class="flex items-center p-3 bg-green-50 rounded-lg">
            <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span class="text-sm text-foreground">Storage: Healthy</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Types
interface Stats {
  totalUsers: number
  newUsersThisMonth: number
  totalOrders: number
  newOrdersThisMonth: number
  totalStores: number
  newStoresThisMonth: number
  totalRevenue: number
  revenueGrowth: number
}

interface Activity {
  id: string
  type: 'user' | 'order' | 'store' | 'system'
  description: string
  timestamp: string
}

// Composables
const router = useRouter()
const authStore = useAuthStore()

// Reactive State
const stats = ref<Stats>({
  totalUsers: 1250,
  newUsersThisMonth: 89,
  totalOrders: 3420,
  newOrdersThisMonth: 156,
  totalStores: 89,
  newStoresThisMonth: 12,
  totalRevenue: 125000,
  revenueGrowth: 23
})

const recentActivity = ref<Activity[]>([
  {
    id: '1',
    type: 'user',
    description: 'New user registered: john.doe@example.com',
    timestamp: '2 minutes ago'
  },
  {
    id: '2',
    type: 'order',
    description: 'Order #12345 completed successfully',
    timestamp: '15 minutes ago'
  },
  {
    id: '3',
    type: 'store',
    description: 'New store "Tech Gadgets" approved',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    type: 'system',
    description: 'Daily backup completed successfully',
    timestamp: '2 hours ago'
  }
])

// Methods
const getActivityColor = (type: Activity['type']): string => {
  const colors = {
    user: 'bg-primary',
    order: 'bg-green-500',
    store: 'bg-secondary',
    system: 'bg-muted-foreground'
  }
  return colors[type] || 'bg-muted-foreground'
}

const navigateToUsers = () => {
  router.push('/admin/users')
}

const navigateToOrders = () => {
  router.push('/admin/orders')
}

const navigateToProducts = () => {
  router.push('/admin/products')
}

const navigateToReports = () => {
  router.push('/admin/reports')
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

// Lifecycle
onMounted(() => {
  // TODO: Load real dashboard data from API
})
</script>

<style scoped>
/* Custom hover effects */
.bg-card:hover {
  box-shadow: 0 4px 6px -1px hsl(var(--foreground) / 0.1);
}

/* Smooth transitions */
button, .bg-card {
  transition: all 0.2s ease-in-out;
}

/* Activity indicator colors */
.bg-green-50 {
  background-color: hsl(var(--green) / 0.1);
}

.bg-green-500 {
  background-color: hsl(var(--green));
}
</style>
