<template>
  <div class="py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Profile</h1>
        <p class="mt-2 text-gray-600">Manage your account information and preferences</p>
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
                    v-model="profile.firstName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    v-model="profile.lastName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  v-model="profile.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled
                />
                <p class="mt-1 text-sm text-gray-500">Email cannot be changed</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  v-model="profile.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+63 912 345 6789"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  v-model="profile.dateOfBirth"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  v-model="profile.gender"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="updating"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ updating ? 'Updating...' : 'Update Profile' }}
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
                  v-model="address.street"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    v-model="address.city"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Manila"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Province</label>
                  <input
                    v-model="address.province"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Metro Manila"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input
                    v-model="address.postalCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1000"
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  v-model="address.country"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select country</option>
                  <option value="Philippines">Philippines</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="updatingAddress"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ updatingAddress ? 'Updating...' : 'Update Address' }}
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
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  v-model="preferences.language"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="tl">Tagalog</option>
                  <option value="es">Spanish</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  v-model="preferences.currency"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="PHP">Philippine Peso (₱)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>

              <div class="space-y-4">
                <h3 class="text-sm font-medium text-gray-700">Notifications</h3>

                <div class="space-y-3">
                  <label class="flex items-center">
                    <input
                      v-model="preferences.emailNotifications"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Email notifications</span>
                  </label>

                  <label class="flex items-center">
                    <input
                      v-model="preferences.smsNotifications"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">SMS notifications</span>
                  </label>

                  <label class="flex items-center">
                    <input
                      v-model="preferences.pushNotifications"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Push notifications</span>
                  </label>

                  <label class="flex items-center">
                    <input
                      v-model="preferences.marketingEmails"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Marketing emails</span>
                  </label>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="updatingPreferences"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ updatingPreferences ? 'Updating...' : 'Update Preferences' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Security -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Security</h2>
          </div>

          <div class="p-6">
            <div class="space-y-6">
              <!-- Change Password -->
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-4">Change Password</h3>
                <form @submit.prevent="changePassword" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Current Password</label
                    >
                    <input
                      v-model="passwordForm.currentPassword"
                      type="password"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      v-model="passwordForm.newPassword"
                      type="password"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div class="flex justify-end">
                    <button
                      type="submit"
                      :disabled="changingPassword"
                      class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ changingPassword ? 'Changing...' : 'Change Password' }}
                    </button>
                  </div>
                </form>
              </div>

              <!-- Two-Factor Authentication -->
              <div class="border-t border-gray-200 pt-6">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-medium text-gray-700">Two-Factor Authentication</h3>
                    <p class="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    @click="toggleTwoFactor"
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                  >
                    {{ preferences.twoFactorEnabled ? 'Disable' : 'Enable' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Actions -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Account Actions</h2>
          </div>

          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Delete Account</h3>
                  <p class="text-sm text-gray-500">Permanently delete your account and all data</p>
                </div>
                <button
                  @click="showDeleteConfirm = true"
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

    <!-- Delete Account Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-4">Delete Account</h3>
          <p class="text-sm text-gray-500 mt-2">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>
          <div class="mt-6 flex space-x-3">
            <button
              @click="showDeleteConfirm = false"
              class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              @click="deleteAccount"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Delete
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

// Import mocks from centralized location
import { mockProfile, mockAddress, mockPreferences } from '@/mocks'

const router = useRouter()
const authStore = useAuthStore()

// Reactive data
const updating = ref(false)
const updatingAddress = ref(false)
const updatingPreferences = ref(false)
const changingPassword = ref(false)
const showDeleteConfirm = ref(false)

const profile = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
})

const address = ref({
  street: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
})

const preferences = ref({
  language: 'en',
  currency: 'PHP',
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  marketingEmails: false,
  twoFactorEnabled: false,
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// Methods
const updateProfile = async () => {
  updating.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.buyers.updateProfile(profile.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success message
    console.log('Profile updated successfully')
  } catch (error) {
    console.error('Error updating profile:', error)
  } finally {
    updating.value = false
  }
}

const updateAddress = async () => {
  updatingAddress.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.buyers.updateAddress(address.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success message
    console.log('Address updated successfully')
  } catch (error) {
    console.error('Error updating address:', error)
  } finally {
    updatingAddress.value = false
  }
}

const updatePreferences = async () => {
  updatingPreferences.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.buyers.updatePreferences(preferences.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success message
    console.log('Preferences updated successfully')
  } catch (error) {
    console.error('Error updating preferences:', error)
  } finally {
    updatingPreferences.value = false
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
    // await apiService.buyers.changePassword({
    //   currentPassword: passwordForm.value.currentPassword,
    //   newPassword: passwordForm.value.newPassword
    // })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Clear form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }

    // Show success message
    console.log('Password changed successfully')
  } catch (error) {
    console.error('Error changing password:', error)
  } finally {
    changingPassword.value = false
  }
}

const toggleTwoFactor = () => {
  preferences.value.twoFactorEnabled = !preferences.value.twoFactorEnabled
  // TODO: Implement actual 2FA toggle
  console.log(
    'Two-factor authentication:',
    preferences.value.twoFactorEnabled ? 'enabled' : 'disabled',
  )
}

const deleteAccount = async () => {
  try {
    // TODO: Replace with actual API call
    // await apiService.buyers.deleteAccount()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Logout and redirect
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Error deleting account:', error)
  } finally {
    showDeleteConfirm.value = false
  }
}

const loadProfileData = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.buyers.getProfile()
    // profile.value = response.data.profile
    // address.value = response.data.address
    // preferences.value = response.data.preferences

    // Using mock data for now
    profile.value = { ...mockProfile }
    address.value = { ...mockAddress }
    preferences.value = { ...mockPreferences }
  } catch (error) {
    console.error('Error loading profile data:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadProfileData()
})
</script>
