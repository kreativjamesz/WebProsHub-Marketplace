<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
        <p class="text-gray-600">Manage your account information and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <div class="text-center">
              <div class="relative inline-block">
                <img
                  :src="userProfile.avatar || '/images/avatars/default.jpg'"
                  :alt="userProfile.name"
                  class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button
                  @click="showAvatarModal = true"
                  class="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 class="mt-4 text-xl font-semibold text-gray-900">{{ userProfile.name }}</h2>
              <p class="text-gray-600">{{ userProfile.email }}</p>
              <div class="mt-2">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getRoleClass(userProfile.role)
                  ]"
                >
                  {{ getRoleText(userProfile.role) }}
                </span>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-indigo-600">{{ stats.totalOrders }}</div>
                  <div class="text-sm text-gray-500">Orders</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-green-600">{{ stats.totalSpent }}</div>
                  <div class="text-sm text-gray-500">Total Spent</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Information -->
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Personal Information</h3>
            </div>
            <div class="p-6">
              <form @submit.prevent="updateProfile" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      v-model="profileForm.name"
                      type="text"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      v-model="profileForm.phone"
                      type="tel"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    required
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                  />
                  <p class="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    :disabled="isUpdating"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <svg v-if="isUpdating" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isUpdating ? 'Updating...' : 'Update Profile' }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Addresses -->
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">Addresses</h3>
                <button
                  @click="showAddressModal = true"
                  class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Address
                </button>
              </div>
            </div>
            <div class="p-6">
              <div v-if="addresses.length === 0" class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No addresses</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding your first address.</p>
              </div>
              <div v-else class="space-y-4">
                <div
                  v-for="address in addresses"
                  :key="address.id"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
                        <h4 class="text-sm font-medium text-gray-900">{{ address.name }}</h4>
                        <span
                          :class="[
                            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                            address.type === 'SHIPPING' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          ]"
                        >
                          {{ address.type === 'SHIPPING' ? 'Shipping' : 'Billing' }}
                        </span>
                        <span v-if="address.isDefault" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          Default
                        </span>
                      </div>
                      <p class="mt-1 text-sm text-gray-600">{{ address.address }}</p>
                      <p class="text-sm text-gray-600">{{ address.city }}, {{ address.state }} {{ address.postalCode }}</p>
                      <p class="text-sm text-gray-600">{{ address.country }}</p>
                      <p class="text-sm text-gray-600">{{ address.phone }}</p>
                    </div>
                    <div class="flex space-x-2">
                      <button
                        @click="editAddress(address)"
                        class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteAddress(address.id)"
                        class="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Security -->
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Security</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Change Password</h4>
                  <p class="text-sm text-gray-500">Update your password to keep your account secure.</p>
                  <button
                    @click="showPasswordModal = true"
                    class="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change Password
                  </button>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p class="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                  <button
                    @click="enable2FA"
                    class="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Upload Modal -->
    <div v-if="showAvatarModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Update Profile Picture</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Upload Image</label>
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                @change="handleAvatarUpload"
                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            <div class="flex justify-end space-x-3">
              <button
                @click="showAvatarModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                @click="uploadAvatar"
                :disabled="!selectedAvatar"
                class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Address Modal -->
    <div v-if="showAddressModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingAddress ? 'Edit Address' : 'Add New Address' }}
          </h3>
          <form @submit.prevent="saveAddress" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  v-model="addressForm.name"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  v-model="addressForm.phone"
                  type="tel"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Address</label>
              <input
                v-model="addressForm.address"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">City</label>
                <input
                  v-model="addressForm.city"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">State/Province</label>
                <input
                  v-model="addressForm.state"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  v-model="addressForm.postalCode"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Country</label>
                <input
                  v-model="addressForm.country"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Address Type</label>
                <select
                  v-model="addressForm.type"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="SHIPPING">Shipping</option>
                  <option value="BILLING">Billing</option>
                </select>
              </div>
            </div>
            <div class="flex items-center">
              <input
                v-model="addressForm.isDefault"
                type="checkbox"
                id="default-address"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="default-address" class="ml-2 block text-sm text-gray-900">
                Set as default address
              </label>
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="closeAddressModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {{ editingAddress ? 'Update' : 'Add' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Password Change Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">New Password</label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                required
                minlength="8"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="showPasswordModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change Password
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
import type { User, Address } from '@/types/marketplace'
import { mockUsers, mockOrders } from '@/mocks'

