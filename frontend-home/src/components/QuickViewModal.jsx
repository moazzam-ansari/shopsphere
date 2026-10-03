import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { formatCurrency } from '../utils/currencyFormatter';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [activeMedia, setActiveMedia] = useState(product.image);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white border border-[#d4af37]/40 shadow-2xl rounded-3xl z-10 overflow-hidden my-auto select-none"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-3 bg-stone-100 hover:bg-[#b89628] text-zinc-800 hover:text-white transition-colors duration-300 rounded-full border border-stone-300"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Live Media Column */}
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden flex items-center justify-center">
              <img
                src={activeMedia}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Tag Badge */}
              <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-stone-300 text-[10px] uppercase tracking-widest text-zinc-900 font-bold">
                {product.tag}
              </span>

              {/* Media Switcher Thumbnails */}
              {product.hoverImage && (
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  <button
                    onClick={() => setActiveMedia(product.image)}
                    className={`w-12 h-14 rounded-lg border overflow-hidden transition-all ${
                      activeMedia === product.image ? 'border-[#b89628] ring-2 ring-[#b89628]' : 'border-stone-300 opacity-70'
                    }`}
                  >
                    <img src={product.image} className="w-full h-full object-cover" alt="Main" />
                  </button>
                  <button
                    onClick={() => setActiveMedia(product.hoverImage)}
                    className={`w-12 h-14 rounded-lg border overflow-hidden transition-all ${
                      activeMedia === product.hoverImage ? 'border-[#b89628] ring-2 ring-[#b89628]' : 'border-stone-300 opacity-70'
                    }`}
                  >
                    <img src={product.hoverImage} className="w-full h-full object-cover" alt="Alternate" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Selection Details Column */}
            <div className="p-8 md:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#b89628]" />
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#b89628] font-bold">
                    {product.category} • RUNWAY SELECT
                  </span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-2">
                  {product.name}
                </h3>

                <p className="font-serif text-2xl text-[#b89628] font-bold mb-5">
                  {formatCurrency(product.price)}
                </p>

                <p className="text-zinc-600 text-xs font-sans leading-relaxed tracking-wider mb-6 font-light">
                  {product.description}
                </p>

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                        SELECT SIZE
                      </label>
                      <span className="text-[10px] tracking-widest text-[#b89628] underline cursor-pointer font-bold">
                        SIZE GUIDE
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2.5 text-xs font-bold font-sans tracking-widest border rounded-xl transition-all duration-300 ${
                            selectedSize === size
                              ? 'border-[#b89628] bg-[#b89628] text-white shadow-md'
                              : 'border-stone-300 text-zinc-700 hover:border-[#b89628]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6 border-t border-stone-200">
                <button
                  onClick={() => {
                    onAddToCart({ ...product, size: selectedSize });
                    onClose();
                  }}
                  className="w-full btn-gold py-4 rounded-full font-sans font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 shadow-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                  ADD TO BAG • {formatCurrency(product.price)}
                </button>

                <div className="flex items-center justify-center gap-6 text-[10px] text-stone-500 tracking-wider pt-2">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#b89628]" />
                    <span>White-Glove Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#b89628]" />
                    <span>Certified Maison Authenticity</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
