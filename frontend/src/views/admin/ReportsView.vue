<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p class="mt-2 text-gray-600">Comprehensive insights into marketplace performance</p>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="exportReport"
              :disabled="exporting"
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ exporting ? 'Exporting...' : 'Export Report' }}
            </button>
            <button
              @click="generateReport"
              :disabled="generating"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ generating ? 'Generating...' : 'Generate Report' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Date Range Selector -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              v-model="reportType"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="sales">Sales Report</option>
              <option value="products">Products Report</option>
              <option value="users">Users Report</option>
              <option value="sellers">Sellers Report</option>
              <option value="performance">Performance Report</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              v-model="dateRange"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div v-if="dateRange === 'custom'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              v-model="startDate"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div v-if="dateRange === 'custom'">
            <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              v-model="endDate"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Revenue</p>
              <p class="text-2xl font-semibold text-gray-900">₱{{ formatCurrency(metrics.totalRevenue) }}</p>
              <p class="text-sm text-green-600">+{{ metrics.revenueGrowth }}% from last period</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Orders</p>
              <p class="text-2xl font-semibold text-gray-900">{{ metrics.totalOrders }}</p>
              <p class="text-sm text-green-600">+{{ metrics.ordersGrowth }}% from last period</p>
            </div>
          </div>
        </div>

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
              <p class="text-sm font-medium text-gray-500">Active Users</p>
              <p class="text-2xl font-semibold text-gray-900">{{ metrics.activeUsers }}</p>
              <p class="text-sm text-green-600">+{{ metrics.usersGrowth }}% from last period</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p class="text-2xl font-semibold text-gray-900">{{ metrics.conversionRate }}%</p>
              <p class="text-sm text-green-600">+{{ metrics.conversionGrowth }}% from last period</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Revenue Chart -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p class="text-gray-500">Chart placeholder</p>
              <p class="text-sm text-gray-400">Revenue trend over selected period</p>
            </div>
          </div>
        </div>

        <!-- Orders Chart -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Orders Trend</h3>
          <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p class="text-gray-500">Chart placeholder</p>
              <p class="text-sm text-gray-400">Order volume over selected period</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Performers -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Top Sellers -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Top Performing Sellers</h3>
          <div class="space-y-4">
            <div
              v-for="(seller, index) in topSellers"
              :key="seller.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-sm font-medium text-blue-600">{{ index + 1 }}</span>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ seller.businessName }}</div>
                  <div class="text-xs text-gray-500">{{ seller.fullName }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">₱{{ formatCurrency(seller.revenue) }}</div>
                <div class="text-xs text-gray-500">{{ seller.orders }} orders</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Products -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
          <div class="space-y-4">
            <div
              v-for="(product, index) in topProducts"
              :key="product.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-sm font-medium text-green-600">{{ index + 1 }}</span>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                  <div class="text-xs text-gray-500">{{ product.category }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">{{ product.sales }} sold</div>
                <div class="text-xs text-gray-500">₱{{ formatCurrency(product.revenue) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Data Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Detailed Data</h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="data in detailedData"
                :key="data.date"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(data.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₱{{ formatCurrency(data.revenue) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ data.orders }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ data.users }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ data.conversion }}%
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      data.growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ data.growth >= 0 ? '+' : '' }}{{ data.growth }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// Reactive data
const reportType = ref('sales')
const dateRange = ref('month')
const startDate = ref('')
const endDate = ref('')
const generating = ref(false)
const exporting = ref(false)

// Mock data
const metrics = ref({
  totalRevenue: 2847500,
  revenueGrowth: 12.5,
  totalOrders: 2847,
  ordersGrowth: 8.3,
  activeUsers: 15420,
  usersGrowth: 15.7,
  conversionRate: 3.2,
  conversionGrowth: 2.1
})

const topSellers = ref([
  {
    id: '1',
    businessName: 'TechGadgets',
    fullName: 'Mike Johnson',
    revenue: 450000,
    orders: 156
  },
  {
    id: '2',
    businessName: 'Fashion Store',
    fullName: 'Sarah Wilson',
    revenue: 380000,
    orders: 234
  },
  {
    id: '3',
    businessName: 'Home & Garden',
    fullName: 'David Brown',
    revenue: 320000,
    orders: 89
  },
  {
    id: '4',
    businessName: 'Sports Equipment',
    fullName: 'Tom Davis',
    revenue: 280000,
    orders: 145
  },
  {
    id: '5',
    businessName: 'Book Store',
    fullName: 'Lisa Chen',
    revenue: 250000,
    orders: 312
  }
])

const topProducts = ref([
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    sales: 234,
    revenue: 585000
  },
  {
    id: '2',
    name: 'Designer Dress',
    category: 'Fashion',
    sales: 189,
    revenue: 1606500
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    sales: 156,
    revenue: 1326000
  },
  {
    id: '4',
    name: 'Garden Tool Set',
    category: 'Home & Garden',
    sales: 145,
    revenue: 464000
  },
  {
    id: '5',
    name: 'Yoga Mat',
    category: 'Sports',
    sales: 134,
    revenue: 160800
  }
])

const detailedData = ref([
  {
    date: '2024-01-01',
    revenue: 95000,
    orders: 95,
    users: 1200,
    conversion: 7.9,
    growth: 5.2
  },
  {
    date: '2024-01-02',
    revenue: 102000,
    orders: 102,
    users: 1350,
    conversion: 7.6,
    growth: 7.4
  },
  {
    date: '2024-01-03',
    revenue: 98000,
    orders: 98,
    users: 1280,
    conversion: 7.7,
    growth: -3.9
  },
  {
    date: '2024-01-04',
    revenue: 115000,
    orders: 115,
    users: 1420,
    conversion: 8.1,
    growth: 17.3
  },
  {
    date: '2024-01-05',
    revenue: 108000,
    orders: 108,
    users: 1380,
    conversion: 7.8,
    growth: -6.1
  }
])

// Computed properties
const currentDate = computed(() => {
  const now = new Date()
  return now.toISOString().split('T')[0]
})

// Methods
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-PH')
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const generateReport = async () => {
  generating.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.admin.generateReport({
    //   type: reportType.value,
    //   dateRange: dateRange.value,
    //   startDate: startDate.value,
    //   endDate: endDate.value
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Report generated successfully')
    // TODO: Update metrics and data based on response
  } catch (error) {
    console.error('Error generating report:', error)
  } finally {
    generating.value = false
  }
}

const exportReport = async () => {
  exporting.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.admin.exportReport({
    //   type: reportType.value,
    //   dateRange: dateRange.value,
    //   startDate: startDate.value,
    //   endDate: endDate.value
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // TODO: Handle actual file download
    console.log('Report exported successfully')
  } catch (error) {
    console.error('Error exporting report:', error)
  } finally {
    exporting.value = false
  }
}

// Watch for date range changes
watch(dateRange, (newValue) => {
  if (newValue !== 'custom') {
    startDate.value = ''
    endDate.value = ''
  }
})

// Lifecycle
onMounted(() => {
  // Set default dates for custom range
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  
  startDate.value = lastMonth.toISOString().split('T')[0]
  endDate.value = currentDate.value
  
  // Set page title
  document.title = 'Reports & Analytics - Admin Panel - WebProsHub Marketplace'
})
</script>
