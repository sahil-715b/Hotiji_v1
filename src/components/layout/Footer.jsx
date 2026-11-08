import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { HJLogo } from '../common/HJLogo';
import { openWhatsAppGeneralChat } from '../../utils/whatsapp';

export const Footer = () => {
  return (
    <footer className="bg-[#080808] text-white border-t border-white/10 pt-10 sm:pt-16 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Trust Badges Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pb-8 sm:pb-12 border-b border-white/10 text-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 flex items-center justify-center bg-[#121212] border border-white/10 shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#BFC0C2]" />
            </div>
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-white">Curated Quality</h4>
              <p className="text-neutral-400 mt-1 leading-relaxed text-xs">
                Handpicked fabrics, reinforced stitching, and tailored cuts verified by Suraj Thakur.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 flex items-center justify-center bg-[#121212] border border-white/10 shrink-0">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-white">Direct WhatsApp Orders</h4>
              <p className="text-neutral-400 mt-1 leading-relaxed text-xs">
                Seamless one-tap cart submission. Instant confirmation on stock, size, and dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 flex items-center justify-center bg-[#121212] border border-white/10 shrink-0">
              <Truck className="w-5 h-5 text-[#BFC0C2]" />
            </div>
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-white">Pan-India Delivery</h4>
              <p className="text-neutral-400 mt-1 leading-relaxed text-xs">
                Swift dispatch with doorstep delivery across India. Shipping details shared on chat.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 py-8 sm:py-12 border-b border-white/10">
          {/* Column 1 & 2: Brand Lockup & Bio */}
          <div className="sm:col-span-2 space-y-3 sm:space-y-4">
            <HJLogo showTagline={true} />
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mt-3 font-light">
              HOTIJI OUTFIT'S is a premier men's and boys' fashion destination. We believe true style
              transcends occasions. From bespoke velvet tuxedos to pristine cotton dress shirts, discover
              the finest in modern luxury.
            </p>
            <div className="pt-2 text-xs text-[#BFC0C2] space-y-1">
              <p className="font-medium text-white">
                Brand Owner: <span className="font-normal text-neutral-300">Suraj Thakur</span>
              </p>
              <p className="text-neutral-400">Timings: {siteConfig.contacts.workingHours}</p>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="font-serif font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 text-white">
              Explore Store
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/shop?category=mens-wear" className="hover:text-white transition-colors">Men's Wear</Link>
              </li>
              <li>
                <Link to="/shop?category=boys-wear" className="hover:text-white transition-colors">Boys' Wear</Link>
              </li>
              <li>
                <Link to="/shop?category=casual-wear" className="hover:text-white transition-colors">Casual Wear</Link>
              </li>
              <li>
                <Link to="/shop?category=party-wear" className="hover:text-white transition-colors">Party & Evening Wear</Link>
              </li>
              <li>
                <Link to="/shop?category=premium-collection" className="hover:text-white transition-colors">Premium Collection</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Categories */}
          <div>
            <h4 className="font-serif font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 text-white">
              Wardrobe Categories
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/shop?category=shirts" className="hover:text-white transition-colors">Formal & Linen Shirts</Link>
              </li>
              <li>
                <Link to="/shop?category=jeans-trousers" className="hover:text-white transition-colors">Jeans & Trousers</Link>
              </li>
              <li>
                <Link to="/shop?category=jackets" className="hover:text-white transition-colors">Tailored Blazers & Jackets</Link>
              </li>
              <li>
                <Link to="/shop?category=casual-wear" className="hover:text-white transition-colors">Boxy Tees & Polos</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">Saved Wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Shopping Bag</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Contact */}
          <div>
            <h4 className="font-serif font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 text-white">
              Store Inquiries
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#BFC0C2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-[#888888] block">Primary Order Hotline</span>
                  <a
                    href={`tel:${siteConfig.contacts.primaryPhone}`}
                    className="hover:text-white tabular-nums font-medium"
                  >
                    {siteConfig.contacts.primaryPhoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#BFC0C2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-[#888888] block">Secondary Line</span>
                  <a
                    href={`tel:${siteConfig.contacts.secondaryPhone}`}
                    className="hover:text-white tabular-nums font-medium"
                  >
                    {siteConfig.contacts.secondaryPhoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#BFC0C2] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-[#888888] block">Location</span>
                  <span>{siteConfig.contacts.storeLocation}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openWhatsAppGeneralChat()}
                  className="w-full py-2.5 px-3 bg-[#128C7E] hover:bg-[#075E54] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-400">
            <span>{siteConfig.tagline}</span>
            <span>·</span>
            <span>Founder: {siteConfig.owner}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
