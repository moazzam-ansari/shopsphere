import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Heart } from 'lucide-react';
import { formatCurrency } from '../utils/currencyFormatter';

export default function WomenCoutureSection({ products = [], onAddToCart, onQuickView }) {
  const womenProducts = products.filter(p => p.gender === "Ladies" || p.category === "Haute Couture");
  const [activeIndex, setActiveIndex] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  // Auto 3D arc rotation every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % womenProducts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, womenProducts.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + womenProducts.length) % womenProducts.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % womenProducts.length);
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-[#fdfbf7] border-t border-stone-200 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#b89628] font-extrabold block mb-2">
            THE HERITAGE SIGNATURES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-zinc-900 tracking-tight">
            Woven to Be <span className="italic text-gold-gradient font-light">Remembered</span>
          </h2>
        </div>

        {/* Curved 3D Arc Card Slider Row with Auto-rotation */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative h-[440px] sm:h-[480px] flex items-center justify-center perspective-1200 mb-8"
        >
          {womenProducts.map((item, idx) => {
            let offset = idx - activeIndex;
            if (offset > Math.floor(womenProducts.length / 2)) {
              offset -= womenProducts.length;
            } else if (offset < -Math.floor(womenProducts.length / 2)) {
              offset += womenProducts.length;
            }

            const isActive = offset === 0;
            const angle = (offset * (2 * Math.PI)) / womenProducts.length;
            const xPos = Math.sin(angle) * 230;
            const zPos = Math.cos(angle) * 190;
            const rotationY = offset * -18;
            const scale = isActive ? 1.08 : 0.84 - Math.abs(offset) * 0.12;
            const opacity = Math.max(0.4, 1 - Math.abs(offset) * 0.28);
            const isLiked = wishlist[item.id];

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (isActive) onQuickView(item);
                  else setActiveIndex(idx);
                }}
                animate={{
                  x: xPos,
                  z: zPos,
                  rotateY: rotationY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{ type: 'spring', damping: 22, stiffness: 140 }}
                className={`absolute cursor-pointer rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col bg-white ${
                  isActive
                    ? 'z-30 border-2 border-[#d4af37] shadow-[0_20px_50px_rgba(212,175,55,0.35)] ring-4 ring-[#d4af37]/20'
                    : 'z-10 border border-stone-300 hover:opacity-100'
                }`}
                style={{
                  width: isActive ? '280px' : '230px',
                  height: isActive ? '390px' : '320px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 bg-white/90 backdrop-blur-md rounded-full border border-stone-200 text-[9px] uppercase tracking-widest text-zinc-900 font-bold">
                    {item.tag}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setWishlist(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                    }}
                    className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 shadow-sm"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`} />
                  </button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover filter contrast-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 text-white text-left z-10">
                    <h3 className="font-serif text-base font-bold line-clamp-1">{item.name}</h3>
                    <span className="font-serif text-sm font-bold text-[#f7e7a9]">{formatCurrency(item.price)}</span>
                  </div>
                </div>

                {isActive && (
                  <div className="p-3 bg-zinc-900 flex items-center justify-between z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(item);
                      }}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> Quick View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                      className="px-4 py-2 rounded-full bg-[#b89628] hover:bg-white text-white hover:text-black text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Orbit Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] text-zinc-800 hover:text-[#b89628] transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-sans font-bold tracking-widest text-stone-500 uppercase">
            AUTOMATIC ROTATION ACTIVE
          </span>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] text-zinc-800 hover:text-[#b89628] transition-all shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
