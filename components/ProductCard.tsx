"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { ProductCardProps } from "@/types";
import { ReactElement, useState } from "react";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onShowLoginModal,
  viewMode = "grid",
}): ReactElement => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Safe image URL handling
  const getImageUrl = (): string => {
    // Check if images array exists and has at least one image
    if (!product.images || product.images.length === 0) {
      return "/images/placeholder.jpg";
    }

    const firstImage = product.images[0];

    // Handle string format
    if (typeof firstImage === "string") {
      return firstImage || "/images/placeholder.jpg";
    }

    // Handle object format - use type assertion to avoid TypeScript errors
    const imageObject = firstImage as any;
    if (imageObject && typeof imageObject === "object" && imageObject.url) {
      return imageObject.url || "/images/placeholder.jpg";
    }

    return "/images/placeholder.jpg";
  };

  const imageUrl = getImageUrl();

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (viewMode === "list") {
    return (
      <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
          <Image
            src={imageError ? "/images/placeholder.jpg" : imageUrl}
            alt={product.name}
            fill
            className={`object-cover rounded-lg transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="96px"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>

        <div className="flex-1 flex flex-col items-center text-center">
          <Link href={`/product/${product.id}`} className="group">
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-2 line-clamp-1">
            {product.shortDescription}
          </p>
          <div className="flex items-center gap-2 justify-center">
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-amber-600 font-bold text-lg">
              ₹{product.price.toLocaleString()}
            </span>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="mt-3 p-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors shadow-lg flex items-center justify-center"
            title="View Product"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#278899] rounded-3xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow text-white group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-4/3 cursor-pointer bg-gray-100">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          <Image
            src={imageError ? "/images/placeholder.jpg" : imageUrl}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-105 transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />

          {product.isNew && (
            <span className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              New
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex flex-col items-center text-center gap-3">
          {/* Centered Product Info */}
          <div className="w-full">
            <Link href={`/product/${product.id}`} className="group">
              <h3 className="font-semibold mb-2 line-clamp-1 text-base group-hover:text-amber-300 transition-colors">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              {product.originalPrice && (
                <span className="line-through text-sm opacity-80">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-amber-300 font-bold text-lg">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Centered View Button */}
          <Link
            href={`/product/${product.id}`}
            className="w-2/3 flex items-center justify-center gap-2 py-3 text-[#278899] bg-white rounded-2xl hover:bg-gray-100 transition-colors font-semibold"
          >
            <Eye className="w-5 h-5" />
            Quick View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
