<template>
  <div class="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
    <!-- Fixed Side Panel -->
    <SellerSidePanel :class="{ 'show': showSidePanel }" />
    
    <!-- Mobile Backdrop Overlay -->
    <div
      v-if="showSidePanel"
      @click="showSidePanel = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
    ></div>
    
    <!-- Mobile Toggle Button -->
    <button
      @click="toggleSidePanel"
      class="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 bg-purple-900/80 border border-purple-500/50 rounded-xl flex items-center justify-center backdrop-blur-xl hover:bg-purple-900/90 transition-all duration-300"
    >
      <svg class="w-6 h-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    
    <!-- Main Content with Side Panel Offset -->
    <div class="min-h-screen py-8">
      <!-- Mobile Header Spacing -->
      <div class="h-20 lg:hidden"></div>
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 lg:ml-64">
        <!-- Floating Grid Pattern -->
        <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(147,51,234,0.02)_50%,transparent_100%)] opacity-30"></div>
        <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(147,51,234,0.01)_50%,transparent_100%)] opacity-20"></div>
        
        <!-- Floating Particles with Randomized Animations -->
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
        <div class="particle particle-5"></div>
        <div class="particle particle-6"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Welcome Section -->
        <div class="mb-8 text-center">
          <h1 class="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Welcome back, {{ user?.name || 'Seller' }}! 🚀
          </h1>
          <p class="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
            Here's what's happening with your business today. Monitor your performance and take action on what matters most.
          </p>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="mb-6 bg-red-900/50 border border-red-500/30 rounded-2xl p-4 backdrop-blur-xl">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-200">{{ error }}</span>
            <button @click="loadDashboardData" class="ml-auto text-red-300 hover:text-red-100 text-sm font-medium transition-colors duration-300">
              Retry
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="i in 4" :key="i" class="bg-slate-800/50 rounded-2xl p-6 animate-pulse backdrop-blur-xl">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-slate-700 rounded-xl"></div>
                <div class="ml-4 flex-1">
                  <div class="h-4 bg-slate-700 rounded w-20 mb-2"></div>
                  <div class="h-6 bg-slate-700 rounded w-24 mb-1"></div>
                  <div class="h-3 bg-slate-700 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Sales"
            :value="stats.totalSales"
            :growth="stats.salesGrowth"
            :growth-text="`+${stats.salesGrowth}% from last month`"
            :icon="CurrencyIcon"
            variant="success"
          />
          
          <StatsCard
            title="Total Orders"
            :value="stats.totalOrders"
            :growth="stats.ordersGrowth"
            :growth-text="`+${stats.ordersGrowth}% from last month`"
            :icon="ShoppingBagIcon"
            variant="info"
          />
          
          <StatsCard
            title="Active Products"
            :value="stats.activeProducts"
            :growth="0"
            :growth-text="`${stats.lowStockProducts} low stock`"
            :icon="CubeIcon"
            variant="warning"
          />
          
          <StatsCard
            title="New Customers"
            :value="stats.newCustomers"
            :growth="stats.customersGrowth"
            :growth-text="`+${stats.customersGrowth}% from last month`"
            :icon="UsersIcon"
            variant="danger"
          />
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QuickActionCard
            title="Add Product"
            description="Create a new product listing"
            :icon="PlusIcon"
            variant="info"
            @click="navigateTo('/seller/products/add')"
          />

          <QuickActionCard
            title="View Orders"
            description="Check and process orders"
            :icon="ShoppingBagIcon"
            variant="success"
            @click="navigateTo('/seller/orders')"
          />

          <QuickActionCard
            title="Manage Stores"
            description="Update store information"
            :icon="StoreIcon"
            variant="warning"
            @click="navigateTo('/seller/stores')"
          />

          <QuickActionCard
            title="View Analytics"
            description="Track performance metrics"
            :icon="ChartIcon"
            variant="danger"
            @click="navigateTo('/seller/analytics')"
          />
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Recent Orders -->
          <DashboardSection title="Recent Orders" view-all-link="/seller/orders">
            <div v-if="recentOrders.length === 0" class="text-center py-12">
              <div class="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p class="text-gray-400 font-medium">No recent orders</p>
              <p class="text-gray-500 text-sm">Orders will appear here once customers start buying</p>
            </div>
            
            <div v-else class="space-y-4">
              <div
                v-for="order in recentOrders"
                :key="order.id"
                class="group relative p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:bg-slate-800/50 backdrop-blur-sm"
              >
                <!-- Hover Effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                <div class="relative flex items-center justify-between">
                  <div>
                    <p class="text-sm font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      Order #{{ order.id }}
                    </p>
                    <p class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {{ order.buyer?.name || 'Unknown Customer' }} • {{ new Date(order.createdAt).toLocaleDateString() }}
                    </p>
                    <p class="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                      {{ order.items?.length || 0 }} items
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      ₱{{ formatCurrency(order.total) }}
                    </p>
                    <span
                      :class="[
                        'inline-flex px-3 py-1 text-xs font-bold rounded-full border transition-all duration-300',
                        getStatusColor(order.status)
                      ]"
                    >
                      {{ order.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DashboardSection>

          <!-- Low Stock Alerts -->
          <DashboardSection title="Low Stock Alerts" view-all-link="/seller/products">
            <div v-if="lowStockProducts.length === 0" class="text-center py-12">
              <div class="w-16 h-16 bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <svg class="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p class="text-green-400 font-medium">All products are well stocked!</p>
              <p class="text-gray-500 text-sm">Great job managing your inventory</p>
            </div>
            
            <div v-else class="space-y-4">
              <div
                v-for="product in lowStockProducts"
                :key="product.id"
                class="group relative p-4 bg-red-900/20 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:bg-red-900/30 backdrop-blur-sm"
              >
                <!-- Hover Effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                <div class="relative flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center mr-4 border border-slate-700/50">
                      <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-white group-hover:text-red-300 transition-colors duration-300">
                        {{ product.name }}
                      </p>
                      <p class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {{ product.sku || 'No SKU' }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-red-400 group-hover:text-red-300 transition-colors duration-300">
                      {{ product.stock }} left
                    </p>
                    <button
                      @click="navigateTo(`/seller/products/edit/${product.id}`)"
                      class="text-xs text-green-400 hover:text-green-300 font-bold transition-colors duration-300 hover:shadow-sm hover:shadow-green-400/30"
                    >
                      Restock
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DashboardSection>
        </div>

        <!-- Performance Chart -->
        <DashboardSection title="Sales Performance" view-all-link="/seller/analytics">
          <div class="mb-4">
            <div class="flex space-x-2">
              <button
                v-for="period in chartPeriods"
                :key="period.value"
                @click="selectedPeriod = period.value"
                :class="[
                  'px-4 py-2 text-sm font-bold rounded-xl border transition-all duration-300',
                  selectedPeriod === period.value
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-lg shadow-purple-500/30'
                    : 'text-gray-400 border-slate-700/50 hover:border-purple-500/30 hover:text-purple-300'
                ]"
              >
                {{ period.label }}
              </button>
            </div>
          </div>
          
          <div class="h-64 bg-slate-800/30 rounded-xl flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
            <div v-if="!salesData" class="text-center">
              <div class="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-600/50">
                <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p class="text-gray-400 font-medium">Chart implementation pending</p>
              <p class="text-sm text-gray-500">Will be implemented with Chart.js or similar library</p>
              <p class="text-xs text-gray-600 mt-2">Showing {{ selectedPeriod }} data</p>
            </div>
            
            <div v-else class="text-center">
              <div class="w-16 h-16 bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <svg class="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p class="text-purple-300 font-medium">Sales data loaded!</p>
              <p class="text-sm text-gray-400">Period: {{ selectedPeriod }}</p>
              <p class="text-xs text-gray-500 mt-2">Chart implementation pending</p>
            </div>
          </div>
        </DashboardSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { apiService } from '@/services/api'

// Import reusable components
import StatsCard from '@/components/seller/StatsCard.vue'
import QuickActionCard from '@/components/seller/QuickActionCard.vue'
import DashboardSection from '@/components/seller/DashboardSection.vue'
import SellerSidePanel from '@/components/seller/SellerSidePanel.vue'

// Import Lucide icons
import {
  DollarSign as CurrencyIcon,
  ShoppingBag as ShoppingBagIcon,
  Package as CubeIcon,
  Users as UsersIcon,
  Plus as PlusIcon,
  Store as StoreIcon,
  BarChart3 as ChartIcon
} from 'lucide-vue-next'

// Types for dashboard data
interface DashboardStats {
  totalSales: number
  salesGrowth: number
  totalOrders: number
  ordersGrowth: number
  activeProducts: number
  lowStockProducts: number
  newCustomers: number
  customersGrowth: number
}

interface DashboardOrder {
  id: string
  total: number
  status: string
  createdAt: string
  buyer?: {
    id: string
    name: string
    email: string
  }
  items?: Array<{
    id: string
    product: any
  }>
}

interface LowStockProduct {
  id: string
  name: string
  sku: string
  stock: number
  minStock?: number
}

interface SalesData {
  period: string
  startDate: string
  endDate: string
  totalSales: number
  totalOrders: number
  salesData: any[]
}

const router = useRouter()
const authStore = useAuthStore()

// Reactive data
const selectedPeriod = ref('7d')
const isLoading = ref(false)
const error = ref<string | null>(null)
const showSidePanel = ref(true) // New state for mobile toggle

// Dashboard data with proper types
const stats = ref<DashboardStats>({
  totalSales: 0,
  salesGrowth: 0,
  totalOrders: 0,
  ordersGrowth: 0,
  activeProducts: 0,
  lowStockProducts: 0,
  newCustomers: 0,
  customersGrowth: 0
})

const recentOrders = ref<DashboardOrder[]>([])
const lowStockProducts = ref<LowStockProduct[]>([])
const salesData = ref<SalesData | null>(null)

// Chart periods
const chartPeriods = ref([
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '3 Months', value: '3m' },
  { label: '1 Year', value: '1y' }
])

// Computed properties
const user = computed(() => authStore.user)

// Methods
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-PH')
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50'
    case 'processing':
      return 'bg-blue-900/50 text-blue-300 border-blue-500/50'
    case 'shipped':
      return 'bg-purple-900/50 text-purple-300 border-purple-500/50'
    case 'delivered':
      return 'bg-green-900/50 text-green-300 border-green-500/50'
    case 'cancelled':
      return 'bg-red-900/50 text-red-300 border-red-500/50'
    default:
      return 'bg-slate-900/50 text-slate-300 border-slate-500/50'
  }
}

