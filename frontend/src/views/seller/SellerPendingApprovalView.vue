<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Pending Approval</h1>
        <p class="mt-2 text-lg text-gray-600">
          Your seller account is being reviewed by our admin team
        </p>
      </div>

      <!-- Status Card -->
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg class="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium text-gray-900">Application Under Review</h3>
            <p class="text-sm text-gray-500">We'll notify you once your account is approved</p>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Account Status</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending Approval
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Submitted On</span>
              <span class="text-sm text-gray-900">{{ formatDate(new Date()) }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Estimated Review Time</span>
              <span class="text-sm text-gray-900">1-3 business days</span>
            </div>
          </div>
        </div>
      </div>

      <!-- What Happens Next -->
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">What Happens Next?</h3>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-xs font-medium text-blue-600">1</span>
              </div>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-gray-900">Admin Review</h4>
              <p class="text-sm text-gray-500">Our team will review your business information and verify your identity</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-xs font-medium text-blue-600">2</span>
              </div>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-gray-900">Approval Decision</h4>
              <p class="text-sm text-gray-500">You'll receive an email notification with the decision</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-xs font-medium text-blue-600">3</span>
              </div>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-gray-900">Store Setup</h4>
              <p class="text-sm text-gray-500">Once approved, you can start setting up your store and adding products</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">While You Wait</h3>
        <div class="space-y-3">
          <button
            @click="goToHome"
            class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            @click="logout"
            class="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goToHome = () => {
  router.push('/')
}

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
