import type { Category } from '@/types/marketplace'

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices and accessories including smartphones, laptops, tablets, and more.',
    image: '/images/categories/electronics.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCount: 1250,
    storeCount: 45,
    popularProducts: [
      { id: '1', name: 'Smartphone' },
      { id: '2', name: 'Laptop' },
      { id: '3', name: 'Headphones' }
    ]
  },
  {
    id: '2',
    name: 'Fashion & Apparel',
    description: 'Trendy clothing, shoes, bags, and accessories for men, women, and children.',
    image: '/images/categories/fashion.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCount: 2100,
    storeCount: 78,
    popularProducts: [
      { id: '4', name: 'T-Shirt' },
      { id: '5', name: 'Jeans' },
      { id: '6', name: 'Sneakers' }
    ]
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Everything you need to make your home beautiful - furniture, decor, garden supplies.',
    image: '/images/categories/home.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCount: 890,
    storeCount: 32,
    popularProducts: [
      { id: '7', name: 'Sofa' },
      { id: '8', name: 'Plant Pot' },
      { id: '9', name: 'Wall Art' }
    ]
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    description: 'Sports equipment, athletic wear, camping gear, and outdoor adventure essentials.',
    image: '/images/categories/sports.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCount: 650,
    storeCount: 28,
    popularProducts: [
      { id: '10', name: 'Running Shoes' },
      { id: '11', name: 'Tent' },
      { id: '12', name: 'Yoga Mat' }
    ]
  },
  {
    id: '5',
    name: 'Books & Media',
    description: 'Books, magazines, educational materials, movies, and music.',
    image: '/images/categories/books.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCount: 420,
    storeCount: 15,
    popularProducts: [
      { id: '13', name: 'Novel' },
      { id: '14', name: 'Textbook' },
      { id: '15', name: 'DVD' }
    ]
  },
  {
    id: '6',
    name: 'Health & Beauty',
    description: 'Personal care products, cosmetics, health supplements, and wellness items.',
    image: '/images/categories/health.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCount: 780,
    storeCount: 35,
    popularProducts: [
      { id: '16', name: 'Face Cream' },
      { id: '17', name: 'Vitamins' },
      { id: '18', name: 'Hair Dryer' }
    ]
  },
  {
    id: '7',
    name: 'Automotive',
    description: 'Car parts, accessories, maintenance tools, and automotive services.',
    image: '/images/categories/automotive.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCount: 320,
    storeCount: 18,
    popularProducts: [
      { id: '19', name: 'Car Battery' },
      { id: '20', name: 'Oil Filter' },
      { id: '21', name: 'Floor Mats' }
    ]
  },
  {
    id: '8',
    name: 'Toys & Games',
    description: 'Fun toys, board games, video games, and entertainment for all ages.',
    image: '/images/categories/toys.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCount: 450,
    storeCount: 22,
    popularProducts: [
      { id: '22', name: 'Board Game' },
      { id: '23', name: 'Action Figure' },
      { id: '24', name: 'Puzzle' }
    ]
  },
  {
    id: '9',
    name: 'Food & Beverages',
    description: 'Fresh food, snacks, beverages, and gourmet products from local vendors.',
    image: '/images/categories/food.jpg',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productCount: 680,
    storeCount: 40,
    popularProducts: [
      { id: '25', name: 'Organic Tea' },
      { id: '26', name: 'Gourmet Coffee' },
      { id: '27', name: 'Artisan Bread' }
    ]
  }
]
