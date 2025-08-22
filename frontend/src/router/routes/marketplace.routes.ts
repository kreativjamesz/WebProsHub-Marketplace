import type { RouteRecordRaw } from 'vue-router'

export const marketplaceRoutes: RouteRecordRaw[] = [
  {
    path: '/marketplace',
    name: 'marketplace',
    component: () => import('@/views/marketplace/MarketplaceView.vue'),
    meta: { title: 'Marketplace - WebProsHubMarketplace' }
  },
  {
    path: '/marketplace/categories',
    name: 'categories',
    component: () => import('@/views/marketplace/CategoriesView.vue'),
    meta: { title: 'Categories - WebProsHubMarketplace' }
  },
  {
    path: '/marketplace/product/:id',
    name: 'product-detail',
    component: () => import('@/views/marketplace/ProductDetailView.vue'),
    meta: { title: 'Product Details - WebProsHubMarketplace' }
  },
  {
    path: '/wishlist',
    name: 'public-wishlist',
    component: () => import('@/views/marketplace/PublicWishlistView.vue'),
    meta: { 
      title: 'Wishlist - WebProsHubMarketplace',
      requiresAuth: true,
      redirectToLogin: true
    }
  }
]
