import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const WISHLIST_STORAGE_KEY = 'hotiji_wishlist_v1';
const RECENT_VIEWED_KEY = 'hotiji_recently_viewed_v1';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    return getStorageItem(WISHLIST_STORAGE_KEY, []);
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => {
    return getStorageItem(RECENT_VIEWED_KEY, []);
  });

  useEffect(() => {
    setStorageItem(WISHLIST_STORAGE_KEY, wishlistIds);
  }, [wishlistIds]);

  useEffect(() => {
    setStorageItem(RECENT_VIEWED_KEY, recentlyViewedIds);
  }, [recentlyViewedIds]);

  const toggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistIds.includes(productId);
  };

  const addToRecentlyViewed = (productId) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist,
        recentlyViewedIds,
        addToRecentlyViewed,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
