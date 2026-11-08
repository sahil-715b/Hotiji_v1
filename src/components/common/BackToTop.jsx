import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-40 p-3 bg-[#080808] text-white hover:bg-white hover:text-black border border-[#BFC0C2]/30 shadow-xl transition-all duration-200 focus:outline-none"
      aria-label="Scroll back to top of page"
      title="Back to Top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default BackToTop;
