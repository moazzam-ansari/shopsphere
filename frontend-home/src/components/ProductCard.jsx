import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyFormatter';

export default function ProductCard({ product, onAddToCart, onQuickView, user, onRequireLogin }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (!user) {
      if (onRequireLogin) {
        onRequireLogin(`Sign in to save "${product.name}" to your private wishlist.`);
      }
      return;
    }
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass-card-light rounded-2xl overflow-hidden flex flex-col group relative select-none"
    >
      {/* Product Image Area */}
      <div
        className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Tag Badge */}
        {product.tag && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-stone-200 text-[10px] uppercase tracking-widest text-zinc-900 font-bold">
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleHeartClick}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 shadow-sm hover:scale-110 transition-transform"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-600 hover:text-red-500'
            }`}
          />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center filter brightness-100 group-hover:scale-105 transition-all duration-700"
        />

        {/* Hover Actions */}
        <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-3 rounded-full bg-white/90 hover:bg-white text-zinc-900 transition-colors shadow-xl border border-stone-200"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product);
            }}
            className="flex-1 btn-gold py-3 rounded-full font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl text-white"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-5 flex flex-col justify-between flex-grow bg-white border-t border-stone-100">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89628] font-bold block mb-1">
            {product.category}
          </span>
          <h3
            onClick={() => navigate(`/product/${product.id}`)}
            className="font-serif text-lg text-zinc-900 font-semibold group-hover:text-[#b89628] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-xs font-sans font-bold text-zinc-800">
              {product.rating || 4.9}
            </span>
          </div>

          <span className="font-serif text-xl font-bold text-zinc-900">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
