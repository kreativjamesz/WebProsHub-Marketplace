<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">My Stores</h1>
            <p class="mt-2 text-gray-600">Manage your business stores and locations</p>
          </div>
          <button
            @click="showCreateModal = true"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Create New Store
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Stores</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalStores }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
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
                <svg
                  class="w-5 h-5 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
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
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Products</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalProducts }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stores Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          v-for="store in stores"
          :key="store.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <!-- Store Image -->
          <div class="h-48 bg-gray-200 relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <svg
                class="w-16 h-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>

            <!-- Status Badge -->
            <div class="absolute top-3 right-3">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                  getStatusColor(store.status),
                ]"
              >
                {{ store.status }}
              </span>
            </div>

            <!-- Verification Badge -->
            <div v-if="store.verified" class="absolute top-3 left-3">
              <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Store Info -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-lg font-medium text-gray-900">{{ store.name }}</h3>
              <div class="flex items-center space-x-2">
                <button @click="editStore(store)" class="text-blue-600 hover:text-blue-700">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button @click="deleteStore(store)" class="text-red-600 hover:text-red-700">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <p class="text-gray-600 text-sm mb-4">{{ store.description }}</p>

            <!-- Store Stats -->
            <div class="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <div class="text-lg font-semibold text-gray-900">{{ store.products }}</div>
                <div class="text-xs text-gray-500">Products</div>
              </div>
              <div>
                <div class="text-lg font-semibold text-gray-900">{{ store.orders }}</div>
                <div class="text-xs text-gray-500">Orders</div>
              </div>
              <div>
                <div class="text-lg font-semibold text-gray-900">{{ store.rating }}</div>
                <div class="text-xs text-gray-500">Rating</div>
              </div>
            </div>

            <!-- Store Location -->
            <div class="flex items-center text-sm text-gray-500 mb-4">
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {{ store.location }}
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button
                @click="viewStore(store)"
                class="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                View Store
              </button>
              <button
                @click="manageProducts(store)"
                class="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Manage Products
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="stores.length === 0" class="text-center py-12">
        <div
          class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No stores yet</h3>
        <p class="text-gray-500 mb-6">Create your first store to start selling products</p>
        <button
          @click="showCreateModal = true"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
        >
          Create Your First Store
        </button>
      </div>
    </div>

    <!-- Create/Edit Store Modal -->
    <div
      v-if="showCreateModal || editingStore"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingStore ? 'Edit Store' : 'Create New Store' }}
          </h3>

          <form @submit.prevent="saveStore" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
              <input
                v-model="storeForm.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                v-model="storeForm.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your store..."
                required
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                v-model="storeForm.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports</option>
                <option value="food">Food & Beverage</option>
                <option value="beauty">Beauty & Health</option>
                <option value="books">Books & Media</option>
                <option value="automotive">Automotive</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                v-model="storeForm.location"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="City, Province"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
              <input
                v-model="storeForm.contactPhone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+63 912 345 6789"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                v-model="storeForm.contactEmail"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="store@example.com"
              />
            </div>

            <div class="flex items-center">
              <input
                v-model="storeForm.featured"
                type="checkbox"
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-700">
                Feature this store (additional fee applies)
              </label>
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
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : editingStore ? 'Update Store' : 'Create Store' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Modal states
const showCreateModal = ref(false)
const editingStore = ref<any>(null)
const saving = ref(false)

// Store form
const storeForm = ref({
  name: '',
  description: '',
  category: '',
  location: '',
  contactPhone: '',
  contactEmail: '',
  featured: false,
})

// Mock data
const stats = ref({
  totalStores: 3,
  activeStores: 2,
  pendingApproval: 1,
  totalProducts: 45,
})

const stores = ref([
  {
    id: '1',
    name: 'TechGadgets Store',
    description: 'Premium electronics and gadgets store offering the latest technology products',
    category: 'electronics',
    location: 'Makati City, Metro Manila',
    status: 'active',
    verified: true,
    products: 25,
    orders: 156,
    rating: 4.8,
    contactPhone: '+63 912 345 6789',
    contactEmail: 'techgadgets@example.com',
  },
  {
    id: '2',
    name: 'Fashion Boutique',
    description: 'Trendy fashion store with the latest styles and accessories',
    category: 'fashion',
    location: 'Quezon City, Metro Manila',
    status: 'active',
    verified: true,
    products: 18,
    orders: 89,
    rating: 4.6,
    contactPhone: '+63 923 456 7890',
    contactEmail: 'fashionboutique@example.com',
  },
  {
    id: '3',
    name: 'Home & Garden Center',
    description: 'Complete home improvement and garden supplies store',
    category: 'home',
    location: 'Cebu City, Cebu',
    status: 'pending',
    verified: false,
    products: 12,
    orders: 23,
    rating: 4.2,
    contactPhone: '+63 934 567 8901',
    contactEmail: 'homegarden@example.com',
  },
])

// Methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'suspended':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const editStore = (store: any) => {
  editingStore.value = store
  storeForm.value = {
    name: store.name,
    description: store.description,
    category: store.category,
    location: store.location,
    contactPhone: store.contactPhone,
    contactEmail: store.contactEmail,
    featured: false,
  }
  showCreateModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  editingStore.value = null
  storeForm.value = {
    name: '',
    description: '',
    category: '',
    location: '',
    contactPhone: '',
    contactEmail: '',
    featured: false,
  }
}

const saveStore = async () => {
  saving.value = true
  try {
    // TODO: Replace with actual API call
    // if (editingStore.value) {
    //   await apiService.seller.updateStore(editingStore.value.id, storeForm.value)
    // } else {
    //   await apiService.seller.createStore(storeForm.value)
    // }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (editingStore.value) {
      // Update existing store
      const index = stores.value.findIndex((s) => s.id === editingStore.value.id)
      if (index !== -1) {
        stores.value[index] = { ...stores.value[index], ...storeForm.value }
      }
    } else {
      // Add new store
      const newStore = {
        id: Date.now().toString(),
        ...storeForm.value,
        status: 'pending',
        verified: false,
        products: 0,
        orders: 0,
        rating: 0,
      }
      stores.value.unshift(newStore)
    }

    closeModal()
    console.log('Store saved successfully')
  } catch (error) {
    console.error('Error saving store:', error)
  } finally {
    saving.value = false
  }
}

const deleteStore = async (store: any) => {
  if (!confirm(`Are you sure you want to delete ${store.name}? This action cannot be undone.`)) {
    return
  }

  try {
    // TODO: Replace with actual API call
    // await apiService.seller.deleteStore(store.id)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = stores.value.findIndex((s) => s.id === store.id)
    if (index !== -1) {
      stores.value.splice(index, 1)
    }

    console.log('Store deleted successfully')
  } catch (error) {
    console.error('Error deleting store:', error)
  }
}

const viewStore = (store: any) => {
  // TODO: Navigate to store detail page
  console.log('View store:', store.id)
}

const manageProducts = (store: any) => {
  // TODO: Navigate to products management page
  console.log('Manage products for store:', store.id)
}

// Lifecycle
onMounted(() => {
  // Set page title
  document.title = 'My Stores - Seller Hub - WebProsHub Marketplace'
})
</script>
