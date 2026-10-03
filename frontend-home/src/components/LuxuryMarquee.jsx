import React from 'react';
import { Sparkles } from 'lucide-react';

export default function LuxuryMarquee() {
  const statements = [
    "SHOPSPHERE HAUTE COUTURE 2026",
    "MOR • E BESPOKE COLLECTION",
    "100% HEAVY SILK DUCHESSE",
    "HAND-EMBROIDERED 24K GOLD ACCENTS",
    "WHITE-GLOVE WORLDWIDE CONCIERGE",
    "BECAUSE LUXURY IS NEVER EXPLAINED, IT'S EXPERIENCED"
  ];

  return (
    <div className="relative py-5 bg-[#f3f0e8] border-y border-[#d4af37]/30 overflow-hidden select-none z-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...statements, ...statements, ...statements].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 mx-6">
            <span className="text-xs md:text-sm font-sans tracking-[0.4em] font-bold text-zinc-900 uppercase">
              {text}
            </span>
            <Sparkles className="w-4 h-4 text-[#b89628] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
