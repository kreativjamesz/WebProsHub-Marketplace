import type { RouteRecordRaw } from 'vue-router'

export const sellerRoutes: RouteRecordRaw[] = [
  {
    path: '/seller',
    name: 'seller-layout',
    component: () => import('@/views/seller/SellerLayout.vue'),
    meta: { requiresAuth: true, role: 'SELLER' },
    redirect: '/seller/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'seller-dashboard',
        component: () => import('@/views/seller/SellerDashboardView.vue'),
        meta: { 
          title: 'Seller Dashboard - WebProsHubMarketplace',
          requiresStore: true // Additional protection
        },
      },
      {
        path: 'onboarding',
        name: 'seller-onboarding',
        component: () => import('@/views/seller/SellerOnboardingView.vue'),
        meta: { 
          title: 'Seller Onboarding - WebProsHubMarketplace', 
          guest: true,
          requiresApproval: true // Only for approved sellers
        },
      },
      {
        path: 'pending-approval',
        name: 'seller-pending-approval',
        component: () => import('@/views/seller/SellerPendingApprovalView.vue'),
        meta: { 
          title: 'Pending Approval - WebProsHubMarketplace', 
          requiresAuth: true, 
          role: 'SELLER',
          requiresApproval: false // For unapproved sellers
        },
      },
      {
        path: 'profile',
        name: 'seller-profile',
        component: () => import('@/views/seller/ProfileView.vue'),
        meta: { 
          title: 'Seller Profile - WebProsHubMarketplace',
          requiresApproval: true
        },
      },
      {
        path: 'stores',
        name: 'seller-stores',
        component: () => import('@/views/seller/StoresView.vue'),
        meta: { 
          title: 'My Stores - WebProsHubMarketplace',
          requiresApproval: true
        },
      },
      {
        path: 'products',
        name: 'seller-products',
        component: () => import('@/views/seller/ProductsView.vue'),
        meta: { 
          title: 'My Products - WebProsHubMarketplace',
          requiresApproval: true,
          requiresStore: true
        },
      },
      {
        path: 'orders',
        name: 'seller-orders',
        component: () => import('@/views/seller/OrdersView.vue'),
        meta: { 
          title: 'My Orders - WebProsHubMarketplace',
          requiresApproval: true,
          requiresStore: true
        },
      },
    ],
  },
]
