"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import OfferCards from "@/components/home/OfferCard";
import CategoryGrid from "@/components/home/CategoryGrid";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { User, CartItem, Product } from "@/types";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load cart and user from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("siyana-cart");
    const savedUser = localStorage.getItem("siyana-user");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("siyana-cart", JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addToCart = (product: Product): void => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number): void => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number): void => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const login = (userData: User): void => {
    setUser(userData);
    setShowLoginModal(false);
    localStorage.setItem("siyana-user", JSON.stringify(userData));
  };

  const logout = (): void => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("siyana-user");
    localStorage.removeItem("siyana-cart");
  };

  const cartItemsCount: number = cart.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading Siyana Gold & Diamonds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <div className="max-w-7xl mx-auto"> */}

      <Navbar
        cartItemsCount={cartItemsCount}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={logout}
      />
      <div className="overflow-x-hidden">
        <main className="grow">
          <HeroBanner />
          <OfferCards />
          <CategoryGrid />
          {/* FeaturedProducts removed as requested */}
        </main>
        <Footer />
        {/* </div> */}
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onLogin={login} />
      )}
    </>
  );
}
