import React from 'react';

export default function PeacockLogo({ className = "w-10 h-10", showText = true, textColor = "text-zinc-900" }) {
  return (
    <div className="flex items-center gap-3.5 group select-none cursor-pointer">
      {/* Crystal-Clear Gold "M E" Monogram Emblem */}
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)] group-hover:scale-105 transition-transform duration-300"
        >
          <defs>
            <linearGradient id="goldPure" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="80%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="goldReflect" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Clean Outer Royal Gold Ring */}
          <circle cx="50" cy="50" r="46" stroke="url(#goldPure)" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="41" stroke="url(#goldPure)" strokeWidth="1" strokeDasharray="4 3" opacity="0.75" />

          {/* Peacock Crown Plumes ("Mor" Crest at Top) */}
          <circle cx="50" cy="14" r="2.5" fill="url(#goldPure)" />
          <line x1="50" y1="16.5" x2="50" y2="24" stroke="url(#goldPure)" strokeWidth="1.5" strokeLinecap="round" />
          
          <circle cx="43" cy="17" r="2" fill="url(#goldPure)" />
          <line x1="43" y1="19" x2="48" y2="25" stroke="url(#goldPure)" strokeWidth="1.2" strokeLinecap="round" />

          <circle cx="57" cy="17" r="2" fill="url(#goldPure)" />
          <line x1="57" y1="19" x2="52" y2="25" stroke="url(#goldPure)" strokeWidth="1.2" strokeLinecap="round" />

          {/* CRYSTAL CLEAR "M" LETTER */}
          <path
            d="M 24 36 H 34 L 43 62 L 52 36 H 60 V 68 H 53 V 44 L 45 68 H 41 L 32 44 V 68 H 24 Z"
            fill="url(#goldPure)"
          />

          {/* CRYSTAL CLEAR INTERLOCKED "E" LETTER */}
          <path
            d="M 54 36 H 76 V 43 H 62 V 49 H 73 V 55 H 62 V 62 H 76 V 68 H 54 Z"
            fill="url(#goldReflect)"
          />

          {/* Peacock Feather Curve Underline */}
          <path
            d="M 25 76 C 40 83, 60 83, 75 76"
            stroke="url(#goldPure)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="80.5" r="1.8" fill="url(#goldPure)" />

        </svg>
      </div>

      {/* Brand Text: SHOPSPHERE */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-2xl md:text-3xl tracking-[0.22em] font-bold leading-none ${textColor} group-hover:text-[#b89628] transition-colors duration-300`}>
            SHOPSPHERE
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#b89628] font-extrabold">
              MOR • E LUXURY ATELIER
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
