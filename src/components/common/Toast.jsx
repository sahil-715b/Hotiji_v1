import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Check, X } from 'lucide-react';

export const Toast = () => {
  const { lastActionMessage, setLastActionMessage, setIsCartDrawerOpen } = useCart();

  useEffect(() => {
    if (lastActionMessage) {
      const timer = setTimeout(() => {
        setLastActionMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastActionMessage, setLastActionMessage]);

  if (!lastActionMessage) return null;

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-[#080808] text-white px-5 py-3 border border-[#BFC0C2]/30 shadow-2xl animate-fade-in text-xs tracking-wider"
    >
      <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
        <Check className="w-3 h-3 stroke-[3]" />
      </div>
      <p className="font-medium">{lastActionMessage}</p>
      <button
        onClick={() => {
          setIsCartDrawerOpen(true);
          setLastActionMessage(null);
        }}
        className="ml-2 underline text-[#BFC0C2] hover:text-white uppercase text-[11px] font-semibold"
      >
        View Cart
      </button>
      <button
        onClick={() => setLastActionMessage(null)}
        className="p-1 text-neutral-400 hover:text-white ml-1"
        aria-label="Dismiss toast notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};

export default Toast;