const navigateTo = (path: string) => {
  router.push(path)
}

const loadDashboardData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Load all dashboard data in parallel
    const [statsResponse, ordersResponse, productsResponse, salesResponse] = await Promise.all([
      apiService.sellers.getStats(),
      apiService.sellers.getRecentOrders(5),
      apiService.sellers.getLowStockProducts(5),
      apiService.sellers.getSalesPerformance(selectedPeriod.value)
    ])
    
    // Update state with real data
    stats.value = statsResponse.data
    recentOrders.value = ordersResponse.data
    lowStockProducts.value = productsResponse.data
    salesData.value = salesResponse.data
    
    console.log('Dashboard data loaded successfully')
  } catch (err: any) {
    console.error('Error loading dashboard data:', err)
    error.value = err.response?.data?.message || 'Failed to load dashboard data'
    
    // Set default values on error
    stats.value = {
      totalSales: 0,
      salesGrowth: 0,
      totalOrders: 0,
      ordersGrowth: 0,
      activeProducts: 0,
      lowStockProducts: 0,
      newCustomers: 0,
      customersGrowth: 0
    }
    recentOrders.value = []
    lowStockProducts.value = []
  } finally {
    isLoading.value = false
  }
}

const loadSalesPerformance = async (period: string) => {
  try {
    const response = await apiService.sellers.getSalesPerformance(period)
    salesData.value = response.data
  } catch (err: any) {
    console.error('Error loading sales performance:', err)
    error.value = 'Failed to load sales data'
  }
}

