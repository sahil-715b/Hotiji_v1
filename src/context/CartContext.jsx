import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const CART_STORAGE_KEY = 'hotiji_cart_items_v1';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage
  const [cartItems, setCartItems] = useState(() => {
    return getStorageItem(CART_STORAGE_KEY, []);
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [lastActionMessage, setLastActionMessage] = useState(null);

  // Synchronize cart changes with localStorage safely
  useEffect(() => {
    setStorageItem(CART_STORAGE_KEY, cartItems);
  }, [cartItems]);

  /**
   * Generates a deterministic unique key for an item based on ID, size, and color
   */
  const getCartItemKey = useCallback((productId, size, color) => {
    const safeSize = (size || 'standard').trim().toLowerCase();
    const safeColor = (color || 'default').trim().toLowerCase();
    return `${productId}_${safeSize}_${safeColor}`;
  }, []);

  /**
   * Adds an item to the shopping cart or increments existing quantity
   * @param {Object} product - The product object
   * @param {string} selectedSize - Selected size string (e.g. "M", "32")
   * @param {string} selectedColor - Selected color string
   * @param {number} quantity - Quantity to add (default: 1)
   */
  const addToCart = useCallback((product, selectedSize, selectedColor, quantity = 1) => {
    if (!product || !product.inStock) {
      return false;
    }

    const itemKey = getCartItemKey(product.id, selectedSize, selectedColor);
    const validQty = Math.max(1, parseInt(quantity, 10) || 1);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartKey === itemKey);

      if (existingIndex > -1) {
        // Increment existing item quantity (capped at 20)
        const updated = [...prevItems];
        const newQty = Math.min(20, updated[existingIndex].quantity + validQty);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        // Create new item entry
        const newItem = {
          cartKey: itemKey,
          id: product.id,
          code: product.code || `HT${product.id}`,
          name: product.name,
          image: product.images?.[0] || '',
          price: Number(product.price) || 0,
          originalPrice: Number(product.originalPrice) || Number(product.price) || 0,
          size: selectedSize || 'Standard',
          color: selectedColor || (product.colors?.[0] || 'Default'),
          quantity: Math.min(20, validQty),
        };
        return [...prevItems, newItem];
      }
    });

    setLastActionMessage(`Added "${product.name}" (${selectedSize || 'Standard'}) to your bag`);
    return true;
  }, [getCartItemKey]);

  /**
   * Removes an item completely from cart by its unique cartKey
   */
  const removeFromCart = useCallback((cartKey) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartKey !== cartKey));
  }, []);

  /**
   * Updates the exact quantity of a cart item
   */
  const updateQuantity = useCallback((cartKey, newQuantity) => {
    const parsedQty = parseInt(newQuantity, 10);
    if (isNaN(parsedQty) || parsedQty <= 0) {
      removeFromCart(cartKey);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: Math.min(20, parsedQty) }
          : item
      )
    );
  }, [removeFromCart]);

  /**
   * Increment item quantity by 1
   */
  const incrementQuantity = useCallback((cartKey) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: Math.min(20, item.quantity + 1) }
          : item
      )
    );
  }, []);

  /**
   * Decrement item quantity by 1, removing if <= 1
   */
  const decrementQuantity = useCallback((cartKey) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.cartKey === cartKey);
      if (item && item.quantity > 1) {
        return prevItems.map((i) =>
          i.cartKey === cartKey ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevItems.filter((i) => i.cartKey !== cartKey);
    });
  }, []);

  /**
   * Clears the entire cart
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  /**
   * Convenience modal toggle helpers
   */
  const openCart = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCart = useCallback(() => setIsCartDrawerOpen(false), []);
  const toggleCart = useCallback(() => setIsCartDrawerOpen((prev) => !prev), []);

  /**
   * Computed totals with memoization
   */
  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
  }, [cartItems]);

  const totalSavings = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const original = item.originalPrice || item.price;
      const savings = original > item.price ? (original - item.price) * item.quantity : 0;
      return acc + savings;
    }, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    totalItems,
    subtotal,
    totalSavings,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    openCart,
    closeCart,
    toggleCart,
    lastActionMessage,
    setLastActionMessage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
