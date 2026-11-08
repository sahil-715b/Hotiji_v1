import React from 'react';
import { RotateCcw, Filter, Check } from 'lucide-react';
import { categories } from '../../data/categories';

export const ProductFilters = ({
  selectedCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  priceRange,
  onPriceChange,
  inStockOnly,
  onToggleInStock,
  sortBy,
  onSortChange,
  onResetFilters,
  totalResultsCount,
}) => {
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38', '4-5Y', '6-7Y', '8-9Y', '10-12Y'];

  const categoryOptions = [
    { id: 'all', name: 'All Products' },
    ...categories.map((c) => ({ id: c.id, name: c.name })),
  ];

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSize !== '' ||
    priceRange < 6000 ||
    inStockOnly;

  return (
    <div className="bg-white border border-[#D8D8D8] p-5 space-y-6">
      {/* Filter Header & Clear Action */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D8D8D8]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-black" />
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-black">
            Filters
          </h3>
          <span className="text-xs text-neutral-500 tabular-nums">({totalResultsCount} items)</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-semibold text-neutral-600 hover:text-black uppercase tracking-wider"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Sort By Dropdown */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full text-xs p-2.5 bg-[#F5F5F3] border border-[#D8D8D8] text-black focus:outline-none focus:border-black cursor-pointer font-medium"
        >
          <option value="featured">Featured Collection</option>
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2.5">
          Categories
        </label>
        <div className="space-y-1">
          {categoryOptions.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between py-1.5 px-2 text-xs transition-colors text-left ${
                  isSelected
                    ? 'bg-[#080808] text-white font-semibold'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2.5">
          Size
        </label>
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => onSelectSize(isSelected ? '' : size)}
                className={`min-w-8 h-8 px-2 text-[11px] font-medium border uppercase transition-all ${
                  isSelected
                    ? 'bg-[#080808] text-white border-black'
                    : 'bg-white text-neutral-700 border-[#D8D8D8] hover:border-black'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
        {selectedSize && (
          <button
            onClick={() => onSelectSize('')}
            className="text-[10px] text-neutral-500 hover:text-black underline mt-2 block"
          >
            Clear size filter ({selectedSize})
          </button>
        )}
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-black mb-2">
          <span>Max Price</span>
          <span className="tabular-nums">₹{priceRange.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="800"
          max="6000"
          step="200"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
          <span>₹800</span>
          <span>₹6,000+</span>
        </div>
      </div>

      {/* Availability Filter */}
      <div className="pt-2 border-t border-[#D8D8D8]">
        <label className="flex items-center gap-2.5 text-xs text-neutral-800 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="w-4 h-4 accent-black rounded-none cursor-pointer"
          />
          <span className="font-medium">In Stock Items Only</span>
        </label>
      </div>
    </div>
  );
};

export default ProductFilters;
