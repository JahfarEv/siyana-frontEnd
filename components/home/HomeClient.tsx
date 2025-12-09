"use client";

import React, { ReactElement, useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import OfferCards from "@/components/home/OfferCard";
import CategoryGrid from "@/components/home/CategoryGrid";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { User, CartItem, Product, Category } from "@/types";

interface HomeClientProps {
  carouselData: any[]; // Replace 'any' with specific type if available
  categories: Category[];
  offers: any[]; // Replace 'any' with specific type if available
}

export default function HomeClient({
  carouselData,
  categories,
  offers,
}: HomeClientProps): ReactElement {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

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
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("siyana-cart", JSON.stringify(cart));
  }, [cart]);

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

  return (
    <>
      <Navbar
        cartItemsCount={cartItemsCount}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={logout}
      />
      <div className="overflow-x-hidden">
        <main className="grow">
          <HeroBanner slides={carouselData} />
          <OfferCards offers={offers} />
          <CategoryGrid categories={categories} />
        </main>
        <Footer />
      </div>
      {showLoginModal && (
        <LoginModal
          isOpen={true}
          onClose={() => setShowLoginModal(false)}
          onLogin={login}
        />
      )}
    </>
  );
}
