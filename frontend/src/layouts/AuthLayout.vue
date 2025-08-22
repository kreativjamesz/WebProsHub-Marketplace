<template>
  <div class="min-h-screen">
    <!-- Navigation Header for Guest Users -->
    <header class="bg-background border-b border-border">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <AppLogo />

          <!-- Navigation Links -->
          <nav class="hidden md:flex items-center space-x-6">
            <router-link
              to="/"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </router-link>
            <router-link
              to="/marketplace"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Marketplace
            </router-link>
            <router-link
              to="/stores"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Stores
            </router-link>
            <router-link
              to="/categories"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Categories
            </router-link>
            <router-link
              to="/deals"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Deals
            </router-link>
            <router-link
              to="/about"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </router-link>
            <router-link
              to="/contact"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </router-link>
          </nav>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-4">
            <!-- Cart Button -->
            <router-link
              to="/marketplace"
              class="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
              title="Browse Products"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </router-link>

            <!-- Guest Notice -->
            <div class="hidden md:block text-sm text-muted-foreground">
              <span>Guest User</span>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation Toggle -->
        <div class="md:hidden mt-4">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="w-full flex items-center justify-between p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Navigation Menu</span>
            <svg
              :class="isMobileMenuOpen ? 'rotate-180' : ''"
              class="w-5 h-5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Mobile Menu -->
          <div v-if="isMobileMenuOpen" class="mt-2 space-y-2">
            <router-link
              to="/"
              class="block p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
            >
              Home
            </router-link>
            <router-link
              to="/marketplace"
              class="block p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
            >
              Marketplace
            </router-link>
            <router-link
              to="/stores"
              class="block p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
            >
              Stores
            </router-link>
            <router-link
              to="/categories"
              class="block p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
            >
              Categories
            </router-link>
            <router-link
              to="/deals"
              class="block p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
            >
              Deals
            </router-link>
            <router-link
              to="/about"
              class="block p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
            >
              About
            </router-link>
            <router-link
              to="/contact"
              class="block p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
            >
              Contact
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-background border-t border-border mt-auto">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <svg
                class="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span class="text-xl font-bold text-foreground">WebProsHub</span>
            </div>
            <p class="text-muted-foreground mb-4">
              Your trusted marketplace for local businesses and sellers. Discover amazing products
              and support local commerce.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                </svg>
              </a>
              <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                  />
                </svg>
              </a>
              <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <router-link
                  to="/marketplace"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse Products
                </router-link>
              </li>
              <li>
                <router-link
                  to="/stores"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Find Stores
                </router-link>
              </li>
              <li>
                <router-link
                  to="/deals"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Special Deals
                </router-link>
              </li>
              <li>
                <router-link
                  to="/help"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="font-semibold text-foreground mb-4">Support</h3>
            <ul class="space-y-2">
              <li>
                <router-link
                  to="/contact"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </router-link>
              </li>
              <li>
                <router-link
                  to="/help"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </router-link>
              </li>
              <li>
                <a href="#" class="text-muted-foreground hover:text-foreground transition-colors">
                  Live Chat
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Footer -->
        <div class="border-t border-border mt-8 pt-8 text-center">
          <p class="text-muted-foreground">
            © 2024 WebProsHub. All rights reserved. |
            <router-link to="/privacy" class="hover:text-foreground transition-colors"
              >Privacy Policy</router-link
            >
            |
            <router-link to="/terms" class="hover:text-foreground transition-colors"
              >Terms of Service</router-link
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppLogo from '@/components/layout/AppLogo.vue'
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
</script>
