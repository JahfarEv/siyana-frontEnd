// import { ProductCategory, Product, OfferCardProps } from '@/types';

// export const CATEGORIES: ProductCategory[] = [
//   {
//     id: 1,
//     name: 'Rings',
//     slug: 'rings',
//     description: 'Beautiful gold and diamond rings',
//     image: {
//       id: 'ring-1',
//       url: '/images/ring-7.jpg',
//       alt: 'Gold Rings Collection'
//     },
//     productCount: 150,
//     isActive: true
//   },
//   {
//     id: 2,
//     name: 'Earrings',
//     slug: 'earrings',
//     description: 'Elegant earrings for every occasion',
//     image: {
//       id: 'earring-1',
//       url: '/images/earring-8.jpg',
//       alt: 'Gold Earrings Collection'
//     },
//     productCount: 120,
//     isActive: true
//   },
//   {
//     id: 3,
//     name: 'Pendant',
//     slug: 'pendant',
//     description: 'Stunning pendants and lockets',
//     image: {
//       id: 'pendant-1',
//       url: '/images/pendant-7.jpeg',
//       alt: 'Gold Pendants Collection'
//     },
//     productCount: 95,
//     isActive: true
//   },
//   {
//     id: 4,
//     name: 'Long Chain',
//     slug: 'long-chain',
//     description: 'Elegant long chain necklaces',
//     image: {
//       id: 'chain-1',
//       url: '/images/necklace-2.jpg',
//       alt: 'Gold Chains Collection'
//     },
//     productCount: 80,
//     isActive: true
//   },
//   {
//     id: 5,
//     name: 'Bangles',
//     slug: 'bangles',
//     description: 'Traditional and modern bangles',
//     image: {
//       id: 'bangle-1',
//       url: '/images/bangles-set-gray-bg.jpg',
//       alt: 'Gold Bangles Collection'
//     },
//     productCount: 110,
//     isActive: true
//   },
//   {
//     id: 6,
//     name: 'Bracelet',
//     slug: 'bracelet',
//     description: 'Beautiful bracelets for all occasions',
//     image: {
//       id: 'bracelet-1',
//       url: '/images/images.jpg',
//       alt: 'Gold Bracelets Collection'
//     },
//     productCount: 75,
//     isActive: true
//   },
//   {
//     id: 7,
//     name: 'Anklets',
//     slug: 'anklets',
//     description: 'Elegant anklets for your feet',
//     image: {
//       id: 'anklet-1',
//       url: '/images/anklets.jpg',
//       alt: 'Gold Anklets Collection'
//     },
//     productCount: 60,
//     isActive: true
//   },
//   {
//     id: 8,
//     name: 'Stud',
//     slug: 'stud',
//     description: 'Beautiful stud earrings',
//     image: {
//       id: 'stud-1',
//       url: '/images/stud.jpg',
//       alt: 'Gold Stud Collection'
//     },
//     productCount: 85,
//     isActive: true
//   },
//   {
//     id: 9,
//     name: 'Chain',
//     slug: 'chain',
//     description: 'Various chain designs',
//     image: {
//       id: 'chain-2',
//       url: '/images/chain.jpg',
//       alt: 'Gold Chain Collection'
//     },
//     productCount: 70,
//     isActive: true
//   },
//   {
//     id: 10,
//     name: 'Handset',
//     slug: 'handset',
//     description: 'Traditional handset jewelry',
//     image: {
//       id: 'handset-1',
//       url: '/images/handset.jpg',
//       alt: 'Gold Handset Collection'
//     },
//     productCount: 45,
//     isActive: true
//   },
//   {
//     id: 11,
//     name: 'Wedding Set',
//     slug: 'wedding-set',
//     description: 'Complete wedding jewelry sets',
//     image: {
//       id: 'wedding-1',
//       url: '/images/weddingset.jpg',
//       alt: 'Wedding Jewelry Sets'
//     },
//     productCount: 55,
//     isActive: true
//   },
//   {
//     id: 12,
//     name: 'Nosepin',
//     slug: 'nosepin',
//     description: 'Elegant nose pins and studs',
//     image: {
//       id: 'nosepin-1',
//       url: '/images/nosepin.jpg',
//       alt: 'Nosepin Collection'
//     },
//     productCount: 65,
//     isActive: true
//   }
// ];
// export const FEATURED_PRODUCTS: Product[] = [
//   {
//     id: 1,
//     name: 'Diamond Solitaire Ring',
//     slug: 'diamond-solitaire-ring',
//     description: 'Exquisite diamond solitaire ring in 24K gold',
//     shortDescription: 'Premium diamond ring',
//     category: CATEGORIES[0],
//     brand: 'Siyana',
//     price: 89999,
//     originalPrice: 109999,
//     discount: 18,
//     images: [
//       {
//         id: '1',
//         url: '/images/ring-7.jpg',
//         alt: 'Diamond Solitaire Ring'
//       }
//     ],
//     features: ['24K Gold', 'VS1 Diamond', 'Lifetime Warranty'],
//     specifications: {
//       'Material': '24K Gold',
//       'Diamond Carat': '1.5ct',
//       'Weight': '8.5g'
//     },
//     tags: ['diamond', 'ring', 'premium'],
//     rating: 4.8,
//     reviewCount: 47,
//     inStock: true,
//     isFeatured: true,
//     isNew: true,
//     isOnSale: true,
//     meta: {
//       title: 'Diamond Solitaire Ring',
//       description: 'Exquisite diamond solitaire ring',
//       keywords: ['diamond', 'ring', 'gold']
//     }
//   },
//   {
//     id: 2,
//     name: 'Gold Jhumka Earrings',
//     slug: 'gold-jhumka-earrings',
//     description: 'Traditional gold jhumka earrings with intricate design',
//     shortDescription: 'Traditional jhumka earrings',
//     category: CATEGORIES[1],
//     brand: 'Siyana',
//     price: 45999,
//     originalPrice: 54999,
//     discount: 16,
//     images: [
//       {
//         id: '2',
//         url: '/images/earring-8.jpg',
//         alt: 'Gold Jhumka Earrings'
//       }
//     ],
//     features: ['22K Gold', 'Traditional Design', 'Light Weight'],
//     specifications: {
//       'Material': '22K Gold',
//       'Weight': '12g',
//       'Type': 'Jhumka'
//     },
//     tags: ['earrings', 'jhumka', 'traditional'],
//     rating: 4.6,
//     reviewCount: 32,
//     inStock: true,
//     isFeatured: true,
//     isNew: false,
//     isOnSale: true,
//     meta: {
//       title: 'Gold Jhumka Earrings',
//       description: 'Traditional gold jhumka earrings',
//       keywords: ['earrings', 'jhumka', 'gold']
//     }
//   }
// ];
// export const OFFERS: OfferCardProps[] = [
//   {
//     title: '25% Flat Offer',
//     subtitle: 'Glowing Gold Rings',
//     className: 'bg-blue-900',
//     image: '/images/ring-7.jpg' // Remove imageStyle
//   },
//   {
//     title: '10% Flat Offer',
//     subtitle: 'Glowing Gold Earrings',
//     className: 'bg-gray-800',
//     image: '/images/earring-8.jpg' // Remove imageStyle
//   },
//   {
//     title: '15% Flat Offer',
//     subtitle: 'Glowing Gold Necklace',
//     className: 'bg-green-800',
//     image: '/images/pendant-7.jpeg' // Remove imageStyle
//   },
// ];

