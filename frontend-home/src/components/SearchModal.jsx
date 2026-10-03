import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyFormatter';

const POPULAR_SEARCHES = [
  "Saree",
  "Blazer",
  "Gown",
  "Suit",
  "Kurta",
  "Clutch",
  "Shoes",
  "Loafers",
  "Velvet",
  "Silk"
];

export default function SearchModal({ isOpen, onClose, products = [], onAddToCart, onQuickView }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter products by search term across name, category, tag, description, gender
  const filteredProducts = products.filter((p) => {
    if (!searchTerm.trim()) return false;
    const term = searchTerm.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.tag.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      (p.gender && p.gender.toLowerCase().includes(term))
    );
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <div className="relative min-h-screen pt-16 pb-20 px-6 md:px-12 flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl bg-[#faf8f5] border-2 border-[#d4af37] rounded-3xl shadow-2xl p-6 md:p-10 z-10 text-zinc-900 relative my-auto select-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-stone-100 hover:bg-[#b89628] text-stone-600 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Search Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-amber-50">
                <Sparkles className="w-3.5 h-3.5 text-[#b89628]" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#b89628] font-extrabold">
                  INSTANT ATELIER SEARCH
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900">
                What are you looking for?
              </h2>
            </div>

            {/* Large Search Input */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by product, category (e.g. Saree, Blazer, Shoes, Gown, Kurta)..."
                className="w-full bg-white border-2 border-[#d4af37]/60 rounded-full px-6 py-4 pl-14 pr-12 text-sm md:text-base text-zinc-900 placeholder-stone-400 focus:outline-none focus:border-[#b89628] shadow-lg font-medium"
              />
              <Search className="w-5 h-5 text-[#b89628] absolute left-5 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-zinc-900"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Popular Search Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-2xl mx-auto">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mr-2">POPULAR:</span>
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider border transition-all ${
                    searchTerm.toLowerCase() === tag.toLowerCase()
                      ? 'bg-zinc-900 text-white border-zinc-900 font-bold'
                      : 'bg-white text-zinc-700 border-stone-300 hover:border-[#b89628]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Live Search Results Section */}
            {searchTerm.trim() && (
              <div className="pt-6 border-t border-stone-200">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-sans font-bold tracking-widest text-stone-500 uppercase">
                    SEARCH RESULTS ({filteredProducts.length})
                  </span>
                  {filteredProducts.length > 0 && (
                    <button
                      onClick={() => {
                        onClose();
                        navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
                      }}
                      className="text-xs font-bold text-[#b89628] hover:underline flex items-center gap-1"
                    >
                      <span>View All Results</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 space-y-3">
                    <Search className="w-12 h-12 text-stone-300 mx-auto stroke-1" />
                    <h4 className="font-serif text-xl font-bold text-zinc-800">No matching creations found</h4>
                    <p className="text-xs text-stone-500 font-sans max-w-sm mx-auto">
                      Try searching for keywords like "Saree", "Blazer", "Gown", "Kurta", "Shoes", or "Gold".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto pr-2">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-4 p-3 bg-white border border-stone-200 rounded-2xl shadow-sm hover:border-[#d4af37] transition-all group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-24 object-cover rounded-xl border border-stone-100 flex-shrink-0 cursor-pointer"
                          onClick={() => {
                            onClose();
                            if (onQuickView) onQuickView(product);
                          }}
                        />

                        <div className="flex-1 flex flex-col justify-between text-left">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-[#b89628] font-bold block">
                              {product.category}
                            </span>
                            <h4
                              onClick={() => {
                                onClose();
                                if (onQuickView) onQuickView(product);
                              }}
                              className="font-serif text-sm text-zinc-900 font-bold group-hover:text-[#b89628] transition-colors line-clamp-1 cursor-pointer"
                            >
                              {product.name}
                            </h4>
                            <p className="font-serif text-sm font-bold text-zinc-900 mt-0.5">
                              {formatCurrency(product.price)}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <button
                              onClick={() => {
                                onClose();
                                if (onQuickView) onQuickView(product);
                              }}
                              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-zinc-700"
                              title="Quick View"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                onAddToCart(product);
                              }}
                              className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-[#b89628] text-white font-sans text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 transition-colors shadow-sm"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </motion.div>

        </div>
      </div>
    </AnimatePresence>
  );
}
