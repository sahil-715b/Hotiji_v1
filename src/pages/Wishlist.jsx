import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { ProductQuickView } from '../components/products/ProductQuickView';

export const Wishlist = () => {
  const { wishlistIds } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="bg-[#F5F5F3] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#D8D8D8]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#888888] font-bold block mb-1">
              Personal Curation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#080808]">
              SAVED WISHLIST ({savedProducts.length})
            </h1>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-black hover:underline"
          >
            Browse More Styles
          </Link>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white border border-[#D8D8D8] py-20 px-6 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F5F3] border border-[#D8D8D8] flex items-center justify-center">
              <Heart className="w-8 h-8 text-neutral-400" />
            </div>
            <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-[#080808] mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed mb-6">
              Save your favorite blazers, denim, shirts, and festive outfits to review and order later.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#080808] text-white text-xs uppercase font-semibold tracking-wider hover:bg-neutral-800 transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
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

export default Wishlist;
