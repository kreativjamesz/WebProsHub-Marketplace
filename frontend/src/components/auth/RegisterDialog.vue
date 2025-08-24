<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="max-w-md w-full space-y-8 bg-auth-card border border-auth-border shadow-auth-card rounded-3xl backdrop-blur-2xl transition-all duration-500 relative z-[10001] group hover:shadow-auth-card-hover overflow-hidden"
      style="position: relative !important; z-index: 10001 !important;">
      <!-- Enhanced Glowy Border Effect -->
      <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-auth-glow-1 via-auth-glow-2 to-auth-glow-3 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>
      
              <!-- Header -->
        <DialogHeader class="text-center relative z-[10002]">
        <div
          class="mx-auto h-20 w-20 flex items-center justify-center rounded-3xl shadow-auth-logo bg-auth-logo-gradient relative group/logo"
        >
          <!-- Enhanced Logo Glow Effect -->
          <div class="absolute inset-0 rounded-3xl bg-auth-logo-glow blur-xl opacity-70 group-hover/logo:opacity-90 transition-opacity duration-300"></div>
          
          <!-- Additional Logo Glow Rings -->
          <div class="absolute inset-0 rounded-3xl bg-auth-logo-glow-2 blur-2xl opacity-40 group-hover/logo:opacity-60 transition-opacity duration-500 scale-110"></div>
          
          <svg
            class="h-12 w-12 text-auth-logo-icon relative z-10 drop-shadow-2xl"
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
        
        <DialogTitle class="mt-8 text-5xl font-black text-auth-title bg-gradient-to-r from-auth-title-gradient-1 to-auth-title-gradient-2 bg-clip-text text-transparent drop-shadow-2xl">
          Join WebProsHub
        </DialogTitle>
        <DialogDescription class="mt-4 text-lg text-auth-subtitle font-medium">
          Create your account to get started
        </DialogDescription>
      </DialogHeader>
      
              <div class="relative z-[10002]">
        <!-- Register Form -->
        <form class="mt-8 space-y-6 relative z-[10003]" @submit.prevent="handleRegister">
          <div class="space-y-6">
            <!-- Full Name Field -->
            <div class="group/input">
              <label for="fullName" class="block text-sm font-bold text-auth-label mb-3">
                Full Name
              </label>
              <div class="relative">
                <input
                  id="fullName"
                  v-model="form.fullName"
                  type="text"
                  required
                  class="block w-full px-5 py-4 border-2 border-auth-input rounded-2xl shadow-auth-input placeholder-auth-placeholder focus:outline-none focus:ring-4 focus:ring-auth-focus focus:border-auth-focus text-base bg-auth-input-bg text-auth-input-text transition-all duration-300 group-hover/input:border-auth-input-hover group-hover/input:shadow-auth-input-hover group-hover/input:scale-[1.02]"
                  placeholder="Enter your full name"
                />
                <!-- Enhanced Input Glow Effect -->
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-auth-input-glow-1 to-auth-input-glow-2 opacity-0 group-hover/input:opacity-30 transition-opacity duration-300 blur-md"></div>
              </div>
            </div>

            <!-- Email Field -->
            <div class="group/input">
              <label for="email" class="block text-sm font-bold text-auth-label mb-3">
                Email address
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="block w-full px-5 py-4 border-2 border-auth-input rounded-2xl shadow-auth-input placeholder-auth-placeholder focus:outline-none focus:ring-4 focus:ring-auth-focus focus:border-auth-focus text-base bg-auth-input-bg text-auth-input-text transition-all duration-300 group-hover/input:border-auth-input-hover group-hover/input:shadow-auth-input-hover group-hover/input:scale-[1.02]"
                  placeholder="Enter your email"
                />
                <!-- Enhanced Input Glow Effect -->
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-auth-input-glow-1 to-auth-input-glow-2 opacity-0 group-hover/input:opacity-30 transition-opacity duration-300 blur-md"></div>
              </div>
            </div>

            <!-- Password Field -->
            <div class="group/input">
              <label for="password" class="block text-sm font-bold text-auth-label mb-3">
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="block w-full px-5 py-4 border-2 border-auth-input rounded-2xl shadow-auth-input placeholder-auth-placeholder focus:outline-none focus:ring-4 focus:ring-auth-focus focus:border-auth-focus text-base bg-auth-input-bg text-auth-input-text transition-all duration-300 group-hover/input:border-auth-input-hover group-hover/input:shadow-auth-input-hover group-hover/input:scale-[1.02]"
                  placeholder="Create a password"
                />
                <!-- Enhanced Input Glow Effect -->
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-auth-input-glow-1 to-auth-input-glow-2 opacity-0 group-hover/input:opacity-30 transition-opacity duration-300 blur-md"></div>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div class="group/input">
              <label for="confirmPassword" class="block text-sm font-bold text-auth-label mb-3">
                Confirm Password
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  type="password"
                  required
                  class="block w-full px-5 py-4 border-2 border-auth-input rounded-2xl shadow-auth-input placeholder-auth-placeholder focus:outline-none focus:ring-4 focus:ring-auth-focus focus:border-auth-focus text-base bg-auth-input-bg text-auth-input-text transition-all duration-300 group-hover/input:border-auth-input-hover group-hover/input:shadow-auth-input-hover group-hover/input:scale-[1.02]"
                  placeholder="Confirm your password"
                />
                <!-- Enhanced Input Glow Effect -->
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-auth-input-glow-1 to-auth-input-glow-2 opacity-0 group-hover/input:opacity-30 transition-opacity duration-300 blur-md"></div>
              </div>
            </div>

            <!-- User Type Selection -->
            <div class="group/input">
              <label class="block text-sm font-bold text-auth-label mb-3">
                I want to
              </label>
              <div class="grid grid-cols-2 gap-3">
                <label class="group/radio cursor-pointer">
                  <input
                    v-model="form.userType"
                    type="radio"
                    value="buyer"
                    class="sr-only"
                  />
                  <div class="p-4 border-2 border-auth-input rounded-2xl transition-all duration-300 group-hover/radio:border-auth-input-hover group-hover/radio:shadow-auth-input-hover group-hover/radio:scale-[1.02] group/radio:has-[:checked]:border-auth-focus group/radio:has-[:checked]:shadow-auth-focus">
                    <div class="text-center">
                      <svg class="w-8 h-8 mx-auto mb-2 text-auth-label" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span class="text-sm font-semibold text-auth-label">Buy Products</span>
                    </div>
                  </div>
                </label>
                
                <label class="group/radio cursor-pointer">
                  <input
                    v-model="form.userType"
                    type="radio"
                    value="seller"
                    class="sr-only"
                  />
                  <div class="p-4 border-2 border-auth-input rounded-2xl transition-all duration-300 group-hover/radio:border-auth-input-hover group-hover/radio:shadow-auth-input-hover group-hover/radio:scale-[1.02] group/radio:has-[:checked]:border-auth-focus group/radio:has-[:checked]:shadow-auth-focus">
                    <div class="text-center">
                      <svg class="w-8 h-8 mx-auto mb-2 text-auth-label" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span class="text-sm font-semibold text-auth-label">Sell Products</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Terms Agreement -->
            <div class="flex items-start group/checkbox">
              <input
                id="agree-terms"
                v-model="form.agreeTerms"
                type="checkbox"
                required
                class="h-6 w-6 text-auth-checkbox focus:ring-4 focus:ring-auth-focus border-2 border-auth-input rounded-xl bg-auth-input-bg transition-all duration-200 group-hover/checkbox:border-auth-checkbox-hover group-hover/checkbox:shadow-auth-checkbox group-hover/checkbox:scale-110 mt-1"
              />
              <label for="agree-terms" class="ml-3 block text-sm font-semibold text-auth-label group-hover/checkbox:text-auth-label-hover transition-colors duration-200">
                I agree to the
                <button
                  type="button"
                  class="text-auth-link hover:text-auth-link-hover underline decoration-2 underline-offset-2"
                >
                  Terms of Service
                </button>
                and
                <button
                  type="button"
                  class="text-auth-link hover:text-auth-link-hover underline decoration-2 underline-offset-2"
                >
                  Privacy Policy
                </button>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="isLoading"
              class="group/btn relative w-full flex justify-center py-4 px-8 border-2 border-auth-btn rounded-2xl text-lg font-black text-auth-btn-text bg-auth-btn-gradient hover:bg-auth-btn-gradient-hover focus:outline-none focus:ring-4 focus:ring-auth-focus focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-auth-btn hover:shadow-auth-btn-hover transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <!-- Enhanced Button Glow Effect -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-auth-btn-glow-1 to-auth-btn-glow-2 opacity-0 group-hover/btn:opacity-40 transition-opacity duration-300 blur-xl"></div>
              
              <!-- Button Shine Effect -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full"></div>
              
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-6">
                <svg
                  class="animate-spin h-6 w-6 text-auth-btn-text"
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
              <span class="relative z-10">{{ isLoading ? 'Creating account...' : 'Create account' }}</span>
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-auth-error text-sm text-center font-bold bg-auth-error-bg border-2 border-auth-error-border rounded-xl py-3 px-4 shadow-auth-error">
            {{ error }}
          </div>
        </form>

        <!-- Sign In Link -->
        <div class="text-center pt-4">
          <p class="text-sm text-auth-link mt-4">
            Already have an account?
            <button
              type="button"
              @click="showLogin = true"
              class="font-bold text-auth-link hover:text-auth-link-hover transition-all duration-200 hover:underline decoration-2 underline-offset-2"
            >
              Sign in here
            </button>
          </p>
        </div>

        <!-- Divider -->
        <div class="relative pt-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t-2 border-auth-divider" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="my-4 px-6 bg-auth-card text-auth-divider-text font-bold">Or continue with</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4 pt-4">
          <button
            type="button"
            class="group/social w-full inline-flex justify-center py-4 px-6 border-2 border-auth-social rounded-2xl shadow-auth-social bg-auth-social-bg text-sm font-bold text-auth-social-text hover:bg-auth-social-hover hover:border-auth-social-hover transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <svg class="h-6 w-6" viewBox="0 0 24 24">
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
            <span class="ml-3">Google</span>
          </button>

          <button
            type="button"
            class="group/social w-full inline-flex justify-center py-4 px-6 border-2 border-auth-social rounded-2xl shadow-auth-social bg-auth-social-bg text-sm font-bold text-auth-social-text hover:bg-auth-social-hover hover:border-auth-social-hover transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              />
            </svg>
            <span class="ml-3">Twitter</span>
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

