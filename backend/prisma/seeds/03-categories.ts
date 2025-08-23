import { PrismaClient } from '@prisma/client'

export async function createCategories(prisma: PrismaClient) {
  console.log('📂 Creating 3-level category hierarchy...')
  
  // Create Main Categories
  const mainCategories = await Promise.all([
    prisma.mainCategory.create({
      data: {
        name: 'Electronics',
        description: 'Electronic devices and accessories',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
        isActive: true,
      },
    }),
    prisma.mainCategory.create({
      data: {
        name: 'Fashion',
        description: 'Clothing and accessories',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        isActive: true,
      },
    }),
    prisma.mainCategory.create({
      data: {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        isActive: true,
      },
    }),
    prisma.mainCategory.create({
      data: {
        name: 'Sports',
        description: 'Sports equipment and athletic wear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        isActive: true,
      },
    }),
    prisma.mainCategory.create({
      data: {
        name: 'Books',
        description: 'Books, magazines, and educational materials',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        isActive: true,
      },
    }),
  ])

  // Create Categories (Level 2)
  const categories = await Promise.all([
    // Electronics Categories
    prisma.category.create({
      data: {
        name: 'Smartphones & Mobile',
        description: 'Mobile devices and accessories',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        mainCategoryId: mainCategories[0].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Computers & Laptops',
        description: 'Computers, laptops, and accessories',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        mainCategoryId: mainCategories[0].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Audio & Music',
        description: 'Audio equipment and musical instruments',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        mainCategoryId: mainCategories[0].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Gaming',
        description: 'Gaming consoles and accessories',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
        mainCategoryId: mainCategories[0].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Cameras & Photography',
        description: 'Cameras and photography equipment',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
        mainCategoryId: mainCategories[0].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home Electronics',
        description: 'Home electronics and smart devices',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        mainCategoryId: mainCategories[0].id,
        isActive: true,
      },
    }),

    // Fashion Categories
    prisma.category.create({
      data: {
        name: "Men's Clothing",
        description: 'Clothing for men',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        mainCategoryId: mainCategories[1].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Women's Clothing",
        description: 'Clothing for women',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        mainCategoryId: mainCategories[1].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Accessories',
        description: 'Fashion accessories and jewelry',
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400',
        mainCategoryId: mainCategories[1].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Footwear',
        description: 'Shoes and footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        mainCategoryId: mainCategories[1].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Kids & Baby',
        description: 'Clothing for children and babies',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
        mainCategoryId: mainCategories[1].id,
        isActive: true,
      },
    }),

    // Home & Garden Categories
    prisma.category.create({
      data: {
        name: 'Furniture',
        description: 'Home and office furniture',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        mainCategoryId: mainCategories[2].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home Decor',
        description: 'Home decoration and accessories',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        mainCategoryId: mainCategories[2].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Kitchen & Dining',
        description: 'Kitchen equipment and dining accessories',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        mainCategoryId: mainCategories[2].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Garden & Outdoor',
        description: 'Garden tools and outdoor equipment',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
        mainCategoryId: mainCategories[2].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home Improvement',
        description: 'Tools and materials for home improvement',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
        mainCategoryId: mainCategories[2].id,
        isActive: true,
      },
    }),

    // Sports Categories
    prisma.category.create({
      data: {
        name: 'Team Sports',
        description: 'Team sports equipment and gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        mainCategoryId: mainCategories[3].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Individual Sports',
        description: 'Individual sports equipment and gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        mainCategoryId: mainCategories[3].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Fitness & Training',
        description: 'Fitness equipment and training gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        mainCategoryId: mainCategories[3].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Outdoor & Adventure',
        description: 'Outdoor and adventure sports equipment',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        mainCategoryId: mainCategories[3].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Sports Equipment',
        description: 'General sports equipment and accessories',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        mainCategoryId: mainCategories[3].id,
        isActive: true,
      },
    }),

    // Books Categories
    prisma.category.create({
      data: {
        name: 'Fiction',
        description: 'Fiction books and novels',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        mainCategoryId: mainCategories[4].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Non-Fiction',
        description: 'Non-fiction books and reference materials',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        mainCategoryId: mainCategories[4].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Academic & Educational',
        description: 'Academic and educational books',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        mainCategoryId: mainCategories[4].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Children's Books",
        description: 'Books for children and young adults',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        mainCategoryId: mainCategories[4].id,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Specialty Books',
        description: 'Specialty and niche books',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        mainCategoryId: mainCategories[4].id,
        isActive: true,
      },
    }),
  ])

  // Create Subcategories (Level 3) - Sample for key categories
  const subcategories = await Promise.all([
    // Smartphones & Mobile Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Smartphones',
        description: 'Mobile phones and smartphones',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        categoryId: categories[0].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Mobile Accessories',
        description: 'Accessories for mobile devices',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        categoryId: categories[0].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Phone Cases & Covers',
        description: 'Protective cases for phones',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        categoryId: categories[0].id,
        isActive: true,
      },
    }),

    // Computers & Laptops Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Laptops',
        description: 'Portable computers and laptops',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        categoryId: categories[1].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Desktop Computers',
        description: 'Desktop and tower computers',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        categoryId: categories[1].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Computer Accessories',
        description: 'Computer peripherals and accessories',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        categoryId: categories[1].id,
        isActive: true,
      },
    }),

    // Audio & Music Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Headphones & Earbuds',
        description: 'Audio listening devices',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        categoryId: categories[2].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Speakers & Sound Systems',
        description: 'Audio output systems',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        categoryId: categories[2].id,
        isActive: true,
      },
    }),

    // Gaming Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Gaming Consoles',
        description: 'Video game consoles and systems',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
        categoryId: categories[3].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Gaming Accessories',
        description: 'Gaming controllers and accessories',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
        categoryId: categories[3].id,
        isActive: true,
      },
    }),

    // Cameras & Photography Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Digital Cameras',
        description: 'Digital cameras and DSLRs',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
        categoryId: categories[4].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Camera Accessories',
        description: 'Lenses, tripods, and camera gear',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
        categoryId: categories[4].id,
        isActive: true,
      },
    }),

    // Home Electronics Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Kitchen Appliances',
        description: 'Kitchen and cooking appliances',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        categoryId: categories[5].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Home Entertainment',
        description: 'TVs, speakers, and home audio',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        categoryId: categories[5].id,
        isActive: true,
      },
    }),

    // Men's Clothing Subcategories
    prisma.subcategory.create({
      data: {
        name: 'T-Shirts & Polos',
        description: 'Casual tops for men',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        categoryId: categories[6].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Pants & Jeans',
        description: 'Bottoms for men',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        categoryId: categories[6].id,
        isActive: true,
      },
    }),

    // Women's Clothing Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Dresses',
        description: 'Dresses for women',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
        categoryId: categories[7].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Tops & Blouses',
        description: 'Tops for women',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
        categoryId: categories[7].id,
        isActive: true,
      },
    }),

    // Accessories Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Jewelry',
        description: 'Necklaces, rings, and earrings',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        categoryId: categories[8].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Bags & Handbags',
        description: 'Purses, backpacks, and totes',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        categoryId: categories[8].id,
        isActive: true,
      },
    }),

    // Footwear Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Sneakers & Athletic Shoes',
        description: 'Casual and athletic footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        categoryId: categories[9].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Formal Shoes',
        description: 'Formal and business footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        categoryId: categories[9].id,
        isActive: true,
      },
    }),

    // Kitchen & Dining Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Cookware',
        description: 'Pots, pans, and cooking utensils',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        categoryId: categories[10].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Dining & Serving',
        description: 'Plates, glasses, and serving dishes',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        categoryId: categories[10].id,
        isActive: true,
      },
    }),

    // Furniture Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Living Room Furniture',
        description: 'Furniture for living areas',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[11].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Bedroom Furniture',
        description: 'Furniture for bedrooms',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[11].id,
        isActive: true,
      },
    }),

    // Garden & Outdoor Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Garden Tools',
        description: 'Shovels, rakes, and garden equipment',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[12].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Outdoor Decor',
        description: 'Garden ornaments and outdoor decorations',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[12].id,
        isActive: true,
      },
    }),

    // Home Decor Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Wall Art',
        description: 'Paintings, prints, and wall decorations',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[13].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Decorative Items',
        description: 'Vases, candles, and decorative objects',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[13].id,
        isActive: true,
      },
    }),

    // Lighting Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Ceiling Lights',
        description: 'Chandeliers and ceiling fixtures',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[14].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Table & Floor Lamps',
        description: 'Portable lighting solutions',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[14].id,
        isActive: true,
      },
    }),

    // Bathroom Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Bathroom Fixtures',
        description: 'Sinks, toilets, and bathroom hardware',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[15].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Bathroom Accessories',
        description: 'Towels, rugs, and bathroom decor',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        categoryId: categories[15].id,
        isActive: true,
      },
    }),

    // Team Sports Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Basketball',
        description: 'Basketball equipment and gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[16].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Football/Soccer',
        description: 'Football and soccer equipment',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[16].id,
        isActive: true,
      },
    }),

    // Individual Sports Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Tennis',
        description: 'Tennis equipment and gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[17].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Golf',
        description: 'Golf clubs and accessories',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[17].id,
        isActive: true,
      },
    }),

    // Fitness & Training Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Cardio Equipment',
        description: 'Treadmills, bikes, and cardio machines',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[18].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Strength Training',
        description: 'Weights, resistance bands, and strength equipment',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[18].id,
        isActive: true,
      },
    }),

    // Outdoor & Adventure Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Camping Gear',
        description: 'Tents, sleeping bags, and camping equipment',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[19].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Hiking Equipment',
        description: 'Backpacks, boots, and hiking gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[19].id,
        isActive: true,
      },
    }),

    // Sports Equipment Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Protective Gear',
        description: 'Helmets, pads, and safety equipment',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[20].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Sports Balls',
        description: 'Various sports balls and equipment',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        categoryId: categories[20].id,
        isActive: true,
      },
    }),

    // Fiction Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Romance',
        description: 'Romance novels and books',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[21].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Mystery & Thriller',
        description: 'Mystery and thriller books',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[21].id,
        isActive: true,
      },
    }),

    // Non-Fiction Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Biography & Memoir',
        description: 'Biographies and personal stories',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[22].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Self-Help & Development',
        description: 'Personal growth and self-improvement books',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[22].id,
        isActive: true,
      },
    }),

    // Academic & Educational Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Textbooks',
        description: 'Academic textbooks and course materials',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[23].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Reference Books',
        description: 'Dictionaries, encyclopedias, and reference materials',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[23].id,
        isActive: true,
      },
    }),

    // Children's Books Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Picture Books',
        description: 'Illustrated books for young children',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[24].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Chapter Books',
        description: 'Early reader books for children',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[24].id,
        isActive: true,
      },
    }),

    // Specialty Books Subcategories
    prisma.subcategory.create({
      data: {
        name: 'Cookbooks',
        description: 'Recipe books and cooking guides',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[25].id,
        isActive: true,
      },
    }),
    prisma.subcategory.create({
      data: {
        name: 'Travel Guides',
        description: 'Travel books and destination guides',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        categoryId: categories[25].id,
        isActive: true,
      },
    }),
  ])

  console.log(`✅ Created ${mainCategories.length} main categories, ${categories.length} categories, and ${subcategories.length} subcategories`)

  return { mainCategories, categories, subcategories }
}
