"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import { CartItem } from "@/types";
import { ReactElement } from "react";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Image from "next/image";
import { auth } from "@/lib/firebase/firebaseConfig";
import {
  addToWishlist,
  clearCart,
  getUserCart,
  removeFromCart,
  updateCartQuantity,
} from "@/lib/firebase/firebaseQueries";
import { onAuthStateChanged } from "firebase/auth";

export default function CartPage(): ReactElement {  
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [removingItem, setRemovingItem] = useState<string | number | null>(
    null
  );
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      console.log("User Logged In:", firebaseUser.uid);
      const data = await getUserCart(firebaseUser.uid);
      setCart(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("siyana-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("siyana-cart", JSON.stringify(cart));
    }
  }, [cart, loading]);

  const changeQuantity = async (productId: string, newQty: number) => {
    if (!user || newQty < 1) return;

    await updateCartQuantity(user.uid, productId, newQty);

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = async (productId: string) => {
    if (!user) return;

    await removeFromCart(user.uid, productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = async () => {
    if (!user) return;

    await clearCart(user.uid);
    setCart([]);
  };

  const moveToWishlist = async (item: CartItem) => {
    if (!user) return;
    const success = await addToWishlist(user.uid, item);
    if (success) {
      await removeFromCart(user.uid, item.id);
      setCart((prev) => prev.filter((p) => p.id !== item.id));
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 10000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + shipping + tax;
  const savings = cart.reduce((total, item) => {
    if (item.originalPrice) {
      return total + (item.originalPrice - item.price) * item.quantity;
    }
    return total;
  }, 0);

  const generateOrderMessage = (): string => {
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name} - ${
            item.quantity
          } x ₹${item.price.toLocaleString()} = ₹${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    return `Hello! I would like to place an order:\n\n${itemsText}\n\nSubtotal: ₹${subtotal.toLocaleString()}\nShipping: ${
      shipping === 0 ? "Free" : `₹${shipping}`
    }\nTax: ₹${Math.round(tax).toLocaleString()}\nTotal: ₹${Math.round(
      grandTotal
    ).toLocaleString()}\n\nPlease confirm my order.`;
  };

  const handleWhatsAppCheckout = (): void => {
    setIsCheckingOut(true);

    const phoneNumber = "919539794665"; // Your WhatsApp number without +
    const message = encodeURIComponent(generateOrderMessage());
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Reset loading state after a short delay
    setTimeout(() => {
      setIsCheckingOut(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#196b7a] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading your precious items...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <NavbarWrapper />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#196b7a] rounded-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Shopping Cart
                </h1>
                <p className="text-gray-600">
                  {totalItems}{" "}
                  {totalItems === 1 ? "precious item" : "precious items"} in
                  your collection
                </p>
              </div>
            </div>
            {cart.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-300"
              >
                Clear All Items
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-32 h-32 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-16 h-16 text-amber-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Your Cart Feels Light
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Discover our exquisite collection of jewelry and add some
                    sparkle to your cart
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/category/rings"
                      className="inline-flex items-center px-8 py-4 bg-[#196b7a] text-white font-semibold rounded-xl hover:bg-[#196b7a]/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Sparkles className="mr-3 w-5 h-5" />
                      Explore Collections
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link
                      href="/category/featured"
                      className="inline-flex items-center px-8 py-4 border-2 border-[#196b7a] text-[#196b7a] font-semibold rounded-xl hover:bg-[#196b7a] hover:text-white transition-all duration-300"
                    >
                      Featured Items
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
                      removingItem === item.id
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Product Image */}
                        <div className="relative">
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                            <Image
                              src={
                                typeof item.images[0] === "string"
                                  ? item.images[0]
                                  : (item.images[0] as any).url ||
                                    "/images/placeholder.jpg"
                              }
                              alt={item.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {item.isNew && (
                            <span className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                {item.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                {item.category.name}
                              </p>
                              <div className="flex items-center gap-4">
                                <p className="text-amber-600 font-bold text-xl">
                                  ₹{item.price.toLocaleString()}
                                </p>
                                {item.originalPrice &&
                                  item.originalPrice > item.price && (
                                    <p className="text-gray-500 line-through text-sm">
                                      ₹{item.originalPrice.toLocaleString()}
                                    </p>
                                  )}
                              </div>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-700">
                                Quantity:
                              </span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() =>
                                    changeQuantity(item.id, item.quantity - 1)
                                  }
                                  className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-l-lg"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2 font-medium min-w-12 text-center bg-white border-x border-gray-300">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    changeQuantity(item.id, item.quantity + 1)
                                  }
                                  className="p-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-r-lg"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => moveToWishlist(item)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                                title="Move to Wishlist"
                              >
                                <Heart className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemove(item.id)}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                                title="Remove from Cart"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Item Total:</span>
                        <span className="font-bold text-lg text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#196b7a]" />
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span className="font-medium">
                        ₹{Math.round(savings).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (GST)</span>
                    <span className="font-medium">
                      ₹{Math.round(tax).toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-[#196b7a]">
                        ₹{Math.round(grandTotal).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-[#196b7a] mx-auto mb-1" />
                    <p className="text-xs font-medium text-gray-900">
                      Free Shipping
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-[#196b7a] mx-auto mb-1" />
                    <p className="text-xs font-medium text-gray-900">
                      Secure Payment
                    </p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 text-[#196b7a] mx-auto mb-1" />
                    <p className="text-xs font-medium text-gray-900">
                      Easy Returns
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Preparing...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Checkout via WhatsApp
                      </>
                    )}
                  </button>

                  <Link
                    href="/"
                    className="w-full text-center block text-[#196b7a] border-2 border-[#196b7a] py-4 rounded-xl font-semibold hover:bg-[#196b7a] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Continue Shopping
                  </Link>
                </div>

                {/* WhatsApp Checkout Info */}
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800 mb-1">
                        WhatsApp Checkout
                      </p>
                      <p className="text-xs text-green-700">
                        Your order details will be automatically sent to our
                        team via WhatsApp for quick confirmation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  🔒 Your order information is secure
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
