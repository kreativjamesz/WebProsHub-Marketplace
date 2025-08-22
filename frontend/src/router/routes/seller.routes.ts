import type { RouteRecordRaw } from 'vue-router'

export const sellerRoutes: RouteRecordRaw[] = [
  {
    path: '/seller',
    name: 'seller-layout',
    redirect: '/seller/dashboard',
    meta: { requiresAuth: true, role: 'SELLER', layout: 'seller' }
  },
  {
    path: '/seller/dashboard',
    name: 'seller-dashboard',
    component: () => import('@/views/seller/SellerDashboardView.vue'),
    meta: { 
      title: 'Seller Dashboard - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'SELLER',
      requiresStore: true, // Additional protection
      layout: 'seller'
    },
  },
  {
    path: '/seller/onboarding',
    name: 'seller-onboarding',
    component: () => import('@/views/seller/SellerOnboardingView.vue'),
    meta: { 
      title: 'Seller Onboarding - WebProsHubMarketplace', 
      requiresAuth: true,
      role: 'SELLER',
      requiresApproval: true, // Only for approved sellers
      layout: 'seller'
    },
  },
  {
    path: '/seller/pending-approval',
    name: 'seller-pending-approval',
    component: () => import('@/views/seller/SellerPendingApprovalView.vue'),
    meta: { 
      title: 'Pending Approval - WebProsHubMarketplace', 
      requiresAuth: true, 
      role: 'SELLER',
      requiresApproval: false, // For unapproved sellers
      layout: 'seller'
    },
  },
  {
    path: '/seller/profile',
    name: 'seller-profile',
    component: () => import('@/views/seller/ProfileView.vue'),
    meta: { 
      title: 'Seller Profile - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'SELLER',
      requiresApproval: true,
      layout: 'seller'
    },
  },
  {
    path: '/seller/stores',
    name: 'seller-stores',
    component: () => import('@/views/seller/StoresView.vue'),
    meta: { 
      title: 'My Stores - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'SELLER',
      requiresApproval: true,
      layout: 'seller'
    },
  },
  {
    path: '/seller/products',
    name: 'seller-products',
    component: () => import('@/views/seller/ProductsView.vue'),
    meta: { 
      title: 'My Products - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'SELLER',
      requiresApproval: true,
      requiresStore: true,
      layout: 'seller'
    },
  },
  {
    path: '/seller/orders',
    name: 'seller-orders',
    component: () => import('@/views/seller/OrdersView.vue'),
    meta: { 
      title: 'My Orders - WebProsHubMarketplace',
      requiresAuth: true,
      role: 'SELLER',
      requiresApproval: true,
      requiresStore: true,
      layout: 'seller'
    },
  },
]
