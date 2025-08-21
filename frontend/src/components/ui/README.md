# SafeImage Component & useImageFallback Composable

## Overview

The SafeImage component and useImageFallback composable provide a robust solution for handling image loading errors, missing images, and providing fallback content. They automatically show a WebProSHub logo SVG when images fail to load.

## Features

- ✅ Automatic fallback to WebProSHub logo SVG
- ✅ Loading skeleton animation
- ✅ Custom fallback image support
- ✅ Multiple object-fit options
- ✅ Event handling (load, error, click)
- ✅ Responsive design
- ✅ TypeScript support
- ✅ Customizable styling

## Components

### SafeImage.vue

A Vue component that wraps images with error handling and fallback functionality.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | **Required** - Image source URL |
| `alt` | `string` | `'Image'` | Alt text for accessibility |
| `fallbackSrc` | `string` | - | Custom fallback image URL |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | CSS object-fit property |
| `borderRadius` | `string` | `'0'` | Border radius for the image |
| `width` | `string \| number` | `'auto'` | Image width |
| `height` | `string \| number` | `'auto'` | Image height |
| `className` | `string` | `''` | Additional CSS classes |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `load` | - | Fired when image loads successfully |
| `error` | - | Fired when image fails to load |
| `click` | `MouseEvent` | Fired when image is clicked |

#### Slots

No slots available.

#### Exposed Methods

| Method | Description |
|--------|-------------|
| `reset()` | Reset component state |
| `setImageSrc(src: string)` | Set new image source |
| `hasError` | Reactive boolean indicating error state |
| `isLoading` | Reactive boolean indicating loading state |

## Composable

### useImageFallback()

A Vue composable that provides image fallback logic.

#### Parameters

```typescript
interface UseImageFallbackOptions {
  fallbackSrc?: string
  alt?: string
  className?: string
}
```

#### Returns

```typescript
{
  imageSrc: Ref<string>
  hasError: Ref<boolean>
  isLoading: Ref<boolean>
  handleImageError: () => void
  handleImageLoad: () => void
  setImageSrc: (src: string) => void
  reset: () => void
}
```

## Usage Examples

### Basic Usage

```vue
<template>
  <SafeImage
    src="https://example.com/image.jpg"
    alt="Product image"
    @load="handleImageLoad"
    @error="handleImageError"
  />
</template>

<script setup>
import SafeImage from '@/components/ui/SafeImage.vue'

const handleImageLoad = () => {
  console.log('Image loaded successfully')
}

const handleImageError = () => {
  console.log('Image failed to load, showing fallback')
}
</script>
```

### With Custom Fallback

```vue
<template>
  <SafeImage
    src="https://example.com/image.jpg"
    alt="Product image"
    fallback-src="https://example.com/fallback.jpg"
    object-fit="contain"
    borderRadius="12px"
  />
</template>
```

### Using the Composable Directly

```vue
<template>
  <div>
    <img
      v-if="!hasError && imageSrc"
      :src="imageSrc"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <div v-else class="fallback">
      <!-- Custom fallback content -->
    </div>
  </div>
</template>

<script setup>
import { useImageFallback } from '@/composables/useImageFallback'

const { imageSrc, hasError, handleImageError, handleImageLoad } = useImageFallback()

// Set image source
imageSrc.value = 'https://example.com/image.jpg'
</script>
```

### Different Object Fit Options

```vue
<template>
  <div class="image-gallery">
    <SafeImage
      src="https://example.com/image.jpg"
      alt="Cover fit"
      object-fit="cover"
      class="gallery-image"
    />
    
    <SafeImage
      src="https://example.com/image.jpg"
      alt="Contain fit"
      object-fit="contain"
      class="gallery-image"
    />
    
    <SafeImage
      src="https://example.com/image.jpg"
      alt="Fill fit"
      object-fit="fill"
      class="gallery-image"
    />
  </div>
</template>

<style scoped>
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
}
</style>
```

## Styling

The component includes built-in styles for:
- Loading skeleton animation
- Fallback container styling
- Responsive design
- Object-fit variations

You can customize the appearance using CSS custom properties or by overriding the component styles.

## Browser Support

- Modern browsers with ES6+ support
- Vue 3.x
- TypeScript 4.x+

## Dependencies

- Vue 3.x
- TypeScript (for type definitions)

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── SafeImage.vue          # Main component
│   │   └── README.md              # This documentation
│   └── SafeImageDemo.vue          # Demo component
├── composables/
│   ├── useImageFallback.ts        # Composable logic
│   └── index.ts                   # Exports
└── assets/
    └── webproshub-logo.svg        # Fallback logo
```

## Demo

Check out `SafeImageDemo.vue` for a comprehensive demonstration of all features and use cases.
