import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className={`relative z-10 w-full ${maxWidth} bg-white text-[#121212] shadow-2xl transition-all my-4 sm:my-8 border border-[#D8D8D8] overflow-hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#D8D8D8] bg-[#F5F5F3]">
          <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-[#080808]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[#555555] hover:text-[#080808] transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
