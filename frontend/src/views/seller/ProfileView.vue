<template>
  <div class="py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Seller Profile</h1>
        <p class="mt-2 text-gray-600">Manage your business information and profile settings</p>
      </div>

      <!-- Profile Content -->
      <div class="space-y-8">
        <!-- Personal Information -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Personal Information</h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    v-model="profileForm.firstName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    v-model="profileForm.lastName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  v-model="profileForm.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  v-model="profileForm.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  v-model="profileForm.dateOfBirth"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="saving"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ saving ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Business Information -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Business Information</h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="updateBusiness" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input
                  v-model="businessForm.businessName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                <select
                  v-model="businessForm.businessType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select business type</option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="service">Service</option>
                  <option value="food">Food & Beverage</option>
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="electronics">Electronics</option>
                  <option value="home">Home & Garden</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Business Description</label
                >
                <textarea
                  v-model="businessForm.description"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe your business, products, and services..."
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Tax ID / Business Registration</label
                  >
                  <input
                    v-model="businessForm.taxId"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Years in Business</label
                  >
                  <input
                    v-model="businessForm.yearsInBusiness"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="savingBusiness"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ savingBusiness ? 'Saving...' : 'Save Business Info' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Address Information -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Address Information</h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="updateAddress" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  v-model="addressForm.street"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    v-model="addressForm.city"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Province/State</label>
                  <input
                    v-model="addressForm.province"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input
                    v-model="addressForm.postalCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  v-model="addressForm.country"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="Philippines">Philippines</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="savingAddress"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ savingAddress ? 'Saving...' : 'Save Address' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Social Media & Links -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Social Media & Links</h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="updateSocial" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    v-model="socialForm.website"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                  <input
                    v-model="socialForm.facebook"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input
                    v-model="socialForm.instagram"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    v-model="socialForm.linkedin"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="savingSocial"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ savingSocial ? 'Saving...' : 'Save Social Links' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Preferences -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Preferences</h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="updatePreferences" class="space-y-6">
              <div class="space-y-4">
                <div class="flex items-center">
                  <input
                    v-model="preferencesForm.emailNotifications"
                    type="checkbox"
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label class="ml-2 block text-sm text-gray-700">
                    Receive email notifications for orders and updates
                  </label>
                </div>

                <div class="flex items-center">
                  <input
                    v-model="preferencesForm.smsNotifications"
                    type="checkbox"
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label class="ml-2 block text-sm text-gray-700">
                    Receive SMS notifications for urgent updates
                  </label>
                </div>

                <div class="flex items-center">
                  <input
                    v-model="preferencesForm.newsletter"
                    type="checkbox"
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label class="ml-2 block text-sm text-gray-700">
                    Subscribe to our newsletter for business tips and updates
                  </label>
                </div>

                <div class="flex items-center">
                  <input
                    v-model="preferencesForm.autoAcceptOrders"
                    type="checkbox"
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label class="ml-2 block text-sm text-gray-700">
                    Automatically accept orders (recommended for high-volume sellers)
                  </label>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="savingPreferences"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ savingPreferences ? 'Saving...' : 'Save Preferences' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Security Settings</h2>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Change Password</h3>
                  <p class="text-sm text-gray-500">Update your account password</p>
                </div>
                <button
                  @click="showChangePasswordModal = true"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Change Password
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Two-Factor Authentication</h3>
                  <p class="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button
                  @click="toggle2FA"
                  :class="[
                    'px-4 py-2 rounded-md font-medium transition-colors duration-200',
                    preferencesForm.twoFactorEnabled
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700',
                  ]"
                >
                  {{ preferencesForm.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA' }}
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Login History</h3>
                  <p class="text-sm text-gray-500">View recent login activity</p>
                </div>
                <button
                  @click="viewLoginHistory"
                  class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="bg-white rounded-lg shadow-md border border-red-200">
          <div class="px-6 py-4 border-b border-red-200 bg-red-50">
            <h2 class="text-lg font-medium text-red-900">Danger Zone</h2>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-red-700">Delete Account</h3>
                  <p class="text-sm text-red-500">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button
                  @click="showDeleteAccountModal = true"
                  class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div
      v-if="showChangePasswordModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Change Password</h3>

          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Confirm New Password</label
              >
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div class="flex space-x-3 mt-6">
              <button
                type="button"
                @click="showChangePasswordModal = false"
                class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="changingPassword"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ changingPassword ? 'Changing...' : 'Change Password' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Account Confirmation Modal -->
    <div
      v-if="showDeleteAccountModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
          >
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Account</h3>
          <p class="text-sm text-gray-500 mb-6">
            Are you sure you want to delete your account? This action cannot be undone and will
            permanently remove all your data, stores, and products.
          </p>

          <div class="flex space-x-3">
            <button
              @click="showDeleteAccountModal = false"
              class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              @click="deleteAccount"
              :disabled="deletingAccount"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ deletingAccount ? 'Deleting...' : 'Delete Account' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const profileForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: ''
})

const businessForm = ref({
  businessName: '',
  businessType: '',
  description: '',
  taxId: '',
  yearsInBusiness: 0,
})

