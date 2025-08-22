<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">Profile</h1>
        <p class="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-card rounded-xl shadow-sm border border-border p-6">
            <div class="text-center">
              <div class="relative inline-block">
                <img
                  :src="userProfile.avatar || '/images/avatars/default.jpg'"
                  :alt="userProfile.name"
                  class="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
                />
                <button
                  @click="showAvatarModal = true"
                  class="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 class="mt-4 text-xl font-semibold text-foreground">{{ userProfile.name }}</h2>
              <p class="text-muted-foreground">{{ userProfile.email }}</p>
              <div class="mt-2">
                <span
                  :class="[
                    'inline-flex px-3 py-1 text-xs font-semibold rounded-full',
                    getRoleClass(userProfile.role)
                  ]"
                >
                  {{ getRoleText(userProfile.role) }}
                </span>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="mt-6 pt-6 border-t border-border">
              <div class="grid grid-cols-2 gap-4 text-center">
                <div class="bg-muted/30 rounded-lg p-3">
                  <div class="text-2xl font-bold text-primary">{{ stats.totalOrders }}</div>
                  <div class="text-sm text-muted-foreground">Orders</div>
                </div>
                <div class="bg-muted/30 rounded-lg p-3">
                  <div class="text-2xl font-bold text-primary">{{ stats.totalSpent }}</div>
                  <div class="text-sm text-muted-foreground">Total Spent</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Information -->
          <div class="bg-card rounded-xl shadow-sm border border-border">
            <div class="px-6 py-4 border-b border-border">
              <h3 class="text-lg font-medium text-foreground">Personal Information</h3>
            </div>
            <div class="p-6">
              <form @submit.prevent="updateProfile" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-foreground">Full Name</label>
                    <input
                      v-model="profileForm.name"
                      type="text"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground">Phone Number</label>
                    <input
                      v-model="profileForm.phone"
                      type="tel"
                      class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-foreground">Email Address</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    required
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-border rounded-md bg-muted text-muted-foreground"
                  />
                  <p class="mt-1 text-sm text-muted-foreground">Email cannot be changed</p>
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-200 font-medium"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Address Information -->
          <div class="bg-card rounded-xl shadow-sm border border-border">
            <div class="px-6 py-4 border-b border-border">
              <h3 class="text-lg font-medium text-foreground">Address Information</h3>
            </div>
            <div class="p-6">
              <form @submit.prevent="updateAddress" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-foreground">Street Address</label>
                    <input
                      v-model="addressForm.street"
                      type="text"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground">City</label>
                    <input
                      v-model="addressForm.city"
                      type="text"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-foreground">State/Province</label>
                    <input
                      v-model="addressForm.state"
                      type="text"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground">ZIP/Postal Code</label>
                    <input
                      v-model="addressForm.zipCode"
                      type="text"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-foreground">Country</label>
                    <select
                      v-model="addressForm.country"
                      required
                      class="mt-1 block w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="PH">Philippines</option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-200 font-medium"
                  >
                    Update Address
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Preferences -->
          <div class="bg-card rounded-xl shadow-sm border border-border">
            <div class="px-6 py-4 border-b border-border">
              <h3 class="text-lg font-medium text-foreground">Preferences</h3>
            </div>
            <div class="p-6">
              <form @submit.prevent="updatePreferences" class="space-y-4">
                <div class="space-y-4">
                  <label class="flex items-center">
                    <input
                      v-model="preferences.emailNotifications"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-2 text-sm text-foreground">Email notifications for orders and updates</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="preferences.smsNotifications"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-2 text-sm text-foreground">SMS notifications for important updates</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="preferences.marketingEmails"
                      type="checkbox"
                      class="rounded border-border text-primary focus:ring-ring"
                    />
                    <span class="ml-2 text-sm text-foreground">Marketing and promotional emails</span>
                  </label>
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors duration-200 font-medium"
                  >
                    Update Preferences
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Upload Modal -->
    <div v-if="showAvatarModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-card rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-foreground mb-4">Update Profile Picture</h3>
        <div class="space-y-4">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleAvatarUpload"
            class="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          <div class="flex justify-end space-x-3">
            <button
              @click="showAvatarModal = false"
              class="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              @click="uploadAvatar"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// Types
interface UserProfile {
  name: string
  email: string
  avatar?: string
  role: string
}

interface Stats {
  totalOrders: number
  totalSpent: string
}

interface ProfileForm {
  name: string
  phone: string
  email: string
}

interface AddressForm {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface Preferences {
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
}

// Reactive State
const showAvatarModal = ref(false)
const fileInput = ref<HTMLInputElement>()

const userProfile = reactive<UserProfile>({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/images/avatars/default.jpg',
  role: 'buyer'
})

const stats = reactive<Stats>({
  totalOrders: 12,
  totalSpent: '$1,234.56'
})

const profileForm = reactive<ProfileForm>({
  name: userProfile.name,
  phone: '+1 (555) 123-4567',
  email: userProfile.email
})

const addressForm = reactive<AddressForm>({
  street: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'US'
})

const preferences = reactive<Preferences>({
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: true
})

// Methods
const getRoleClass = (role: string): string => {
  const roleClasses = {
    buyer: 'bg-primary text-primary-foreground',
    seller: 'bg-secondary text-secondary-foreground',
    admin: 'bg-destructive text-destructive-foreground'
  }
  return roleClasses[role as keyof typeof roleClasses] || 'bg-muted text-muted-foreground'
}

const getRoleText = (role: string): string => {
  const roleTexts = {
    buyer: 'Buyer',
    seller: 'Seller',
    admin: 'Administrator'
  }
  return roleTexts[role as keyof typeof roleTexts] || 'User'
}

const updateProfile = () => {
  // TODO: Implement profile update logic
  console.log('Updating profile:', profileForm)
}

const updateAddress = () => {
  // TODO: Implement address update logic
  console.log('Updating address:', addressForm)
}

const updatePreferences = () => {
  // TODO: Implement preferences update logic
  console.log('Updating preferences:', preferences)
}

const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    // TODO: Implement file upload logic
    console.log('File selected:', target.files[0])
  }
}

const uploadAvatar = () => {
  // TODO: Implement avatar upload logic
  showAvatarModal.value = false
}

// Lifecycle
onMounted(() => {
  // TODO: Load user data from API
})
</script>

<style scoped>
/* Custom focus styles */
input:focus, select:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
}

/* Smooth transitions */
button, input, select {
  transition: all 0.2s ease-in-out;
}

/* Hover effects */
.bg-card:hover {
  box-shadow: 0 4px 6px -1px hsl(var(--foreground) / 0.1);
}
</style>