import { ProductCategory, Product, OfferCardProps } from '@/types';

export const CATEGORIES: ProductCategory[] = [
  {
    id: 1,
    name: 'Rings',
    slug: 'rings',
    description: 'Beautiful gold and diamond rings',
    image: {
      id: 'ring-1',
      url: '/images/ring-7.jpg',
      alt: 'Gold Rings Collection'
    },
    productCount: 150,
    isActive: true
  },
  {
    id: 2,
    name: 'Earrings',
    slug: 'earrings',
    description: 'Elegant earrings for every occasion',
    image: {
      id: 'earring-1',
      url: '/images/earring-8.jpg',
      alt: 'Gold Earrings Collection'
    },
    productCount: 120,
    isActive: true
  },
  {
    id: 3,
    name: 'Pendant',
    slug: 'pendant',
    description: 'Stunning pendants and lockets',
    image: {
      id: 'pendant-1',
      url: '/images/pendant-7.jpeg',
      alt: 'Gold Pendants Collection'
    },
    productCount: 95,
    isActive: true
  },
  {
    id: 4,
    name: 'Long Chain',
    slug: 'long-chain',
    description: 'Elegant long chain necklaces',
    image: {
      id: 'chain-1',
      url: '/images/necklace-2.jpg',
      alt: 'Gold Chains Collection'
    },
    productCount: 80,
    isActive: true
  },
  {
    id: 5,
    name: 'Bangles',
    slug: 'bangles',
    description: 'Traditional and modern bangles',
    image: {
      id: 'bangle-1',
      url: '/images/bangles-set-gray-bg.jpg',
      alt: 'Gold Bangles Collection'
    },
    productCount: 110,
    isActive: true
  },
  {
    id: 6,
    name: 'Bracelet',
    slug: 'bracelet',
    description: 'Beautiful bracelets for all occasions',
    image: {
      id: 'bracelet-1',
      url: '/images/images.jpg',
      alt: 'Gold Bracelets Collection'
    },
    productCount: 75,
    isActive: true
  },
  {
    id: 7,
    name: 'Anklets',
    slug: 'anklets',
    description: 'Elegant anklets for your feet',
    image: {
      id: 'anklet-1',
      url: '/images/anklets.jpg',
      alt: 'Gold Anklets Collection'
    },
    productCount: 60,
    isActive: true
  },
  {
    id: 8,
    name: 'Stud',
    slug: 'stud',
    description: 'Beautiful stud earrings',
    image: {
      id: 'stud-1',
      url: '/images/stud.jpg',
      alt: 'Gold Stud Collection'
    },
    productCount: 85,
    isActive: true
  },
  {
    id: 9,
    name: 'Chain',
    slug: 'chain',
    description: 'Various chain designs',
    image: {
      id: 'chain-2',
      url: '/images/chain.jpg',
      alt: 'Gold Chain Collection'
    },
    productCount: 70,
    isActive: true
  },
  {
    id: 10,
    name: 'Handset',
    slug: 'handset',
    description: 'Traditional handset jewelry',
    image: {
      id: 'handset-1',
      url: '/images/handset.jpg',
      alt: 'Gold Handset Collection'
    },
    productCount: 45,
    isActive: true
  },
  {
    id: 11,
    name: 'Wedding Set',
    slug: 'wedding-set',
    description: 'Complete wedding jewelry sets',
    image: {
      id: 'wedding-1',
      url: '/images/weddingset.jpg',
      alt: 'Wedding Jewelry Sets'
    },
    productCount: 55,
    isActive: true
  },
  {
    id: 12,
    name: 'Nosepin',
    slug: 'nosepin',
    description: 'Elegant nose pins and studs',
    image: {
      id: 'nosepin-1',
      url: '/images/nosepin.jpg',
      alt: 'Nosepin Collection'
    },
    productCount: 65,
    isActive: true
  }
];

