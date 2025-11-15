// app/product/[productId]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import { ALL_PRODUCTS } from "@/lib/constants/Data";
import { ReactElement } from "react";

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    productId: product.id.toString(), // Convert to string if your ID is number
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productId } = await params;

  const product = ALL_PRODUCTS.find((p) => p.id.toString() === productId);

  if (!product) {
    return {
      title: "Product Not Found - Siyana Gold & Diamonds",
    };
  }

  return {
    title: `${product.name} - ${product.category.name} | Siyana Gold & Diamonds`,
    description: product.description,
    keywords: [product.name, product.category.name, "gold jewelry", "diamonds"],
    openGraph: {
      title: `${product.name} - Siyana Gold & Diamonds`,
      description: product.description,
      images: [product.images[0]],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps): Promise<ReactElement> {
  const { productId } = await params;

  const product = ALL_PRODUCTS.find((p) => p.id.toString() === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <NavbarWrapper />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}
