<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome back, {{ user?.name || 'Seller' }}!</h1>
        <p class="mt-2 text-gray-600">Here's what's happening with your business today.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Sales -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Sales</p>
              <p class="text-2xl font-semibold text-gray-900">₱{{ formatCurrency(stats.totalSales) }}</p>
              <p class="text-sm text-green-600">+{{ stats.salesGrowth }}% from last month</p>
            </div>
          </div>
        </div>

        <!-- Orders -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Orders</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalOrders }}</p>
              <p class="text-sm text-blue-600">+{{ stats.ordersGrowth }}% from last month</p>
            </div>
          </div>
        </div>

        <!-- Products -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Active Products</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.activeProducts }}</p>
              <p class="text-sm text-purple-600">{{ stats.lowStockProducts }} low stock</p>
            </div>
          </div>
        </div>

        <!-- Customers -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">New Customers</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.newCustomers }}</p>
              <p class="text-sm text-yellow-600">+{{ stats.customersGrowth }}% from last month</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button
          @click="navigateTo('/seller/products/add')"
          class="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Add Product</h3>
          <p class="text-gray-600 text-sm">Create a new product listing</p>
        </button>

        <button
          @click="navigateTo('/seller/orders')"
          class="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">View Orders</h3>
          <p class="text-gray-600 text-sm">Check and process orders</p>
        </button>

        <button
          @click="navigateTo('/seller/stores')"
          class="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Manage Stores</h3>
          <p class="text-gray-600 text-sm">Update store information</p>
        </button>

        <button
          @click="navigateTo('/seller/analytics')"
          class="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">View Analytics</h3>
          <p class="text-gray-600 text-sm">Track performance metrics</p>
        </button>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Orders -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Recent Orders</h2>
            <router-link
              to="/seller/orders"
              class="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              View all
            </router-link>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="order in recentOrders"
                :key="order.id"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="text-sm font-medium text-gray-900">Order #{{ order.orderNumber }}</p>
                  <p class="text-xs text-gray-500">{{ order.customerName }} • {{ order.date }}</p>
                  <p class="text-xs text-gray-500">{{ order.items }} items</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">₱{{ formatCurrency(order.total) }}</p>
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(order.status)
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Low Stock Alerts -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Low Stock Alerts</h2>
            <router-link
              to="/seller/products"
              class="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              View all
            </router-link>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="product in lowStockProducts"
                :key="product.id"
                class="flex items-center justify-between p-4 bg-red-50 rounded-lg"
              >
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">{{ product.sku }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-red-600">{{ product.stock }} left</p>
                  <button
                    @click="navigateTo(`/seller/products/edit/${product.id}`)"
                    class="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    Restock
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Chart -->
      <div class="mt-8 bg-white rounded-lg shadow-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Sales Performance</h2>
          <div class="flex space-x-4">
            <button
              v-for="period in chartPeriods"
              :key="period.value"
              @click="selectedPeriod = period.value"
              :class="[
                'px-3 py-1 text-sm font-medium rounded-md',
                selectedPeriod === period.value
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ period.label }}
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p class="text-gray-500">Chart will be implemented with Chart.js or similar library</p>
              <p class="text-sm text-gray-400">Showing {{ selectedPeriod }} data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Reactive data
const selectedPeriod = ref('7d')

// Mock data
const stats = ref({
  totalSales: 125000,
  salesGrowth: 12.5,
  totalOrders: 156,
  ordersGrowth: 8.3,
  activeProducts: 89,
  lowStockProducts: 5,
  newCustomers: 23,
  customersGrowth: 15.2
})

const recentOrders = ref([
  {
    id: 1,
    orderNumber: 'ORD-001',
    customerName: 'John Doe',
    date: '2 hours ago',
    items: 3,
    total: 2500,
    status: 'Pending'
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    customerName: 'Jane Smith',
    date: '4 hours ago',
    items: 1,
    total: 1200,
    status: 'Processing'
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    customerName: 'Mike Johnson',
    date: '6 hours ago',
    items: 2,
    total: 1800,
    status: 'Shipped'
  },
  {
    id: 4,
    orderNumber: 'ORD-004',
    customerName: 'Sarah Wilson',
    date: '1 day ago',
    items: 4,
    total: 3200,
    status: 'Delivered'
  }
])

const lowStockProducts = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    sku: 'WH-001',
    stock: 3
  },
  {
    id: 2,
    name: 'Smart Watch',
    sku: 'SW-002',
    stock: 2
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    sku: 'BS-003',
    stock: 1
  }
])

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
      return 'bg-yellow-100 text-yellow-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    case 'shipped':
      return 'bg-purple-100 text-purple-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const navigateTo = (path: string) => {
  router.push(path)
}

const loadDashboardData = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.sellers.getDashboardData()
    // stats.value = response.data.stats
    // recentOrders.value = response.data.recentOrders
    // lowStockProducts.value = response.data.lowStockProducts
    
    console.log('Dashboard data loaded successfully')
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadDashboardData()
  
  // Set page title
  document.title = 'Seller Dashboard - WebProsHub Marketplace'
})
</script>
