import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyFormatter';

export default function SareeHeritageSection({ products = [], onAddToCart, onQuickView }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const sareeProducts = products.filter(p => p.category === "Sarees" || p.tag.includes("SILK") || p.tag.includes("BRIDAL"));

  // Auto-scroll loop every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 25) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-[#2a0b12] text-white select-none border-t border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#f7e7a9] font-extrabold block mb-1">
              HERITAGE SILK & BRIDAL COUTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight font-normal">
              The Bridal Collection <span className="italic text-[#d4af37] font-light">& Kanjeevaram Drapes</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white/10 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 transition-all shadow-sm"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white/10 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 transition-all shadow-sm"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Large Editorial Model Banner */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-2xl min-h-[420px] group flex flex-col justify-end p-8 border border-[#d4af37]/40">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
              alt="The Bridal Collection"
              className="absolute inset-0 w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#f7e7a9] font-extrabold block">
                ROYAL SAREE ATELIER
              </span>
              <h3 className="font-serif text-3xl font-bold leading-tight text-white">
                The Bridal Collection
              </h3>
              <p className="text-xs text-stone-300 font-sans font-light leading-relaxed">
                Hand-woven pure Kanjeevaram and Banarasi silk sarees with 24K gold zari borders.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="btn-gold px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-xl pt-3"
              >
                <span>VIEW THE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Product Cards Grid / Horizontal Slider with Auto-scroll */}
          <div className="lg:col-span-8 overflow-hidden">
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-none h-full items-center"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {sareeProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-64 sm:w-72 bg-white text-zinc-900 border border-stone-200 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group relative"
                >
                  {/* Image */}
                  <div
                    className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer"
                    onClick={() => onQuickView(product)}
                  >
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 bg-white/90 backdrop-blur-md rounded-full border border-stone-200 text-[9px] uppercase tracking-widest text-zinc-900 font-extrabold">
                      {product.tag}
                    </span>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Info Area + Full Gold ADD TO CART Button */}
                  <div className="p-4 flex flex-col justify-between flex-grow bg-white text-left">
                    <div>
                      <h4
                        onClick={() => onQuickView(product)}
                        className="font-serif text-base font-bold text-zinc-900 group-hover:text-[#b89628] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <p className="font-serif text-sm font-bold text-[#b89628] mt-1">
                        {formatCurrency(product.price)}
                      </p>
                    </div>

                    {/* Yellow/Gold "ADD TO CART" Full-Width Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="mt-4 w-full py-2.5 rounded-lg bg-[#d4af37] hover:bg-[#b89628] text-black font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      ADD TO CART
                    </button>
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
