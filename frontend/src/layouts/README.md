# Layout System

This directory contains the layout components for the WebProsHub Marketplace application. The layout system provides different page layouts based on user roles and page types.

## Layout Components

### DefaultLayout.vue
- **Purpose**: Main layout for public pages and general marketplace content
- **Features**: Header, footer, main content area, global cart sheet
- **Usage**: Home page, marketplace, stores, categories, deals, etc.

### AuthLayout.vue
- **Purpose**: Clean layout for authentication pages
- **Features**: No header/footer, minimal styling
- **Usage**: Login, register, forgot password pages

### AdminLayout.vue
- **Purpose**: Admin dashboard layout with sidebar navigation
- **Features**: Header, admin sidebar, footer, global cart sheet
- **Usage**: All admin pages (/admin/*)

### SellerLayout.vue
- **Purpose**: Seller dashboard layout with sidebar navigation
- **Features**: Header, seller sidebar, footer, global cart sheet
- **Usage**: All seller pages (/seller/*)

### BuyerLayout.vue
- **Purpose**: Buyer dashboard layout with sidebar navigation
- **Features**: Header, buyer sidebar, footer, global cart sheet
- **Usage**: All buyer pages (/buyer/*)

### BlankLayout.vue
- **Purpose**: Minimal layout with no header/footer
- **Features**: Only main content area
- **Usage**: Modal pages, special cases, embedded content

## How It Works

### 1. Layout Detection
The layout is automatically determined based on:
- **Route metadata**: `meta.layout` property
- **Route path**: Auto-detection based on URL patterns

### 2. Layout Assignment
```typescript
// In route files
{
  path: '/admin/dashboard',
  component: () => import('@/views/admin/AdminDashboardView.vue'),
  meta: { 
    layout: 'admin',  // Explicitly specify layout
    requiresAuth: true,
    role: 'ADMIN'
  }
}
```

### 3. Auto-detection Fallback
If no layout is specified in meta, the system auto-detects:
- `/admin/*` → AdminLayout
- `/seller/*` → SellerLayout  
- `/buyer/*` → BuyerLayout
- `/login`, `/register` → AuthLayout
- All others → DefaultLayout

## Usage Examples

### Adding a New Route with Specific Layout
```typescript
// In your route file
{
  path: '/custom-page',
  component: () => import('@/views/CustomView.vue'),
  meta: { 
    title: 'Custom Page',
    layout: 'admin'  // Use admin layout
  }
}
```

### Creating a New Layout
1. Create a new layout component in `src/layouts/`
2. Export it from `src/layouts/index.ts`
3. Import and use it in `src/App.vue`
4. Add layout detection logic if needed

### Layout Structure
```vue
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Optional Header -->
    <AppHeader v-if="showHeader" />
    
    <!-- Content Area -->
    <div class="flex flex-1">
      <!-- Optional Sidebar -->
      <aside v-if="showSidebar" class="w-64">
        <!-- Sidebar content -->
      </aside>
      
      <!-- Main Content -->
      <main class="flex-1">
        <slot />
      </main>
    </div>
    
    <!-- Optional Footer -->
    <AppFooter v-if="showFooter" />
    
    <!-- Global Components -->
    <GlobalCartSheet />
  </div>
</template>
```

## Benefits

1. **Consistent UI**: Each user role gets a consistent layout
2. **Easy Maintenance**: Layout logic centralized in one place
3. **Flexible**: Easy to add new layouts or modify existing ones
4. **Performance**: Layouts are loaded only when needed
5. **Clean Code**: Route files focus on routing, not layout logic

## Migration Notes

- **Old nested layouts**: Removed in favor of flat route structure
- **Layout components**: Moved from `src/views/*/Layout.vue` to `src/layouts/`
- **Route structure**: Simplified from nested children to flat routes
- **Meta properties**: Added `layout` property for explicit layout control
