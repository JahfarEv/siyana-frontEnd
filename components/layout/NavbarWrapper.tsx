'use client';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { User, CartItem } from '@/types';

const NavbarWrapper: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('siyana-cart');
    const savedUser = localStorage.getItem('siyana-user');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('siyana-cart', JSON.stringify(cart));
  }, [cart]);

  const logout = (): void => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('siyana-user');
    localStorage.removeItem('siyana-cart');
  };

  return <Navbar />; // ✅ No props passed
};

export default NavbarWrapper;
