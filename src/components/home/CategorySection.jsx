import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { categories } from '../../data/categories';

export const CategorySection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current.length > 0) {
        gsap.from(cardsRef.current, {
          opacity: 0,
          y: 40,
          stagger: 0.08,
          duration: 0.8,
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
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pb-4 border-b border-[#D8D8D8]">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#888888] font-bold block mb-1">
              Curated Wardrobe
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#080808]">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#080808] hover:text-neutral-600 group self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 8 Categories Responsive Grid: 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              ref={(el) => (cardsRef.current[index] = el)}
              to={`/shop?category=${category.id}`}
              className="group relative flex flex-col bg-[#F5F5F3] border border-[#D8D8D8] overflow-hidden hover:border-black hover:shadow-lg transition-all duration-300"
            >
              {/* Category Image Box */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors" />

                <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 text-white">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#BFC0C2] font-semibold block mb-0.5">
                    {category.itemCount} Styles
                  </span>
                  <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider leading-tight">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Text Footer Bar */}
              <div className="p-2 sm:p-3 bg-white flex items-center justify-between text-xs border-t border-[#D8D8D8]">
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-800">
                  Explore
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
