import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true, role: 'ADMIN', layout: 'admin' }
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('@/views/admin/AdminDashboardView.vue'),
    meta: { 
      title: 'Admin Dashboard - WebProsHubMarketplace',
      requiresAuth: true, 
      role: 'ADMIN',
      layout: 'admin'
    }
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('@/views/admin/UsersView.vue'),
    meta: { 
      title: 'User Management - WebProsHubMarketplace',
      requiresAuth: true, 
      role: 'ADMIN',
      layout: 'admin'
    }
  },
  {
    path: '/admin/sellers',
    name: 'admin-sellers',
    component: () => import('@/views/admin/SellersView.vue'),
    meta: { 
      title: 'Seller Management - WebProsHubMarketplace',
      requiresAuth: true, 
      role: 'ADMIN',
      layout: 'admin'
    }
  },
  {
    path: '/admin/products',
    name: 'admin-products',
    component: () => import('@/views/admin/ProductsView.vue'),
    meta: { 
      title: 'Product Management - WebProsHubMarketplace',
      requiresAuth: true, 
      role: 'ADMIN',
      layout: 'admin'
    }
  },
  {
    path: '/admin/orders',
    name: 'admin-orders',
    component: () => import('@/views/admin/OrdersView.vue'),
    meta: { 
      title: 'Order Management - WebProsHubMarketplace',
      requiresAuth: true, 
      role: 'ADMIN',
      layout: 'admin'
    }
  }
]
