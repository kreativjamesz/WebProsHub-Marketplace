import type { RouteRecordRaw } from 'vue-router'
import { requireSeller } from '@/router/guards'

export const sellerRoutes: RouteRecordRaw[] = [
  {
    path: '/seller',
    name: 'seller-layout',
    redirect: '/seller/dashboard',
    beforeEnter: requireSeller,
    meta: { requiresAuth: true, role: 'SELLER', layout: 'seller' }
  },
  {
    path: '/seller/dashboard',
    name: 'seller-dashboard',
    component: () => import('@/views/seller/SellerDashboardView.vue'),
    beforeEnter: requireSeller,
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
    beforeEnter: requireSeller,
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
    beforeEnter: requireSeller,
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
    beforeEnter: requireSeller,
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
    beforeEnter: requireSeller,
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
    beforeEnter: requireSeller,
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
    beforeEnter: requireSeller,
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