// Reactive data
const showAvatarModal = ref(false)
const showAddressModal = ref(false)
const showPasswordModal = ref(false)
const isUpdating = ref(false)
const selectedAvatar = ref<File | null>(null)
const editingAddress = ref<Address | null>(null)

// Mock data - in real app, this would come from API
const userProfile = ref<User>(mockUsers[0]) // Assuming first user is current user
const addresses = ref<Address[]>([
  {
    id: '1',
    userId: 'buyer1',
    type: 'SHIPPING',
    name: 'John Doe',
    phone: '+63 912 345 6789',
    address: '123 Main St',
    city: 'Manila',
    state: 'Metro Manila',
    country: 'Philippines',
    postalCode: '1000',
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
])

// Form data
const profileForm = ref({
  name: userProfile.value.name,
  email: userProfile.value.email,
  phone: userProfile.value.phone || ''
})

const addressForm = ref({
  name: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  type: 'SHIPPING' as 'SHIPPING' | 'BILLING',
  isDefault: false
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Computed
const stats = computed(() => {
  const userOrders = mockOrders.filter(order => order.buyerId === userProfile.value.id)
  return {
    totalOrders: userOrders.length,
    totalSpent: `₱${userOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}`
  }
})

// Methods
const updateProfile = async () => {
  isUpdating.value = true
  try {
    // In real app, make API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    userProfile.value = {
      ...userProfile.value,
      ...profileForm.value,
      updatedAt: new Date().toISOString()
    }
    
    // Show success message
    console.log('Profile updated successfully')
  } catch (error) {
    console.error('Failed to update profile:', error)
  } finally {
    isUpdating.value = false
  }
}

const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedAvatar.value = target.files[0]
  }
}

const uploadAvatar = async () => {
  if (!selectedAvatar.value) return
  
  try {
    // In real app, upload to server
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create preview URL
    const imageUrl = URL.createObjectURL(selectedAvatar.value)
    userProfile.value.avatar = imageUrl
    
    showAvatarModal.value = false
    selectedAvatar.value = null
  } catch (error) {
    console.error('Failed to upload avatar:', error)
  }
}

const editAddress = (address: Address) => {
  editingAddress.value = address
  addressForm.value = { ...address }
  showAddressModal.value = true
}

const saveAddress = () => {
  if (editingAddress.value) {
    // Update existing address
    const index = addresses.value.findIndex(a => a.id === editingAddress.value?.id)
    if (index !== -1) {
      addresses.value[index] = {
        ...addresses.value[index],
        ...addressForm.value,
        updatedAt: new Date().toISOString()
      }
    }
  } else {
    // Create new address
    const newAddress: Address = {
      id: Date.now().toString(),
      userId: userProfile.value.id,
      ...addressForm.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    addresses.value.push(newAddress)
  }
  
  closeAddressModal()
}

const deleteAddress = (addressId: string) => {
  if (confirm('Are you sure you want to delete this address?')) {
    addresses.value = addresses.value.filter(a => a.id !== addressId)
  }
}

const closeAddressModal = () => {
  showAddressModal.value = false
  editingAddress.value = null
  addressForm.value = {
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    type: 'SHIPPING',
    isDefault: false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New passwords do not match')
    return
  }
  
  try {
    // In real app, make API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showPasswordModal.value = false
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    
    console.log('Password changed successfully')
  } catch (error) {
    console.error('Failed to change password:', error)
  }
}

const enable2FA = () => {
  // In real app, implement 2FA setup
  console.log('Enabling 2FA...')
}

const getRoleClass = (role: string) => {
  const roleClasses = {
    BUYER: 'bg-blue-100 text-blue-800',
    SELLER: 'bg-green-100 text-green-800',
    ADMIN: 'bg-red-100 text-red-800',
    STAFF: 'bg-purple-100 text-purple-800'
  }
  return roleClasses[role as keyof typeof roleClasses] || 'bg-gray-100 text-gray-800'
}

const getRoleText = (role: string) => {
  const roleTexts = {
    BUYER: 'Buyer',
    SELLER: 'Seller',
    ADMIN: 'Administrator',
    STAFF: 'Staff'
  }
  return roleTexts[role as keyof typeof roleTexts] || role
}

onMounted(() => {
  // In real app, fetch user profile and addresses from API
})
</script>
