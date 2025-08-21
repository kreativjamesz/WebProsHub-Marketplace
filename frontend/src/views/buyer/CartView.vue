<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p class="mt-2 text-gray-600">{{ cartItems.length }} items in your cart</p>
      </div>

      <!-- Cart Content -->
      <div v-if="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Cart Items</h2>
            </div>
            
            <div class="divide-y divide-gray-200">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="p-6 flex items-center space-x-4"
              >
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <div class="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      v-if="item.product.images && item.product.images.length > 0"
                      :src="item.product.images[0]"
                      :alt="item.product.name"
                      class="w-full h-full object-cover"
                    />
                    <div
                      v-else
                      class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
                    >
                      <svg class="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Product Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900">{{ item.product.name }}</h3>
                      <p class="text-sm text-gray-600">{{ item.product.description }}</p>
                      <p class="text-sm text-gray-500">Store: {{ item.product.store?.name || 'Unknown Store' }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-lg font-semibold text-gray-900">₱{{ item.product.price.toFixed(2) }}</p>
                      <p class="text-sm text-gray-500">₱{{ (item.product.price * item.quantity).toFixed(2) }} total</p>
                    </div>
                  </div>

                  <!-- Quantity Controls -->
                  <div class="mt-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <label class="text-sm text-gray-700">Quantity:</label>
                      <div class="flex items-center border border-gray-300 rounded-md">
                        <button
                          @click="updateQuantity(item.id, item.quantity - 1)"
                          :disabled="item.quantity <= 1"
                          class="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span class="px-3 py-1 text-gray-900 font-medium">{{ item.quantity }}</span>
                        <button
                          @click="updateQuantity(item.id, item.quantity + 1)"
                          :disabled="item.quantity >= item.product.stock"
                          class="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <!-- Remove Button -->
                    <button
                      @click="removeFromCart(item.id)"
                      class="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <!-- Summary Details -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({{ totalItems }} items)</span>
                <span>₱{{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{{ shippingCost === 0 ? 'Free' : `₱${shippingCost.toFixed(2)}` }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>₱{{ tax.toFixed(2) }}</span>
              </div>
              <hr class="border-gray-200">
              <div class="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>₱{{ total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Promo Code -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
              <div class="flex space-x-2">
                <input
                  v-model="promoCode"
                  type="text"
                  placeholder="Enter code"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  @click="applyPromoCode"
                  class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
            </div>

            <!-- Checkout Button -->
            <button
              @click="proceedToCheckout"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Proceed to Checkout
            </button>

            <!-- Continue Shopping -->
            <div class="mt-4 text-center">
              <router-link
                to="/marketplace"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p class="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <router-link
          to="/marketplace"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Start Shopping
        </router-link>
      </div>

      <!-- Recently Viewed -->
      <div v-if="recentlyViewed.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="product in recentlyViewed"
            :key="product.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            @click="navigateToProduct(product.id)"
          >
            <div class="aspect-w-1 aspect-h-1 bg-gray-200">
              <img
                v-if="product.images && product.images.length > 0"
                :src="product.images[0]"
                :alt="product.name"
                class="w-full h-32 object-cover"
              />
              <div
                v-else
                class="w-full h-32 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
              >
                <svg class="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <div class="p-3">
              <h3 class="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{{ product.name }}</h3>
              <div class="flex items-center justify-between">
                <span class="text-blue-600 font-semibold">₱{{ product.price.toFixed(2) }}</span>
                <button
                  @click.stop="addToCart(product)"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { CartItem, Product } from '@/types/marketplace'
import { mockCartItems, mockProducts } from '@/mocks'

const router = useRouter()

// Reactive data
const cartItems = ref<CartItem[]>([])
const promoCode = ref('')
const recentlyViewed = ref<Product[]>([])

// Use centralized mock data
const mockRecentlyViewed = mockProducts.slice(2, 4) // AirPods Pro and iPad Air

// Computed properties
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
})

const shippingCost = computed(() => {
  // Free shipping for orders over ₱5000
  return subtotal.value > 5000 ? 0 : 299
})

const tax = computed(() => {
  return subtotal.value * 0.12 // 12% tax
})

const total = computed(() => {
  return subtotal.value + shippingCost.value + tax.value
})

// Methods
const updateQuantity = (itemId: string, newQuantity: number) => {
  if (newQuantity < 1) return
  
  const item = cartItems.value.find(item => item.id === itemId)
  if (item && newQuantity <= item.product.stock) {
    item.quantity = newQuantity
    // TODO: Update cart in backend
  }
}

const removeFromCart = (itemId: string) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
  // TODO: Remove from cart in backend
}

const applyPromoCode = () => {
  // TODO: Implement promo code logic
  console.log('Applying promo code:', promoCode.value)
}

const proceedToCheckout = () => {
  // TODO: Implement checkout logic
  router.push('/buyer/checkout')
}

const navigateToProduct = (productId: string) => {
  router.push(`/products/${productId}`)
}

const addToCart = (product: Product) => {
  // TODO: Implement add to cart logic
  console.log('Adding to cart:', product)
}

const loadCartData = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await apiService.buyers.getCart()
    // cartItems.value = response.data
    
    // Using mock data for now
    cartItems.value = mockCartItems
    recentlyViewed.value = mockRecentlyViewed
  } catch (error) {
    console.error('Error loading cart data:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadCartData()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
