<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navigation Header -->
    <AppHeader />

    <!-- Buyer Content Area -->
    <div class="flex flex-1">
      <!-- Buyer Sidebar -->
      <aside class="w-64 bg-sidebar border-r border-sidebar-border">
        <div class="p-4">
          <h2 class="text-lg font-semibold text-sidebar-foreground mb-4">My Account</h2>
          <nav class="space-y-2">
            <router-link 
              to="/buyer/dashboard" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              My Dashboard
            </router-link>
            <router-link 
              to="/buyer/orders" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              My Orders
            </router-link>
            <router-link 
              to="/buyer/cart" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              My Shopping Cart
            </router-link>
            <router-link 
              to="/wishlist" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              My Wishlist
            </router-link>
            <router-link 
              to="/buyer/addresses" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              My Addresses
            </router-link>
            <router-link 
              to="/buyer/reviews" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              My Reviews & Ratings
            </router-link>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>

    <!-- Footer -->
    <AppFooter />

    <!-- Global Cart Sheet -->
    <GlobalCartSheet />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import GlobalCartSheet from '@/components/shopping/GlobalCartSheet.vue'
</script>
