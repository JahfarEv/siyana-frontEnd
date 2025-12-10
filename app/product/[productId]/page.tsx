// // app/product/[productId]/page.tsx
// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import ProductDetail from "@/components/product/ProductDetail";
// import NavbarWrapper from "@/components/layout/NavbarWrapper";
// import Footer from "@/components/layout/Footer";
// import { ALL_PRODUCTS } from "@/lib/constants/Data";
// import { ReactElement } from "react";
// import { fetchProductById } from "@/lib/firebase/firebaseQueries";

// interface ProductDetailPageProps {
//   params: Promise<{
//     productId: string;
//   }>;
// }

// export async function generateStaticParams() {
//   return ALL_PRODUCTS.map((product) => ({
//     productId: product.id.toString(), // Convert to string if your ID is number
//   }));
// }

// export async function generateMetadata({
//   params,
// }: ProductDetailPageProps): Promise<Metadata> {
//   const { productId } = await params;

//   const product = await fetchProductById(productId);

//   if (!product) {
//     return {
//       title: "Product Not Found - Siyana Gold & Diamonds",
//     };
//   }

//   return {
//     title: `${product?.name} - ${product.category.name} | Siyana Gold & Diamonds`,
//     description: product.description,
//     keywords: [product.name, product.category.name, "gold jewelry", "diamonds"],
//     openGraph: {
//       title: `${product.name} - Siyana Gold & Diamonds`,
//       description: product.description,
//       images: [product.images[0]],
//       type: "website",
//     },
//   };
// }

// export default async function ProductDetailPage({
//   params,
// }: ProductDetailPageProps): Promise<ReactElement> {
//   const { productId } = await params;

//   const product = await fetchProductById(productId);

//   console.log(product,'pro')
//   if (!product) {
//     notFound();
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <NavbarWrapper />
//       <ProductDetail product={product} />
//       <Footer />
//     </div>
//   );
// }



// app/product/[productId]/page.tsx
// app/product/[productId]/page.tsx
"use server";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import { ALL_PRODUCTS } from "@/lib/constants/Data";
import { ReactElement } from "react";
import { Product } from "@/types";

// Firebase imports for server-side usage
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

// Type for ProductDetail component props
interface ProductDetailView {
  id: string | number;
  name: string;
  price: string; // Formatted string
  originalPrice?: number;
  discount: number;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock?: number | string;
  isOnSale?: boolean;
  isNew?: boolean;
  images: (string | { url: string })[];
  features?: string[];
  specifications?: { [key: string]: string };
  tags?: string[];
  sku?: string;
  status: string;
  availability?: "In Stock" | "Low Stock" | "Out of Stock";
  category: {
    name: string;
    slug: string;
  };
}

// Convert Product to ProductDetailView
// Update the convertToProductDetailView function
const convertToProductDetailView = (product: Product): ProductDetailView => {
  return {
    id: product.id,
    name: product.name,
    price: `₹${product.price.toLocaleString()}`,
    originalPrice: product.originalPrice,
    discount: product.discount || 0,
    description: product.description,
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0,
    inStock: product.inStock ?? true,
    
    // Fix: Convert null to undefined or string
    stock: product.stock === null ? undefined : product.stock,
    // OR: stock: product.stock === null ? "0" : product.stock,
    // OR: stock: product.stock ?? undefined,
    
    isOnSale: product.isOnSale || false,
    isNew: product.isNew || false,
    images: Array.isArray(product.images) ? product.images : [],
    features: product.features || [],
    specifications: product.specifications || {},
    tags: product.tags || [],
    sku: product.sku || "",
    status: (product as any).status || product.availability || (product.inStock ? "In Stock" : "Out of Stock"),
    availability: product.availability,
    category: {
      name: product.category?.name || "",
      slug: product.category?.slug || "",
    },
  };
};
// Your fetch function within the page
const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return null;
    }

    const data = productSnap.data();

    return {
      id: productSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate?.().toISOString() || null,
      updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
    } as Product;
  } catch (error) {
    console.error("❌ Product Fetch Error:", error);
    throw new Error("Failed to fetch product");
  }
};

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    productId: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productId } = await params;

  const product = await fetchProductById(productId);

  if (!product) {
    return {
      title: "Product Not Found - Siyana Gold & Diamonds",
    };
  }

  return {
    title: `${product.name} - ${product.category?.name || 'Jewelry'} | Siyana Gold & Diamonds`,
    description: product.description || `${product.name} from Siyana Gold & Diamonds`,
    keywords: [product.name, product.category?.name || '', "gold jewelry", "diamonds"],
    openGraph: {
      title: `${product.name} - Siyana Gold & Diamonds`,
      description: product.description || `${product.name} from Siyana Gold & Diamonds`,
      images: [product.images?.[0] || "/default-product.jpg"],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps): Promise<ReactElement> {
  const { productId } = await params;

  const product = await fetchProductById(productId);

  console.log(product, 'pro');
  
  if (!product) {
    notFound();
  }

  // Convert Product to ProductDetailView format
  const productDetail = convertToProductDetailView(product);

  return (
    <div className="min-h-screen bg-white">
      <NavbarWrapper />
      <ProductDetail product={productDetail} />
      <Footer />
    </div>
  );
}