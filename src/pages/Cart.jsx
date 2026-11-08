import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';
import { sendOrderViaWhatsApp } from '../utils/whatsapp';
import { Button } from '../components/common/Button';
import { siteConfig } from '../config/siteConfig';

export const Cart = () => {
  const { cartItems, totalItems, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    sendOrderViaWhatsApp(cartItems, subtotal, {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      city: customerCity.trim(),
    });

    setOrderSent(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F5F5F3] min-h-[75vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white border border-[#D8D8D8] p-10 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-5 bg-[#F5F5F3] border border-[#D8D8D8] flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-neutral-400" />
          </div>
          <h1 className="font-serif text-2xl font-bold uppercase tracking-tight text-[#080808] mb-2">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-neutral-500 text-xs leading-relaxed mb-6">
            You haven't added any menswear or boys' garments to your bag yet. Explore our latest arrivals
            and classic formal collections.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#080808] text-white text-xs uppercase font-semibold tracking-wider hover:bg-neutral-800 transition-colors w-full"
          >
            Explore Wardrobe Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F3] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#D8D8D8]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#888888] font-bold block mb-1">
              Checkout Preparation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#080808]">
              SHOPPING BAG ({totalItems})
            </h1>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {orderSent && (
          <div className="p-5 mb-8 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>WhatsApp Order Message Prepared!</span>
            </div>
            <p className="leading-relaxed">
              WhatsApp has been opened in a new tab with your full itemized order. 
              <strong>Please tap Send in WhatsApp</strong> so Suraj Thakur receives your order request. 
              Your shopping bag items remain saved here in your browser.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Cart Items List (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-[#D8D8D8] p-6">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-[#D8D8D8] text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              <span className="col-span-6">Garment</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Subtotal</span>
            </div>

            <div className="divide-y divide-[#D8D8D8]">
              {cartItems.map((item) => (
                <div key={item.cartKey} className="py-5 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                  {/* Product info */}
                  <div className="sm:col-span-6 flex gap-4">
                    <Link to={`/product/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover bg-[#F5F5F3] border border-[#D8D8D8]"
                      />
                    </Link>
                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                          {item.code}
                        </span>
                        <Link
                          to={`/product/${item.id}`}
                          className="font-serif text-sm font-bold text-[#080808] hover:underline leading-snug line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-neutral-600 mt-1">
                          {item.size && (
                            <span>
                              Size: <strong className="text-black">{item.size}</strong>
                            </span>
                          )}
                          {item.size && item.color && <span>·</span>}
                          {item.color && (
                            <span>
                              Color: <strong className="text-black">{item.color}</strong>
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-red-600 transition-colors mt-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Unit price */}
                  <div className="hidden sm:block sm:col-span-2 text-center text-xs font-semibold tabular-nums text-neutral-700">
                    {formatPrice(item.price)}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="sm:col-span-2 flex justify-start sm:justify-center mt-3 sm:mt-0">
                    <div className="inline-flex items-center border border-[#D8D8D8]">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm font-semibold hover:bg-neutral-100"
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm font-semibold hover:bg-neutral-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div className="sm:col-span-2 text-right mt-2 sm:mt-0">
                    <span className="text-sm font-bold text-[#080808] tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#D8D8D8] flex items-center justify-between text-xs">
              <button
                onClick={clearCart}
                className="text-neutral-500 hover:text-red-600 underline font-medium"
              >
                Clear Entire Bag
              </button>
              <Link
                to="/shop"
                className="text-black font-semibold uppercase tracking-wider hover:underline"
              >
                + Add More Clothing Items
              </Link>
            </div>
          </div>

          {/* Right Column: Customer Details & WhatsApp Submission (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Customer Details Form */}
            <div className="bg-white border border-[#D8D8D8] p-6 space-y-4">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-[#D8D8D8]">
                Customer Information (For WhatsApp)
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Provide your details below to include them automatically in your WhatsApp message:
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs p-2.5 bg-[#F5F5F3] border border-[#D8D8D8] text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Phone / WhatsApp Contact
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 98XXXXXXXX"
                    className="w-full text-xs p-2.5 bg-[#F5F5F3] border border-[#D8D8D8] text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Delivery City & State
                  </label>
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="e.g. New Delhi / Mumbai"
                    className="w-full text-xs p-2.5 bg-[#F5F5F3] border border-[#D8D8D8] text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Order Total & WhatsApp Action */}
            <div className="bg-[#080808] text-white border border-[#BFC0C2]/30 p-6 space-y-5">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10">
                Order Total
              </h3>

              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Selected Garments</span>
                  <span className="font-semibold text-white tabular-nums">{totalItems} items</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal Amount</span>
                  <span className="font-semibold text-white tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400 pt-1 border-t border-white/10">
                  <span>Shipping Cost</span>
                  <span className="italic text-[#BFC0C2]">Confirmed by store</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-white">
                  Order Subtotal
                </span>
                <span className="text-2xl font-bold text-white tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <Button
                variant="whatsapp"
                size="lg"
                fullWidth
                onClick={handlePlaceOrder}
                icon={MessageCircle}
              >
                Place Order on WhatsApp
              </Button>

              <div className="text-[11px] text-neutral-400 space-y-1.5 leading-relaxed pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Direct WhatsApp Guarantee</span>
                </div>
                <p>
                  Clicking will open WhatsApp to <strong>+91 {siteConfig.contacts.primaryPhone}</strong> with
                  your full order list, codes, and images. No payment is charged online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
