import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Layout Components
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Common Floating Utilities
import { CartDrawer } from './components/cart/CartDrawer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { BackToTop } from './components/common/BackToTop';
import { Toast } from './components/common/Toast';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col bg-[#080808] text-[#121212] font-sans antialiased">
            {/* Top Announcement Bar */}
            <AnnouncementBar />

            {/* Sticky Navigation Header */}
            <Header />

            {/* Main Page Routing */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Brand Footer */}
            <Footer />

            {/* Global Slide-Over Cart Drawer */}
            <CartDrawer />

            {/* Floating Quick Action Buttons */}
            <WhatsAppButton />
            <BackToTop />

            {/* Notification Toast */}
            <Toast />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}
