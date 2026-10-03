import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import PeacockLogo from './PeacockLogo';

export default function FooterSection({ brandName = "SHOPSPHERE" }) {
  const [email, setEmail] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!consentChecked) {
      alert("Please check the consent box to subscribe.");
      return;
    }
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#f3f0e8] text-zinc-800 py-20 px-6 md:px-12 border-t border-[#d4af37]/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-stone-300">
          
          {/* Column 1: About Us */}
          <div className="space-y-5">
            <PeacockLogo className="w-9 h-9" showText={true} textColor="text-zinc-900" />
            
            <h4 className="text-xs uppercase tracking-[0.3em] text-[#b89628] font-bold pt-2">
              About Us
            </h4>
            <p className="text-xs font-sans text-zinc-600 leading-relaxed tracking-wide font-light max-w-sm">
              {brandName} is a high-end luxury fashion atelier dedicated to digital runway couture, architectural silk drapes, and timeless craftsmanship. Designed for the modern connoisseur of fine style.
            </p>
          </div>

          {/* Column 2: Follow Us */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[#b89628] font-bold">
              Follow Us
            </h4>
            <p className="text-xs text-zinc-600 font-sans tracking-wide">
              Connect with us across our official social channels for runway launches and backstage previews.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] hover:bg-[#b89628] text-zinc-700 hover:text-white transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] hover:bg-[#b89628] text-zinc-700 hover:text-white transition-all shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] hover:bg-[#b89628] text-zinc-700 hover:text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white border border-stone-300 hover:border-[#b89628] hover:bg-[#b89628] text-zinc-700 hover:text-white transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-[#b89628] font-bold">
              Newsletter
            </h4>
            <p className="text-xs text-zinc-600 font-sans tracking-wide">
              Subscribe to receive private invitations to new collection premieres and VIP trunk shows.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#b89628]/15 border border-[#b89628] text-[#b89628] text-xs font-bold font-sans">
                ✓ Thank you for subscribing to {brandName} Privé.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white border border-stone-300 rounded-full px-5 py-3 text-xs text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-[#b89628] font-sans tracking-wider shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-[#b89628] text-white hover:bg-zinc-900 font-sans text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-start gap-2 text-[11px] text-zinc-600 font-sans cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-[#b89628] focus:ring-0 cursor-pointer"
                  />
                  <span>I agree to receive communications and accept the privacy policy.</span>
                </label>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans tracking-widest text-stone-500 gap-4">
          <p>© 2026 {brandName} LUXURY ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 text-[11px] font-semibold">
            <a href="#" className="hover:text-[#b89628] transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-[#b89628] transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-[#b89628] transition-colors">BESPOKE CONCIERGE</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
