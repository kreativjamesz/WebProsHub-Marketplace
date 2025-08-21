<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Order Management</h1>
            <p class="mt-2 text-gray-600">Manage all orders across the marketplace</p>
          </div>
          <button
            @click="exportOrders"
            :disabled="exporting"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ exporting ? 'Exporting...' : 'Export Orders' }}
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Completed</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.completedOrders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Pending</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.pendingOrders }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Revenue</p>
              <p class="text-2xl font-semibold text-gray-900">₱{{ formatCurrency(stats.totalRevenue) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by order ID, customer name, or seller..."
                class="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="selectedStatus"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <!-- Date Range -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              v-model="dateRange"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              v-model="sortBy"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="createdAt">Date Created</option>
              <option value="total">Total Amount</option>
              <option value="status">Status</option>
              <option value="customer">Customer Name</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Orders ({{ filteredOrders.length }})</h2>
            <div class="flex items-center space-x-4">
              <button
                @click="bulkUpdateStatus"
                :disabled="selectedOrders.length === 0"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Status ({{ selectedOrders.length }})
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">
                  <input
                    v-model="selectAll"
                    @change="toggleSelectAll"
                    type="checkbox"
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="order in paginatedOrders"
                :key="order.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="selectedOrders"
                    :value="order.id"
                    type="checkbox"
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">#{{ order.orderNumber }}</div>
                    <div class="text-xs text-gray-500">{{ order.id }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ order.customer.fullName }}</div>
                    <div class="text-sm text-gray-500">{{ order.customer.email }}</div>
                    <div class="text-xs text-gray-400">{{ order.customer.phone }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ order.seller.businessName }}</div>
                    <div class="text-sm text-gray-500">{{ order.seller.fullName }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    <div>{{ order.items.length }} items</div>
                    <div class="text-xs text-gray-500">
                      {{ order.items.map(item => item.product.name).join(', ') }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    <div class="font-medium">₱{{ formatCurrency(order.total) }}</div>
                    <div class="text-xs text-gray-500">
                      {{ order.paymentMethod }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(order.status)
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="viewOrder(order)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      @click="editOrder(order)"
                      class="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button
                      @click="updateOrderStatus(order)"
                      class="text-yellow-600 hover:text-yellow-900"
                    >
                      Status
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredOrders.length }} results
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span class="px-3 py-1 text-sm text-gray-700">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Status Modal -->
    <div
      v-if="showStatusModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingOrder ? 'Update Order Status' : 'Bulk Update Status' }}
          </h3>
          
          <form @submit.prevent="saveStatusUpdate" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Status</label>
              <select
                v-model="statusForm.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                v-model="statusForm.notes"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Add any notes about this status change..."
              ></textarea>
            </div>
            
            <div class="flex space-x-3 mt-6">
              <button
                type="button"
                @click="closeStatusModal"
                class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="updating"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ updating ? 'Updating...' : 'Update Status' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// Reactive data
const searchQuery = ref('')
const selectedStatus = ref('')
const dateRange = ref('')
const sortBy = ref('createdAt')
const selectedOrders = ref<string[]>([])
const showStatusModal = ref(false)
const editingOrder = ref<any>(null)
const updating = ref(false)
const exporting = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

// Status form
const statusForm = ref({
  status: 'pending',
  notes: ''
})

// Mock data
const stats = ref({
  totalOrders: 2847,
  completedOrders: 2156,
  pendingOrders: 234,
  totalRevenue: 2847500
})

const orders = ref([
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+63 912 345 6789'
    },
    seller: {
      businessName: 'TechGadgets',
      fullName: 'Mike Johnson'
    },
    items: [
      { product: { name: 'Wireless Headphones' }, quantity: 1, price: 2500 },
      { product: { name: 'Phone Case' }, quantity: 2, price: 500 }
    ],
    total: 3500,
    paymentMethod: 'Credit Card',
    status: 'delivered',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: {
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+63 923 456 7890'
    },
    seller: {
      businessName: 'Fashion Store',
      fullName: 'Sarah Wilson'
    },
    items: [
      { product: { name: 'Designer Dress' }, quantity: 1, price: 8500 }
    ],
    total: 8500,
    paymentMethod: 'PayPal',
    status: 'shipped',
    createdAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: {
      fullName: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      phone: '+63 934 567 8901'
    },
    seller: {
      businessName: 'Home & Garden',
      fullName: 'David Brown'
    },
    items: [
      { product: { name: 'Garden Tool Set' }, quantity: 1, price: 3200 },
      { product: { name: 'Plant Seeds' }, quantity: 3, price: 200 }
    ],
    total: 3800,
    paymentMethod: 'Bank Transfer',
    status: 'pending',
    createdAt: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: {
      fullName: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '+63 945 678 9012'
    },
    seller: {
      businessName: 'Sports Equipment',
      fullName: 'Tom Davis'
    },
    items: [
      { product: { name: 'Yoga Mat' }, quantity: 1, price: 1200 },
      { product: { name: 'Dumbbells' }, quantity: 2, price: 800 }
    ],
    total: 2800,
    paymentMethod: 'Cash on Delivery',
    status: 'confirmed',
    createdAt: '2024-01-18T16:45:00Z'
  }
])

