// // Base types
// export interface BaseEntity {
//   id: string | number;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface Image {
//   id: string;
//   url: string;
//   alt: string;
//   width?: number;
//   height?: number;
// }

// export interface SeoMetadata {
//   title: string;
//   description: string;
//   keywords: string[];
//   ogImage?: string;
//   canonicalUrl?: string;
// }

// // Product types
// export interface ProductCategory extends BaseEntity {
//   name: string;
//   slug: string;
//   description: string;
//   image: Image;
//   productCount: number;
//   isActive: boolean;
// }

// // types/index.ts
// export interface Product {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   shortDescription: string;
//   category: ProductCategory;
//   brand: string;
//   price: number;
//   originalPrice?: number;
//   discount: number;
//   images: string[]; // This should be string[], NOT objects with url property
//   features: string[];
//   specifications: Record<string, string>;
//   tags: string[];
//   rating: number;
//   reviewCount: number;
//   inStock: boolean;
//   isFeatured: boolean;
//   isNew: boolean;
//   isOnSale: boolean;
//   createdAt: string;
// }

// export interface CartItem extends Product {
//   quantity: number;
// }

// // User types
// export interface User extends BaseEntity {
//   email: string;
//   firstName: string;
//   lastName: string;
//   phone?: string;
//   avatar?: string;
//   isVerified: boolean;
//   isActive: boolean;
//   role: 'customer' | 'admin';
// }

// // Auth types
// export interface LoginFormData {
//   name: string;
//   email: string;
//   password: string;
// }

// export interface AuthUser {
//   user: User;
//   token: string;
//   refreshToken: string;
//   expiresIn: number;
// }

// export interface LoginCredentials {
//   email: string;
//   password: string;
//   rememberMe?: boolean;
// }

// export interface RegisterData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
//   acceptTerms: boolean;
// }

// // Component Props
// export interface NavbarProps {
//   cartItemsCount: number;
//   user: User | null;
//   onLoginClick: () => void;
//   onLogout: () => void;
// }

// export interface LoginModalProps {
//   onClose: () => void;
//   onLogin: (user: User) => void;
// }

// export interface ProductCardProps {
//   product: Product;
//   onAddToCart: (product: Product) => void;
//   onShowLoginModal: () => void;
//   viewMode?: 'grid' | 'list';
// }

// export interface CategoryCardProps {
//   name: string;
//   image: string;
//   colSpan: string;
// }

// export interface OfferCardProps {
//   title: string;
//   subtitle: string;
//   className: string;
//   image: string; // fixed
// }

// export interface HeroBannerProps {}

// export interface FeaturedProductsProps {
//   onAddToCart: (product: Product) => void;
//   onShowLoginModal: () => void;
// }

// export interface CategoryProductsProps {
//   products: Product[];
//   category: ProductCategory;
//   sort: string;
//   currentPage: number;
// }

// export interface ProductDetailProps {
//   product: Product;
// }

// export interface RelatedProductsProps {
//   products: Product[];
//   currentProductId: number | string;
// }

// // API types
// export interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// // Search types
// export interface ProductSearchParams {
//   query?: string;
//   category?: string;
//   sortBy?: string;
//   sortOrder?: 'asc' | 'desc';
//   priceRange?: {
//     min: number;
//     max: number;
//   };
// }

// // Gold Rate types
// export interface GoldRate {
//   '24K': string;
//   '22K': string;
//   '18K': string;
// }

// // Contact Form types
// export interface ContactForm {
//   name: string;
//   email: string;
//   phone: string;
//   subject: string;
//   message: string;
// }
// export interface ProductCategory extends BaseEntity {
//   name: string;
//   slug: string;
//   description: string;
//   image: Image;
//   productCount: number;
//   isActive: boolean;
// }
// export interface OfferCardProps {
//   title: string;
//   subtitle: string;
// //   className?: string;
//   imageStyle?: React.CSSProperties; // ✅ Add this line
// }



// Base types
export interface BaseEntity {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Image {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Category types
export interface ProductCategory extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  image: Image;
  productCount: number;
  isActive: boolean;
}

// Product types
// Update your Product type in types/index.ts
// types/index.ts
export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock?: number | null;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  images: (string | Image)[];
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
  sku?: string;
  
  // ✅ Add these properties
  status?: string; // String for ProductDetail component
  availability?: "In Stock" | "Low Stock" | "Out of Stock";
  
  category: ProductCategory;
  brand?: string;
}

// Cart types
export interface CartItem extends Product {
  quantity: number;
}

// User types
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  role: 'customer' | 'admin';
}

// Auth types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// Component Props
export interface NavbarProps {
  cartItemsCount: number;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string, confirmPassword: string) => void;
}


// Order types for WhatsApp checkout
export interface Order {
  orderId: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  totalAmount: number;
  status: 'whatsapp_sent';
  createdAt: any; // Firestore Timestamp
  updatedAt?: any;
}

export interface CheckoutRequest {
  userId: string;
}

export interface CheckoutResponse {
  success: boolean;
  orderId: string;
  whatsappUrl: string;
  message: string;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onShowLoginModal: () => void;
  viewMode?: 'grid' | 'list';
}

export interface CategoryCardProps {
  name: string;
  image: string;
  colSpan: string;
}

export interface OfferCardProps {
  title: string;
  subtitle: string;
  className?: string;
    image: string;                     // ✅ add this line

  imageStyle?: React.CSSProperties;
}

export interface HeroBannerProps {}

export interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
  onShowLoginModal: () => void;
}

export interface CategoryProductsProps {
  products: Product[];
  category: ProductCategory;
  sort: string;
  currentPage: number;
}

export interface ProductDetailProps {
  product: Product;
}

export interface RelatedProductsProps {
  products: Product[];
  currentProductId: number | string;
}

// API types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Search types
export interface ProductSearchParams {
  query?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  priceRange?: {
    min: number;
    max: number;
  };
}

// Gold Rate types
export interface GoldRate {
  '24K': string;
  '22K': string;
  '18K': string;
}

// Contact Form types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;         // if stored as image URL
  productCount: number;
  createdAt?: any;
  updatedAt?: any;
}

