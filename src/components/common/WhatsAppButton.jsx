import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import gsap from 'gsap';
import { siteConfig } from '../../config/siteConfig';
import { openWhatsAppGeneralChat } from '../../utils/whatsapp';

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    if (btnRef.current) {
      // Gentle floating animation to bring the button alive
      const anim = gsap.to(btnRef.current, {
        y: -4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      return () => anim.kill();
    }
  }, []);

  return (
    <aside
      aria-label="Customer support options"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end"
    >
      {/* Quick contacts popover menu */}
      {isOpen && (
        <div className="mb-3 w-64 sm:w-72 bg-[#080808] text-white border border-[#BFC0C2]/30 shadow-2xl p-4 text-xs animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm tracking-wider">HOTIJI DIRECT</span>
            </div>
            <span className="text-[10px] text-[#BFC0C2] uppercase">Suraj Thakur</span>
          </div>

          <p className="text-neutral-300 text-[11px] leading-relaxed mb-3">
            Have questions about fit, custom styling, or orders? Chat directly with us on WhatsApp.
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                openWhatsAppGeneralChat(siteConfig.contacts.primaryWhatsAppNumber);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Primary WhatsApp</span>
              </div>
              <span className="text-[10px] opacity-80">{siteConfig.contacts.primaryPhone}</span>
            </button>

            <button
              onClick={() => {
                openWhatsAppGeneralChat(siteConfig.contacts.secondaryWhatsAppNumber);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium border border-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#BFC0C2]" />
                <span>Secondary Contact</span>
              </div>
              <span className="text-[10px] text-neutral-400">{siteConfig.contacts.secondaryPhone}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <div ref={btnRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
          aria-label="Open WhatsApp direct chat"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-[#25D366]" />
        </button>
      </div>
    </aside>
  );
};

export default WhatsAppButton;
