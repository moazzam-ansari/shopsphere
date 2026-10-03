import React from 'react';
import { ArrowUp, Sparkles, Instagram, Globe, Mail } from 'lucide-react';

export default function Footer({ setCursorState }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-slate-400 py-20 px-6 md:px-12 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-luxury-gold" />
              <span className="font-serif text-2xl tracking-[0.2em] font-bold text-white">
                MAISON <span className="text-luxury-gold font-light">DE LUXE</span>
              </span>
            </div>
            <p className="text-xs font-sans text-slate-400 leading-relaxed tracking-wider">
              A Digital Runway where every detail reflects your brand. Cinematic motion, refined aesthetics, timeless typography.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 tracking-wide">ATELIERS</h4>
            <ul className="space-y-2.5 text-xs font-sans tracking-widest">
              <li><a href="#runway" className="hover:text-luxury-gold transition-colors">PARIS FLAGSHIP</a></li>
              <li><a href="#collection" className="hover:text-luxury-gold transition-colors">MILAN SHOWROOM</a></li>
              <li><a href="#lookbook" className="hover:text-luxury-gold transition-colors">NEW YORK SALON</a></li>
              <li><a href="#philosophy" className="hover:text-luxury-gold transition-colors">TOKYO BOUTIQUE</a></li>
            </ul>
          </div>

          {/* Client Care */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 tracking-wide">CLIENT CARE</h4>
            <ul className="space-y-2.5 text-xs font-sans tracking-widest">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">BESPOKE CONCIERGE</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">WHITE-GLOVE SHIPPING</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">PRIVATE APPOINTMENTS</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">AUTHENTICITY PASS</a></li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 tracking-wide">THE PRIVÉ LIST</h4>
            <p className="text-xs text-slate-400 mb-4 tracking-wider">
              Receive private invitations to global runway shows and limited capsule releases.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed to MAISON PRIVÉ list."); }} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL..."
                  required
                  className="w-full bg-luxury-card/80 border border-white/20 px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-luxury-gold font-sans tracking-wider"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-luxury-gold p-1.5 hover:text-white"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-sans tracking-widest text-slate-500">
          <p>© 2026 MAISON DE LUXE • INSPIRED BY DIGIFOX LUXURY RUNWAY</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-luxury-gold transition-colors flex items-center gap-1">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a href="#" className="hover:text-luxury-gold transition-colors flex items-center gap-1">
              <Globe className="w-4 h-4" /> Vogue Runway
            </a>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setCursorState('TOP', true)}
              onMouseLeave={() => setCursorState('', false)}
              className="p-3 border border-white/10 hover:border-luxury-gold text-slate-300 hover:text-luxury-gold transition-colors ml-4"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
