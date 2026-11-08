import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { siteConfig } from '../../config/siteConfig';

export const Hero = () => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const imageBoxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.9,
          },
          '-=0.3'
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          '-=0.4'
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          statsRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          '-=0.3'
        )
        .from(
          imageBoxRef.current,
          {
            opacity: 0,
            scale: 0.95,
            duration: 1.1,
            ease: 'power2.out',
          },
          '-=1.0'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#080808] text-white overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 z-10 text-left">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1 bg-white/5 border border-[#BFC0C2]/30 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#BFC0C2]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Suraj Thakur Presents</span>
            </div>

            <h1
              ref={titleRef}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[1.08] text-white"
            >
              DEFINE <br />
              <span className="text-[#BFC0C2] italic font-normal">YOUR STYLE.</span>
            </h1>

            <p
              ref={descRef}
              className="text-neutral-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-light"
            >
              {siteConfig.description}
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2"
            >
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.18em] hover:bg-[#F5F5F3] hover:shadow-2xl transition-all duration-200 active:scale-[0.98]"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop?category=mens-wear"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white border border-[#BFC0C2]/40 font-semibold text-xs uppercase tracking-[0.18em] hover:bg-white hover:text-black transition-all duration-200 active:scale-[0.98]"
              >
                <span>SHOP MEN'S WEAR</span>
              </Link>
            </div>

            {/* Trust highlights strip */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-white/10 text-xs"
            >
              <div>
                <span className="block font-bold text-white uppercase text-[10px] sm:text-[11px] tracking-wider">
                  Signature Fits
                </span>
                <span className="text-neutral-400 text-[9px] sm:text-[10px]">Tailored cuts</span>
              </div>
              <div>
                <span className="block font-bold text-white uppercase text-[10px] sm:text-[11px] tracking-wider">
                  100% Verified
                </span>
                <span className="text-neutral-400 text-[9px] sm:text-[10px]">Egyptian cotton</span>
              </div>
              <div>
                <span className="block font-bold text-white uppercase text-[10px] sm:text-[11px] tracking-wider">
                  WhatsApp Direct
                </span>
                <span className="text-neutral-400 text-[9px] sm:text-[10px]">Instant chat</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Fashion Image */}
          <div ref={imageBoxRef} className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden border border-[#BFC0C2]/30 shadow-2xl bg-neutral-900 group">
              <img
                src="/src/assets/images/hero_mens_fashion_editorial_1794160175615.jpg"
                alt="HOTIJI OUTFIT'S Editorial Menswear"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Inset Badge */}
              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 p-3 sm:p-4 bg-[#080808]/90 backdrop-blur-xs border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] text-[#BFC0C2] uppercase tracking-widest block font-medium">
                    New Season Drop
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-bold uppercase text-white tracking-wider">
                    The Monochromatic Wardrobe
                  </span>
                </div>
                <Link
                  to="/shop?category=premium-collection"
                  className="text-xs text-white uppercase font-semibold underline hover:text-[#BFC0C2] ml-2"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
