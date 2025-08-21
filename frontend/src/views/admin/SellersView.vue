<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Seller Management</h1>
            <p class="mt-2 text-gray-600">Manage all sellers and their stores in the marketplace</p>
          </div>
          <button
            @click="showCreateModal = true"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Add Seller
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Sellers</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalSellers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Active Stores</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.activeStores }}</p>
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
              <p class="text-sm font-medium text-gray-500">Pending Approvals</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.pendingApprovals }}</p>
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Sellers</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name, email, or business..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Verification Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Verification</label>
            <select
              v-model="selectedVerification"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              v-model="sortBy"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="createdAt">Date Joined</option>
              <option value="revenue">Revenue</option>
              <option value="products">Products</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Sellers Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Sellers ({{ filteredSellers.length }})</h2>
            <div class="flex items-center space-x-4">
              <button
                @click="exportSellers"
                :disabled="exporting"
                class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ exporting ? 'Exporting...' : 'Export' }}
              </button>
              <button
                @click="bulkApprove"
                :disabled="selectedSellers.length === 0"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve Selected ({{ selectedSellers.length }})
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
                  Seller
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="seller in paginatedSellers"
                :key="seller.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="selectedSellers"
                    :value="seller.id"
                    type="checkbox"
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span class="text-sm font-medium text-gray-600">
                        {{ getUserInitials(seller.fullName) }}
                      </span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ seller.fullName }}</div>
                      <div class="text-sm text-gray-500">{{ seller.email }}</div>
                      <div class="text-xs text-gray-400">{{ seller.phone }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ seller.businessName }}</div>
                    <div class="text-sm text-gray-500">{{ seller.businessType }}</div>
                    <div class="text-xs text-gray-400">{{ seller.location }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(seller.status)
                    ]"
                  >
                    {{ seller.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getVerificationColor(seller.verificationStatus)
                    ]"
                  >
                    {{ seller.verificationStatus }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    <div>Products: {{ seller.stats.products }}</div>
                    <div>Orders: {{ seller.stats.orders }}</div>
                    <div>Revenue: ₱{{ formatCurrency(seller.stats.revenue) }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(seller.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="viewSeller(seller)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      @click="editSeller(seller)"
                      class="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button
                      @click="toggleSellerStatus(seller)"
                      :class="seller.status === 'active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'"
                    >
                      {{ seller.status === 'active' ? 'Suspend' : 'Activate' }}
                    </button>
                    <button
                      @click="deleteSeller(seller)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
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
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredSellers.length }} results
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

    <!-- Create/Edit Seller Modal -->
    <div
      v-if="showCreateModal || editingSeller"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingSeller ? 'Edit Seller' : 'Create New Seller' }}
          </h3>
          
          <form @submit.prevent="saveSeller" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="sellerForm.fullName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="sellerForm.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                v-model="sellerForm.businessName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select
                v-model="sellerForm.businessType"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Service">Service</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="sellerForm.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
              <select
                v-model="sellerForm.verificationStatus"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            <div class="flex space-x-3 mt-6">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : (editingSeller ? 'Update' : 'Create') }}
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
const selectedVerification = ref('')
const sortBy = ref('name')
const selectedSellers = ref<string[]>([])
const showCreateModal = ref(false)
const editingSeller = ref<any>(null)
const saving = ref(false)
const exporting = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

// Seller form
const sellerForm = ref({
  fullName: '',
  email: '',
  businessName: '',
  businessType: 'Retail',
  status: 'pending',
  verificationStatus: 'pending'
})

// Mock data
const stats = ref({
  totalSellers: 156,
  activeStores: 142,
  pendingApprovals: 8,
  totalRevenue: 2500000
})

const sellers = ref([
  {
    id: '1',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+63 912 345 6789',
    businessName: 'Smith Electronics',
    businessType: 'Retail',
    location: 'Manila, Philippines',
    status: 'active',
    verificationStatus: 'verified',
    createdAt: '2024-01-10T09:15:00Z',
    stats: {
      products: 45,
      orders: 156,
      revenue: 125000
    }
  },
  {
    id: '2',
    fullName: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+63 923 456 7890',
    businessName: 'Brown Fashion',
    businessType: 'Retail',
    location: 'Quezon City, Philippines',
    status: 'active',
    verificationStatus: 'verified',
    createdAt: '2024-01-08T15:20:00Z',
    stats: {
      products: 32,
      orders: 89,
      revenue: 78000
    }
  },
  {
    id: '3',
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+63 934 567 8901',
    businessName: 'Wilson Home & Garden',
    businessType: 'Retail',
    location: 'Makati, Philippines',
    status: 'pending',
    verificationStatus: 'pending',
    createdAt: '2024-01-15T11:30:00Z',
    stats: {
      products: 0,
      orders: 0,
      revenue: 0
    }
  },
  {
    id: '4',
    fullName: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+63 945 678 9012',
    businessName: 'Johnson Sports',
    businessType: 'Wholesale',
    location: 'Cebu, Philippines',
    status: 'suspended',
    verificationStatus: 'verified',
    createdAt: '2024-01-05T08:00:00Z',
    stats: {
      products: 28,
      orders: 67,
      revenue: 45000
    }
  }
])