// Create ALL_PRODUCTS with multiple products for each category
export const ALL_PRODUCTS: Product[] = [
  // Rings (6 products)
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    slug: 'diamond-solitaire-ring',
    description: 'Exquisite diamond solitaire ring in 24K gold',
    shortDescription: 'Premium diamond ring',
    category: CATEGORIES[0],
    brand: 'Siyana',
    price: 89999,
    originalPrice: 109999,
    discount: 18,
    images: ['/images/ring-7.jpg'],
    features: ['24K Gold', 'VS1 Diamond', 'Lifetime Warranty'],
    specifications: {
      'Material': '24K Gold',
      'Diamond Carat': '1.5ct',
      'Weight': '8.5g'
    },
    tags: ['diamond', 'ring', 'premium'],
    rating: 4.8,
    reviewCount: 47,
    inStock: true,
    isFeatured: true,
    isNew: true,
    isOnSale: true,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Gold Wedding Ring',
    slug: 'gold-wedding-ring',
    description: 'Elegant gold wedding ring with intricate design',
    shortDescription: 'Elegant wedding ring',
    category: CATEGORIES[0],
    brand: 'Siyana',
    price: 45999,
    originalPrice: 54999,
    discount: 16,
    images: ['/images/ring-7.jpg'],
    features: ['22K Gold', 'Traditional Design', 'Comfort Fit'],
    specifications: {
      'Material': '22K Gold',
      'Weight': '6.2g',
      'Type': 'Wedding Band'
    },
    tags: ['ring', 'wedding', 'traditional'],
    rating: 4.5,
    reviewCount: 28,
    inStock: true,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'Diamond Eternity Ring',
    slug: 'diamond-eternity-ring',
    description: 'Beautiful eternity ring with multiple diamonds',
    shortDescription: 'Diamond eternity ring',
    category: CATEGORIES[0],
    brand: 'Siyana',
    price: 125999,
    originalPrice: 149999,
    discount: 16,
    images: ['/images/ring-7.jpg'],
    features: ['24K Gold', 'Multiple Diamonds', 'Eternity Band'],
    specifications: {
      'Material': '24K Gold',
      'Diamond Carat': '2.0ct',
      'Weight': '9.8g'
    },
    tags: ['diamond', 'ring', 'eternity'],
    rating: 4.9,
    reviewCount: 35,
    inStock: true,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    createdAt: '2024-01-20'
  },
  {
    id: 4,
    name: 'Classic Gold Band',
    slug: 'classic-gold-band',
    description: 'Simple and elegant classic gold band',
    shortDescription: 'Classic gold band',
    category: CATEGORIES[0],
    brand: 'Siyana',
    price: 28999,
    originalPrice: 32999,
    discount: 12,
    images: ['/images/ring-7.jpg'],
    features: ['22K Gold', 'Classic Design', 'Everyday Wear'],
    specifications: {
      'Material': '22K Gold',
      'Weight': '4.5g',
      'Type': 'Classic Band'
    },
    tags: ['ring', 'classic', 'band'],
    rating: 4.3,
    reviewCount: 42,
    inStock: true,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    createdAt: '2024-01-05'
  },
  {
    id: 5,
    name: 'Vintage Style Ring',
    slug: 'vintage-style-ring',
    description: 'Vintage inspired ring with antique finish',
    shortDescription: 'Vintage style ring',
    category: CATEGORIES[0],
    brand: 'Siyana',
    price: 75999,
    originalPrice: 89999,
    discount: 15,
    images: ['/images/ring-7.jpg'],
    features: ['22K Gold', 'Vintage Design', 'Antique Finish'],
    specifications: {
      'Material': '22K Gold',
      'Weight': '7.8g',
      'Type': 'Vintage'
    },
    tags: ['ring', 'vintage', 'antique'],
    rating: 4.6,
    reviewCount: 19,
    inStock: true,
    isFeatured: false,
    isNew: true,
    isOnSale: true,
    createdAt: '2024-01-18'
  },
  {
    id: 6,
    name: 'Modern Diamond Ring',
    slug: 'modern-diamond-ring',
    description: 'Contemporary design with brilliant diamonds',
    shortDescription: 'Modern diamond ring',
    category: CATEGORIES[0],
    brand: 'Siyana',
    price: 98999,
    originalPrice: 115999,
    discount: 15,
    images: ['/images/ring-7.jpg'],
    features: ['24K Gold', 'Modern Design', 'Brilliant Cut'],
    specifications: {
      'Material': '24K Gold',
      'Diamond Carat': '1.8ct',
      'Weight': '8.9g'
    },
    tags: ['ring', 'modern', 'diamond'],
    rating: 4.7,
    reviewCount: 31,
    inStock: true,
    isFeatured: true,
    isNew: false,
    isOnSale: false,
    createdAt: '2024-01-12'
  },

  // Earrings (6 products)
  {
    id: 7,
    name: 'Gold Jhumka Earrings',
    slug: 'gold-jhumka-earrings',
    description: 'Traditional gold jhumka earrings with intricate design',
    shortDescription: 'Traditional jhumka earrings',
    category: CATEGORIES[1],
    brand: 'Siyana',
    price: 45999,
    originalPrice: 54999,
    discount: 16,
    images: ['/images/earring-8.jpg'],
    features: ['22K Gold', 'Traditional Design', 'Light Weight'],
    specifications: {
      'Material': '22K Gold',
      'Weight': '12g',
      'Type': 'Jhumka'
    },
    tags: ['earrings', 'jhumka', 'traditional'],
    rating: 4.6,
    reviewCount: 32,
    inStock: true,
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    createdAt: '2024-01-14'
  },
  {
    id: 8,
    name: 'Diamond Stud Earrings',
    slug: 'diamond-stud-earrings',
    description: 'Elegant diamond stud earrings for daily wear',
    shortDescription: 'Diamond stud earrings',
    category: CATEGORIES[1],
    brand: 'Siyana',
    price: 68999,
    originalPrice: 78999,
    discount: 13,
    images: ['/images/earring-2.jpg'],
    features: ['24K Gold', 'Round Cut', 'Screw Back'],
    specifications: {
      'Material': '24K Gold',
      'Diamond Carat': '1.0ct',
      'Weight': '4.2g'
    },
    tags: ['earrings', 'stud', 'diamond'],
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
    isFeatured: true,
    isNew: false,
    isOnSale: false,
    createdAt: '2024-01-08'
  },
  {
    id: 9,
    name: 'Gold Hoop Earrings',
    slug: 'gold-hoop-earrings',
    description: 'Classic gold hoop earrings in various sizes',
    shortDescription: 'Gold hoop earrings',
    category: CATEGORIES[1],
    brand: 'Siyana',
    price: 32999,
    originalPrice: 38999,
    discount: 15,
    images: ['/images/earring-3.jpg'],
    features: ['22K Gold', 'Hoop Design', 'Light Weight'],
    specifications: {
      'Material': '22K Gold',
      'Weight': '8.5g',
      'Diameter': '25mm'
    },
    tags: ['earrings', 'hoop', 'classic'],
    rating: 4.4,
    reviewCount: 38,
    inStock: true,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    createdAt: '2024-01-16'
  },
  {
    id: 10,
    name: 'Pearl Drop Earrings',
    slug: 'pearl-drop-earrings',
    description: 'Elegant pearl drop earrings with gold accents',
    shortDescription: 'Pearl drop earrings',
    category: CATEGORIES[1],
    brand: 'Siyana',
    price: 56999,
    originalPrice: 64999,
    discount: 12,
    images: ['/images/earring-4.jpg'],
    features: ['22K Gold', 'Freshwater Pearls', 'Drop Design'],
    specifications: {
      'Material': '22K Gold',
      'Pearl Size': '8mm',
      'Weight': '9.2g'
    },
    tags: ['earrings', 'pearl', 'drop'],
    rating: 4.7,
    reviewCount: 26,
    inStock: true,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    createdAt: '2024-01-22'
  },
  {
    id: 11,
    name: 'Chandelier Earrings',
    slug: 'chandelier-earrings',
    description: 'Dramatic chandelier earrings for special occasions',
    shortDescription: 'Chandelier earrings',
    category: CATEGORIES[1],
    brand: 'Siyana',
    price: 78999,
    originalPrice: 89999,
    discount: 12,
    images: ['/images/earring-5.jpg'],
    features: ['24K Gold', 'Multiple Diamonds', 'Statement Piece'],
    specifications: {
      'Material': '24K Gold',
      'Diamond Carat': '1.2ct',
      'Weight': '15.8g'
    },
    tags: ['earrings', 'chandelier', 'diamond'],
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
    isFeatured: false,
    isNew: true,
    isOnSale: true,
    createdAt: '2024-01-19'
  },
  {
    id: 12,
    name: 'Simple Gold Studs',
    slug: 'simple-gold-studs',
    description: 'Simple and elegant gold stud earrings',
    shortDescription: 'Simple gold studs',
    category: CATEGORIES[1],
    brand: 'Siyana',
    price: 18999,
    originalPrice: 21999,
    discount: 14,
    images: ['/images/earring-6.jpg'],
    features: ['22K Gold', 'Simple Design', 'Everyday Wear'],
    specifications: {
      'Material': '22K Gold',
      'Weight': '3.2g',
      'Type': 'Stud'
    },
    tags: ['earrings', 'stud', 'simple'],
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    createdAt: '2024-01-03'
  },

  // Add more products for other categories as needed...
];

// Featured products are a subset of ALL_PRODUCTS
export const FEATURED_PRODUCTS = ALL_PRODUCTS.filter(product => product.isFeatured);

export const OFFERS: OfferCardProps[] = [
  {
    discountPercentage: '25%',
    productName: 'Glowing Gold Rings',
    className: 'bg-blue-900',
    image: '/images/ring-7.jpg'
  },
  {
    discountPercentage: '10%',
    productName: 'Glowing Gold Earrings',
    className: 'bg-gray-800',
    image: '/images/earring-8.jpg'
  },
  {
    discountPercentage: '15%',
    productName: 'Glowing Gold Necklace',
    className: 'bg-green-800',
    image: '/images/pendant-7.jpeg'
  },
];
