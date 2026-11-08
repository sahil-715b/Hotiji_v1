import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { HJLogo } from '../common/HJLogo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { SearchModal } from '../common/SearchModal';
import { openWhatsAppGeneralChat } from '../../utils/whatsapp';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const { totalItems, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-[#080808] border-b border-white/10'
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left Zone on Small Screens (Menu & Search) */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden z-10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-white hover:text-[#BFC0C2] transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-white hover:text-[#BFC0C2] transition-colors"
              aria-label="Open search dialog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Logo Container: Center-Aligned on Mobile, Left-Aligned on Desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center lg:static lg:left-auto lg:translate-x-0 z-10">
            {/* Mobile View: Compact Logo without tagline */}
            <div className="lg:hidden">
              <HJLogo mobileCompact={true} showTagline={false} />
            </div>

            {/* Desktop View: Full Logo with Tagline */}
            <div className="hidden lg:block">
              <HJLogo showTagline={true} />
            </div>
          </div>

          {/* Center Navigation Links (Desktop Only) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-medium uppercase tracking-[0.15em] text-[#BFC0C2]">
            {siteConfig.navLinks.map((link) => {
              const isActive =
                location.pathname + location.search === link.path ||
                (link.path === '/' && location.pathname === '/' && !location.search);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative py-1 hover:text-white transition-colors whitespace-nowrap ${
                    isActive ? 'text-white font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#BFC0C2]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Zone: Interactive Controls (Search on Desktop, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0 z-10">
            {/* Desktop Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 hover:text-white border border-white/10 hover:border-white/30 bg-[#121212] transition-all"
              aria-label="Search clothing items"
            >
              <Search className="w-3.5 h-3.5 text-[#BFC0C2]" />
              <span className="text-[11px] uppercase tracking-wider">Search</span>
              <kbd className="hidden xl:inline text-[9px] bg-white/10 px-1 py-0.5 text-neutral-300">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-white hover:text-[#BFC0C2] transition-colors"
              aria-label="View saved wishlist items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold text-black bg-[#BFC0C2] rounded-full tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 p-2 sm:px-3 sm:py-2 text-white bg-[#1C1C1C] hover:bg-[#252525] border border-white/15 transition-all duration-150"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-medium">Bag</span>
              <span className="flex items-center justify-center min-w-4 h-4 sm:min-w-5 sm:h-5 px-1 sm:px-1.5 text-[10px] sm:text-[11px] font-bold text-black bg-white rounded-full tabular-nums">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative z-10 w-4/5 max-w-sm bg-[#080808] text-white h-full border-r border-white/15 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <HJLogo showTagline={false} mobileCompact={true} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white"
                  aria-label="Close navigation drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="py-6 space-y-3.5">
                {siteConfig.navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="block text-sm uppercase tracking-widest font-medium text-neutral-300 hover:text-white py-1.5 border-b border-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between text-sm uppercase tracking-widest font-medium text-neutral-300 hover:text-white py-1.5 border-b border-white/5"
                >
                  <span>Wishlist</span>
                  <span className="text-xs text-[#BFC0C2] tabular-nums">({wishlistCount})</span>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center justify-between text-sm uppercase tracking-widest font-medium text-neutral-300 hover:text-white py-1.5 border-b border-white/5"
                >
                  <span>Shopping Cart</span>
                  <span className="text-xs text-[#BFC0C2] tabular-nums">({totalItems})</span>
                </Link>
              </nav>
            </div>

            {/* Mobile Footer & WhatsApp CTA */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  openWhatsAppGeneralChat();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#128C7E] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#075E54] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Suraj Thakur</span>
              </button>

              <div className="text-[11px] text-[#888888] space-y-1 text-center">
                <p>Owner: Suraj Thakur</p>
                <p className="tabular-nums">Call: {siteConfig.contacts.primaryPhoneFormatted}</p>
                <p className="text-[10px] text-[#BFC0C2] tracking-widest uppercase">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