const addressForm = ref({
  street: '',
  city: '',
  province: '',
  postalCode: '',
  country: 'Philippines',
})

const socialForm = ref({
  website: '',
  facebook: '',
  instagram: '',
  linkedin: '',
})

const preferencesForm = ref({
  emailNotifications: true,
  smsNotifications: false,
  newsletter: true,
  autoAcceptOrders: false,
  twoFactorEnabled: false,
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// Modal states
const showChangePasswordModal = ref(false)
const showDeleteAccountModal = ref(false)

// Loading states
const saving = ref(false)
const savingBusiness = ref(false)
const savingAddress = ref(false)
const savingSocial = ref(false)
const savingPreferences = ref(false)
const changingPassword = ref(false)
const deletingAccount = ref(false)

// Mock data - replace with actual user data
const user = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+63 912 345 6789',
  dateOfBirth: '1990-01-01',
  business: {
    businessName: 'TechGadgets Store',
    businessType: 'retail',
    description: 'Premium electronics and gadgets store',
    taxId: '123-456-789',
    yearsInBusiness: 5,
  },
  address: {
    street: '123 Business Street',
    city: 'Makati City',
    province: 'Metro Manila',
    postalCode: '1200',
    country: 'Philippines',
  },
  social: {
    website: 'https://techgadgets.com',
    facebook: 'https://facebook.com/techgadgets',
    instagram: 'https://instagram.com/techgadgets',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
})

// Methods
const updateProfile = async () => {
  saving.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.seller.updateProfile(profileForm.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Profile updated successfully')
    // TODO: Show success notification
  } catch (error) {
    console.error('Error updating profile:', error)
    // TODO: Show error notification
  } finally {
    saving.value = false
  }
}

const updateBusiness = async () => {
  savingBusiness.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.seller.updateBusiness(businessForm.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Business information updated successfully')
    // TODO: Show success notification
  } catch (error) {
    console.error('Error updating business information:', error)
    // TODO: Show error notification
  } finally {
    savingBusiness.value = false
  }
}

const updateAddress = async () => {
  savingAddress.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.seller.updateAddress(addressForm.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Address updated successfully')
    // TODO: Show success notification
  } catch (error) {
    console.error('Error updating address:', error)
    // TODO: Show error notification
  } finally {
    savingAddress.value = false
  }
}

const updateSocial = async () => {
  savingSocial.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.seller.updateSocial(socialForm.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Social links updated successfully')
    // TODO: Show success notification
  } catch (error) {
    console.error('Error updating social links:', error)
    // TODO: Show error notification
  } finally {
    savingSocial.value = false
  }
}

const updatePreferences = async () => {
  savingPreferences.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.seller.updatePreferences(preferencesForm.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Preferences updated successfully')
    // TODO: Show success notification
  } catch (error) {
    console.error('Error updating preferences:', error)
    // TODO: Show error notification
  } finally {
    savingPreferences.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New passwords do not match')
    return
  }

  changingPassword.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.seller.changePassword(passwordForm.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Password changed successfully')
    showChangePasswordModal.value = false
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
    // TODO: Show success notification
  } catch (error) {
    console.error('Error changing password:', error)
    // TODO: Show error notification
  } finally {
    changingPassword.value = false
  }
}

const toggle2FA = async () => {
  try {
    // TODO: Replace with actual API call
    // await apiService.seller.toggle2FA()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    preferencesForm.value.twoFactorEnabled = !preferencesForm.value.twoFactorEnabled
    console.log('2FA toggled successfully')
    // TODO: Show success notification
  } catch (error) {
    console.error('Error toggling 2FA:', error)
    // TODO: Show error notification
  }
}

const viewLoginHistory = () => {
  // TODO: Navigate to login history page or show modal
  console.log('View login history')
}

const deleteAccount = async () => {
  deletingAccount.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.seller.deleteAccount()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Account deleted successfully')
    // TODO: Logout user and redirect to home
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Error deleting account:', error)
    // TODO: Show error notification
  } finally {
    deletingAccount.value = false
    showDeleteAccountModal.value = false
  }
}

// Initialize form data
const initializeForms = () => {
  profileForm.value = {
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
    phone: user.value.phone,
    dateOfBirth: user.value.dateOfBirth,
  }

  businessForm.value = {
    businessName: user.value.business.businessName,
    businessType: user.value.business.businessType,
    description: user.value.business.description,
    taxId: user.value.business.taxId,
    yearsInBusiness: user.value.business.yearsInBusiness,
  }

  addressForm.value = {
    street: user.value.address.street,
    city: user.value.address.city,
    province: user.value.address.province,
    postalCode: user.value.address.postalCode,
    country: user.value.address.country,
  }

  socialForm.value = {
    website: user.value.social.website,
    facebook: user.value.social.facebook,
    instagram: user.value.social.instagram,
    linkedin: user.value.social.linkedin,
  }
}

// Lifecycle
onMounted(() => {
  // Set page title
  document.title = 'Seller Profile - WebProsHub Marketplace'

  // Initialize forms with user data
  initializeForms()
})
</script>
