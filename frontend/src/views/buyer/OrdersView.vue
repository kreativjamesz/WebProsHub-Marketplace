<template>
  <div class="py-8 bg-background text-foreground">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">My Orders</h1>
        <p class="mt-2 text-muted-foreground">Track your orders and view order history</p>
      </div>

      <!-- Filters and Search -->
      <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search orders by ID, store name, or product..."
            class="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder-muted-foreground transition-colors duration-200"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-colors duration-200"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-colors duration-200"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="total-high">Highest Total</option>
            <option value="total-low">Lowest Total</option>
          </select>
        </div>
      </div>

      <!-- Orders List -->
      <div v-if="filteredOrders.length > 0" class="space-y-6">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-card rounded-lg shadow-md overflow-hidden border border-border"
        >
          <!-- Order Header -->
          <div class="px-6 py-4 bg-muted/50 border-b border-border">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <h3 class="text-lg font-medium text-foreground">Order #{{ order.id }}</h3>
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </div>
              <div class="text-right">
                <p class="text-sm text-muted-foreground">{{ formatDate(new Date(order.createdAt)) }}</p>
                <p class="text-lg font-semibold text-foreground">₱{{ order.total.toFixed(2) }}</p>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="divide-y divide-border">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="px-6 py-4 flex items-center space-x-4"
            >
              <!-- Product Image -->
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                  <img
                    v-if="item.product.images && item.product.images.length > 0"
                    :src="item.product.images[0]"
                    :alt="item.product.name"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-16 bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-foreground mb-1">{{ item.product.name }}</h4>
                <p class="text-sm text-muted-foreground">Quantity: {{ item.quantity }}</p>
                <p class="text-sm text-muted-foreground">
                  Store: {{ order.sellerId }}
                </p>
              </div>

              <!-- Price -->
              <div class="text-right">
                <p class="text-sm font-medium text-foreground">
                  ₱{{ item.product.price.toFixed(2) }}
                </p>
                <p class="text-sm text-muted-foreground">
                  ₱{{ (item.product.price * item.quantity).toFixed(2) }} total
                </p>
              </div>
            </div>
          </div>

          <!-- Order Actions -->
          <div class="px-6 py-4 bg-muted/50 border-t border-border">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{{ order.items.length }} items</span>
                <span>•</span>
                <span>Ordered {{ formatDate(new Date(order.createdAt)) }}</span>
                <span class="•"> Order ID: {{ order.id }} </span>
              </div>

              <div class="flex space-x-3">
                <router-link
                  :to="`/buyer/orders/${order.id}`"
                  class="px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors duration-200 font-medium"
                >
                  View Details
                </router-link>

                <button
                  v-if="order.status === 'DELIVERED'"
                  @click="writeReview(order)"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  Write Review
                </button>

                <button
                  v-if="order.status === 'PENDING'"
                  @click="cancelOrder(order.id)"
                  class="px-4 py-2 text-destructive border border-destructive rounded-md hover:bg-destructive/10 transition-colors duration-200 font-medium"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-muted-foreground mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-foreground mb-2">No orders found</h3>
        <p class="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
        <router-link
          to="/marketplace"
          class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium"
        >
          Start Shopping
        </router-link>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
              currentPage === page
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground bg-card border border-border hover:bg-accent',
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm font-medium text-muted-foreground bg-card border border-border rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import type { Order } from '@/types/marketplace'
import { mockOrders } from '@/mocks'

const router = useRouter()

// Theme
const mode = useColorMode()

// Reactive data
const orders = ref<Order[]>([])
const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const totalPages = ref(1)
const loading = ref(false)

// Use centralized mock data

// Computed properties
const filteredOrders = computed(() => {
  let filtered = [...orders.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (order) =>
        order.id.toLowerCase().includes(query) ||
        order.sellerId.toLowerCase().includes(query) ||
        order.items.some(
          (item) =>
            item.product.name.toLowerCase().includes(query) ||
            (item.product.description || '').toLowerCase().includes(query),
        ),
    )
  }

  // Status filter
  if (statusFilter.value) {
    filtered = filtered.filter((order) => order.status === statusFilter.value)
  }

  // Sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'total-high':
        return b.total - a.total
      case 'total-low':
        return a.total - b.total
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return filtered
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Methods
const getStatusClass = (status: string) => {
  switch (status) {
    case 'DELIVERED':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    case 'IN_TRANSIT':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    case 'PROCESSING':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    case 'PENDING':
      return 'bg-muted text-muted-foreground'
    case 'CANCELLED':
      return 'bg-destructive/20 text-destructive dark:bg-destructive/10'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const writeReview = (order: Order) => {
  // TODO: Implement review writing functionality
  console.log('Writing review for order:', order.id)
}

const cancelOrder = (orderId: string) => {
  // TODO: Implement order cancellation
  console.log('Cancelling order:', orderId)
}

const loadOrders = async () => {
  loading.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.buyers.getOrders({
    //   page: currentPage.value,
    //   search: searchQuery.value,
    //   status: statusFilter.value,
    //   sortBy: sortBy.value
    // })
    // orders.value = response.data
    // totalPages.value = response.meta.totalPages

    // Using mock data for now
    orders.value = mockOrders
    totalPages.value = 1
  } catch (error) {
    console.error('Error loading orders:', error)
  } finally {
    loading.value = false
  }
}

// Watchers
watch([searchQuery, statusFilter, sortBy], () => {
  currentPage.value = 1
  loadOrders()
})

watch(currentPage, () => {
  loadOrders()
})

// Lifecycle
onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
/* Dark mode adjustments for images */
:global(.dark) img {
  filter: brightness(0.9) contrast(1.1);
}

/* Smooth transitions for theme switching */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Enhanced hover effects for dark mode */
:global(.dark) .hover\:bg-accent:hover {
  background-color: hsl(var(--accent) / 0.1);
}
</style>
