import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HERO_ITEMS = [
  {
    id: "aura-01",
    title: "Architectural Silk Gown",
    subtitle: "Liquid Gold Couture",
    tag: "LADIES HAUTE COUTURE",
    description: "Sculpted from 100% heavy silk duchesse with 24K gold metallic threading and hand-draped shoulder contours.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
    price: "₹2,85,000",
    numericPrice: 285000,
    category: "Haute Couture"
  },
  {
    id: "aura-02",
    title: "Obsidian Tailored Velvet Blazer",
    subtitle: "Midnight Gentlemen Edition",
    tag: "GENTLEMEN COUTURE",
    description: "Double-breasted Italian velvet blazer with sharp peak lapels and handcrafted 24K gold bullion embroidery.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    price: "₹1,45,000",
    numericPrice: 145000,
    category: "Men's Collection"
  },
  {
    id: "aura-05",
    title: "Royal Emerald Silk Draped Saree",
    subtitle: "Kanjeevaram Gold Weave",
    tag: "INDIAN ATELIER",
    description: "Pure Kanjeevaram woven silk drape with 24K gold zari weave and custom embroidered blouse corset.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    price: "₹1,95,000",
    numericPrice: 195000,
    category: "Haute Couture"
  },
  {
    id: "aura-09",
    title: "Imperial Royal Gold Bandhgala",
    subtitle: "Bespoke Heritage Suit",
    tag: "ROYAL GENTLEMEN",
    description: "Bespoke hand-embroidered silk Bandhgala coat with custom crest gold brass buttons.",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80",
    price: "₹1,80,000",
    numericPrice: 180000,
    category: "Men's Collection"
  },
  {
    id: "aura-03",
    title: "Monolith Gold Minaudière",
    subtitle: "24K Brass Box Clutch",
    tag: "ATELIER ACCESSORY",
    description: "Handcrafted brass box minaudière electroplated in 24K gold with soft Italian nappa leather interior.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
    price: "₹95,000",
    numericPrice: 95000,
    category: "Accessories"
  }
];

export default function HeroRunway({ onAddToCart }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = HERO_ITEMS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_ITEMS.length) % HERO_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_ITEMS.length);
  };

  return (
    <section className="relative min-h-[90vh] bg-[#f9f8f5] flex items-center pt-24 pb-16 px-6 md:px-16 overflow-hidden select-none">
      
      {/* Background Studio Lighting & Subtle Geometry */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#d4af37]/10 rounded-full blur-[100px]" />
        
        {/* Subtle Luxury Vertical Grid Lines */}
        <div className="max-w-7xl mx-auto h-full border-x border-[#d4af37]/15 flex justify-between px-12 opacity-70">
          <div className="w-1/3 h-full border-r border-[#d4af37]/10" />
          <div className="w-1/3 h-full border-r border-[#d4af37]/10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Clean Editorial Typography */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Tag Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-white/80 shadow-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#b89628]" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#b89628] font-bold">
                  {activeItem.tag}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="font-serif text-4xl sm:text-6xl text-zinc-900 tracking-tight leading-[1.15] font-normal">
                  {activeItem.title}
                </h1>
                <p className="font-serif italic text-gold-gradient text-2xl sm:text-4xl font-light mt-2">
                  {activeItem.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-zinc-600 font-sans text-sm sm:text-base font-light max-w-lg leading-relaxed tracking-wide">
                {activeItem.description}
              </p>

              {/* Price Tag & Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => navigate(`/product/${activeItem.id}`)}
                  className="btn-gold px-8 py-4 rounded-full font-sans text-xs font-bold tracking-[0.25em] uppercase flex items-center gap-3 shadow-md"
                >
                  EXPLORE NOW
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onAddToCart && (
                  <button
                    onClick={() => onAddToCart({
                      id: activeItem.id,
                      name: activeItem.title,
                      price: activeItem.numericPrice,
                      formattedPrice: activeItem.price,
                      category: activeItem.category,
                      image: activeItem.image
                    })}
                    className="px-7 py-4 rounded-full border border-stone-300 hover:border-[#b89628] bg-white text-zinc-800 hover:text-[#b89628] transition-all text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#b89628]" />
                    Add to Bag
                  </button>
                )}

                <div className="ml-auto pl-4 border-l border-stone-300">
                  <span className="text-[10px] text-stone-400 block tracking-widest uppercase font-sans">PRICE</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                    {activeItem.price}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls & Slide Progress */}
          <div className="pt-8 border-t border-stone-200 flex items-center justify-between">
            {/* Slide Index Counter */}
            <div className="flex items-baseline gap-2 font-serif text-zinc-900">
              <span className="text-2xl font-bold text-[#b89628]">0{activeIndex + 1}</span>
              <span className="text-stone-400 text-sm">/ 0{HERO_ITEMS.length}</span>
            </div>

            {/* Thumbnail Navigation Dots */}
            <div className="flex items-center gap-2">
              {HERO_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    activeIndex === idx
                      ? 'w-8 h-2 bg-[#b89628]'
                      : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to look ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Chevron Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] text-zinc-800 hover:text-[#b89628] transition-all shadow-sm"
                aria-label="Previous Look"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] text-zinc-800 hover:text-[#b89628] transition-all shadow-sm"
                aria-label="Next Look"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Sleek High-Fashion Image Showcase */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          
          {/* Main Hero Card Container */}
          <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#d4af37]/40 bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover object-center filter contrast-105"
              />
            </AnimatePresence>

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 pointer-events-none" />

            {/* Floating Gold Tag Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between z-10">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#b89628] font-bold block">COUTURE SPOTLIGHT</span>
                <h3 className="font-serif text-base text-zinc-900 font-bold">{activeItem.title}</h3>
              </div>
              <button
                onClick={() => navigate(`/product/${activeItem.id}`)}
                className="p-2.5 rounded-full bg-zinc-900 text-white hover:bg-[#b89628] transition-colors"
                aria-label="View Details"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Secondary Decorative Thumbnail Preview (Bottom Right) */}
          <div className="hidden sm:block absolute -bottom-6 -right-4 w-32 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white shadow-2xl z-20 cursor-pointer hover:scale-105 transition-transform"
            onClick={handleNext}
          >
            <img
              src={HERO_ITEMS[(activeIndex + 1) % HERO_ITEMS.length].image}
              alt="Next Look"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-[9px] font-sans font-bold tracking-widest text-white uppercase bg-black/60 px-2 py-1 rounded">NEXT</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
