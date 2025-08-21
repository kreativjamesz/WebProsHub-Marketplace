<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Become a Seller</h1>
        <p class="mt-2 text-lg text-gray-600">
          Start selling your products on WebProsHubMarketplace
        </p>
      </div>

      <!-- Onboarding Steps -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="space-y-6">
          <!-- Step 1: Business Information -->
          <div class="border-l-4 border-blue-500 pl-4">
            <h3 class="text-lg font-medium text-gray-900">Step 1: Business Information</h3>
            <p class="mt-1 text-sm text-gray-600">
              Tell us about your business and what you want to sell.
            </p>
          </div>

          <!-- Step 2: Store Setup -->
          <div class="border-l-4 border-gray-300 pl-4">
            <h3 class="text-lg font-medium text-gray-700">Step 2: Store Setup</h3>
            <p class="mt-1 text-sm text-gray-500">
              Create your store profile and customize your storefront.
            </p>
          </div>

          <!-- Step 3: Product Upload -->
          <div class="border-l-4 border-gray-300 pl-4">
            <h3 class="text-lg font-medium text-gray-700">Step 3: Product Upload</h3>
            <p class="mt-1 text-sm text-gray-500">
              Add your products and start selling.
            </p>
          </div>

          <!-- Call to Action -->
          <div class="pt-6 border-t border-gray-200">
            <router-link
              to="/seller/dashboard"
              class="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here
</script>
