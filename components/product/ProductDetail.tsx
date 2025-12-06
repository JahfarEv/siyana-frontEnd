"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Sparkles,
  Gem,
  Crown,
} from "lucide-react";
import { ReactElement } from "react";
import AuthModal from "../auth/LoginModal"; // Adjust the import path as needed

interface ProductDetailProps {
  product: {
    id: string | number;
    name: string;
    price: string;
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
    status:string;
    availability?: "In Stock" | "Low Stock" | "Out of Stock";
    category: {
      name: string;
      slug: string;
    };
  };
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({
  product,
}): ReactElement => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const router = useRouter();

  // Check if user is logged in (you can replace this with your actual auth check)
  const isUserLoggedIn = () => {
    // This is a placeholder - replace with your actual authentication check
    return localStorage.getItem("siyana-user-token") !== null;
  };

  const availabilityStatus = useMemo(() => {
    if (product.availability) {
      if (product.availability === "Out of Stock")
        return {
          text: "Out of Stock",
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
        };
      if (product.availability === "Low Stock")
        return {
          text: "Low Stock",
          color: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-200",
        };
      return {
        text: "In Stock",
        color: "text-[#196b7a]",
        bg: "bg-[#196b7a]/10",
        border: "border-[#196b7a]/20",
      };
    }
    if (!product.inStock) {
      return {
        text: "Out of Stock",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
      };
    }
    if (
      product.stock !== undefined &&
      product.stock !== null &&
      product.stock < 10
    ) {
      return {
        text: "Low Stock",
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
      };
    }
    return {
      text: "In Stock",
      color: "text-[#196b7a]",
      bg: "bg-[#196b7a]/10",
      border: "border-[#196b7a]/20",
    };
  }, [product.inStock, product.stock, product.availability]);

  const renderStars = (rating: number): ReactElement[] => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-amber-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const handleAddToCart = (): void => {
    console.log(product)
    if (Number(product.stock)<1) return;

    // Check if user is logged in
    if (!isUserLoggedIn()) {
      setShowLoginModal(true);
      return;
    }

    setIsAddingToCart(true);

    // Get existing cart from localStorage
    const existingCart = localStorage.getItem("siyana-cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(
      (item: any) => item.id === product.id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const cartItem = {
        ...product,
        quantity: quantity,
        images: product.images, // Ensure images are included
      };
      cart.push(cartItem);
    }

    // Save to localStorage
    localStorage.setItem("siyana-cart", JSON.stringify(cart));

    // Reset loading state
    setIsAddingToCart(false);

    // Show success message (you can replace this with a toast notification)
    alert(`${product.name} added to cart!`);

    console.log("Added to cart:", product, quantity);
  };

  const handleBuyNow = (): void => {
    if (Number(product.stock)<1) return;

    // Check if user is logged in
    if (!isUserLoggedIn()) {
      setShowLoginModal(true);
      return;
    }

    // Add to cart first
    handleAddToCart();

    // Then navigate to cart page
    setTimeout(() => {
      router.push("/cart");
    }, 500);
  };

  const handleWishlist = (): void => {
    setIsWishlisted(!isWishlisted);
    console.log("Wishlist:", product, !isWishlisted);
  };

  const handleShare = (): void => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  const handleLogin = (email: string, password: string) => {
    // Add your login logic here
    console.log("Login attempt:", email, password);

    // For demo purposes, just store a token and close modal
    localStorage.setItem("siyana-user-token", "demo-token");
    setShowLoginModal(false);
    alert("Login successful!");
  };

  const handleSignup = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    // Add your signup logic here
    console.log("Signup attempt:", name, email, password, confirmPassword);

    // For demo purposes, just store a token and close modal
    localStorage.setItem("siyana-user-token", "demo-token");
    setShowLoginModal(false);
    alert("Account created successfully!");
  };

  const getImageUrl = (image: any): string => {
    if (typeof image === "string") return image;
    if (typeof image === "object" && image.url) return image.url;
    return "/placeholder-image.jpg";
  };

  const currentPrice = `₹${product.price.toLocaleString()}`;
  const originalPrice = product.originalPrice
    ? `₹${product.originalPrice.toLocaleString()}`
    : null;
  const discountText =
    product.discount > 0 ? `Save ${product.discount}%` : null;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
            {/* Product Images Section */}
            <div className="space-y-8">
              {/* Main Product Image */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="relative aspect-square max-w-2xl mx-auto">
                  <Image
                    src={getImageUrl(product.images[selectedImage])}
                    alt={product.name}
                    fill
                    className={`rounded-xl object-contain transition-all duration-500 ${
                      imageLoaded
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl" />
                  )}

                  {/* Premium Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <div className="flex items-center gap-1 bg-[#196b7a] text-white text-xs font-semibold px-3 py-2 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        New Arrival
                      </div>
                    )}
                    {product.isOnSale && discountText && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-semibold px-3 py-2 rounded-full">
                        <Gem className="w-3 h-3" />
                        {discountText}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 text-[#196b7a]">
                  Product Description
                </h2>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-8">
              {/* Header Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#196b7a]/10 text-[#196b7a] px-3 py-1 rounded-full border border-[#196b7a]/20">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-semibold">Premium</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${availabilityStatus.bg} ${availabilityStatus.color} ${availabilityStatus.border}`}
                  >
                    <Check className="w-3 h-3" />
                    {availabilityStatus.text}
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                    <div className="flex">{renderStars(product?.rating)}</div>
                    <span className="text-sm font-semibold text-gray-700">
                      {product?.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product?.reviewCount?.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {currentPrice}
                  </span>
                  {originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {originalPrice}
                    </span>
                  )}
                </div>
                {discountText && (
                  <p className="text-[#196b7a] font-semibold mt-2 text-sm">
                    {discountText} • Inclusive of all taxes
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.status || isAddingToCart}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#196b7a] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#196b7a]/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.status || isAddingToCart}
                    className="flex-1 flex items-center justify-center gap-3 bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
                  >
                    {isAddingToCart ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <Truck className="w-7 h-7 text-[#196b7a] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-600">All over India</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <Shield className="w-7 h-7 text-[#196b7a] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">
                    2-Year Warranty
                  </p>
                  <p className="text-xs text-gray-600">Quality Assured</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                  <RotateCcw className="w-7 h-7 text-[#196b7a] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">
                    30-Day Returns
                  </p>
                  <p className="text-xs text-gray-600">Easy Returns</p>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications &&
                Object.keys(product.specifications).length > 0 && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 text-[#196b7a]">
                      Specifications
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-xl border border-gray-200"
                          >
                            <span className="text-sm font-medium text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-[#196b7a]">
                    Product Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-[#196b7a]/10 text-[#196b7a] rounded-lg text-sm font-medium border border-[#196b7a]/20 hover:bg-[#196b7a]/20 cursor-pointer transition-all duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default ProductDetailPage;
