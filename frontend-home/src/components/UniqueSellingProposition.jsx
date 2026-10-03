import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Gem, ShieldCheck } from 'lucide-react';

export default function UniqueSellingProposition() {
  const propsList = [
    {
      icon: Globe,
      title: "WORLDWIDE SHIPPING",
      description: "Complimentary white-glove express delivery to Paris, Milan, New York, Tokyo, and across 120+ countries."
    },
    {
      icon: Gem,
      title: "PREMIUM QUALITY",
      description: "Hand-curated 100% heavy silk duchesse, fine wool, and 24K gold accents engineered by master artisans."
    },
    {
      icon: ShieldCheck,
      title: "SECURE PAYMENTS",
      description: "Encrypted high-security checkout with private concierge assistance and digital authenticity guarantee."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#f7f5f0] border-t border-stone-200 relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-20 space-y-3"
        >
          <span className="text-xs font-sans tracking-[0.4em] uppercase text-[#b89628] font-bold block">
            THE SHOPSPHERE PROMISE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-zinc-900 tracking-tight">
            Unique Selling Proposition
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans font-light leading-relaxed tracking-wide">
            Our unwavering commitment to timeless craftsmanship, unparalleled elegance, and seamless luxury service.
          </p>
        </motion.div>

        {/* 3 Column Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {propsList.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-8 bg-white border border-stone-200/80 shadow-md hover:shadow-xl hover:border-[#d4af37]/60 transition-all duration-500 rounded-none group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full border border-[#d4af37]/40 bg-gradient-to-b from-[#fbf9f5] to-stone-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#b89628] group-hover:text-white transition-all duration-500 shadow-inner">
                  <IconComponent className="w-8 h-8 text-[#b89628] group-hover:text-white transition-colors duration-500" />
                </div>

                <h3 className="font-serif text-xl tracking-wider text-zinc-900 mb-3 group-hover:text-[#b89628] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-500 font-sans leading-relaxed tracking-wide font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
