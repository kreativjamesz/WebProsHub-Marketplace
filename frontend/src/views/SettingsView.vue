<template>
  <div class="py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="mt-2 text-gray-600">Manage your application preferences and account settings</p>
      </div>

      <!-- Settings Content -->
      <div class="space-y-8">
        <!-- Account Settings -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Account Settings</h2>
          </div>
          
          <div class="p-6">
            <div class="space-y-6">
              <!-- Profile Link -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Profile Information</h3>
                  <p class="text-sm text-gray-500">Update your personal information and contact details</p>
                </div>
                <router-link
                  to="/buyer/profile"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Manage Profile
                </router-link>
              </div>
              
              <!-- Password Change -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Password</h3>
                  <p class="text-sm text-gray-500">Change your account password</p>
                </div>
                <button
                  @click="showPasswordModal = true"
                  class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Change Password
                </button>
              </div>
              
              <!-- Two-Factor Authentication -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700">Two-Factor Authentication</h3>
                  <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button
                  @click="toggleTwoFactor"
                  class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  {{ settings.twoFactorEnabled ? 'Disable' : 'Enable' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Notification Settings</h2>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="updateNotificationSettings" class="space-y-6">
              <div class="space-y-4">
                <h3 class="text-sm font-medium text-gray-700">Email Notifications</h3>
                
                <div class="space-y-3">
                  <label class="flex items-center">
                    <input
                      v-model="settings.emailNotifications"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Order updates and shipping notifications</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settings.promotionalEmails"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Promotional offers and deals</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settings.newsletterEmails"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Weekly newsletter</span>
                  </label>
                </div>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-sm font-medium text-gray-700">Push Notifications</h3>
                
                <div class="space-y-3">
                  <label class="flex items-center">
                    <input
                      v-model="settings.pushNotifications"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Order status updates</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settings.pushPromotions"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Promotional notifications</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settings.pushAbandonedCart"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Abandoned cart reminders</span>
                  </label>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="updatingNotifications"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ updatingNotifications ? 'Updating...' : 'Update Notifications' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Privacy Settings</h2>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="updatePrivacySettings" class="space-y-6">
              <div class="space-y-4">
                <h3 class="text-sm font-medium text-gray-700">Data Sharing</h3>
                
                <div class="space-y-3">
                  <label class="flex items-center">
                    <input
                      v-model="settings.shareData"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Allow data sharing for improved services</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settings.analyticsTracking"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Analytics and usage tracking</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settings.personalizedAds"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Personalized advertisements</span>
                  </label>
                </div>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-sm font-medium text-gray-700">Profile Visibility</h3>
                
                <div class="space-y-3">
                  <label class="flex items-center">
                    <input
                      v-model="settings.publicProfile"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Make profile visible to other users</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settings.showActivity"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Show recent activity to friends</span>
                  </label>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="updatingPrivacy"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ updatingPrivacy ? 'Updating...' : 'Update Privacy' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Language & Region -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Language & Region</h2>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="updateLanguageSettings" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    v-model="settings.language"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="tl">Tagalog</option>
                    <option value="es">Spanish</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Region</label>
                  <select
                    v-model="settings.region"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="PH">Philippines</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  v-model="settings.currency"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="PHP">Philippine Peso (₱)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                  <option value="AUD">Australian Dollar (A$)</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                <select
                  v-model="settings.timezone"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Asia/Manila">Asia/Manila (UTC+8)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="America/Los_Angeles">America/Los_Angeles (UTC-8)</option>
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                </select>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="updatingLanguage"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ updatingLanguage ? 'Updating...' : 'Update Language & Region' }}
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
              <!-- Login History -->
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-4">Recent Login Activity</h3>
                <div class="space-y-3">
                  <div
                    v-for="login in recentLogins"
                    :key="login.id"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p class="text-sm font-medium text-gray-700">{{ login.location }}</p>
                      <p class="text-xs text-gray-500">{{ login.device }} • {{ login.ip }}</p>
                      <p class="text-xs text-gray-500">{{ login.timestamp }}</p>
                    </div>
                    <div class="text-right">
                      <span
                        :class="[
                          'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                          login.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        ]"
                      >
                        {{ login.status === 'success' ? 'Success' : 'Failed' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Security Options -->
              <div class="space-y-4">
                <h3 class="text-sm font-medium text-gray-700">Security Options</h3>
                
                <div class="space-y-3">
                  <label class="flex items-center">
                    <input
                      v-model="settings.loginAlerts"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Get notified of new login attempts</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settings.suspiciousActivity"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Alert on suspicious activity</span>
                  </label>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settings.autoLogout"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Auto-logout after inactivity</span>
                  </label>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button
                  @click="updateSecuritySettings"
                  :disabled="updatingSecurity"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ updatingSecurity ? 'Updating...' : 'Update Security' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Data & Storage -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Data & Storage</h2>
          </div>
          
          <div class="p-6">
            <div class="space-y-6">
              <!-- Data Usage -->
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-4">Data Usage</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Profile Data</span>
                    <span class="text-sm font-medium text-gray-900">2.3 MB</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Order History</span>
                    <span class="text-sm font-medium text-gray-900">1.8 MB</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Preferences</span>
                    <span class="text-sm font-medium text-gray-900">0.5 MB</span>
                  </div>
                  <div class="border-t border-gray-200 pt-2">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-medium text-gray-700">Total</span>
                      <span class="text-sm font-medium text-gray-900">4.6 MB</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Data Actions -->
              <div class="space-y-4">
                <h3 class="text-sm font-medium text-gray-700">Data Actions</h3>
                
                <div class="space-y-3">
                  <button
                    @click="exportData"
                    :disabled="exporting"
                    class="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm font-medium text-gray-700">Export My Data</p>
                        <p class="text-xs text-gray-500">Download a copy of your data</p>
                      </div>
                      <span class="text-sm text-gray-400">
                        {{ exporting ? 'Exporting...' : '→' }}
                      </span>
                    </div>
                  </button>
                  
                  <button
                    @click="clearData"
                    :disabled="clearing"
                    class="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm font-medium text-gray-700">Clear All Data</p>
                        <p class="text-xs text-gray-500">Remove all your data from our servers</p>
                      </div>
                      <span class="text-sm text-gray-400">
                        {{ clearing ? 'Clearing...' : '→' }}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div
      v-if="showPasswordModal"
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div class="flex space-x-3 mt-6">
              <button
                type="button"
                @click="showPasswordModal = false"
                class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="changingPassword"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ changingPassword ? 'Changing...' : 'Change Password' }}
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
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Reactive data
const showPasswordModal = ref(false)
const updatingNotifications = ref(false)
const updatingPrivacy = ref(false)
const updatingLanguage = ref(false)
const updatingSecurity = ref(false)
const changingPassword = ref(false)
const exporting = ref(false)
const clearing = ref(false)