// Computed properties
const filteredSellers = computed(() => {
  let filtered = sellers.value.filter(seller => {
    const matchesSearch = !searchQuery.value || 
      seller.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      seller.businessName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !selectedStatus.value || seller.status === selectedStatus.value
    const matchesVerification = !selectedVerification.value || seller.verificationStatus === selectedVerification.value
    
    return matchesSearch && matchesStatus && matchesVerification
  })

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.fullName.localeCompare(b.fullName)
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'revenue':
        return b.stats.revenue - a.stats.revenue
      case 'products':
        return b.stats.products - a.stats.products
      default:
        return 0
    }
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredSellers.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredSellers.value.length))
const paginatedSellers = computed(() => filteredSellers.value.slice(startIndex.value, endIndex.value))

const selectAll = computed({
  get: () => selectedSellers.value.length === paginatedSellers.value.length && paginatedSellers.value.length > 0,
  set: (value) => {
    if (value) {
      selectedSellers.value = paginatedSellers.value.map(seller => seller.id)
    } else {
      selectedSellers.value = []
    }
  }
})

// Methods
const getUserInitials = (fullName: string) => {
  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'suspended':
      return 'bg-red-100 text-red-800'
    case 'inactive':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getVerificationColor = (status: string) => {
  switch (status) {
    case 'verified':
      return 'bg-green-100 text-green-800'
    case 'unverified':
      return 'bg-red-100 text-red-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
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
    selectedSellers.value = []
  } else {
    selectedSellers.value = paginatedSellers.value.map(seller => seller.id)
  }
}

const viewSeller = (seller: any) => {
  // TODO: Navigate to seller detail page
  console.log('View seller:', seller.id)
}

const editSeller = (seller: any) => {
  editingSeller.value = seller
  sellerForm.value = {
    fullName: seller.fullName,
    email: seller.email,
    businessName: seller.businessName,
    businessType: seller.businessType,
    status: seller.status,
    verificationStatus: seller.verificationStatus
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingSeller.value = null
  sellerForm.value = {
    fullName: '',
    email: '',
    businessName: '',
    businessType: 'Retail',
    status: 'pending',
    verificationStatus: 'pending'
  }
}

const saveSeller = async () => {
  saving.value = true
  try {
    // TODO: Replace with actual API call
    // if (editingSeller.value) {
    //   await apiService.admin.updateSeller(editingSeller.value.id, sellerForm.value)
    // } else {
    //   await apiService.admin.createSeller(sellerForm.value)
    // }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingSeller.value) {
      // Update existing seller
      const index = sellers.value.findIndex(s => s.id === editingSeller.value.id)
      if (index !== -1) {
        sellers.value[index] = { ...sellers.value[index], ...sellerForm.value }
      }
    } else {
      // Add new seller
      const newSeller = {
        id: Date.now().toString(),
        ...sellerForm.value,
        phone: '+63 900 000 0000',
        location: 'Philippines',
        createdAt: new Date().toISOString(),
        stats: {
          products: 0,
          orders: 0,
          revenue: 0
        }
      }
      sellers.value.unshift(newSeller)
    }
    
    closeModal()
    console.log('Seller saved successfully')
  } catch (error) {
    console.error('Error saving seller:', error)
  } finally {
    saving.value = false
  }
}

const toggleSellerStatus = async (seller: any) => {
  try {
    const newStatus = seller.status === 'active' ? 'suspended' : 'active'
    
    // TODO: Replace with actual API call
    // await apiService.admin.updateSellerStatus(seller.id, newStatus)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    seller.status = newStatus
    console.log(`Seller status updated to ${newStatus}`)
  } catch (error) {
    console.error('Error updating seller status:', error)
  }
}

const deleteSeller = async (seller: any) => {
  if (!confirm(`Are you sure you want to delete ${seller.businessName}? This action cannot be undone.`)) {
    return
  }
  
  try {
    // TODO: Replace with actual API call
    // await apiService.admin.deleteSeller(seller.id)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = sellers.value.findIndex(s => s.id === seller.id)
    if (index !== -1) {
      sellers.value.splice(index, 1)
    }
    
    // Remove from selected sellers if present
    const selectedIndex = selectedSellers.value.indexOf(seller.id)
    if (selectedIndex !== -1) {
      selectedSellers.value.splice(selectedIndex, 1)
    }
    
    console.log('Seller deleted successfully')
  } catch (error) {
    console.error('Error deleting seller:', error)
  }
}

const bulkApprove = async () => {
  if (!confirm(`Are you sure you want to approve ${selectedSellers.value.length} sellers?`)) {
    return
  }
  
  try {
    // TODO: Replace with actual API call
    // await apiService.admin.bulkApproveSellers(selectedSellers.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update selected sellers status
    sellers.value.forEach(seller => {
      if (selectedSellers.value.includes(seller.id)) {
        seller.status = 'active'
        seller.verificationStatus = 'verified'
      }
    })
    
    selectedSellers.value = []
    console.log('Sellers approved successfully')
  } catch (error) {
    console.error('Error approving sellers:', error)
  }
}

const exportSellers = async () => {
  exporting.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.admin.exportSellers(filteredSellers.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // TODO: Handle actual file download
    console.log('Sellers exported successfully')
  } catch (error) {
    console.error('Error exporting sellers:', error)
  } finally {
    exporting.value = false
  }
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedStatus, selectedVerification, sortBy], () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  // Set page title
  document.title = 'Seller Management - Admin Panel - WebProsHub Marketplace'
})
</script>
