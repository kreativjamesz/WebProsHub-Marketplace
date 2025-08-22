<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navigation Header -->
    <AppHeader />

    <!-- Admin Content Area -->
    <div class="flex flex-1">
      <!-- Admin Sidebar -->
      <aside class="w-64 bg-sidebar border-r border-sidebar-border">
        <div class="p-4">
          <h2 class="text-lg font-semibold text-sidebar-foreground mb-4">Admin Panel</h2>
          <nav class="space-y-2">
            <router-link 
              to="/admin/dashboard" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/admin/users" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              User Management
            </router-link>
            <router-link 
              to="/admin/stores" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              Store Management
            </router-link>
            <router-link 
              to="/admin/products" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              Product Management
            </router-link>
            <router-link 
              to="/admin/orders" 
              class="block px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
              active-class="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              Order Management
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
