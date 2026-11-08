import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { products } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const NewArrivals = ({ onQuickView }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current.length > 0) {
        gsap.from(cardsRef.current, {
          opacity: 0,
          y: 35,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-24 bg-white text-[#080808] border-b border-[#D8D8D8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pb-4 border-b border-[#D8D8D8]">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#888888] font-bold block mb-1">
              Fresh Off The Rack
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#080808]">
              NEW ARRIVALS
            </h2>
          </div>

          <Link
            to="/shop?filter=new"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#080808] hover:text-neutral-600 group self-start sm:self-auto"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {newProducts.map((product, index) => (
            <div key={product.id} ref={(el) => (cardsRef.current[index] = el)}>
              <ProductCard
                product={product}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
