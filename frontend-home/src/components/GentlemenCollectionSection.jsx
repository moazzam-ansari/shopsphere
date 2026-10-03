import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyFormatter';

export default function GentlemenCollectionSection({ products = [], onAddToCart, onQuickView }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const gentlemenProducts = products.filter(p => p.gender === "Gentlemen" || p.category === "Men's Collection");

  // Auto-scroll loop every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 25) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-[#f4f1ea] border-t border-stone-200 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#b89628] font-extrabold block mb-1">
              GENTLEMEN'S ATELIER 2026
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-zinc-900 tracking-tight font-normal">
              Royal Men's Collection <span className="italic text-gold-gradient font-light">& Bespoke Suits</span>
            </h2>
          </div>

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

        {/* Split Layout: Left Feature Banner + Right Horizontal Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Feature Editorial Banner */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-xl min-h-[420px] group flex flex-col justify-end p-8 text-white">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
              alt="Gentlemen Edition"
              className="absolute inset-0 w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#f7e7a9] font-extrabold block">
                SPECIAL GENTLEMEN EDIT
              </span>
              <h3 className="font-serif text-3xl font-bold leading-tight">
                Tailored Perfection & Imperial Crests
              </h3>
              <p className="text-xs text-stone-300 font-sans font-light leading-relaxed">
                Handcrafted Italian velvet blazers, Bandhgala suits, silk kurtas, and gold monogram loafers.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="btn-gold px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg pt-3"
              >
                <span>EXPLORE MEN'S EDIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Cards Slider */}
          <div className="lg:col-span-8 overflow-hidden">
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-none h-full items-center"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {gentlemenProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-72 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                >
                  <div
                    className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer"
                    onClick={() => onQuickView(product)}
                  >
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-stone-200 text-[9px] uppercase tracking-widest text-zinc-900 font-bold">
                      {product.tag}
                    </span>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="absolute bottom-4 right-4 z-20 w-11 h-11 rounded-full bg-zinc-900 hover:bg-[#b89628] text-white shadow-xl flex items-center justify-center transition-colors"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow bg-white">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold block mb-1">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-base text-zinc-900 font-semibold group-hover:text-[#b89628] transition-colors line-clamp-1">
                        {product.name}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-zinc-900">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
