import type { Product } from '@/types/marketplace'
import { mockProducts } from './index'

export const mockProductDetail = mockProducts[0] // iPhone 15 Pro
export const mockRelatedProducts = mockProducts.slice(1, 4) // MacBook Air M2, AirPods Pro, iPad Air

export const mockProductSpecs = {
  dimensions: '147.6 x 71.5 x 8.25 mm',
  weight: '187 grams',
  display: '6.1-inch Super Retina XDR OLED',
  resolution: '2556 x 1179 pixels',
  processor: 'A17 Pro chip',
  storage: '128GB, 256GB, 512GB, 1TB',
  camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
  battery: 'Up to 23 hours video playback',
  colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
}

export const mockProductVariants = [
  { id: '1', name: '128GB Natural Titanium', price: 999, stock: 15 },
  { id: '2', name: '256GB Natural Titanium', price: 1099, stock: 8 },
  { id: '3', name: '512GB Natural Titanium', price: 1299, stock: 5 },
  { id: '4', name: '1TB Natural Titanium', price: 1499, stock: 2 }
]
