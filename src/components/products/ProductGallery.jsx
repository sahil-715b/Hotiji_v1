import React, { useState } from 'react';

export const ProductGallery = ({ images = [], productName = 'Product' }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const displayImages = images.length > 0 ? images : ['/src/assets/images/category_mens_shirts_1794160176399.jpg'];
  const currentImage = displayImages[selectedImageIndex] || displayImages[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails list */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedImageIndex(idx);
                setImageError(false);
              }}
              className={`relative w-16 h-20 md:w-20 md:h-24 border overflow-hidden shrink-0 transition-all ${
                selectedImageIndex === idx
                  ? 'border-black ring-1 ring-black'
                  : 'border-[#D8D8D8] opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image View */}
      <div className="relative flex-1 aspect-[3/4] bg-[#F5F5F3] border border-[#D8D8D8] overflow-hidden group">
        {!imageError ? (
          <img
            src={currentImage}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-neutral-900 text-white">
            <span className="font-serif text-3xl font-bold tracking-widest text-[#BFC0C2]">HJ</span>
            <span className="text-xs text-neutral-400 mt-2">{productName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
