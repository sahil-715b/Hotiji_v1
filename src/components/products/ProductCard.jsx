import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { formatPrice, calculateDiscount } from '../../utils/pricing';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({ product, onQuickView }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);

  return (
    <div className="group relative flex flex-col bg-white border border-[#D8D8D8] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-black/40">
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full bg-[#F5F5F3] overflow-hidden">
        {/* Discount / Status Tag */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-20 flex flex-col gap-1 items-start pointer-events-none">
          {discount > 0 && (
            <span className="bg-[#080808] text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5">
              {discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-white text-black border border-black/20 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5">
              NEW
            </span>
          )}
          {!product.inStock && (
            <span className="bg-red-700 text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Top-Right Action Controls (Wishlist + Quick View on mobile) */}
        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
              isFavorited
                ? 'bg-black text-red-500 shadow-md'
                : 'bg-white/90 text-neutral-600 hover:text-black hover:bg-white shadow-sm'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {/* Mobile Quick View Trigger (visible on small touch devices) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView && onQuickView(product);
            }}
            className="sm:hidden p-1.5 rounded-full bg-white/90 text-neutral-700 hover:text-black shadow-sm"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Clickable Image */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {!imageError && product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-gradient-to-b from-[#1C1C1C] to-[#080808] text-white">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#BFC0C2]">HJ</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mt-2 font-medium">
                {product.category}
              </span>
              <span className="text-xs text-neutral-300 font-semibold mt-1 line-clamp-2 px-2">
                {product.name}
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Hover Action Strip */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-0 z-20 p-2.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent items-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            onClick={() => onQuickView && onQuickView(product)}
            className="flex-1 py-2 px-3 bg-white text-black hover:bg-[#F5F5F3] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <Link
            to={`/product/${product.id}`}
            className="py-2 px-3 bg-[#080808] text-white hover:bg-neutral-800 text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center border border-white/20 transition-colors shadow-sm"
            title="View Details"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-[#888888] uppercase tracking-wider mb-1">
            <span className="font-semibold text-[#080808]">{product.code}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.subCategory || product.category}</span>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-[#080808] line-clamp-1 group-hover:text-neutral-700 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Sizes preview */}
          <div className="flex items-center gap-1 mt-1 text-[9px] sm:text-[10px] text-neutral-500 font-medium overflow-hidden">
            <span className="shrink-0 uppercase text-[8px] sm:text-[9px] text-neutral-400">Sizes:</span>
            <span className="truncate">{product.sizes?.join(', ')}</span>
          </div>
        </div>

        {/* Pricing Row */}
        <div className="flex items-baseline justify-between mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#D8D8D8]">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm md:text-base font-bold text-[#080808] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-neutral-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-neutral-500 hidden sm:inline">
            {product.inStock ? 'In Stock' : 'Sold Out'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
