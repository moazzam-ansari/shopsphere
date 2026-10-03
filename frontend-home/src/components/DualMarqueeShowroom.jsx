import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { formatCurrency } from '../utils/currencyFormatter';

export default function DualMarqueeShowroom({ products = [], onAddToCart, onQuickView, user, onRequireLogin, wishlistItems = [], onToggleWishlist }) {
  const [selectedSizes, setSelectedSizes] = useState({});

  // Divide products into 2 sets for Row 1 (Top Line) & Row 2 (Bottom Line)
  const row1Products = products.slice(0, 6);
  const row2Products = products.slice(2, 8).concat(products.slice(0, 2));

  // Double the arrays so the marquee loops seamlessly without white space gaps
  const marqueeRow1 = [...row1Products, ...row1Products];
  const marqueeRow2 = [...row2Products, ...row2Products];

  const handleHeartClick = (product, e) => {
    e.stopPropagation();
    if (!user) {
      if (onRequireLogin) {
        onRequireLogin(`Sign in to save "${product.name}" to your private wishlist.`);
      }
      return;
    }
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const renderCard = (product, idxKey) => {
    const currentSize = selectedSizes[product.id] || (product.sizes?.[0] || 'M');
    const isLiked = wishlistItems.some(i => i.id === product.id);

    return (
      <motion.div
        key={`${product.id}-${idxKey}`}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 w-60 sm:w-64 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative select-none mx-3"
      >
        {/* Compact Image Area */}
        <div
          className="relative h-60 sm:h-64 bg-stone-100 overflow-hidden cursor-pointer"
          onClick={() => onQuickView(product)}
        >
          {/* Tag */}
          <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 bg-white/90 backdrop-blur-md rounded-full border border-stone-200 text-[8px] uppercase tracking-widest text-zinc-900 font-extrabold">
            {product.tag}
          </span>

          {/* Wishlist Heart */}
          <button
            onClick={(e) => handleHeartClick(product, e)}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 shadow-sm hover:scale-110 transition-transform"
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`} />
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Circular Gold Quick Add Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({ ...product, size: currentSize });
            }}
            className="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-[#b89628] hover:bg-zinc-900 text-white shadow-lg flex items-center justify-center transition-colors group-hover:scale-110"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Card Details & Size Pills */}
        <div className="p-3.5 flex flex-col justify-between flex-grow bg-white text-left">
          <div>
            {/* Size Pills */}
            <div className="flex items-center gap-1 mb-2">
              {product.sizes?.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSizes(prev => ({ ...prev, [product.id]: size }));
                  }}
                  className={`px-2 py-0.5 text-[9px] font-bold rounded border transition-all ${
                    currentSize === size
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-[#b89628]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <h3
              onClick={() => onQuickView(product)}
              className="font-serif text-sm text-zinc-900 font-semibold group-hover:text-[#b89628] transition-colors line-clamp-1 cursor-pointer"
            >
              {product.name}
            </h3>
          </div>

          {/* Price & Rating */}
          <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-bold text-zinc-800">{product.rating}</span>
            </div>

            <span className="font-serif text-base font-bold text-zinc-900">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-[#faf8f4] border-t border-stone-200 overflow-hidden select-none">
      
      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#b89628] font-extrabold block mb-2">
          CONTINUOUS HAUTE SHOWCASE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-zinc-900 tracking-tight font-normal">
          Spotlight Runway <span className="italic text-gold-gradient font-light">& Infinite Marquee</span>
        </h2>
        <p className="text-stone-500 font-sans text-xs mt-2 font-light">
          Hover over any poster to pause & explore sizes or add to bag
        </p>
      </div>

      {/* LINE 1 (TOP ROW): SLIDES CONTINUOUSLY TO THE LEFT */}
      <div className="mb-6 overflow-hidden relative">
        <div className="animate-marquee-left py-2">
          {marqueeRow1.map((product, idx) => renderCard(product, `row1-${idx}`))}
        </div>
      </div>

      {/* LINE 2 (BOTTOM ROW): SLIDES CONTINUOUSLY TO THE RIGHT */}
      <div className="overflow-hidden relative">
        <div className="animate-marquee-right py-2">
          {marqueeRow2.map((product, idx) => renderCard(product, `row2-${idx}`))}
        </div>
      </div>

    </section>
  );
}
