import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home - WebProsHubMarketplace' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About - WebProsHubMarketplace' }
    },
    // Auth routes
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { title: 'Login - WebProsHubMarketplace', guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { title: 'Register - WebProsHubMarketplace', guest: true }
    },
    // Marketplace routes
    {
      path: '/marketplace',
      name: 'marketplace',
      component: () => import('../views/marketplace/MarketplaceView.vue'),
      meta: { title: 'Marketplace - WebProsHubMarketplace' }
    },
    {
      path: '/stores',
      name: 'stores',
      component: () => import('../views/marketplace/StoresView.vue'),
      meta: { title: 'Stores - WebProsHubMarketplace' }
    },
    {
      path: '/stores/:id',
      name: 'store-detail',
      component: () => import('../views/marketplace/StoreDetailView.vue'),
      meta: { title: 'Store Details - WebProsHubMarketplace' }
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/marketplace/CategoriesView.vue'),
      meta: { title: 'Categories - WebProsHubMarketplace' }
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('../views/marketplace/ProductDetailView.vue'),
      meta: { title: 'Product Details - WebProsHubMarketplace' }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/marketplace/SearchView.vue'),
      meta: { title: 'Search Results - WebProsHubMarketplace' }
    },
    // Buyer routes
    {
      path: '/buyer',
      name: 'buyer',
      component: () => import('../views/buyer/BuyerLayout.vue'),
      meta: { requiresAuth: true, role: 'BUYER' },
      children: [
        {
          path: 'dashboard',
          name: 'buyer-dashboard',
          component: () => import('../views/buyer/BuyerDashboardView.vue'),
          meta: { title: 'Buyer Dashboard - WebProsHubMarketplace' }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/buyer/CartView.vue'),
          meta: { title: 'Shopping Cart - WebProsHubMarketplace' }
        },
        {
          path: 'wishlist',
          name: 'wishlist',
          component: () => import('../views/buyer/WishlistView.vue'),
          meta: { title: 'Wishlist - WebProsHubMarketplace' }
        },
        {
          path: 'orders',
          name: 'buyer-orders',
          component: () => import('../views/buyer/OrdersView.vue'),
          meta: { title: 'My Orders - WebProsHubMarketplace' }
        },
        {
          path: 'profile',
          name: 'buyer-profile',
          component: () => import('../views/buyer/ProfileView.vue'),
          meta: { title: 'Profile - WebProsHubMarketplace' }
        }
      ]
    },
    // Seller routes
    {
      path: '/seller',
      name: 'seller',
      component: () => import('../views/seller/SellerLayout.vue'),
      meta: { requiresAuth: true, role: 'SELLER' },
      children: [
        {
          path: 'dashboard',
          name: 'seller-dashboard',
          component: () => import('../views/seller/SellerDashboardView.vue'),
          meta: { title: 'Seller Dashboard - WebProsHubMarketplace' }
        },
        {
          path: 'profile',
          name: 'seller-profile',
          component: () => import('../views/seller/ProfileView.vue'),
          meta: { title: 'Seller Profile - WebProsHubMarketplace' }
        },
        {
          path: 'stores',
          name: 'seller-stores',
          component: () => import('../views/seller/StoresView.vue'),
          meta: { title: 'My Stores - WebProsHubMarketplace' }
        },
        {
          path: 'products',
          name: 'seller-products',
          component: () => import('../views/seller/ProductsView.vue'),
          meta: { title: 'My Products - WebProsHubMarketplace' }
        },
        {
          path: 'orders',
          name: 'seller-orders',
          component: () => import('../views/seller/OrdersView.vue'),
          meta: { title: 'Orders - WebProsHubMarketplace' }
        }
      ]
    },
    // Admin routes
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, role: 'ADMIN' },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../views/admin/DashboardView.vue'),
          meta: { title: 'Admin Dashboard - WebProsHubMarketplace' }
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/UsersView.vue'),
          meta: { title: 'User Management - WebProsHubMarketplace' }
        },
        {
          path: 'sellers',
          name: 'admin-sellers',
          component: () => import('../views/admin/SellersView.vue'),
          meta: { title: 'Seller Management - WebProsHubMarketplace' }
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/ProductsView.vue'),
          meta: { title: 'Product Management - WebProsHubMarketplace' }
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/OrdersView.vue'),
          meta: { title: 'Order Management - WebProsHubMarketplace' }
        }
      ]
    },
    // Profile routes
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true, title: 'Profile - WebProsHubMarketplace' }
    },
    // Settings routes
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { requiresAuth: true, title: 'Settings - WebProsHubMarketplace' }
    },
    // 404 route
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Page Not Found - WebProsHubMarketplace' }
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Wait for auth to be initialized
  if (!authStore.isInitialized) {
    await authStore.checkAuth()
  }
  
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // Guest routes (login/register) - redirect if already authenticated
  if (to.meta.guest && authStore.isAuthenticated) {
    next('/')
    return
  }
  
  // Protected routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Role-based access control
  if (to.meta.role && authStore.userRole !== to.meta.role) {
    if (authStore.canAccessAdmin) {
      next('/admin/dashboard')
    } else if (authStore.isSeller) {
      next('/seller/dashboard')
    } else if (authStore.isBuyer) {
      next('/buyer/dashboard')
    } else {
      next('/')
    }
    return
  }
  
  next()
})

export default router
