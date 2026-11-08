import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { HJMonogram } from '../common/HJLogo';
import { siteConfig } from '../../config/siteConfig';

export const BrandStatement = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-[#080808] text-white overflow-hidden border-b border-white/10"
    >
      {/* Background Subtle Hairline Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8"
      >
        <div className="flex justify-center">
          <HJMonogram size="lg" />
        </div>

        <div className="space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#BFC0C2] font-semibold">
            The Philosophy of Suraj Thakur
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
            FASHION IS MORE THAN <br />
            <span className="italic font-normal text-[#BFC0C2]">WHAT YOU WEAR.</span>
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <p className="text-neutral-300 text-xs sm:text-sm lg:text-base leading-relaxed font-light px-2">
            "At <strong className="text-white font-medium">HOTIJI OUTFIT'S</strong>, we believe every
            outfit tells a story. Discover styles that match your personality, elevate your confidence
            and make every moment memorable."
          </p>
        </div>

        {/* Founder signature block */}
        <div className="pt-2 sm:pt-4 flex flex-col items-center">
          <span className="font-serif text-base sm:text-lg font-bold tracking-widest uppercase text-white">
            Suraj Thakur
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#BFC0C2] mt-0.5">
            Founder & Creative Director
          </span>
        </div>

        <div className="pt-2 sm:pt-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-[0.18em] hover:bg-[#F5F5F3] transition-all active:scale-[0.98]"
          >
            <span>DISCOVER THE STORE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
