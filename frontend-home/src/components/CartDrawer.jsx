import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, setCursorState }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-luxury-dark border-l border-luxury-gold/30 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-luxury-gold" />
                <h3 className="font-serif text-xl tracking-wide text-white">YOUR SHOPPING BAG</h3>
                <span className="text-xs font-sans text-luxury-gold font-bold">({cartItems.length})</span>
              </div>

              <button
                onClick={onClose}
                onMouseEnter={() => setCursorState('CLOSE', true)}
                onMouseLeave={() => setCursorState('', false)}
                className="p-2 text-slate-400 hover:text-white"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-luxury-card/60 px-6 py-4 border-b border-white/10">
              <div className="flex justify-between text-[11px] font-sans tracking-wider uppercase mb-2">
                <span className="text-slate-300">
                  {subtotal >= freeShippingThreshold
                    ? '✦ COMPLIMENTARY WHITE-GLOVE EXPRESS SHIPPING UNLOCKED'
                    : `ADD $${(freeShippingThreshold - subtotal).toLocaleString()} FOR FREE EXPRESS SHIPPING`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-luxury-gold"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-20">
                  <Sparkles className="w-12 h-12 text-luxury-gold/40 mx-auto mb-4" />
                  <p className="font-serif text-2xl text-slate-300 mb-2">Your Bag is Empty</p>
                  <p className="text-xs text-slate-500 font-sans tracking-wider mb-6">
                    Explore the Runway Collection to add luxury pieces.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black font-sans text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    Explore Runway
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 p-3 bg-black/40 border border-white/5 relative group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover border border-white/10"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-base text-white">{item.name}</h4>
                        <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                          Size: {item.size || 'M'} • {item.color || 'Standard'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-serif text-base text-luxury-gold font-semibold">
                          ${(item.price * (item.quantity || 1)).toLocaleString()}
                        </span>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-white/20">
                            <button
                              onClick={() => onUpdateQuantity(index, (item.quantity || 1) - 1)}
                              className="px-2 py-0.5 text-slate-300 hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs text-white font-bold">{item.quantity || 1}</span>
                            <button
                              onClick={() => onUpdateQuantity(index, (item.quantity || 1) + 1)}
                              className="px-2 py-0.5 text-slate-300 hover:text-white"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
                <div className="space-y-2 text-xs font-sans tracking-wider">
                  <div className="flex justify-between text-slate-400">
                    <span>SUBTOTAL</span>
                    <span className="text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>EXPRESS SHIPPING</span>
                    <span className="text-luxury-gold">
                      {subtotal >= freeShippingThreshold ? 'COMPLIMENTARY' : '$150'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                    <span>TOTAL</span>
                    <span className="text-luxury-gold">
                      ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 150)).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Simulating Maison de Luxe White-Glove Checkout...")}
                  onMouseEnter={() => setCursorState('CHECKOUT', true)}
                  onMouseLeave={() => setCursorState('', false)}
                  className="w-full py-4 bg-luxury-gold text-black hover:bg-white transition-colors duration-300 font-sans font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 shadow-xl"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>256-Bit Encrypted Luxury Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
