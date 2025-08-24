<template>
  <div class="space-y-4 p-6 bg-card rounded-lg border">
    <h3 class="text-lg font-semibold">🔒 Auth Guard Demo</h3>
    
    <div class="text-sm text-muted-foreground mb-4">
      <p>Try clicking these links - they'll automatically show the login dialog if you're not authenticated!</p>
    </div>
    
    <div class="flex flex-wrap gap-3">
      <!-- Protected Routes -->
      <router-link
        to="/profile"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        🔐 My Profile
      </router-link>
      
      <router-link
        to="/buyer/cart"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        🛒 Shopping Cart
      </router-link>
      
      <router-link
        to="/buyer/orders"
        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        📦 My Orders
      </router-link>
      
      <router-link
        to="/seller/dashboard"
        class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
      >
        🏪 Seller Dashboard
      </router-link>
      
      <router-link
        to="/admin/users"
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        👑 Admin Panel
      </router-link>
    </div>
    
    <div class="text-xs text-muted-foreground mt-4">
      <p>💡 <strong>How it works:</strong></p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Click any protected route above</li>
        <li>Auth Guard automatically detects you're not logged in</li>
        <li>Login dialog appears automatically</li>
        <li>After login, you're redirected to your intended destination!</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// This component demonstrates the auth guards in action
</script>
