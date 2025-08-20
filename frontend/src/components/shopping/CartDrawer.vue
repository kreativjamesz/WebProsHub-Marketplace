<template>
  <div>
    <!-- Cart Icon with Badge -->
    <button
      @click="isOpen = true"
      class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <span
        v-if="cartItemCount > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
      >
        {{ cartItemCount }}
      </span>
    </button>

    <!-- Cart Drawer -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-hidden"
      @click="closeCart"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div class="w-screen max-w-md">
            <div class="h-full flex flex-col bg-white shadow-xl">
              <!-- Header -->
              <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-lg font-medium text-gray-900">Shopping Cart</h2>
                  <button
                    @click="closeCart"
                    class="ml-3 h-7 flex items-center"
                  >
                    <svg class="h-6 w-6 text-gray-400 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <!-- Empty Cart -->
                <div v-if="cartItems.length === 0" class="text-center py-12">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                  <p class="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
                  <div class="mt-6">
                    <button
                      @click="closeCart"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>

                <!-- Cart Items -->
                <div v-else class="mt-8">
                  <div class="flow-root">
                    <ul class="-my-6 divide-y divide-gray-200">
                      <li
                        v-for="item in cartItems"
                        :key="item.id"
                        class="py-6 flex"
                      >
                        <div class="flex-shrink-0 w-24 h-24">
                          <img
                            :src="item.product.images[0] || '/placeholder-product.jpg'"
                            :alt="item.product.name"
                            class="w-full h-full object-cover rounded-md"
                          />
                        </div>

                        <div class="ml-4 flex-1 flex flex-col">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3>{{ item.product.name }}</h3>
                              <p class="ml-4">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">{{ item.product.seller?.businessName }}</p>
                          </div>
                          <div class="flex-1 flex items-end justify-between text-sm">
                            <div class="flex items-center space-x-2">
                              <label class="text-gray-500">Qty:</label>
                              <select
                                v-model="item.quantity"
                                @change="updateQuantity(item.id, item.quantity)"
                                class="border border-gray-300 rounded px-2 py-1 text-sm"
                              >
                                <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                              </select>
                            </div>

                            <button
                              @click="removeItem(item.id)"
                              class="text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Cart Footer -->
              <div v-if="cartItems.length > 0" class="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>${{ subtotal.toFixed(2) }}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div class="mt-6">
                  <button
                    @click="proceedToCheckout"
                    class="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Checkout
                  </button>
                </div>
                <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or
                    <button
                      @click="closeCart"
                      class="text-blue-600 font-medium hover:text-blue-500"
                    >
                      Continue Shopping
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import type { CartItem } from '@/types/marketplace'

const router = useRouter()

// Props
interface Props {
  cartItems?: CartItem[]
}

const props = withDefaults(defineProps<Props>(), {
  cartItems: () => []
})

// State
const isOpen = ref(false)

// Computed
const cartItemCount = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.quantity, 0)
})

const subtotal = computed(() => {
  return props.cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
})

// Methods
const closeCart = () => {
  isOpen.value = false
}

const updateQuantity = (itemId: string, quantity: number) => {
  // TODO: Implement quantity update
  toast.success('Quantity updated')
}

const removeItem = (itemId: string) => {
  // TODO: Implement remove item
  toast.success('Item removed from cart')
}

const proceedToCheckout = () => {
  closeCart()
  router.push('/checkout')
}
</script>
