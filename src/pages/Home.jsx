import React, { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { BrandStatement } from '../components/home/BrandStatement';
import { NewArrivals } from '../components/home/NewArrivals';
import { ProductQuickView } from '../components/products/ProductQuickView';

export const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="w-full">
      <Hero />
      <CategorySection />
      <FeaturedProducts onQuickView={(product) => setQuickViewProduct(product)} />
      <BrandStatement />
      <NewArrivals onQuickView={(product) => setQuickViewProduct(product)} />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Home;
