import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/pricing';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredProducts = normalizedQuery
    ? products.filter((p) => {
        return (
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.code.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery) ||
          p.subCategory.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery) ||
          p.colors.some((c) => c.toLowerCase().includes(normalizedQuery))
        );
      })
    : [];

  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 pb-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-3xl bg-[#080808] text-white border border-[#BFC0C2]/30 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-white/10 flex items-center px-6 py-5">
          <Search className="w-5 h-5 text-[#BFC0C2] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, code (e.g. HT001), category, color..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm md:text-base focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white mr-2"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-[#BFC0C2] hover:text-white border border-white/20 uppercase tracking-wider"
          >
            Esc
          </button>
        </form>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-[#BFC0C2]">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Tuxedo Blazer', 'HT001', 'Selvedge Denim', 'Egyptian Cotton', 'Boys Suit', 'Party Wear'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 text-xs bg-[#1C1C1C] hover:bg-[#2A2A2A] text-neutral-300 hover:text-white border border-white/5 transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-[#BFC0C2]">
                <span>{filteredProducts.length} results found</span>
                <button
                  onClick={handleSearchSubmit}
                  className="flex items-center gap-1 hover:text-white underline uppercase text-[11px]"
                >
                  View all in catalog <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="flex gap-3 p-2.5 bg-[#121212] hover:bg-[#1C1C1C] border border-white/5 hover:border-white/20 cursor-pointer transition-all duration-150 group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-20 object-cover bg-neutral-900 shrink-0"
                    />
                    <div className="flex flex-col justify-between overflow-hidden">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-[#BFC0C2] uppercase">
                          <span>{product.code}</span>
                          <span>·</span>
                          <span className="truncate">{product.category}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#BFC0C2] transition-colors truncate mt-1">
                          {product.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold text-white tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-[10px] text-neutral-500 line-through tabular-nums">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-sm">No products found matching "{query}"</p>
              <p className="text-neutral-500 text-xs mt-1">
                Try searching for "blazer", "shirts", "HT001", or "jeans"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
