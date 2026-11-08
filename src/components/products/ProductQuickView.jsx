import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle, Heart, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { ProductGallery } from './ProductGallery';
import { Button } from '../common/Button';
import { formatPrice, calculateDiscount } from '../../utils/pricing';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { sendProductInquiryViaWhatsApp } from '../../utils/whatsapp';

export const ProductQuickView = ({ product, isOpen, onClose }) => {
  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');

  // Reset variant selections on product change
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
      setQuantity(1);
      setValidationError('');
    }
  }, [product]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    if (!product.inStock) {
      setValidationError('This product is currently out of stock.');
      return;
    }

    if (product.sizes?.length > 0 && !selectedSize) {
      setValidationError('Please select a size before adding to cart.');
      return;
    }

    setValidationError('');
    const success = addToCart(product, selectedSize, selectedColor, quantity);
    if (success) {
      onClose();
      setIsCartDrawerOpen(true);
    }
  };

  const handleWhatsAppOrder = () => {
    sendProductInquiryViaWhatsApp(product, selectedSize, selectedColor);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.code} maxWidth="max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Product Images */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Product Purchase Module */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Header / Category / Status */}
            <div className="flex items-center justify-between text-xs text-[#888888] uppercase tracking-wider mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-black">{product.code}</span>
                <span>·</span>
                <span>{product.category}</span>
              </div>
              <span className={`font-semibold ${product.inStock ? 'text-emerald-700' : 'text-red-600'}`}>
                {product.inStock ? '● In Stock' : '✕ Out of Stock'}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#080808] leading-tight">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 my-4">
              <span className="text-2xl font-bold text-[#080808] tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-neutral-400 line-through tabular-nums">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs bg-[#080808] text-white px-2 py-0.5 font-bold uppercase tracking-wider">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes?.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#080808]">
                    Select Size <span className="text-red-500">*</span>
                  </label>
                  {selectedSize && (
                    <span className="text-xs text-neutral-500 font-medium">
                      Selected: <strong className="text-black">{selectedSize}</strong>
                    </span>
                  )}
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
                      className={`min-w-10 h-10 px-3 text-xs font-medium uppercase border transition-all ${
                        selectedSize === size
                          ? 'bg-[#080808] text-white border-[#080808]'
                          : 'bg-white text-black border-[#D8D8D8] hover:border-black'
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
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#080808]">
                    Available Color
                  </label>
                  {selectedColor && (
                    <span className="text-xs text-neutral-500 font-medium">{selectedColor}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                        selectedColor === color
                          ? 'bg-[#080808] text-white border-[#080808]'
                          : 'bg-white text-black border-[#D8D8D8] hover:border-black'
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#080808] mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center border border-[#D8D8D8] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-neutral-100"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="w-12 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Validation Message */}
            {validationError && (
              <div className="mb-4 flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-[#D8D8D8]">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!product.inStock}
              onClick={handleAddToCart}
              icon={ShoppingBag}
            >
              {product.inStock ? 'Add to Shopping Bag' : 'Sold Out'}
            </Button>

            <Button
              variant="whatsapp"
              size="md"
              fullWidth
              onClick={handleWhatsAppOrder}
              icon={MessageCircle}
            >
              Order / Inquire on WhatsApp
            </Button>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isFavorited ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
              </button>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="flex items-center gap-1 text-xs font-semibold text-black hover:underline uppercase tracking-wider"
              >
                <span>Full Product Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductQuickView;
