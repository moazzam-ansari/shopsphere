import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 rounded-full border-2 border-stone-300 border-t-[#b89628] animate-spin mb-4" />
      <span className="text-xs uppercase tracking-[0.3em] font-sans text-stone-500 font-bold">
        Loading ShopSphere...
      </span>
    </div>
  );
}