// Computed properties
const filteredOrders = computed(() => {
  let filtered = orders.value.filter(order => {
    const matchesSearch = !searchQuery.value || 
      order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customer.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.seller.businessName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !selectedStatus.value || order.status === selectedStatus.value
    
    // Date filtering logic would go here
    const matchesDateRange = true // TODO: Implement date range filtering
    
    return matchesSearch && matchesStatus && matchesDateRange
  })

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'total':
        return b.total - a.total
      case 'status':
        return a.status.localeCompare(b.status)
      case 'customer':
        return a.customer.fullName.localeCompare(b.customer.fullName)
      default:
        return 0
    }
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredOrders.value.length))
const paginatedOrders = computed(() => filteredOrders.value.slice(startIndex.value, endIndex.value))

const selectAll = computed({
  get: () => selectedOrders.value.length === paginatedOrders.value.length && paginatedOrders.value.length > 0,
  set: (value) => {
    if (value) {
      selectedOrders.value = paginatedOrders.value.map(order => order.id)
    } else {
      selectedOrders.value = []
    }
  }
})

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'confirmed':
      return 'bg-blue-100 text-blue-800'
    case 'processing':
      return 'bg-purple-100 text-purple-800'
    case 'shipped':
      return 'bg-indigo-100 text-indigo-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'refunded':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

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

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedOrders.value = []
  } else {
    selectedOrders.value = paginatedOrders.value.map(order => order.id)
  }
}

const viewOrder = (order: any) => {
  // TODO: Navigate to order detail page
  console.log('View order:', order.id)
}

const editOrder = (order: any) => {
  // TODO: Navigate to order edit page
  console.log('Edit order:', order.id)
}

const updateOrderStatus = (order: any) => {
  editingOrder.value = order
  statusForm.value.status = order.status
  statusForm.value.notes = ''
  showStatusModal.value = true
}

const bulkUpdateStatus = () => {
  editingOrder.value = null
  statusForm.value.status = 'pending'
  statusForm.value.notes = ''
  showStatusModal.value = true
}

const closeStatusModal = () => {
  showStatusModal.value = false
  editingOrder.value = null
  statusForm.value = {
    status: 'pending',
    notes: ''
  }
}

const saveStatusUpdate = async () => {
  updating.value = true
  try {
    // TODO: Replace with actual API call
    // if (editingOrder.value) {
    //   await apiService.admin.updateOrderStatus(editingOrder.value.id, statusForm.value)
    // } else {
    //   await apiService.admin.bulkUpdateOrderStatus(selectedOrders.value, statusForm.value)
    // }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingOrder.value) {
      // Update single order
      editingOrder.value.status = statusForm.value.status
    } else {
      // Update multiple orders
      orders.value.forEach(order => {
        if (selectedOrders.value.includes(order.id)) {
          order.status = statusForm.value.status
        }
      })
      selectedOrders.value = []
    }
    
    closeStatusModal()
    console.log('Order status updated successfully')
  } catch (error) {
    console.error('Error updating order status:', error)
  } finally {
    updating.value = false
  }
}

const exportOrders = async () => {
  exporting.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.admin.exportOrders(filteredOrders.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // TODO: Handle actual file download
    console.log('Orders exported successfully')
  } catch (error) {
    console.error('Error exporting orders:', error)
  } finally {
    exporting.value = false
  }
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedStatus, dateRange, sortBy], () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  // Set page title
  document.title = 'Order Management - Admin Panel - WebProsHub Marketplace'
})
</script>