// Props
interface Props {
  open: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:open': [value: boolean]
  'show-login': []
}>()

const router = useRouter()
const authStore = useAuthStore()

// Form data
const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: 'buyer',
  agreeTerms: false,
})

// State
const isLoading = ref(false)
const error = ref('')
const showLogin = ref(false)

// Methods
const handleRegister = async () => {
  try {
    // Validation
    if (form.password !== form.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }

    if (!form.agreeTerms) {
      error.value = 'Please agree to the terms and conditions'
      return
    }

    isLoading.value = true
    error.value = ''

    const result = await authStore.register({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      userType: form.userType,
    })

    if (result.success) {
      toast.success('Account created successfully!')
      emit('update:open', false)

      // Redirect based on user type
      if (form.userType === 'seller') {
        router.push('/seller/setup')
      } else {
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

// Watch for login trigger
const showLoginDialog = () => {
  emit('show-login')
  emit('update:open', false)
}
</script>

<style scoped>
/* Modern Auth Theme Variables */
.bg-auth-gradient {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}

/* Enhanced Glowy Background Elements */
.bg-auth-glow-1 {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
}
.bg-auth-glow-2 {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}
.bg-auth-glow-3 {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
}
.bg-auth-glow-4 {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}
.bg-auth-glow-5 {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

/* Floating Particle Styling */
.bg-auth-particle {
  background: linear-gradient(135deg, #6366f1 0%, #fbbf24 100%);
}

.bg-auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
}
.border-auth-border {
  border-color: rgba(99, 102, 241, 0.2);
}

/* Enhanced Logo Styling */
.bg-auth-logo-gradient {
  background: linear-gradient(135deg, #6366f1 0%, #fbbf24 100%);
  box-shadow: 0 0 40px rgba(99, 102, 241, 0.5), 0 0 30px rgba(251, 191, 36, 0.3);
}
.bg-auth-logo-glow {
  background: linear-gradient(135deg, #fbbf24 0%, #6366f1 100%);
}
.bg-auth-logo-glow-2 {
  background: linear-gradient(135deg, #ec4899 0%, #06b6d4 100%);
}
.shadow-auth-logo {
  box-shadow: 0 15px 50px rgba(99, 102, 241, 0.4), 0 0 30px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.text-auth-logo-icon {
  color: #fff;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

/* Enhanced Title Styling */
.text-auth-title-gradient-1 {
  color: #6366f1;
}
.text-auth-title-gradient-2 {
  color: #fbbf24;
}

.text-auth-title {
  color: #1e293b;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.text-auth-subtitle {
  color: #64748b;
}
.text-auth-label {
  color: #334155;
}

/* Enhanced Input Styling */
.border-auth-input {
  border-color: rgba(99, 102, 241, 0.2);
}
.border-auth-input-hover {
  border-color: rgba(99, 102, 241, 0.4);
}
.bg-auth-input-bg {
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
}
.text-auth-input-text {
  color: #1e293b;
}
.placeholder-auth-placeholder::placeholder {
  color: #94a3b8;
}

/* Input Glow Effects */
.bg-auth-input-glow-1 {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
}
.bg-auth-input-glow-2 {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.shadow-auth-input {
  box-shadow: 0 6px 25px rgba(99, 102, 241, 0.15), 0 0 15px rgba(251, 191, 36, 0.08);
}
.shadow-auth-input-hover {
  box-shadow: 0 10px 35px rgba(99, 102, 241, 0.25), 0 0 25px rgba(251, 191, 36, 0.15);
}

.focus-auth-focus:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3), 0 0 25px rgba(99, 102, 241, 0.25);
}

/* Enhanced Link Styling */
.text-auth-link {
  color: #6366f1;
}
.text-auth-link-hover:hover {
  color: #fbbf24;
}

/* Enhanced Button Styling */
.border-auth-btn {
  border-color: rgba(99, 102, 241, 0.3);
}
.bg-auth-btn-gradient {
  background: linear-gradient(135deg, #6366f1 0%, #fbbf24 100%);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.4), 0 0 30px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.bg-auth-btn-gradient-hover:hover {
  background: linear-gradient(135deg, #fbbf24 0%, #6366f1 100%);
  box-shadow: 0 18px 50px rgba(251, 191, 36, 0.5), 0 0 40px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Button Glow Effects */
.bg-auth-btn-glow-1 {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}
.bg-auth-btn-glow-2 {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
}

.shadow-auth-btn {
  box-shadow: 0 15px 50px rgba(99, 102, 241, 0.4), 0 0 30px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.shadow-auth-btn-hover:hover {
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.5), 0 0 40px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.text-auth-btn-text {
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

/* Enhanced Error Styling */
.text-auth-error {
  color: #ef4444;
}
.bg-auth-error-bg {
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(10px);
}
.border-auth-error-border {
  border-color: rgba(239, 68, 68, 0.3);
}
.shadow-auth-error {
  box-shadow: 0 6px 25px rgba(239, 68, 68, 0.25);
}

/* Enhanced Divider Styling */
.border-auth-divider {
  border-color: rgba(99, 102, 241, 0.2);
}
.text-auth-divider-text {
  color: #94a3b8;
}

/* Enhanced Social Login Styling */
.border-auth-social {
  border-color: rgba(99, 102, 241, 0.2);
}
.border-auth-social-hover:hover {
  border-color: rgba(99, 102, 241, 0.4);
}
.bg-auth-social-bg {
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
}
.text-auth-social-text {
  color: #64748b;
}
.bg-auth-social-hover:hover {
  background: rgba(99, 102, 241, 0.1);
}
.shadow-auth-social {
  box-shadow: 0 6px 25px rgba(99, 102, 241, 0.15);
}

/* Enhanced Checkbox Styling */
.text-auth-checkbox {
  accent-color: #6366f1;
}
.border-auth-checkbox-hover {
  border-color: rgba(99, 102, 241, 0.4);
}
.shadow-auth-checkbox {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
}
.text-auth-label-hover {
  color: #6366f1;
}

/* Enhanced Card Shadows */
.shadow-auth-card {
  box-shadow: 0 25px 70px rgba(99, 102, 241, 0.15), 0 0 40px rgba(251, 191, 36, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
.shadow-auth-card-hover:hover {
  box-shadow: 0 35px 90px rgba(99, 102, 241, 0.25), 0 0 50px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Dark mode overrides - Enhanced for punchy, glowy effects */
:global(.dark) .bg-auth-card {
  background: rgba(35, 35, 58, 0.95);
  backdrop-filter: blur(20px);
}

:global(.dark) .border-auth-border {
  border-color: rgba(99, 102, 241, 0.5);
}

:global(.dark) .bg-auth-logo-gradient {
  background: linear-gradient(135deg, #6366f1 0%, #fbbf24 100%);
  box-shadow: 0 0 50px rgba(99, 102, 241, 0.7), 0 0 30px rgba(251, 191, 36, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

:global(.dark) .bg-auth-logo-glow {
  background: linear-gradient(135deg, #fbbf24 0%, #6366f1 100%);
}

:global(.dark) .bg-auth-logo-glow-2 {
  background: linear-gradient(135deg, #ec4899 0%, #06b6d4 100%);
}

:global(.dark) .text-auth-logo-icon {
  color: #fbbf24;
  filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.9));
}

:global(.dark) .text-auth-title {
  color: #fbbf24;
  text-shadow: 0 0 25px rgba(251, 191, 36, 0.6), 0 4px 8px rgba(0, 0, 0, 0.6);
}

:global(.dark) .text-auth-subtitle {
  color: #a5b4fc;
  text-shadow: 0 0 15px rgba(165, 180, 252, 0.4);
}

:global(.dark) .text-auth-label {
  color: #fbbf24;
  text-shadow: 0 0 15px rgba(251, 191, 36, 0.4);
}

:global(.dark) .border-auth-input {
  border-color: rgba(99, 102, 241, 0.6);
}

:global(.dark) .border-auth-input-hover {
  border-color: rgba(251, 191, 36, 0.7);
}

:global(.dark) .bg-auth-input-bg {
  background: rgba(24, 24, 27, 0.9);
  backdrop-filter: blur(10px);
}

:global(.dark) .text-auth-input-text {
  color: #fbbf24;
}

:global(.dark) .placeholder-auth-placeholder::placeholder {
  color: #a5b4fc;
}

:global(.dark) .focus-auth-focus:focus {
  border-color: #fbbf24;
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.5), 0 0 35px rgba(251, 191, 36, 0.4);
}

:global(.dark) .text-auth-link {
  color: #fbbf24;
  text-shadow: 0 0 15px rgba(251, 191, 36, 0.4);
}

:global(.dark) .text-auth-link-hover:hover {
  color: #6366f1;
  text-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
}

:global(.dark) .border-auth-btn {
  border-color: rgba(251, 191, 36, 0.6);
}

:global(.dark) .bg-auth-btn-gradient {
  background: linear-gradient(135deg, #6366f1 0%, #fbbf24 100%);
  box-shadow: 0 15px 50px rgba(99, 102, 241, 0.5), 0 0 40px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

:global(.dark) .bg-auth-btn-gradient-hover:hover {
  background: linear-gradient(135deg, #fbbf24 0%, #6366f1 100%);
  box-shadow: 0 20px 60px rgba(251, 191, 36, 0.6), 0 0 50px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

:global(.dark) .text-auth-btn-text {
  color: #0f0f23;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.4);
}

:global(.dark) .text-auth-error {
  color: #f87171;
  text-shadow: 0 0 15px rgba(248, 113, 113, 0.4);
}

:global(.dark) .bg-auth-error-bg {
  background: rgba(248, 113, 113, 0.2);
  backdrop-filter: blur(10px);
}

:global(.dark) .border-auth-error-border {
  border-color: rgba(248, 113, 113, 0.5);
}

:global(.dark) .shadow-auth-error {
  box-shadow: 0 6px 25px rgba(248, 113, 113, 0.4);
}

:global(.dark) .border-auth-divider {
  border-color: rgba(99, 102, 241, 0.6);
}

:global(.dark) .text-auth-divider-text {
  color: #a5b4fc;
}

:global(.dark) .border-auth-social {
  border-color: rgba(99, 102, 241, 0.6);
}

:global(.dark) .border-auth-social-hover:hover {
  border-color: rgba(251, 191, 36, 0.7);
}

:global(.dark) .bg-auth-social-bg {
  background: rgba(35, 35, 58, 0.9);
  backdrop-filter: blur(10px);
}

:global(.dark) .text-auth-social-text {
  color: #fbbf24;
}

:global(.dark) .bg-auth-social-hover:hover {
  background: rgba(99, 102, 241, 0.25);
}

:global(.dark) .text-auth-checkbox {
  accent-color: #fbbf24;
}

:global(.dark) .border-auth-checkbox-hover {
  border-color: rgba(251, 191, 36, 0.7);
}

:global(.dark) .shadow-auth-checkbox {
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.4);
}

:global(.dark) .text-auth-label-hover {
  color: #fbbf24;
}

:global(.dark) .shadow-auth-card {
  box-shadow: 0 30px 80px rgba(99, 102, 241, 0.3), 0 0 50px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

:global(.dark) .shadow-auth-card-hover:hover {
  box-shadow: 0 40px 100px rgba(99, 102, 241, 0.4), 0 0 60px rgba(251, 191, 36, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
</style>
