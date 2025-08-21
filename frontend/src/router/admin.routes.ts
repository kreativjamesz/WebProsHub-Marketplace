import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, role: 'ADMIN' },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboardView.vue'),
        meta: { title: 'Admin Dashboard - WebProsHubMarketplace' }
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/UsersView.vue'),
        meta: { title: 'User Management - WebProsHubMarketplace' }
      },
      {
        path: 'sellers',
        name: 'admin-sellers',
        component: () => import('@/views/admin/SellersView.vue'),
        meta: { title: 'Seller Management - WebProsHubMarketplace' }
      },
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('@/views/admin/ProductsView.vue'),
        meta: { title: 'Product Management - WebProsHubMarketplace' }
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('@/views/admin/OrdersView.vue'),
        meta: { title: 'Order Management - WebProsHubMarketplace' }
      }
    ]
  }
]
