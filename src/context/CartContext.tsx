import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, MenuItem } from '@/types/menu';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number, instructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateInstructions: (itemId: string, instructions: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem, quantity = 1, instructions?: string) => {
    setItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.item.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prev, { item, quantity, specialInstructions: instructions }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((cartItem) => cartItem.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((cartItem) =>
        cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    );
  }, [removeItem]);

  const updateInstructions = useCallback((itemId: string, instructions: string) => {
    setItems((prev) =>
      prev.map((cartItem) =>
        cartItem.item.id === itemId
          ? { ...cartItem, specialInstructions: instructions }
          : cartItem
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
    0
  );

  const itemCount = items.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateInstructions,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