const settings = ref({
  // Notification settings
  emailNotifications: true,
  promotionalEmails: false,
  newsletterEmails: true,
  pushNotifications: true,
  pushPromotions: false,
  pushAbandonedCart: true,
  
  // Privacy settings
  shareData: false,
  analyticsTracking: true,
  personalizedAds: false,
  publicProfile: false,
  showActivity: false,
  
  // Language & region
  language: 'en',
  region: 'PH',
  currency: 'PHP',
  timezone: 'Asia/Manila',
  
  // Security settings
  twoFactorEnabled: false,
  loginAlerts: true,
  suspiciousActivity: true,
  autoLogout: true
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const recentLogins = ref([
  {
    id: 1,
    location: 'Manila, Philippines',
    device: 'Chrome on Windows',
    ip: '192.168.1.1',
    timestamp: '2 hours ago',
    status: 'success'
  },
  {
    id: 2,
    location: 'Quezon City, Philippines',
    device: 'Safari on iPhone',
    ip: '192.168.1.2',
    timestamp: '1 day ago',
    status: 'success'
  },
  {
    id: 3,
    location: 'Unknown Location',
    device: 'Unknown Device',
    ip: '203.123.45.67',
    timestamp: '3 days ago',
    status: 'failed'
  }
])

// Methods
const updateNotificationSettings = async () => {
  updatingNotifications.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.settings.updateNotifications(settings.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Notification settings updated successfully')
  } catch (error) {
    console.error('Error updating notification settings:', error)
  } finally {
    updatingNotifications.value = false
  }
}

const updatePrivacySettings = async () => {
  updatingPrivacy.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.settings.updatePrivacy(settings.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Privacy settings updated successfully')
  } catch (error) {
    console.error('Error updating privacy settings:', error)
  } finally {
    updatingPrivacy.value = false
  }
}

const updateLanguageSettings = async () => {
  updatingLanguage.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.settings.updateLanguage(settings.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Language settings updated successfully')
  } catch (error) {
    console.error('Error updating language settings:', error)
  } finally {
    updatingLanguage.value = false
  }
}

const updateSecuritySettings = async () => {
  updatingSecurity.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.settings.updateSecurity(settings.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Security settings updated successfully')
  } catch (error) {
    console.error('Error updating security settings:', error)
  } finally {
    updatingSecurity.value = false
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
    // await apiService.auth.changePassword({
    //   currentPassword: passwordForm.value.currentPassword,
    //   newPassword: passwordForm.value.newPassword
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Clear form and close modal
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    showPasswordModal.value = false
    
    console.log('Password changed successfully')
  } catch (error) {
    console.error('Error changing password:', error)
  } finally {
    changingPassword.value = false
  }
}

const toggleTwoFactor = () => {
  settings.value.twoFactorEnabled = !settings.value.twoFactorEnabled
  // TODO: Implement actual 2FA toggle
  console.log('Two-factor authentication:', settings.value.twoFactorEnabled ? 'enabled' : 'disabled')
}

const exportData = async () => {
  exporting.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.settings.exportData()
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // TODO: Handle actual file download
    console.log('Data exported successfully')
  } catch (error) {
    console.error('Error exporting data:', error)
  } finally {
    exporting.value = false
  }
}

const clearData = async () => {
  if (!confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
    return
  }
  
  clearing.value = true
  try {
    // TODO: Replace with actual API call
    // await apiService.settings.clearData()
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Logout and redirect
    await authStore.logout()
    window.location.href = '/login'
  } catch (error) {
    console.error('Error clearing data:', error)
  } finally {
    clearing.value = false
  }
}

const loadSettings = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.settings.getSettings()
    // settings.value = response.data
    
    // Using default settings for now
    console.log('Settings loaded successfully')
  } catch (error) {
    console.error('Error loading settings:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadSettings()
})
</script>
