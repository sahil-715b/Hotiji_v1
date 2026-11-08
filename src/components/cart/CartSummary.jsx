import React from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../../utils/pricing';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../common/Button';

export const CartSummary = ({
  subtotal,
  totalItems,
  onPlaceWhatsAppOrder,
  isPlacingOrder = false,
}) => {
  return (
    <div className="bg-[#F5F5F3] border border-[#D8D8D8] p-5 space-y-4">
      <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#080808] pb-3 border-b border-[#D8D8D8]">
        Order Summary
      </h3>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-neutral-600">
          <span>Total Clothing Items</span>
          <span className="font-semibold text-black tabular-nums">{totalItems}</span>
        </div>

        <div className="flex justify-between text-neutral-600">
          <span>Items Subtotal</span>
          <span className="font-semibold text-black tabular-nums">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-neutral-600 pt-1">
          <span>Delivery / Shipping</span>
          <span className="text-[11px] text-neutral-500 italic text-right max-w-[180px]">
            To be confirmed by store
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-[#D8D8D8] flex items-baseline justify-between">
        <span className="text-xs uppercase font-bold tracking-wider text-black">
          Estimated Order Total
        </span>
        <span className="text-lg font-bold text-[#080808] tabular-nums">
          {formatPrice(subtotal)}
        </span>
      </div>

      {/* WhatsApp Order Action */}
      <div className="pt-2">
        <Button
          variant="whatsapp"
          size="lg"
          fullWidth
          onClick={onPlaceWhatsAppOrder}
          disabled={totalItems === 0 || isPlacingOrder}
          icon={MessageCircle}
        >
          Place Order on WhatsApp
        </Button>
      </div>

      {/* Transparency Note */}
      <div className="p-3 bg-white border border-[#D8D8D8] text-[11px] text-neutral-600 space-y-1.5 leading-relaxed">
        <div className="flex items-center gap-1.5 font-semibold text-black uppercase text-[10px] tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>How WhatsApp Ordering Works</span>
        </div>
        <p>
          1. Clicking above generates your itemized order with product codes and images.
        </p>
        <p>
          2. WhatsApp will open with the prefilled message. Simply hit <strong>Send</strong>.
        </p>
        <p>
          3. Store founder Suraj Thakur will confirm size fit, stock, and doorstep delivery.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
