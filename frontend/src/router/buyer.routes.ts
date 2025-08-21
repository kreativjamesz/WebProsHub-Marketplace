import type { RouteRecordRaw } from 'vue-router'

export const buyerRoutes: RouteRecordRaw[] = [
  {
    path: '/buyer',
    name: 'buyer',
    component: () => import('@/views/buyer/BuyerLayout.vue'),
    meta: { requiresAuth: true, role: 'BUYER' },
    children: [
      {
        path: 'dashboard',
        name: 'buyer-dashboard',
        component: () => import('@/views/buyer/BuyerDashboardView.vue'),
        meta: { title: 'Buyer Dashboard - WebProsHubMarketplace' }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/buyer/CartView.vue'),
        meta: { title: 'Shopping Cart - WebProsHubMarketplace' }
      },
      {
        path: 'wishlist',
        name: 'wishlist',
        component: () => import('@/views/buyer/WishlistView.vue'),
        meta: { title: 'Wishlist - WebProsHubMarketplace' }
      },
      {
        path: 'orders',
        name: 'buyer-orders',
        component: () => import('@/views/buyer/OrdersView.vue'),
        meta: { title: 'My Orders - WebProsHubMarketplace' }
      },
      {
        path: 'profile',
        name: 'buyer-profile',
        component: () => import('@/views/buyer/ProfileView.vue'),
        meta: { title: 'Profile - WebProsHubMarketplace' }
      }
    ]
  }
]
