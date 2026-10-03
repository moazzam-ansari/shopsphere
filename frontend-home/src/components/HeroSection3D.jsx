import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import HeroRunway from './HeroRunway';
import ErrorBoundary from './ErrorBoundary';

export default function HeroSection3D({ brandName = "AURA" }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen w-full bg-[#f5f3ef] overflow-hidden pt-16">
      
      {/* 3D Canvas Scene Background with ErrorBoundary & Fallback */}
      <ErrorBoundary fallback={<HeroRunway />}>
        <div className="absolute inset-0 z-0">
          <Hero3DCanvas scrollProgress={scrollProgress} />
        </div>
      </ErrorBoundary>

      {/* Subtle Marble Texture Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f5f3ef] via-transparent to-[#f5f3ef]/60 pointer-events-none z-10" />

      {/* Hero UI Text & Call-To-Action Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto min-h-[85vh] flex flex-col items-center justify-between px-6 md:px-12 text-center py-10">
        
        {/* Top Tag & Main Heading */}
        <div className="space-y-4 max-w-3xl pt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4af37]/50 bg-white/80 backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#b89628]" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#b89628] font-bold">
              3D CINEMATIC BOUTIQUE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-zinc-900 tracking-tight leading-tight drop-shadow-sm"
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
            Experience {brandName}'s 3D digital runway with fluid cloth movement, interactive camera orbit, and high fashion craftsmanship.
          </motion.p>
        </div>

        {/* Bottom CTA Button: "Shop Now" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pb-8"
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
