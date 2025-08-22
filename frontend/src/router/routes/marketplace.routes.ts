import type { RouteRecordRaw } from 'vue-router'

export const marketplaceRoutes: RouteRecordRaw[] = [
  {
    path: '/marketplace',
    name: 'marketplace',
    component: () => import('@/views/marketplace/MarketplaceView.vue'),
    meta: { 
      title: 'Marketplace - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/stores',
    name: 'stores',
    component: () => import('@/views/marketplace/StoresView.vue'),
    meta: { 
      title: 'Stores - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/marketplace/CategoriesView.vue'),
    meta: { 
      title: 'Categories - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/deals',
    name: 'deals',
    component: () => import('@/views/marketplace/DealsView.vue'),
    meta: { 
      title: 'Deals - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/marketplace/categories',
    name: 'marketplace-categories',
    component: () => import('@/views/marketplace/CategoriesView.vue'),
    meta: { 
      title: 'Categories - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/marketplace/product/:id',
    name: 'product-detail',
    component: () => import('@/views/marketplace/ProductDetailView.vue'),
    meta: { 
      title: 'Product Details - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/wishlist',
    name: 'public-wishlist',
    component: () => import('@/views/marketplace/PublicWishlistView.vue'),
    meta: { 
      title: 'Wishlist - WebProsHubMarketplace',
      requiresAuth: true,
      redirectToLogin: true,
      layout: 'default'
    }
  }
]
