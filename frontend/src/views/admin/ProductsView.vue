<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Product Management</h1>
            <p class="mt-2 text-gray-600">Manage all products across the marketplace</p>
          </div>
          <button
            @click="showCreateModal = true"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Add Product
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Products</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalProducts }}</p>
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
              <p class="text-sm font-medium text-gray-500">Active Products</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.activeProducts }}</p>
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
              <p class="text-sm font-medium text-gray-500">Pending Approval</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.pendingApproval }}</p>
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
              <p class="text-sm font-medium text-gray-500">Low Stock</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.lowStock }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name, SKU, or seller..."
                class="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Category Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              v-model="selectedCategory"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Garden</option>
              <option value="sports">Sports</option>
              <option value="books">Books</option>
            </select>
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
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
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
              <option value="price">Price</option>
              <option value="createdAt">Date Added</option>
              <option value="sales">Sales</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Products ({{ filteredProducts.length }})</h2>
            <div class="flex items-center space-x-4">
              <button
                @click="exportProducts"
                :disabled="exporting"
                class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ exporting ? 'Exporting...' : 'Export' }}
              </button>
              <button
                @click="bulkApprove"
                :disabled="selectedProducts.length === 0"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve Selected ({{ selectedProducts.length }})
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
                  Product
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price & Stock
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="product in paginatedProducts"
                :key="product.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    v-model="selectedProducts"
                    :value="product.id"
                    type="checkbox"
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">SKU: {{ product.sku }}</div>
                      <div class="text-xs text-gray-400">{{ product.brand }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ product.seller.businessName }}</div>
                    <div class="text-sm text-gray-500">{{ product.seller.fullName }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {{ product.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    <div>₱{{ formatCurrency(product.price) }}</div>
                    <div class="text-xs text-gray-500">
                      Stock: {{ product.stock }}
                      <span
                        v-if="product.stock <= 10"
                        class="text-red-600 font-medium ml-1"
                      >
                        (Low)
                      </span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(product.status)
                    ]"
                  >
                    {{ product.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    <div>Sales: {{ product.performance.sales }}</div>
                    <div>Rating: {{ product.performance.rating }}/5</div>
                    <div>Reviews: {{ product.performance.reviews }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(product.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      @click="viewProduct(product)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      @click="editProduct(product)"
                      class="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button
                      @click="toggleProductStatus(product)"
                      :class="product.status === 'active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'"
                    >
                      {{ product.status === 'active' ? 'Deactivate' : 'Activate' }}
                    </button>
                    <button
                      @click="deleteProduct(product)"
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
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredProducts.length }} results
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

    <!-- Create/Edit Product Modal -->
    <div
      v-if="showCreateModal || editingProduct"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingProduct ? 'Edit Product' : 'Create New Product' }}
          </h3>
          
          <form @submit.prevent="saveProduct" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                v-model="productForm.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">SKU</label>
              <input
                v-model="productForm.sku"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                v-model="productForm.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports</option>
                <option value="books">Books</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                v-model="productForm.price"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                v-model="productForm.stock"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="productForm.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
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
                {{ saving ? 'Saving...' : (editingProduct ? 'Update' : 'Create') }}
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
const selectedCategory = ref('')
const selectedStatus = ref('')
const sortBy = ref('name')
const selectedProducts = ref<string[]>([])
const showCreateModal = ref(false)
const editingProduct = ref<any>(null)
const saving = ref(false)
const exporting = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

// Product form
const productForm = ref({
  name: '',
  sku: '',
  category: 'electronics',
  price: 0,
  stock: 0,
  status: 'pending'
})

// Mock data
const stats = ref({
  totalProducts: 1247,
  activeProducts: 1189,
  pendingApproval: 23,
  lowStock: 35
})

const products = ref([
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    sku: 'WH-001',
    brand: 'TechSound',
    category: 'electronics',
    price: 2500,
    stock: 45,
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    seller: {
      businessName: 'Smith Electronics',
      fullName: 'Jane Smith'
    },
    performance: {
      sales: 156,
      rating: 4.5,
      reviews: 89
    }
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    sku: 'SW-002',
    brand: 'FitTech',
    category: 'electronics',
    price: 8500,
    stock: 12,
    status: 'active',
    createdAt: '2024-01-12T14:20:00Z',
    seller: {
      businessName: 'TechGadgets',
      fullName: 'Mike Johnson'
    },
    performance: {
      sales: 78,
      rating: 4.2,
      reviews: 45
    }
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    sku: 'TS-003',
    brand: 'EcoWear',
    category: 'fashion',
    price: 850,
    stock: 3,
    status: 'active',
    createdAt: '2024-01-18T09:15:00Z',
    seller: {
      businessName: 'Green Fashion',
      fullName: 'Sarah Wilson'
    },
    performance: {
      sales: 234,
      rating: 4.7,
      reviews: 156
    }
  },
  {
    id: '4',
    name: 'Garden Tool Set',
    sku: 'GT-004',
    brand: 'GardenPro',
    category: 'home',
    price: 3200,
    stock: 0,
    status: 'inactive',
    createdAt: '2024-01-10T16:45:00Z',
    seller: {
      businessName: 'Home & Garden',
      fullName: 'David Brown'
    },
    performance: {
      sales: 45,
      rating: 4.1,
      reviews: 23
    }
  }
])

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value.filter(product => {
    const matchesSearch = !searchQuery.value || 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.seller.businessName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    const matchesStatus = !selectedStatus.value || product.status === selectedStatus.value
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return a.price - b.price
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'sales':
        return b.performance.sales - a.performance.sales
      case 'rating':
        return b.performance.rating - a.performance.rating
      default:
        return 0
    }
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredProducts.value.length))
const paginatedProducts = computed(() => filteredProducts.value.slice(startIndex.value, endIndex.value))

