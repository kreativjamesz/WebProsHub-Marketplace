<template>
  <div class="py-8 bg-background">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">Settings</h1>
        <p class="mt-2 text-muted-foreground">Manage your application preferences and account settings</p>
      </div>

      <!-- Settings Content -->
      <div class="space-y-8">
        <!-- Account Settings -->
        <div class="bg-card rounded-xl shadow-sm border border-border">
          <div class="px-6 py-4 border-b border-border">
            <h2 class="text-lg font-medium text-foreground">Account Settings</h2>
          </div>
          
          <div class="p-6">
            <div class="space-y-6">
              <!-- Profile Link -->
              <div class="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h3 class="text-sm font-medium text-foreground">Profile Information</h3>
                  <p class="text-sm text-muted-foreground">Update your personal information and contact details</p>
                </div>
                <router-link
                  to="/buyer/profile"
                  class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium"
                >
                  Manage Profile
                </router-link>
              </div>
              
              <!-- Password Change -->
              <div class="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h3 class="text-sm font-medium text-foreground">Password</h3>
                  <p class="text-sm text-muted-foreground">Change your account password</p>
                </div>
                <button
                  @click="showPasswordModal = true"
                  class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors duration-200 font-medium"
                >
                  Change Password
                </button>
              </div>
              
              <!-- Two-Factor Authentication -->
              <div class="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h3 class="text-sm font-medium text-foreground">Two-Factor Authentication</h3>
                  <p class="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <button
                  @click="toggleTwoFactor"
                  class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors duration-200 font-medium"
                >
                  {{ settings.twoFactorEnabled ? 'Disable' : 'Enable' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-card rounded-xl shadow-sm border border-border">
          <div class="px-6 py-4 border-b border-border">
            <h2 class="text-lg font-medium text-foreground">Notification Settings</h2>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="updateNotificationSettings" class="space-y-6">
              <div class="space-y-4">
                <h3 class="text-sm font-medium text-foreground">Email Notifications</h3>
                
                <div class="space-y-3">
                  <label class="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <input
                      v-model="settings.emailNotifications"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-3 text-sm text-foreground">Order updates and shipping notifications</span>
                  </label>
                  
                  <label class="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <input
                      v-model="settings.promotionalEmails"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-3 text-sm text-foreground">Promotional offers and deals</span>
                  </label>
                  
                  <label class="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <input
                      v-model="settings.newsletterEmails"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-3 text-sm text-foreground">Newsletter and updates</span>
                  </label>
                </div>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-sm font-medium text-foreground">Push Notifications</h3>
                
                <div class="space-y-3">
                  <label class="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <input
                      v-model="settings.pushNotifications"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-3 text-sm text-foreground">Push notifications for important updates</span>
                  </label>
                  
                  <label class="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <input
                      v-model="settings.orderAlerts"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-3 text-sm text-foreground">Order status alerts</span>
                  </label>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div class="bg-card rounded-xl shadow-sm border border-border">
          <div class="px-6 py-4 border-b border-border">
            <h2 class="text-lg font-medium text-foreground">Privacy Settings</h2>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="updatePrivacySettings" class="space-y-6">
              <div class="space-y-4">
                <h3 class="text-sm font-medium text-foreground">Data Sharing</h3>
                
                <div class="space-y-3">
                  <label class="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <input
                      v-model="privacy.allowAnalytics"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-3 text-sm text-foreground">Allow analytics and performance data collection</span>
                  </label>
                  
                  <label class="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <input
                      v-model="privacy.allowMarketing"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-3 text-sm text-foreground">Allow marketing and advertising data sharing</span>
                  </label>
                  
                  <label class="flex items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <input
                      v-model="privacy.publicProfile"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-3 text-sm text-foreground">Make profile visible to other users</span>
                  </label>
                </div>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium"
                >
                  Save Privacy Settings
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Theme Settings -->
        <div class="bg-card rounded-xl shadow-sm border border-border">
          <div class="px-6 py-4 border-b border-border">
            <h2 class="text-lg font-medium text-foreground">Theme Settings</h2>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <h3 class="text-sm font-medium text-foreground">Appearance</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  @click="setTheme('light')"
                  :class="[
                    'p-4 rounded-lg border-2 transition-all duration-200',
                    theme === 'light' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  ]"
                >
                  <div class="text-center">
                    <div class="w-8 h-8 bg-yellow-400 rounded mx-auto mb-2"></div>
                    <span class="text-sm font-medium text-foreground">Light</span>
                  </div>
                </button>
                
                <button
                  @click="setTheme('dark')"
                  :class="[
                    'p-4 rounded-lg border-2 transition-all duration-200',
                    theme === 'dark' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  ]"
                >
                  <div class="text-center">
                    <div class="w-8 h-8 bg-slate-800 rounded mx-auto mb-2"></div>
                    <span class="text-sm font-medium text-foreground">Dark</span>
                  </div>
                </button>
                
                <button
                  @click="setTheme('system')"
                  :class="[
                    'p-4 rounded-lg border-2 transition-all duration-200',
                    theme === 'system' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  ]"
                >
                  <div class="text-center">
                    <div class="w-8 h-8 bg-gradient-to-r from-yellow-400 to-slate-800 rounded mx-auto mb-2"></div>
                    <span class="text-sm font-medium text-foreground">System</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="bg-card rounded-xl shadow-sm border border-destructive/20">
          <div class="px-6 py-4 border-b border-destructive/20">
            <h2 class="text-lg font-medium text-destructive">Danger Zone</h2>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div class="p-4 bg-destructive/10 rounded-lg">
                <h3 class="text-sm font-medium text-destructive mb-2">Delete Account</h3>
                <p class="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  @click="showDeleteAccountModal = true"
                  class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors duration-200 font-medium"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Password Change Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-card rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-foreground mb-4">Change Password</h3>
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-foreground">Current Password</label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground">New Password</label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              required
              minlength="8"
              class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground">Confirm New Password</label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
            />
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div v-if="showDeleteAccountModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-card rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-destructive mb-4">Delete Account</h3>
        <p class="text-muted-foreground mb-6">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteAccountModal = false"
            class="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            @click="deleteAccount"
            class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors duration-200"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Types
