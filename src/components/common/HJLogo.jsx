import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Premium HOTIJI OUTFIT'S Brand Logo & HJ Monogram
 * Designed after the iconic black-and-white metallic signboard reference
 */
export const HJMonogram = ({ size = "md", inverted = false, className = "" }) => {
  const sizeClasses = {
    xs: "w-7 h-7 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm",
    lg: "w-12 h-12 sm:w-14 sm:h-14 text-base sm:text-lg",
    xl: "w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center font-serif font-bold uppercase transition-transform duration-200 shrink-0 ${
        sizeClasses[size] || sizeClasses.md
      } ${
        inverted
          ? "bg-white text-black border border-[#D8D8D8]"
          : "bg-[#080808] text-white border border-[#BFC0C2]/40"
      } ${className}`}
      style={{
        boxShadow: inverted
          ? "0 2px 8px rgba(0,0,0,0.06)"
          : "inset 0 0 0 1px rgba(191,192,194,0.25), 0 4px 12px rgba(0,0,0,0.5)",
      }}
    >
      {/* Inner thin silver hairline frame */}
      <span
        className={`absolute inset-[2px] border pointer-events-none ${
          inverted ? "border-black/20" : "border-[#BFC0C2]/40"
        }`}
      />
      <span className="relative z-10 tracking-[0.1em] font-serif font-bold">HJ</span>
    </div>
  );
};

export const HJLogo = ({
  inverted = false,
  showTagline = true,
  stacked = false,
  mobileCompact = false,
  className = "",
}) => {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2 sm:gap-3 transition-opacity duration-200 hover:opacity-90 select-none ${className}`}
    >
      <HJMonogram size={mobileCompact ? "sm" : "md"} inverted={inverted} />
      <div className={`flex flex-col ${stacked ? "items-center text-center" : "text-left"}`}>
        <span
          className={`font-serif text-sm sm:text-base md:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-none whitespace-nowrap ${
            inverted ? "text-[#080808]" : "text-white"
          }`}
        >
          HOTIJI OUTFIT'S
        </span>
        {showTagline && (
          <span
            className={`hidden sm:block text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] font-medium uppercase mt-0.5 sm:mt-1 whitespace-nowrap ${
              inverted ? "text-[#555555]" : "text-[#BFC0C2]"
            }`}
          >
            STYLE FOR EVERY YOU
          </span>
        )}
      </div>
    </Link>
  );
};

export default HJLogo;
