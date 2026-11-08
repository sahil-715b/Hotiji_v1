import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { sendOrderViaWhatsApp } from '../../utils/whatsapp';

export const CartDrawer = () => {
  const {
    cartItems,
    totalItems,
    subtotal,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [orderSentNotice, setOrderSentNotice] = useState(false);
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      if (drawerRef.current && backdropRef.current) {
        gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          drawerRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.4, ease: 'power3.out' }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const handleClose = () => {
    if (drawerRef.current && backdropRef.current) {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 });
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setIsCartDrawerOpen(false),
      });
    } else {
      setIsCartDrawerOpen(false);
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    sendOrderViaWhatsApp(cartItems, subtotal, {
      name: customerName.trim(),
      city: customerCity.trim(),
    });

    setOrderSentNotice(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md bg-white text-[#121212] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#D8D8D8]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#D8D8D8] bg-[#080808] text-white">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#BFC0C2]" />
            <h2 className="font-serif text-sm sm:text-base font-bold uppercase tracking-wider">
              Shopping Bag
            </h2>
            <span className="text-[10px] sm:text-xs bg-white text-black font-bold px-1.5 sm:px-2 py-0.5 rounded-full tabular-nums">
              {totalItems}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-[#BFC0C2] hover:text-white transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {orderSentNotice && (
            <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2 mb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Order Launched!</span>
              </div>
              <p className="leading-relaxed">
                We have generated your order message. Please click <strong>Send</strong> in your
                WhatsApp chat so Suraj Thakur receives your order. Your cart items are preserved.
              </p>
              <button
                onClick={() => setOrderSentNotice(false)}
                className="text-[11px] underline uppercase font-semibold text-emerald-800"
              >
                Dismiss notice
              </button>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-14 sm:py-16 px-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-[#F5F5F3] border border-[#D8D8D8] flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-400" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-[#080808]">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-neutral-500 mt-2 mb-6 leading-relaxed">
                Explore our curated men's shirts, trousers, jackets, and boys' wear collections.
              </p>
              <Link
                to="/shop"
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#080808] text-white text-xs uppercase font-semibold tracking-wider hover:bg-neutral-800 transition-colors"
              >
                <span>Browse Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div>
              {/* Optional Quick Customer Info */}
              <div className="p-3 bg-[#F5F5F3] border border-[#D8D8D8] mb-4 space-y-2 text-xs">
                <p className="font-semibold text-black uppercase text-[10px] tracking-wider">
                  Optional Details for WhatsApp:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="p-1.5 bg-white border border-[#D8D8D8] text-xs focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="City / State"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="p-1.5 bg-white border border-[#D8D8D8] text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#D8D8D8]">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.cartKey}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary / Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-[#D8D8D8] bg-[#F5F5F3]">
            <CartSummary
              subtotal={subtotal}
              totalItems={totalItems}
              onPlaceWhatsAppOrder={handlePlaceOrder}
            />

            <div className="mt-3 flex items-center justify-between text-xs pt-1 sm:pt-2">
              <button
                onClick={clearCart}
                className="text-neutral-500 hover:text-red-600 underline text-[11px]"
              >
                Clear Entire Bag
              </button>
              <Link
                to="/cart"
                onClick={handleClose}
                className="text-black font-semibold hover:underline flex items-center gap-1 uppercase text-[11px] tracking-wider"
              >
                <span>View Full Bag Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
