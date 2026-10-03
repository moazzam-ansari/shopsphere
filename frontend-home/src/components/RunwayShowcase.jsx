import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const LOOKS = [
  {
    id: 1,
    lookNumber: "LOOK 01 / PARIS",
    title: "The Architectural Silhouette",
    model: "Elena Rostova",
    photographer: "Jean-Luc Vance",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85",
    hotspots: [
      { x: "45%", y: "35%", title: "Silk Draped Corset", price: "$2,100" },
      { x: "55%", y: "70%", title: "High-Waist Tailored Trousers", price: "$1,450" }
    ]
  },
  {
    id: 2,
    lookNumber: "LOOK 02 / MILAN",
    title: "Obsidian & Gold Runway",
    model: "Amina Kouyaté",
    photographer: "Marco Rossi",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
    hotspots: [
      { x: "50%", y: "25%", title: "Gold Threaded Cape", price: "$4,200" },
      { x: "48%", y: "80%", title: "24K Metallic Pumps", price: "$980" }
    ]
  },
  {
    id: 3,
    lookNumber: "LOOK 03 / TOKYO",
    title: "Minimalist Sculpted Drapes",
    model: "Kira Takahashi",
    photographer: "Kenji Sato",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1600&q=85",
    hotspots: [
      { x: "52%", y: "40%", title: "Organza Pleated Gown", price: "$3,800" }
    ]
  }
];

export default function RunwayShowcase({ setCursorState }) {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const look = LOOKS[activeLookIndex];

  const handleNext = () => {
    setActiveHotspot(null);
    setActiveLookIndex((prev) => (prev + 1) % LOOKS.length);
  };

  const handlePrev = () => {
    setActiveHotspot(null);
    setActiveLookIndex((prev) => (prev - 1 + LOOKS.length) % LOOKS.length);
  };

  return (
    <section id="lookbook" className="py-24 bg-luxury-dark border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-luxury-gold" />
              <span className="text-xs font-sans tracking-[0.4em] uppercase text-luxury-gold font-semibold">
                INTERACTIVE LOOKBOOK
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight">
              A Digital Runway <span className="italic text-gold-gradient font-light">Experience</span>
            </h2>
          </div>

          {/* Slide Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-widest text-slate-400 font-sans mr-4">
              0{activeLookIndex + 1} / 0{LOOKS.length}
            </span>
            <button
              onClick={handlePrev}
              onMouseEnter={() => setCursorState('PREV', true)}
              onMouseLeave={() => setCursorState('', false)}
              className="p-4 border border-white/10 hover:border-luxury-gold text-white hover:text-luxury-gold transition-colors duration-300"
              aria-label="Previous Look"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setCursorState('NEXT', true)}
              onMouseLeave={() => setCursorState('', false)}
              className="p-4 border border-white/10 hover:border-luxury-gold text-white hover:text-luxury-gold transition-colors duration-300"
              aria-label="Next Look"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Editorial Spotlight Frame */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black border border-white/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={look.id}
              src={look.image}
              alt={look.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

          {/* Hotspot Markers */}
          {look.hotspots.map((spot, idx) => (
            <div
              key={idx}
              className="absolute z-20"
              style={{ left: spot.x, top: spot.y }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                onMouseEnter={() => setCursorState('DETAIL', true)}
                onMouseLeave={() => setCursorState('', false)}
                className="relative group p-2 flex items-center justify-center"
              >
                <span className="absolute w-8 h-8 rounded-full bg-luxury-gold/30 animate-ping" />
                <span className="relative w-6 h-6 rounded-full bg-luxury-gold text-black flex items-center justify-center font-bold text-xs shadow-lg group-hover:scale-125 transition-transform">
                  <Plus className="w-4 h-4" />
                </span>
              </button>

              {/* Hotspot Card Popup */}
              <AnimatePresence>
                {activeHotspot === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 glass-card p-4 rounded-none z-30 shadow-2xl border border-luxury-gold/40"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold">GARMENT DETAIL</span>
                      <button onClick={() => setActiveHotspot(null)} className="text-slate-400 hover:text-white">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="font-serif text-base text-white font-medium">{spot.title}</h4>
                    <p className="text-xs text-luxury-gold font-bold mt-1">{spot.price}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Look Details Footer */}
          <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs tracking-[0.4em] uppercase text-luxury-gold font-semibold block mb-1">
                {look.lookNumber}
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-white">
                {look.title}
              </h3>
            </div>

            <div className="text-left md:text-right text-xs text-slate-400 font-sans tracking-widest space-y-1">
              <p>MODEL: <span className="text-white">{look.model}</span></p>
              <p>PHOTOGRAPHY: <span className="text-white">{look.photographer}</span></p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
