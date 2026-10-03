import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, ArrowRight, Heart } from 'lucide-react';
import PeacockLogo from './PeacockLogo';

export default function LoginModal({ isOpen, onClose, onLogin, reasonMessage = "" }) {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (onLogin) {
        await onLogin(name, email, password);
      }
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      alert("Sign-in failed: " + (err.message || "Please check credentials"));
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#faf8f5] border-2 border-[#d4af37] rounded-3xl shadow-2xl p-8 sm:p-10 z-10 text-zinc-900 select-none"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-[#b89628] text-stone-600 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <PeacockLogo className="w-12 h-12" showText={false} />
            <span className="font-serif text-2xl tracking-[0.2em] font-bold text-zinc-900 uppercase">
              SHOPSPHERE PRIVÉ
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#b89628] font-extrabold">
              CLIENT PRIVÉ SIGN IN
            </span>

            {/* Custom Reason Callout Banner */}
            {reasonMessage ? (
              <div className="mt-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-[#d4af37]/40 text-[#b89628] text-xs font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4 fill-red-500 text-red-500 flex-shrink-0" />
                <span>{reasonMessage}</span>
              </div>
            ) : (
              <p className="text-xs text-stone-500 font-sans font-light">
                Enter your details to sign in & access your private wishlist.
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name Field */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ekta Roy"
                  required
                  className="w-full bg-white border border-stone-300 rounded-full px-4 py-3 pl-10 text-xs text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-[#b89628] shadow-sm font-semibold"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ekta.roy@shopsphere.com"
                  required
                  className="w-full bg-white border border-stone-300 rounded-full px-4 py-3 pl-10 text-xs text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-[#b89628] shadow-sm font-semibold"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white border border-stone-300 rounded-full px-4 py-3 pl-10 text-xs text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-[#b89628] shadow-sm"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-4 rounded-full font-sans font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 shadow-xl mt-6"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
