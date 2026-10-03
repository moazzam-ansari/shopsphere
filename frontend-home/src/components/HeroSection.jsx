import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection({ brandName = "AURA" }) {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-stone-100 flex items-center justify-center pt-20">
      
      {/* Background 3D Luxury Marble Room Backdrop */}
      <div className="absolute inset-0 bg-marble-light z-0">
        
        {/* Gold Arch Walls & Architectural Columns */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full border-x border-stone-300/60 bg-gradient-to-b from-stone-200/40 via-stone-100/60 to-stone-200/40 flex justify-between px-12 pointer-events-none">
          <div className="w-1/3 h-full border-r border-[#d4af37]/25 bg-[#d4af37]/5" />
          <div className="w-1/3 h-full border-x border-[#d4af37]/35 bg-[#d4af37]/10" />
          <div className="w-1/3 h-full border-l border-[#d4af37]/25 bg-[#d4af37]/5" />
        </div>

        {/* Side Clothing Racks (Left & Right) */}
        <div className="absolute left-6 md:left-16 top-1/4 w-36 sm:w-48 h-2/3 border-r-2 border-stone-400/50 flex flex-col justify-around py-8 opacity-75 pointer-events-none hidden sm:flex">
          <div className="w-full h-40 bg-contain bg-no-repeat bg-left opacity-80" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=400&q=80')` }} />
          <div className="w-full h-40 bg-contain bg-no-repeat bg-left opacity-80" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80')` }} />
        </div>
        <div className="absolute right-6 md:right-16 top-1/4 w-36 sm:w-48 h-2/3 border-l-2 border-stone-400/50 flex flex-col justify-around py-8 opacity-75 pointer-events-none hidden sm:flex">
          <div className="w-full h-40 bg-contain bg-no-repeat bg-right opacity-80" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80')` }} />
          <div className="w-full h-40 bg-contain bg-no-repeat bg-right opacity-80" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&q=80')` }} />
        </div>

        {/* Center Round Podium/Platform */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] md:w-[640px] h-32 md:h-44 rounded-full border-4 border-[#d4af37]/70 bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400 shadow-2xl flex items-center justify-center pointer-events-none">
          <div className="w-[82%] h-[75%] rounded-full border-2 border-[#d4af37]/80 bg-gradient-to-b from-white/90 to-stone-200/90 shadow-inner flex items-center justify-center">
            <div className="w-[60%] h-[60%] rounded-full border border-[#d4af37]/50 bg-stone-100/50 shadow-md" />
          </div>
        </div>

      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-[84vh] flex flex-col items-center justify-between px-6 md:px-12 text-center">
        
        {/* Top Tag & Main Heading */}
        <div className="space-y-4 pt-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/50 bg-white/80 backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b89628]" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#b89628] font-bold">
              HAUTE COUTURE 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-zinc-900 tracking-tight leading-tight"
          >
            Elevating Cultural Couture <br />
            <span className="italic text-stone-500 font-light text-3xl sm:text-5xl md:text-6xl">
              & Timeless Elegance
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xs sm:text-sm text-stone-600 font-sans font-light max-w-xl mx-auto leading-relaxed tracking-wide"
          >
            Discover {brandName}'s digital runway where every garment floats with liquid grace, engineered for modern luxury connoisseurs.
          </motion.p>
        </div>

        {/* Floating 3D Clothes Centerpiece (Silk Dress & Blazer floating in mid-air over Podium) */}
        <div className="relative w-full max-w-3xl h-[360px] sm:h-[420px] flex items-center justify-center my-4">
          
          {/* Floating Silk Dress (Center Left) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [0, -16, 0], opacity: 1 }}
            transition={{
              y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              opacity: { duration: 1 }
            }}
            className="absolute left-[12%] sm:left-[22%] top-[5%] w-44 sm:w-60 md:w-72 h-[340px] md:h-[400px] z-20"
          >
            <img
              src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
              alt="Floating Silk Dress"
              className="w-full h-full object-cover rounded-t-full shadow-2xl filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.25)] border-2 border-white/50"
            />
            {/* Ground Shadow Glow */}
            <div className="w-3/4 h-5 bg-black/20 rounded-full blur-md mx-auto mt-2 animate-pulse-glow" />
          </motion.div>

          {/* Floating Structured Blazer (Center Right) */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, 14, 0], opacity: 1 }}
            transition={{
              y: { repeat: Infinity, duration: 7, ease: "easeInOut" },
              opacity: { duration: 1, delay: 0.2 }
            }}
            className="absolute right-[10%] sm:right-[20%] top-[12%] w-40 sm:w-52 md:w-64 h-[300px] md:h-[360px] z-20"
          >
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
              alt="Floating Tailored Blazer"
              className="w-full h-full object-cover rounded-t-full shadow-2xl filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.25)] border-2 border-white/50"
            />
          </motion.div>

          {/* Floating Gold Bag */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute right-[35%] bottom-[12%] w-24 sm:w-32 h-28 sm:h-36 z-30"
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80"
              alt="Floating Handbag"
              className="w-full h-full object-cover rounded-lg shadow-xl border border-white/60"
            />
          </motion.div>

        </div>

        {/* CTA Button: "Shop Now" / "Explore Now" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pb-6"
        >
          <a
            href="#products"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-zinc-900 text-stone-100 hover:bg-[#b89628] hover:text-black font-sans text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
