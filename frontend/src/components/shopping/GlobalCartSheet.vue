<template>
  <Sheet v-model:open="isOpen">
    <SheetContent class="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>Shopping Cart</SheetTitle>
        <SheetDescription>
          {{ cartItems.length }} item{{ cartItems.length !== 1 ? 's' : '' }} in your cart
        </SheetDescription>
      </SheetHeader>

      <!-- Cart Content -->
      <div class="flex-1 overflow-y-auto py-6">
        <!-- Empty Cart State -->
        <div v-if="cartItems.length === 0" class="text-center py-12">
          <div class="mx-auto h-24 w-24 text-gray-300 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p class="text-gray-500 mb-6">Start shopping to add items to your cart</p>
          <SheetClose as-child>
            <router-link
              to="/marketplace"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Products
            </router-link>
          </SheetClose>
        </div>

        <!-- Cart Items -->
        <div v-else class="space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <!-- Product Image -->
            <div class="flex-shrink-0">
              <img
                :src="item.product.images?.[0] || '/placeholder-product.jpg'"
                :alt="item.product.name"
                class="w-16 h-16 object-cover rounded-md"
                @error="handleImageError"
              />
            </div>

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-gray-900 truncate">
                {{ item.product.name }}
              </h4>
              <p class="text-sm text-gray-500">
                Store: {{ item.product.store?.name || 'Unknown Store' }}
              </p>
              <div class="flex items-center justify-between mt-2">
                <span class="text-sm font-medium text-gray-900">
                  ₱{{ formatPrice(item.product.price) }}
                </span>
                <div class="flex items-center space-x-2">
                  <!-- Quantity Controls -->
                  <button
                    @click="decreaseQuantity(item.id)"
                    :disabled="item.quantity <= 1"
                    class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="text-sm text-gray-900 w-8 text-center">{{ item.quantity }}</span>
                  <button
                    @click="increaseQuantity(item.id)"
                    :disabled="item.quantity >= (item.product.stock || 99)"
                    class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Remove Button -->
            <button
              @click="removeFromCart(item.id)"
              class="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
              title="Remove item"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Footer -->
      <SheetFooter v-if="cartItems.length > 0" class="border-t pt-6">
        <div class="w-full space-y-4">
          <!-- Cart Summary -->
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal:</span>
              <span class="font-medium">₱{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Shipping:</span>
              <span class="font-medium">{{ shippingCost === 0 ? 'Free' : `₱${formatPrice(shippingCost)}` }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>₱{{ formatPrice(total) }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <SheetClose as-child>
              <button
                @click="clearCart"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
            </SheetClose>
            <SheetClose as-child>
              <router-link
                to="/buyer/cart"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                View Cart
              </router-link>
            </SheetClose>
          </div>

          <!-- Checkout Button -->
          <SheetClose as-child>
            <router-link
              to="/buyer/checkout"
              class="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-center font-medium"
            >
              Proceed to Checkout
            </router-link>
          </SheetClose>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useGlobalCart } from '@/composables/useGlobalCart'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

// Stores
const cartStore = useCartStore()
const router = useRouter()
const { isGlobalCartOpen, closeGlobalCart } = useGlobalCart()

// State
const isOpen = computed({
  get: () => isGlobalCartOpen.value,
  set: (value) => {
    if (!value) {
      closeGlobalCart()
    }
  }
})

// Computed
const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => 
  cartItems.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
)
const shippingCost = computed(() => subtotal.value > 5000 ? 0 : 200) // Free shipping over ₱5000
const total = computed(() => subtotal.value + shippingCost.value)

// Methods
const openCart = () => {
  // This is handled by the SheetTrigger
}

const increaseQuantity = async (itemId: string) => {
  try {
    await cartStore.updateQuantity(itemId, 1)
    toast.success('Quantity updated')
  } catch (error) {
    toast.error('Failed to update quantity')
  }
}

const decreaseQuantity = async (itemId: string) => {
  try {
    await cartStore.updateQuantity(itemId, -1)
    toast.success('Quantity updated')
  } catch (error) {
    toast.error('Failed to update quantity')
  }
}

const removeFromCart = async (itemId: string) => {
  try {
    await cartStore.removeItem(itemId)
    toast.success('Item removed from cart')
  } catch (error) {
    toast.error('Failed to remove item')
  }
}

const clearCart = async () => {
  try {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      await cartStore.clearCart()
      toast.success('Cart cleared')
      closeGlobalCart()
    }
  } catch (error) {
    toast.error('Failed to clear cart')
  }
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-product.jpg'
}

const formatPrice = (price: number) => {
  return price.toLocaleString('en-PH')
}


</script>

<style scoped>
/* Custom styles if needed */
</style>
