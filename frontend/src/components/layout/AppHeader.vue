<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <!-- Logo and Brand -->
        <div class="brand">
          <router-link to="/" class="brand-link">
            <div class="brand-logo">
              <MapPin class="logo-icon" />
            </div>
            <div class="brand-text">
              <h1 class="brand-name">WebProsHub</h1>
              <span class="brand-tagline">Marketplace</span>
            </div>
          </router-link>
        </div>

        <!-- Search Bar -->
        <div class="search-container">
          <div class="search-box">
            <Search class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products, stores, or categories..."
              class="search-input"
              @keyup.enter="handleSearch"
            />
            <button @click="handleSearch" class="search-button">
              <Search class="search-button-icon" />
            </button>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="nav-menu">
          <router-link to="/marketplace" class="nav-link">
            <Store class="nav-icon" />
            <span>Marketplace</span>
          </router-link>
          
          <router-link to="/stores" class="nav-link">
            <MapPin class="nav-icon" />
            <span>Stores</span>
          </router-link>
          
          <router-link to="/categories" class="nav-link">
            <Grid class="nav-icon" />
            <span>Categories</span>
          </router-link>
        </nav>

        <!-- User Actions -->
        <div class="user-actions">
          <!-- Cart (for buyers) -->
          <router-link v-if="authStore.isBuyer" to="/cart" class="action-button cart-button">
            <ShoppingCart class="action-icon" />
            <span class="action-text">Cart</span>
            <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
          </router-link>

          <!-- Wishlist (for buyers) -->
          <router-link v-if="authStore.isBuyer" to="/wishlist" class="action-button">
            <Heart class="action-icon" />
            <span class="action-text">Wishlist</span>
          </router-link>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="user-menu">
            <button @click="toggleUserMenu" class="user-menu-button">
              <div class="user-avatar">
                <img
                  v-if="authStore.user?.avatar"
                  :src="authStore.user.avatar"
                  :alt="authStore.user.name"
                  class="avatar-image"
                />
                <User v-else class="avatar-placeholder" />
              </div>
              <span class="user-name">{{ authStore.user?.name }}</span>
              <ChevronDown class="chevron-icon" />
            </button>

            <!-- Dropdown Menu -->
            <div v-if="showUserMenu" class="user-dropdown">
              <div class="dropdown-header">
                <div class="user-info">
                  <div class="user-avatar">
                    <img
                      v-if="authStore.user?.avatar"
                      :src="authStore.user.avatar"
                      :alt="authStore.user.name"
                      class="avatar-image"
                    />
                    <User v-else class="avatar-placeholder" />
                  </div>
                  <div class="user-details">
                    <p class="user-full-name">{{ authStore.user?.name }}</p>
                    <p class="user-email">{{ authStore.user?.email }}</p>
                    <span class="user-role">{{ authStore.user?.role }}</span>
                  </div>
                </div>
              </div>

              <div class="dropdown-menu">
                <!-- Profile -->
                <router-link to="/profile" class="dropdown-item">
                  <User class="dropdown-icon" />
                  <span>Profile</span>
                </router-link>

                <!-- Dashboard based on role -->
                <router-link v-if="authStore.isSeller" to="/seller/dashboard" class="dropdown-item">
                  <Store class="dropdown-icon" />
                  <span>Seller Dashboard</span>
                </router-link>

                <router-link v-if="authStore.isBuyer" to="/buyer/dashboard" class="dropdown-item">
                  <ShoppingBag class="dropdown-icon" />
                  <span>My Orders</span>
                </router-link>

                <router-link v-if="authStore.canAccessAdmin" to="/admin/dashboard" class="dropdown-item">
                  <Shield class="dropdown-icon" />
                  <span>Admin Panel</span>
                </router-link>

                <!-- Settings -->
                <router-link to="/settings" class="dropdown-item">
                  <Settings class="dropdown-icon" />
                  <span>Settings</span>
                </router-link>

                <!-- Divider -->
                <div class="dropdown-divider"></div>

                <!-- Logout -->
                <button @click="handleLogout" class="dropdown-item logout-item">
                  <LogOut class="dropdown-icon" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Auth Buttons (for guests) -->
          <div v-else class="auth-buttons">
            <router-link to="/login" class="btn btn-outline">
              <LogIn class="btn-icon" />
              <span>Login</span>
            </router-link>
            <router-link to="/register" class="btn btn-primary">
              <UserPlus class="btn-icon" />
              <span>Register</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import {
  MapPin,
  Search,
  Store,
  Grid,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  ShoppingBag,
  Shield,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

// Reactive data
const searchQuery = ref('')
const showUserMenu = ref(false)
const cartItemCount = ref(0)

// Computed
const isMobile = computed(() => window.innerWidth < 768)

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value.trim() }
    })
    searchQuery.value = ''
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    showUserMenu.value = false
    toast.success('Logged out successfully')
    router.push('/')
  } catch (error) {
    toast.error('Logout failed')
  }
}

const closeUserMenu = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.user-menu')) {
    showUserMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeUserMenu)
  // TODO: Load cart item count from store
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>

<style scoped>
.app-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
}

/* Brand */
.brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.brand-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.brand-tagline {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

/* Search */
.search-container {
  flex: 1;
  max-width: 500px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: #f9fafb;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  background: white;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-button {
  position: absolute;
  right: 0.5rem;
  padding: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background: #2563eb;
}

.search-button-icon {
  width: 16px;
  height: 16px;
}

/* Navigation */
.nav-menu {
  display: flex;
  gap: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: #6b7280;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-link:hover {
  color: #374151;
  background: #f3f4f6;
}

.nav-icon {
  width: 18px;
  height: 18px;
}

/* User Actions */
.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: #6b7280;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  position: relative;
}

.action-button:hover {
  color: #374151;
  background: #f3f4f6;
}

.action-icon {
  width: 20px;
  height: 20px;
}

.action-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.cart-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
}

/* User Menu */
.user-menu {
  position: relative;
}

.user-menu-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: none;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-menu-button:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.user-menu-button:hover .chevron-icon {
  transform: rotate(180deg);
}

/* Dropdown */
.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  min-width: 280px;
  z-index: 50;
}

.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-details {
  flex: 1;
}

.user-full-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.user-role {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #3b82f6;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.25rem;
  text-transform: uppercase;
}

.dropdown-menu {
  padding: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  text-decoration: none;
  color: #374151;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.dropdown-icon {
  width: 18px;
  height: 18px;
  color: #6b7280;
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.5rem 0;
}

.logout-item {
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: #dc2626;
}

.logout-item:hover {
  background: #fef2f2;
}

/* Auth Buttons */
.auth-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }
  
  .search-container {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .search-container {
    order: 3;
    flex: 1 1 100%;
    max-width: none;
  }
  
  .action-text {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .auth-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .auth-buttons .btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>
