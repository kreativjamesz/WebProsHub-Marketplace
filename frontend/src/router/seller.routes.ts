import type { RouteRecordRaw } from 'vue-router'

export const sellerRoutes: RouteRecordRaw[] = [
  {
    path: '/seller',
    name: 'seller',
    component: () => import('@/views/seller/SellerLayout.vue'),
    meta: { requiresAuth: true, role: 'SELLER' },
    children: [
      {
        path: 'dashboard',
        name: 'seller-dashboard',
        component: () => import('@/views/seller/SellerDashboardView.vue'),
        meta: { title: 'Seller Dashboard - WebProsHubMarketplace' }
      },
      {
        path: 'profile',
        name: 'seller-profile',
        component: () => import('@/views/seller/ProfileView.vue'),
        meta: { title: 'Seller Profile - WebProsHubMarketplace' }
      },
      {
        path: 'stores',
        name: 'seller-stores',
        component: () => import('@/views/seller/StoresView.vue'),
        meta: { title: 'My Stores - WebProsHubMarketplace' }
      },
      {
        path: 'products',
        name: 'seller-products',
        component: () => import('@/views/seller/ProductsView.vue'),
        meta: { title: 'My Products - WebProsHubMarketplace' }
      },
      {
        path: 'orders',
        name: 'seller-orders',
        component: () => import('@/views/seller/OrdersView.vue'),
        meta: { title: 'Orders - WebProsHubMarketplace' }
      }
    ]
  }
]