// Watch for period changes
watch(selectedPeriod, (newPeriod) => {
  loadSalesPerformance(newPeriod)
})

// Lifecycle
onMounted(async () => {
  // Layer 3: Component-level protection
  await checkSellerAccess()
  
  loadDashboardData()
  
  // Set page title
  document.title = 'Seller Dashboard - WebProsHub Marketplace'
})

// Seller access validation (Layer 3: Component Protection)
const checkSellerAccess = async () => {
  try {
    const sellerStatus = await authStore.checkSellerStatus()
    
    if (sellerStatus === 'pending-approval') {
      router.push('/seller/pending-approval')
      return
    }
    
    if (sellerStatus === 'no-store') {
      router.push('/seller/onboarding')
      return
    }
    
    // If we get here, seller is ready
    console.log('✅ Seller access validated - ready to proceed')
  } catch (error) {
    console.error('Error checking seller access:', error)
    // Fallback: allow access but log the error
  }
}

// Mobile toggle function
const toggleSidePanel = () => {
  showSidePanel.value = !showSidePanel.value
}
</script>

<style scoped>
/* Universe Particle Animations */
.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: float 8s infinite ease-in-out;
}

.particle-1 {
  width: 8px;
  height: 8px;
  background: linear-gradient(45deg, #a855f7, #ec4899);
  animation-delay: 0s;
  animation-duration: 12s;
}

.particle-2 {
  width: 6px;
  height: 6px;
  background: linear-gradient(45deg, #ec4899, #8b5cf6);
  animation-delay: 2s;
  animation-duration: 15s;
}

.particle-3 {
  width: 4px;
  height: 4px;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  animation-delay: 4s;
  animation-duration: 18s;
}

.particle-4 {
  width: 10px;
  height: 10px;
  background: linear-gradient(45deg, #06b6d4, #a855f7);
  animation-delay: 6s;
  animation-duration: 20s;
}

.particle-5 {
  width: 5px;
  height: 5px;
  background: linear-gradient(45deg, #f59e0b, #ec4899);
  animation-delay: 8s;
  animation-duration: 14s;
}

.particle-6 {
  width: 7px;
  height: 7px;
  background: linear-gradient(45deg, #10b981, #8b5cf6);
  animation-delay: 10s;
  animation-duration: 16s;
}

@keyframes float {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
  }
  10% {
    opacity: 0.8;
    transform: translate(20px, -30px) scale(1);
  }
  20% {
    opacity: 0.6;
    transform: translate(-15px, -50px) scale(0.8);
  }
  30% {
    opacity: 0.9;
    transform: translate(35px, -20px) scale(1.2);
  }
  40% {
    opacity: 0.4;
    transform: translate(-25px, -40px) scale(0.6);
  }
  50% {
    opacity: 0.7;
    transform: translate(15px, -60px) scale(1.1);
  }
  60% {
    opacity: 0.5;
    transform: translate(-40px, -30px) scale(0.7);
  }
  70% {
    opacity: 0.8;
    transform: translate(30px, -50px) scale(1);
  }
  80% {
    opacity: 0.3;
    transform: translate(-20px, -70px) scale(0.5);
  }
  90% {
    opacity: 0.6;
    transform: translate(25px, -40px) scale(0.9);
  }
  100% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
  }
}

/* Responsive particle positioning */
@media (max-width: 768px) {
  .particle {
    animation-duration: 6s;
  }
}
</style>
