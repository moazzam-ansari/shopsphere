import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Gem, ShieldCheck, Clock } from 'lucide-react';

export default function UspSection() {
  const features = [
    {
      icon: Globe,
      title: "Worldwide Express Concierge",
      description: "White-glove insured courier delivery to Paris, Milan, New York, Tokyo, and 120+ countries."
    },
    {
      icon: Gem,
      title: "Master Haute Quality",
      description: "100% heavy silk duchesse, fine wool, and 24K gold accents engineered by master artisans."
    },
    {
      icon: ShieldCheck,
      title: "Encrypted VIP Security",
      description: "256-bit encrypted checkout with private concierge assistance and digital authenticity certificate."
    },
    {
      icon: Clock,
      title: "Bespoke Fitting Care",
      description: "Complimentary virtual styling consultations and custom tailored fit guarantee."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-[#f6f4ee] border-t border-[#d4af37]/25 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const IconComp = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card-light p-8 rounded-2xl flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full border border-[#d4af37]/40 bg-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-300 shadow-sm">
                  <IconComp className="w-7 h-7 text-[#b89628] group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="font-serif text-xl tracking-wide text-zinc-900 mb-3 font-bold group-hover:text-[#b89628] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs text-zinc-600 font-sans leading-relaxed tracking-wide font-light">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
