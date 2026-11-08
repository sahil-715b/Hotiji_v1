import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { openWhatsAppGeneralChat } from '../../utils/whatsapp';

export const AnnouncementBar = () => {
  return (
    <div className="bg-[#080808] text-white border-b border-white/10 text-[10px] sm:text-[11px] tracking-wider uppercase py-1.5 sm:py-2 px-3 sm:px-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Mobile: Centered or clean single-line tagline */}
        <div className="flex-1 sm:flex-initial text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-[#BFC0C2] truncate">
          <span className="font-semibold text-white tracking-[0.18em] whitespace-nowrap">
            {siteConfig.tagline}
          </span>
          <span className="hidden md:inline" aria-hidden="true">·</span>
          <span className="hidden md:inline text-neutral-300 whitespace-nowrap">
            Direct WhatsApp Orders
          </span>
        </div>

        {/* Right side contact links - hidden on ultra-small screens to preserve space */}
        <div className="hidden sm:flex items-center gap-3 sm:gap-4 shrink-0 text-[11px]">
          <a
            href={`tel:${siteConfig.contacts.primaryPhone}`}
            className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#BFC0C2]" />
            <span className="tabular-nums">{siteConfig.contacts.primaryPhoneFormatted}</span>
          </a>
          <button
            onClick={() => openWhatsAppGeneralChat()}
            className="flex items-center gap-1 text-[#25D366] hover:text-[#20ba5a] transition-colors"
          >
            <MessageCircle className="w-3 h-3 fill-current" />
            <span className="hidden lg:inline">Order on WhatsApp</span>
            <span className="lg:hidden">Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
