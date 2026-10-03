import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyFormatter';

export default function WishlistDrawer({ isOpen, onClose, wishlistItems = [], onRemoveFromWishlist, onAddToCart }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#faf8f5] border-l border-[#d4af37]/40 shadow-2xl flex flex-col select-none text-zinc-900"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-amber-50 border border-[#d4af37]/40">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold tracking-tight text-zinc-900">
                    My Wishlist
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89628] font-extrabold block">
                    {wishlistItems.length} SAVED {wishlistItems.length === 1 ? 'ITEM' : 'ITEMS'}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-stone-100 hover:bg-[#b89628] text-stone-600 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <Heart className="w-16 h-16 text-stone-300 mx-auto stroke-1" />
                  <h3 className="font-serif text-2xl text-zinc-800">Your Wishlist is Empty</h3>
                  <p className="text-xs text-stone-500 font-sans max-w-xs mx-auto">
                    Click the heart icon on any runway creation to save it to your private list.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/products');
                    }}
                    className="btn-gold px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-md mt-4"
                  >
                    EXPLORE COLLECTION
                  </button>
                </div>
              ) : (
                wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white border border-stone-200 rounded-2xl shadow-sm hover:border-[#d4af37]/40 transition-all relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-xl border border-stone-100 flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#b89628] font-bold block">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-base text-zinc-900 font-bold line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="font-serif text-sm font-bold text-zinc-900 mt-0.5">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => {
                            onAddToCart(item);
                            onRemoveFromWishlist(item.id);
                          }}
                          className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-[#b89628] text-white font-sans text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Move to Bag
                        </button>

                        <button
                          onClick={() => onRemoveFromWishlist(item.id)}
                          className="p-1.5 rounded-full text-stone-400 hover:text-red-500 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Footer Actions */}
            {wishlistItems.length > 0 && (
              <div className="p-6 bg-white border-t border-stone-200 space-y-3">
                <button
                  onClick={() => {
                    wishlistItems.forEach(item => onAddToCart(item));
                    onClose();
                    navigate('/cart');
                  }}
                  className="w-full btn-gold py-4 rounded-full font-sans font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 shadow-xl"
                >
                  <span>MOVE ALL ITEMS TO BAG</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
