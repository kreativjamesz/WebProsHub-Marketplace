<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navigation Header -->
    <AppHeader />

    <!-- Seller Content Area -->
    <div class="flex flex-1">
      <!-- Seller Sidebar -->
      <aside class="w-64 bg-sidebar border-r border-sidebar-border">
        <div class="p-4">
          <h2 class="text-lg font-semibold text-sidebar-foreground mb-4">Seller Panel</h2>
          <nav class="space-y-2">
            <router-link 
              to="/seller/dashboard" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/seller/products" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              My Products
            </router-link>
            <router-link 
              to="/seller/orders" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              Orders
            </router-link>
            <router-link 
              to="/seller/store" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              Store Settings
            </router-link>
            <router-link 
              to="/seller/analytics" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              Analytics
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
