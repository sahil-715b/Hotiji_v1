import React from 'react';
import { ProductCard } from './ProductCard';
import { ShoppingBag } from 'lucide-react';

export const ProductGrid = ({ products = [], onQuickView, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <div className="py-12 sm:py-16 px-4 text-center border border-dashed border-[#D8D8D8] bg-[#F5F5F3] my-6">
        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-white border border-[#D8D8D8]">
          <ShoppingBag className="w-6 h-6 text-neutral-400" />
        </div>
        <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-[#080808]">
          No Products Found
        </h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 mb-5 leading-relaxed">
          We couldn't find any clothing matching your current filter selections. Try clearing your filters or searching for different keywords.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-[#080808] text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
