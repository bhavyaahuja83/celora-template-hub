
import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  isDiscounted?: boolean;
  originalPrice?: number;
  discountPercentage?: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('celora_cart');
    const savedLibrary = localStorage.getItem('celora_library');
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    
    if (savedLibrary) {
      try {
        setSavedItems(JSON.parse(savedLibrary));
      } catch (error) {
        console.error('Error loading library:', error);
      }
    }
  }, []);

  const addToCart = (item: CartItem) => {
    const exists = cartItems.find(cartItem => cartItem.id === item.id);
    if (!exists) {
      const newCart = [...cartItems, item];
      setCartItems(newCart);
      localStorage.setItem('celora_cart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = (itemId: string) => {
    const newCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCart);
    localStorage.setItem('celora_cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('celora_cart');
  };

  const saveToLibrary = (itemId: string) => {
    if (!savedItems.includes(itemId)) {
      const newSaved = [...savedItems, itemId];
      setSavedItems(newSaved);
      localStorage.setItem('celora_library', JSON.stringify(newSaved));
    }
  };

  const removeFromLibrary = (itemId: string) => {
    const newSaved = savedItems.filter(id => id !== itemId);
    setSavedItems(newSaved);
    localStorage.setItem('celora_library', JSON.stringify(newSaved));
  };

  const isInCart = (itemId: string) => {
    return cartItems.some(item => item.id === itemId);
  };

  const isInLibrary = (itemId: string) => {
    return savedItems.includes(itemId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  return {
    cartItems,
    savedItems,
    addToCart,
    removeFromCart,
    clearCart,
    saveToLibrary,
    removeFromLibrary,
    isInCart,
    isInLibrary,
    getCartTotal,
    getCartCount
  };
};
