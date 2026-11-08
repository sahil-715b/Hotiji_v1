import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, ShoppingBag } from 'lucide-react';
import { HJMonogram } from '../components/common/HJLogo';

export const NotFound = () => {
  return (
    <div className="bg-[#080808] text-white min-h-[75vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <HJMonogram size="lg" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#BFC0C2] font-semibold block mb-2">
            404 — PAGE NOT FOUND
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            LOST YOUR FIT?
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
            The collection or garment page you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#F5F5F3] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent text-white border border-white/20 font-semibold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
