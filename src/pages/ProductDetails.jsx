import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  MessageCircle,
  Heart,
  ShieldCheck,
  Truck,
  Check,
  AlertCircle,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { products } from '../data/products';
import { ProductGallery } from '../components/products/ProductGallery';
import { ProductCard } from '../components/products/ProductCard';
import { ProductQuickView } from '../components/products/ProductQuickView';
import { Button } from '../components/common/Button';
import { formatPrice, calculateDiscount } from '../utils/pricing';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { sendProductInquiryViaWhatsApp } from '../utils/whatsapp';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { isInWishlist, toggleWishlist, recentlyViewedIds, addToRecentlyViewed } = useWishlist();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Scroll to top and record in recently viewed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      addToRecentlyViewed(product.id);
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
      setQuantity(1);
      setValidationError('');
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F5F5F3] px-4 py-20 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-black mb-3">
          Product Not Found
        </h2>
        <p className="text-neutral-500 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
          The clothing item you are looking for may have been removed or the link is incorrect.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#080808] text-white text-xs uppercase font-semibold tracking-wider hover:bg-neutral-800 transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    if (!product.inStock) {
      setValidationError('This product is currently out of stock.');
      return;
    }

    if (product.sizes?.length > 0 && !selectedSize) {
      setValidationError('Please select a size to proceed.');
      return;
    }

    setValidationError('');
    const success = addToCart(product, selectedSize, selectedColor, quantity);
    if (success) {
      setIsCartDrawerOpen(true);
    }
  };

  const handleWhatsAppOrder = () => {
    sendProductInquiryViaWhatsApp(product, selectedSize, selectedColor);
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Recently viewed products
  const recentProducts = products
    .filter((p) => recentlyViewedIds.includes(p.id) && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-[#F5F5F3] min-h-screen py-6 sm:py-8 lg:py-12 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Action */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-[#D8D8D8] text-xs">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-neutral-600 hover:text-black font-semibold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-500 uppercase tracking-widest text-[10px] sm:text-[11px] truncate">
            <Link to="/" className="hover:text-black shrink-0">Home</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category}`} className="hover:text-black truncate max-w-[80px] sm:max-w-none">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-black font-bold truncate max-w-[90px] sm:max-w-[200px]">{product.code}</span>
          </div>
        </div>

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white border border-[#D8D8D8] p-4 sm:p-6 lg:p-10 shadow-sm">
          {/* Left Column: Gallery (7 Cols) */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Contiguous Purchase Module (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Product Code & Stock status */}
              <div className="flex items-center justify-between text-xs text-[#888888] uppercase tracking-wider mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#080808]">{product.code}</span>
                  <span>·</span>
                  <span className="truncate">{product.category}</span>
                </div>
                <span
                  className={`font-semibold tracking-wider text-[11px] ${
                    product.inStock ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {product.inStock ? '● In Stock' : '✕ Out of Stock'}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#080808] leading-tight">
                {product.name}
              </h1>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 my-4 sm:my-5 pb-4 sm:pb-5 border-b border-[#D8D8D8]">
                <span className="text-2xl sm:text-3xl font-bold text-[#080808] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm sm:text-base text-neutral-400 line-through tabular-nums">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-[10px] sm:text-xs bg-[#080808] text-white px-2 sm:px-2.5 py-0.5 font-bold uppercase tracking-wider">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Fabric & Fit Specification Strip */}
              {(product.fabric || product.fit) && (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 bg-[#F5F5F3] border border-[#D8D8D8] text-xs mb-6">
                  {product.fabric && (
                    <div>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                        Fabric
                      </span>
                      <span className="font-medium text-black text-xs">{product.fabric}</span>
                    </div>
                  )}
                  {product.fit && (
                    <div>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                        Fit Silhouette
                      </span>
                      <span className="font-medium text-black text-xs">{product.fit}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Size Selector */}
              {product.sizes?.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#080808]">
                      Select Size <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs text-neutral-500 font-medium">
                      Selected: <strong className="text-black">{selectedSize || 'None'}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setValidationError('');
                        }}
                        className={`min-w-10 h-10 sm:min-w-11 sm:h-11 px-3 text-xs font-medium uppercase border transition-all ${
                          selectedSize === size
                            ? 'bg-[#080808] text-white border-black ring-1 ring-black'
                            : 'bg-white text-neutral-800 border-[#D8D8D8] hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors?.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#080808]">
                      Color Option
                    </label>
                    <span className="text-xs text-neutral-500 font-medium">{selectedColor}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 sm:px-4 py-2 text-xs font-medium border transition-all ${
                          selectedColor === color
                            ? 'bg-[#080808] text-white border-black'
                            : 'bg-white text-neutral-800 border-[#D8D8D8] hover:border-black'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#080808] mb-2">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-[#D8D8D8] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-lg hover:bg-neutral-100 text-neutral-700"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="w-12 sm:w-14 text-center text-sm font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-lg hover:bg-neutral-100 text-neutral-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Validation Warning */}
              {validationError && (
                <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-5 sm:pt-6 border-t border-[#D8D8D8]">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={!product.inStock}
                onClick={handleAddToCart}
                icon={ShoppingBag}
              >
                {product.inStock ? 'Add to Shopping Bag' : 'Out of Stock'}
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                fullWidth
                onClick={handleWhatsAppOrder}
                icon={MessageCircle}
              >
                Order on WhatsApp Now
              </Button>

              <div className="flex items-center justify-between pt-2 sm:pt-3 text-xs">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-black font-medium"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareLink}
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-black font-medium"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share Item'}</span>
                </button>
              </div>

              {/* Store Assurance Notice */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#D8D8D8] space-y-2 text-[10px] sm:text-[11px] text-neutral-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Doorstep pan-India courier shipping. Fast dispatch.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Authentic HOTIJI OUTFIT'S piece curated by Suraj Thakur.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section: 2 cols on mobile */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-[#D8D8D8]">
            <div className="flex items-end justify-between mb-6 sm:mb-8">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold block mb-1">
                  Complete The Look
                </span>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#080808]">
                  RELATED STYLES
                </h2>
              </div>
              <Link
                to={`/shop?category=${product.category}`}
                className="text-xs font-bold uppercase tracking-wider text-black hover:underline"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products Section */}
        {recentProducts.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-[#D8D8D8]">
            <h2 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-tight text-[#080808] mb-6">
              RECENTLY VIEWED
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {recentProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#080808] text-white border-t border-white/15 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-white tabular-nums">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] text-neutral-400 truncate max-w-[140px]">
            {selectedSize ? `Size: ${selectedSize}` : product.name}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="px-3.5 py-2 bg-white text-black font-semibold text-xs uppercase tracking-wider disabled:opacity-50"
          >
            Add to Bag
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="p-2 bg-[#25D366] text-white rounded-full"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default ProductDetails;
