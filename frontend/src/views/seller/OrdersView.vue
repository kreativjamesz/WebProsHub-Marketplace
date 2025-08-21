<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Orders</h1>
            <p class="text-gray-600">Manage your store orders</p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="exportOrders"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search orders, customer names, or order IDs..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            v-model="selectedStatus"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REFUNDED">Refunded</option>
          </select>
          <input
            v-model="dateRange"
            type="date"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#{{ order.id }}</div>
                  <div class="text-sm text-gray-500">{{ order.items.length }} items</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ order.shippingAddress?.name }}</div>
                  <div class="text-sm text-gray-500">{{ order.shippingAddress?.phone }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    <div v-for="item in order.items.slice(0, 2)" :key="item.id" class="truncate">
                      {{ item.product.name }} x{{ item.quantity }}
                    </div>
                    <div v-if="order.items.length > 2" class="text-gray-500 text-xs">
                      +{{ order.items.length - 2 }} more items
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-bold text-gray-900">₱{{ order.total.toLocaleString() }}</div>
                  <div class="text-xs text-gray-500">{{ order.items.length }} items</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusClass(order.status)
                    ]"
                  >
                    {{ getStatusText(order.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewOrder(order)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </button>
                    <button
                      v-if="order.status === 'PENDING'"
                      @click="updateOrderStatus(order.id, 'CONFIRMED')"
                      class="text-green-600 hover:text-green-900"
                    >
                      Confirm
                    </button>
                    <button
                      v-if="order.status === 'CONFIRMED'"
                      @click="updateOrderStatus(order.id, 'PROCESSING')"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Process
                    </button>
                    <button
                      v-if="order.status === 'PROCESSING'"
                      @click="updateOrderStatus(order.id, 'SHIPPED')"
                      class="text-purple-600 hover:text-purple-900"
                    >
                      Ship
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredOrders.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p class="mt-1 text-sm text-gray-500">Orders from your store will appear here.</p>
        </div>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div v-if="showOrderModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Order #{{ selectedOrder?.id }}</h3>
            <button
              @click="showOrderModal = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="selectedOrder" class="space-y-6">
            <!-- Order Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Order Information</h4>
                <div class="mt-2 space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Order ID:</span>
                    <span class="text-sm font-medium text-gray-900">#{{ selectedOrder.id }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Date:</span>
                    <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedOrder.createdAt) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Status:</span>
                    <span
                      :class="[
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        getStatusClass(selectedOrder.status)
                      ]"
                    >
                      {{ getStatusText(selectedOrder.status) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Customer Information</h4>
                <div class="mt-2 space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Name:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOrder.shippingAddress?.name }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Phone:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOrder.shippingAddress?.phone }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Address:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOrder.shippingAddress?.address }}, {{ selectedOrder.shippingAddress?.city }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div>
              <h4 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Order Items</h4>
              <div class="space-y-3">
                <div
                  v-for="item in selectedOrder.items"
                  :key="item.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <img
                      :src="item.product.images[0] || '/images/placeholder-product.jpg'"
                      :alt="item.product.name"
                      class="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h5 class="text-sm font-medium text-gray-900">{{ item.product.name }}</h5>
                      <p class="text-sm text-gray-500">{{ item.product.category?.name }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-medium text-gray-900">₱{{ item.price.toLocaleString() }}</div>
                    <div class="text-sm text-gray-500">Qty: {{ item.quantity }}</div>
                    <div class="text-sm font-bold text-gray-900">₱{{ item.total.toLocaleString() }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="border-t pt-4">
              <div class="flex justify-between items-center">
                <span class="text-lg font-medium text-gray-900">Total</span>
                <span class="text-2xl font-bold text-gray-900">₱{{ selectedOrder.total.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Order } from '@/types/marketplace'
import { mockOrders } from '@/mocks'

// Reactive data
const searchQuery = ref('')
const selectedStatus = ref('')
const dateRange = ref('')
const showOrderModal = ref(false)
const selectedOrder = ref<Order | null>(null)

// Mock data - in real app, this would come from API
const orders = ref<Order[]>(mockOrders.filter(o => o.sellerId === 'seller1'))

// Computed
const filteredOrders = computed(() => {
  let filtered = orders.value

  if (searchQuery.value) {
    filtered = filtered.filter(order =>
      order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.shippingAddress?.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(order => order.status === selectedStatus.value)
  }

  if (dateRange.value) {
    const selectedDate = new Date(dateRange.value)
    filtered = filtered.filter(order => {
      const orderDate = new Date(order.createdAt)
      return orderDate.toDateString() === selectedDate.toDateString()
    })
  }

  return filtered
})

// Methods
const viewOrder = (order: Order) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = newStatus
    order.updatedAt = new Date().toISOString()
  }
}

const exportOrders = () => {
  // In real app, implement CSV/Excel export
  console.log('Exporting orders...')
}

const getStatusClass = (status: Order['status']) => {
  const statusClasses = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    PROCESSING: 'bg-purple-100 text-purple-800',
    SHIPPED: 'bg-indigo-100 text-indigo-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    REFUNDED: 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: Order['status']) => {
  const statusTexts = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    REFUNDED: 'Refunded'
  }
  return statusTexts[status] || status
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  // In real app, fetch orders from API
})
</script>
