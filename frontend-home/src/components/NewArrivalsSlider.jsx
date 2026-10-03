import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Star } from 'lucide-react';
import { formatCurrency } from '../utils/currencyFormatter';

export default function NewArrivalsSlider({ products = [], onAddToCart, onQuickView }) {
  const scrollRef = useRef(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  const newArrivals = products.slice(0, 6);

  // Auto-scroll loop every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 25) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-[#faf8f4] border-t border-stone-200 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#b89628] font-extrabold block mb-1">
              FRESH FROM THE LOOM
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-zinc-900 tracking-tight font-normal">
              New Arrivals <span className="italic text-gold-gradient font-light">& Trend of the Day</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] text-zinc-800 hover:text-[#b89628] transition-all shadow-sm"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] text-zinc-800 hover:text-[#b89628] transition-all shadow-sm"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Row with Auto-scroll */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newArrivals.map((product) => {
            const currentSize = selectedSizes[product.id] || (product.sizes?.[0] || 'M');
            const isLiked = wishlist[product.id];

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-72 sm:w-80 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
              >
                {/* Image Area */}
                <div
                  className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer"
                  onClick={() => onQuickView(product)}
                >
                  {/* Tag */}
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-stone-200 text-[9px] uppercase tracking-widest text-zinc-900 font-extrabold">
                    {product.tag}
                  </span>

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setWishlist(prev => ({ ...prev, [product.id]: !prev[product.id] }));
                    }}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 shadow-sm hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`} />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Circular Gold Quick Add Button on Image */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart({ ...product, size: currentSize });
                    }}
                    className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full bg-[#b89628] hover:bg-zinc-900 text-white shadow-xl flex items-center justify-center transition-colors group-hover:scale-110"
                    title="Quick Add to Bag"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>

                {/* Card Content & Size Selector Pills */}
                <div className="p-5 flex flex-col justify-between flex-grow bg-white">
                  <div>
                    {/* Size Selector Pills right on Card */}
                    <div className="flex items-center gap-1.5 mb-3">
                      {product.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSizes(prev => ({ ...prev, [product.id]: size }));
                          }}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-md border transition-all ${
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
                      className="font-serif text-base text-zinc-900 font-semibold group-hover:text-[#b89628] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Price & Rating */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-zinc-800">{product.rating}</span>
                    </div>

                    <span className="font-serif text-lg font-bold text-zinc-900">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
