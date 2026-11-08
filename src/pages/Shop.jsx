import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductQuickView } from '../components/products/ProductQuickView';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Parameters
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState(6000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const s = searchParams.get('search');
    if (s !== null) setSearchQuery(s);

    const f = searchParams.get('filter');
    if (f === 'new') setSortBy('newest');
    if (f === 'featured') setSortBy('featured');
  }, [searchParams]);

  // Handle Category Change and update URL
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('');
    setPriceRange(6000);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        if (selectedCategory !== 'all') {
          const inPrimaryCat = product.category === selectedCategory;
          const inAltCats = product.categories?.includes(selectedCategory);
          if (!inPrimaryCat && !inAltCats) return false;
        }

        // Size Filter
        if (selectedSize && !product.sizes?.includes(selectedSize)) {
          return false;
        }

        // Price Filter
        if (product.price > priceRange) {
          return false;
        }

        // Stock Filter
        if (inStockOnly && !product.inStock) {
          return false;
        }

        // Search Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCode = product.code.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchColor = product.colors?.some((c) => c.toLowerCase().includes(q));

          if (!matchName && !matchCode && !matchCat && !matchDesc && !matchColor) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        // Default: featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, selectedSize, priceRange, inStockOnly, searchQuery, sortBy]);

  // Current category metadata
  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="bg-[#F5F5F3] min-h-screen pb-20">
      {/* Top Banner / Header */}
      <div className="bg-[#080808] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#BFC0C2] font-semibold block mb-1">
              HOTIJI OUTFIT'S CATALOG
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white">
              {currentCategoryObj ? currentCategoryObj.name : 'ALL PRODUCTS'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl font-light">
              {currentCategoryObj
                ? currentCategoryObj.description
                : 'Explore our comprehensive selection of luxury men\'s and boys\' apparel.'}
            </p>
          </div>

          {/* Search Bar in Shop */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog or code (e.g. HT001)..."
                className="w-full bg-[#1C1C1C] text-white placeholder-neutral-500 pl-9 pr-8 py-2.5 text-xs border border-white/15 focus:outline-none focus:border-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Filter & Results Strip */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#D8D8D8] lg:hidden">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#D8D8D8] text-xs font-semibold uppercase tracking-wider text-black"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter & Sort</span>
          </button>

          <span className="text-xs text-neutral-600 font-medium tabular-nums">
            {filteredProducts.length} items found
          </span>
        </div>

        {/* Desktop Split View: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column: Filters (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-28">
            <ProductFilters
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              inStockOnly={inStockOnly}
              onToggleInStock={setInStockOnly}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
              totalResultsCount={filteredProducts.length}
            />
          </div>

          {/* Right Column: Products Grid */}
          <div className="lg:col-span-3">
            {/* Active Filters Pill Bar (if any) */}
            {(selectedCategory !== 'all' || selectedSize || searchQuery || inStockOnly || priceRange < 6000) && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white border border-[#D8D8D8] text-xs">
                <span className="text-neutral-500 font-medium text-[11px] uppercase tracking-wider">
                  Active Filters:
                </span>

                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#080808] text-white text-[11px] font-medium">
                    Category: {currentCategoryObj?.name || selectedCategory}
                    <button onClick={() => handleCategoryChange('all')} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedSize && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#080808] text-white text-[11px] font-medium">
                    Size: {selectedSize}
                    <button onClick={() => setSelectedSize('')} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#080808] text-white text-[11px] font-medium">
                    Query: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#080808] text-white text-[11px] font-medium">
                    In Stock Only
                    <button onClick={() => setInStockOnly(false)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {priceRange < 6000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#080808] text-white text-[11px] font-medium">
                    Up to ₹{priceRange}
                    <button onClick={() => setPriceRange(6000)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-neutral-600 hover:text-black underline ml-auto font-medium"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              onQuickView={(p) => setQuickViewProduct(p)}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative z-10 w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D8D8D8] mb-4">
                <h3 className="font-serif text-base font-bold uppercase tracking-wider text-black">
                  Filters & Sorting
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-neutral-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilters
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  handleCategoryChange(cat);
                }}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                inStockOnly={inStockOnly}
                onToggleInStock={setInStockOnly}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onResetFilters={handleResetFilters}
                totalResultsCount={filteredProducts.length}
              />
            </div>

            <div className="pt-4 border-t border-[#D8D8D8]">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-[#080808] text-white text-xs uppercase font-semibold tracking-wider"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Shop;