interface Settings {
  emailNotifications: boolean
  promotionalEmails: boolean
  newsletterEmails: boolean
  pushNotifications: boolean
  orderAlerts: boolean
  twoFactorEnabled: boolean
}

interface Privacy {
  allowAnalytics: boolean
  allowMarketing: boolean
  publicProfile: boolean
}

interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Reactive State
const showPasswordModal = ref(false)
const showDeleteAccountModal = ref(false)
const theme = ref<'light' | 'dark' | 'system'>('system')

const settings = reactive<Settings>({
  emailNotifications: true,
  promotionalEmails: false,
  newsletterEmails: true,
  pushNotifications: true,
  orderAlerts: true,
  twoFactorEnabled: false
})

const privacy = reactive<Privacy>({
  allowAnalytics: true,
  allowMarketing: false,
  publicProfile: true
})

const passwordForm = reactive<PasswordForm>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Methods
const toggleTwoFactor = () => {
  settings.twoFactorEnabled = !settings.twoFactorEnabled
  // TODO: Implement 2FA toggle logic
}

const updateNotificationSettings = () => {
  // TODO: Implement notification settings update
  console.log('Updating notification settings:', settings)
}

const updatePrivacySettings = () => {
  // TODO: Implement privacy settings update
  console.log('Updating privacy settings:', privacy)
}

const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
  theme.value = newTheme
  // TODO: Implement theme switching logic
  console.log('Setting theme to:', newTheme)
}

const changePassword = () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('New passwords do not match')
    return
  }
  
  // TODO: Implement password change logic
  console.log('Changing password...')
  showPasswordModal.value = false
  
  // Reset form
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

const deleteAccount = () => {
  // TODO: Implement account deletion logic
  console.log('Deleting account...')
  showDeleteAccountModal.value = false
}
</script>

<style scoped>
/* Custom focus styles */
input:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
}

/* Smooth transitions */
button, input {
  transition: all 0.2s ease-in-out;
}

/* Hover effects */
.bg-card:hover {
  box-shadow: 0 4px 6px -1px hsl(var(--foreground) / 0.1);
}

/* Theme selection buttons */
button[data-theme] {
  transition: all 0.2s ease-in-out;
}

button[data-theme]:hover {
  transform: translateY(-2px);
}
</style>
