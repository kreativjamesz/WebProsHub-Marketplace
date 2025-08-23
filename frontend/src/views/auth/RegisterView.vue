<template>
  <div class="min-h-screen flex items-center justify-center bg-accent py-12 px-4 sm:px-6 lg:px-8">
    <Card class="max-w-md w-full space-y-8">
      <!-- Header -->
      <CardHeader class="text-center">
        <div
          class="mx-auto h-12 w-12 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center"
        >
          <svg
            class="h-8 w-8 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-foreground">Join WebProsHub</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Create your account to start selling or shopping
        </p>
      </CardHeader>
      <CardContent>
        <!-- Registration Form -->
        <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
          <div class="space-y-4">
            <!-- Full Name Field -->
            <div>
              <label for="name" class="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-ring focus:border-ring sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-ring focus:border-ring sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-ring focus:border-ring sm:text-sm"
                placeholder="Create a password"
              />
              <p class="mt-1 text-xs text-muted-foreground">Must be at least 8 characters long</p>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-ring focus:border-ring sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>

            <!-- Account Type Selection -->
            <div>
              <label class="block text-sm font-medium text-foreground mb-2"> I want to: </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="form.accountType"
                    type="radio"
                    value="BUYER"
                    class="h-4 w-4 text-primary focus:ring-ring border-border"
                  />
                  <span class="ml-2 text-sm text-foreground">Shop and buy products</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="form.accountType"
                    type="radio"
                    value="SELLER"
                    class="h-4 w-4 text-primary focus:ring-ring border-border"
                  />
                  <span class="ml-2 text-sm text-foreground">Sell products and manage stores</span>
                </label>
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-center">
              <input
                id="terms"
                v-model="form.acceptTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-primary focus:ring-ring border-border rounded"
              />
              <label for="terms" class="ml-2 block text-sm text-foreground">
                I agree to the
                <router-link to="/terms" class="text-primary hover:text-primary/80">
                  Terms of Service
                </router-link>
                and
                <router-link to="/privacy" class="text-primary hover:text-primary/80">
                  Privacy Policy
                </router-link>
              </label>
            </div>

            <!-- Newsletter Subscription -->
            <div class="flex items-center">
              <input
                id="newsletter"
                v-model="form.subscribeNewsletter"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-ring border-border rounded"
              />
              <label for="newsletter" class="ml-2 block text-sm text-foreground">
                Subscribe to our newsletter for updates and offers
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="animate-spin h-5 w-5 text-primary-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              {{ isLoading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-destructive text-sm text-center">
            {{ error }}
          </div>
        </form>

        <!-- Sign In Link -->
        <div class="text-center">
          <p class="text-sm text-muted-foreground">
            Already have an account?
            <router-link to="/login" class="font-medium text-primary hover:text-primary/80">
              Sign in here
            </router-link>
          </p>
        </div>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="my-4 px-2 bg-accent text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <!-- Social Registration -->
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-card text-sm font-medium text-muted-foreground hover:bg-accent"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span class="ml-2">Google</span>
          </button>

          <button
            type="button"
            class="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-card text-sm font-medium text-muted-foreground hover:bg-accent"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              />
            </svg>
            <span class="ml-2">Twitter</span>
          </button>
        </div>
      </CardContent>
      <CardFooter>
        <div class="text-center">
          <p class="text-sm text-muted-foreground">
            Already have an account?
            <router-link to="/login" class="font-medium text-primary hover:text-primary/80">
              Sign in here
            </router-link>
          </p>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  accountType: 'BUYER',
  acceptTerms: false,
  subscribeNewsletter: false,
})

// State
const isLoading = ref(false)
const error = ref('')

// Computed
const isFormValid = computed(() => {
  return (
    form.name &&
    form.email &&
    form.password &&
    form.password === form.confirmPassword &&
    form.password.length >= 8 &&
    form.acceptTerms
  )
})

// Methods
const handleRegister = async () => {
  try {
    if (!isFormValid.value) {
      error.value = 'Please fill in all required fields correctly.'
      return
    }

    isLoading.value = true
    error.value = ''

    const result = await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      accountType: form.accountType as 'BUYER' | 'SELLER',
      acceptTerms: form.acceptTerms,
    })

    if (result.success) {
      if (form.accountType === 'SELLER') {
        toast.success('Seller account created! Pending admin approval.')
        // Redirect to seller pending approval page
        router.push('/seller/pending-approval')
      } else {
        toast.success('Account created successfully!')
        router.push('/')
      }
    }
  } catch (err: any) {
    error.value = err.message || 'Registration failed. Please try again.'
    toast.error(error.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Custom styles for the gradient background */
.bg-gradient-to-r {
  background: linear-gradient(to right, oklch(var(--primary)), oklch(var(--primary) / 0.8));
}

.hover\:from-primary\/90:hover {
  background: linear-gradient(to right, oklch(var(--primary) / 0.9), oklch(var(--primary) / 0.7));
}

.hover\:to-primary\/70:hover {
  background: linear-gradient(to right, oklch(var(--primary) / 0.9), oklch(var(--primary) / 0.7));
}
</style>
