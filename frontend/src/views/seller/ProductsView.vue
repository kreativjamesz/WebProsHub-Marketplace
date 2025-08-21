<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">My Products</h1>
            <p class="text-gray-600">Manage your product catalog</p>
          </div>
          <button
            @click="showAddProductModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Product
          </button>
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
              placeholder="Search products..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            v-model="selectedCategory"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <select
            v-model="selectedStatus"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
        >
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
            <img
              :src="product.images[0] || '/images/placeholder-product.jpg'"
              :alt="product.name"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-900 truncate">{{ product.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ product.category?.name }}</p>
            <div class="mt-2 flex items-center justify-between">
              <span class="text-lg font-bold text-gray-900">₱{{ product.price.toLocaleString() }}</span>
              <span class="text-sm text-gray-500">Stock: {{ product.stock }}</span>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]"
              >
                {{ product.isActive ? 'Active' : 'Inactive' }}
              </span>
              <div class="flex space-x-2">
                <button
                  @click="editProduct(product)"
                  class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  @click="toggleProductStatus(product)"
                  :class="[
                    'text-sm font-medium',
                    product.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                  ]"
                >
                  {{ product.isActive ? 'Deactivate' : 'Activate' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
        <div class="mt-6">
          <button
            @click="showAddProductModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Product
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div v-if="showAddProductModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
          </h3>
          <form @submit.prevent="saveProduct" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                v-model="productForm.name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                v-model="productForm.description"
                rows="3"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Price</label>
              <input
                v-model="productForm.price"
                type="number"
                step="0.01"
                min="0"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Stock</label>
              <input
                v-model="productForm.stock"
                type="number"
                min="0"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <select
                v-model="productForm.categoryId"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {{ editingProduct ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Product, Category } from '@/types/marketplace'
import { mockProducts, mockCategories } from '@/mocks'

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const showAddProductModal = ref(false)
const editingProduct = ref<Product | null>(null)

// Mock data - in real app, this would come from API
const products = ref<Product[]>(mockProducts.filter(p => p.sellerId === 'seller1'))
const categories = ref<Category[]>(mockCategories)

// Product form
const productForm = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  categoryId: ''
})

// Computed
const filteredProducts = computed(() => {
  let filtered = products.value

  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.categoryId === selectedCategory.value)
  }

  if (selectedStatus.value) {
    if (selectedStatus.value === 'active') {
      filtered = filtered.filter(product => product.isActive)
    } else if (selectedStatus.value === 'inactive') {
      filtered = filtered.filter(product => !product.isActive)
    }
  }

  return filtered
})

// Methods
const editProduct = (product: Product) => {
  editingProduct.value = product
  productForm.value = {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categoryId: product.categoryId
  }
  showAddProductModal.value = true
}

const saveProduct = () => {
  if (editingProduct.value) {
    // Update existing product
    const index = products.value.findIndex(p => p.id === editingProduct.value?.id)
    if (index !== -1) {
      products.value[index] = {
        ...products.value[index],
        ...productForm.value,
        updatedAt: new Date().toISOString()
      }
    }
  } else {
    // Create new product
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productForm.value,
      images: [],
      storeId: '1', // Mock store ID
      sellerId: 'seller1',
      category: categories.value.find(c => c.id === productForm.value.categoryId)!,
      isActive: true,
      isFeatured: false,
      minStock: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    products.value.push(newProduct)
  }

  closeModal()
}

const toggleProductStatus = (product: Product) => {
  const index = products.value.findIndex(p => p.id === product.id)
  if (index !== -1) {
    products.value[index].isActive = !products.value[index].isActive
    products.value[index].updatedAt = new Date().toISOString()
  }
}

const closeModal = () => {
  showAddProductModal.value = false
  editingProduct.value = null
  productForm.value = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: ''
  }
}

onMounted(() => {
  // In real app, fetch products and categories from API
})
</script>
