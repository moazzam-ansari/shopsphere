import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Gem, Compass } from 'lucide-react';

export default function BrandPhilosophy() {
  const pillars = [
    {
      icon: Crown,
      title: "Refined Architecture",
      description: "Purified proportions, hand-draped silk duchesse, and bespoke materials engineered for eternal runway elegance."
    },
    {
      icon: Sparkles,
      title: "Cinematic Motion",
      description: "Fluid 3D runway showcases, effortless scroll orbits, and tactile digital interactions transporting you straight to Paris."
    },
    {
      icon: Gem,
      title: "Timeless Atelier Craft",
      description: "Master artisans and digital couturiers collaborating to redefine the boundary between high fashion and art."
    },
    {
      icon: Compass,
      title: "Concierge Journey",
      description: "Intimate private client care, bespoke fitting consultations, and white-glove insured global delivery."
    }
  ];

  return (
    <section id="philosophy" className="py-28 px-6 md:px-12 bg-[#faf8f5] relative z-10 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Manifesto Banner */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-amber-50/80 backdrop-blur-md mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#b89628]" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#b89628] font-bold">
              THE MOR • E MANIFESTO
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-zinc-900 tracking-tight leading-tight mb-6"
          >
            "Because luxury is never explained. <br />
            <span className="italic text-gold-gradient font-light">It's experienced.</span>"
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-zinc-600 font-sans text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          >
            Not just a store. A digital runway atelier where every seam, drape, and pixel reflects master craftsmanship.
          </motion.p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card-light p-8 rounded-2xl group relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full border border-[#d4af37]/40 bg-amber-50 flex items-center justify-center mb-6 group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComp className="w-6 h-6 text-[#b89628] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-2xl text-zinc-900 mb-3 group-hover:text-[#b89628] transition-colors font-bold">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-600 text-xs font-sans leading-relaxed tracking-wide">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-[10px] tracking-widest text-stone-500 uppercase font-bold">
                  <span>PILLAR 0{idx + 1}</span>
                  <span className="text-[#b89628]">✦</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
