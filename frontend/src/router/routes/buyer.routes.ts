import type { RouteRecordRaw } from 'vue-router'

export const buyerRoutes: RouteRecordRaw[] = [
  {
    path: '/buyer',
    name: 'buyer',
    redirect: '/buyer/dashboard',
    meta: { requiresAuth: true, role: 'BUYER', layout: 'buyer' }
  },
  {
    path: '/buyer/dashboard',
    name: 'buyer-dashboard',
    component: () => import('@/views/buyer/BuyerDashboardView.vue'),
    meta: { 
      title: 'Buyer Dashboard - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'BUYER',
      layout: 'buyer'
    }
  },
  {
    path: '/buyer/cart',
    name: 'cart',
    component: () => import('@/views/buyer/CartView.vue'),
    meta: { 
      title: 'Shopping Cart - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'BUYER',
      layout: 'buyer'
    }
  },
  {
    path: '/buyer/wishlist',
    name: 'wishlist',
    component: () => import('@/views/buyer/WishlistView.vue'),
    meta: { 
      title: 'Wishlist - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'BUYER',
      layout: 'buyer'
    }
  },
  {
    path: '/buyer/orders',
    name: 'buyer-orders',
    component: () => import('@/views/buyer/OrdersView.vue'),
    meta: { 
      title: 'My Orders - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'BUYER',
      layout: 'buyer'
    }
  },
  {
    path: '/buyer/profile',
    name: 'buyer-profile',
    component: () => import('@/views/buyer/ProfileView.vue'),
    meta: { 
      title: 'Profile - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'BUYER',
      layout: 'buyer'
    }
  }
]