const selectAll = computed({
  get: () => selectedProducts.value.length === paginatedProducts.value.length && paginatedProducts.value.length > 0,
  set: (value) => {
    if (value) {
      selectedProducts.value = paginatedProducts.value.map(product => product.id)
    } else {
      selectedProducts.value = []
    }
  }
})

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'inactive':
      return 'bg-gray-100 text-gray-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
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
    selectedProducts.value = []
  } else {
    selectedProducts.value = paginatedProducts.value.map(product => product.id)
  }
}

const viewProduct = (product: any) => {
  // TODO: Navigate to product detail page
  console.log('View product:', product.id)
}

const editProduct = (product: any) => {
  editingProduct.value = product
  productForm.value = {
    name: product.name,
    sku: product.sku,
    category: product.category,
    price: product.price,
    stock: product.stock,
    status: product.status
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingProduct.value = null
  productForm.value = {
    name: '',
    sku: '',
    category: 'electronics',
    price: 0,
    stock: 0,
    status: 'pending'
  }
}

const saveProduct = async () => {
  saving.value = true
  try {
    // TODO: Replace with actual API call
    // if (editingProduct.value) {
    //   await apiService.admin.updateProduct(editingProduct.value.id, productForm.value)
    // } else {
    //   await apiService.admin.createProduct(productForm.value)
    // }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (editingProduct.value) {
      // Update existing product
      const index = products.value.findIndex(p => p.id === editingProduct.value.id)
      if (index !== -1) {
        products.value[index] = { ...products.value[index], ...productForm.value }
      }
    } else {
      // Add new product
      const newProduct = {
        id: Date.now().toString(),
        ...productForm.value,
        brand: 'New Brand',
        createdAt: new Date().toISOString(),
        seller: {
          businessName: 'Admin Created',
          fullName: 'System Admin'
        },
        performance: {
          sales: 0,
          rating: 0,
          reviews: 0
        }
      }
      products.value.unshift(newProduct)
    }
    
    closeModal()
    console.log('Product saved successfully')
  } catch (error) {
    console.error('Error saving product:', error)
  } finally {
    saving.value = false
  }
}

const toggleProductStatus = async (product: any) => {
  try {
    const newStatus = product.status === 'active' ? 'inactive' : 'active'
    
    // TODO: Replace with actual API call
    // await apiService.admin.updateProductStatus(product.id, newStatus)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    product.status = newStatus
    console.log(`Product status updated to ${newStatus}`)
  } catch (error) {
    console.error('Error updating product status:', error)
  }
}

const deleteProduct = async (product: any) => {
  if (!confirm(`Are you sure you want to delete ${product.name}? This action cannot be undone.`)) {
    return
  }
  
  try {
    // TODO: Replace with actual API call
    // await apiService.admin.deleteProduct(product.id)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = products.value.findIndex(p => p.id === product.id)
    if (index !== -1) {
      products.value.splice(index, 1)
    }
    
    // Remove from selected products if present
    const selectedIndex = selectedProducts.value.indexOf(product.id)
    if (selectedIndex !== -1) {
      selectedProducts.value.splice(selectedIndex, 1)
    }
    
    console.log('Product deleted successfully')
  } catch (error) {
    console.error('Error deleting product:', error)
  }
}

const bulkApprove = async () => {
  if (!confirm(`Are you sure you want to approve ${selectedProducts.value.length} products?`)) {
    return
  }
  
  try {
    // TODO: Replace with actual API call
    // await apiService.admin.bulkApproveProducts(selectedProducts.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update selected products status
    products.value.forEach(product => {
      if (selectedProducts.value.includes(product.id)) {
        product.status = 'active'
      }
    })
    
    selectedProducts.value = []
    console.log('Products approved successfully')
  } catch (error) {
    console.error('Error approving products:', error)
  }
}

const exportProducts = async () => {
  exporting.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.admin.exportProducts(filteredProducts.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // TODO: Handle actual file download
    console.log('Products exported successfully')
  } catch (error) {
    console.error('Error exporting products:', error)
  } finally {
    exporting.value = false
  }
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedCategory, selectedStatus, sortBy], () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  // Set page title
  document.title = 'Product Management - Admin Panel - WebProsHub Marketplace'
})
</script>
