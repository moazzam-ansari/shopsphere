import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, ChevronLeft, ChevronRight, SlidersHorizontal, Eye } from 'lucide-react';
import { formatCurrency } from '../utils/currencyFormatter';

const CATEGORIES = [
  "All Collections",
  "Ladies Collection",
  "Men's Collection",
  "Haute Couture",
  "Ready To Wear",
  "Accessories",
  "Footwear"
];

export default function ProductsSection({ products = [], onAddToCart, onQuickView }) {
  const [selectedCategory, setSelectedCategory] = useState("All Collections");
  const [wishlist, setWishlist] = useState({});
  const [sortBy, setSortBy] = useState("default");
  const scrollContainerRef = useRef(null);

  // Toggle wishlist item
  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter products by category or gender
  const filteredProducts = products.filter(p => {
    if (selectedCategory === "All Collections") return true;
    if (selectedCategory === "Ladies Collection") return p.gender === "Ladies";
    if (selectedCategory === "Men's Collection") return p.category === "Men's Collection" || p.gender === "Gentlemen";
    return p.category === selectedCategory;
  });

  // Sort handler
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  // Horizontal Scroll Controls
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-24 px-6 md:px-12 bg-[#fdfbf7] relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-[#b89628] font-bold block mb-2">
              MOR • E CURATED COUTURE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-zinc-900 tracking-tight">
              Spotlight Collections
            </h2>
          </div>

          {/* Right Side: Sort Dropdown & Scroll Arrows */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-stone-300 shadow-sm">
              <SlidersHorizontal className="w-4 h-4 text-[#b89628]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-sans font-semibold tracking-wider text-zinc-800 focus:outline-none cursor-pointer pr-2"
              >
                <option value="default">Sort By: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Left / Right Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-3 rounded-full bg-white border border-stone-300 text-zinc-800 hover:border-[#b89628] hover:text-[#b89628] hover:shadow-md transition-all"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-3 rounded-full bg-white border border-stone-300 text-zinc-800 hover:border-[#b89628] hover:text-[#b89628] hover:shadow-md transition-all"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-none mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-sans tracking-widest uppercase transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-md font-bold'
                  : 'bg-white text-zinc-700 border-stone-300 hover:border-[#b89628] hover:text-[#b89628]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Scrollable Product Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth pb-8 scrollbar-none select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sortedProducts.map((product) => {
            const isLiked = wishlist[product.id];
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-72 sm:w-80 bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
                  
                  {/* Tag Badge */}
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-stone-200 text-[10px] uppercase tracking-widest text-zinc-900 font-bold">
                    {product.tag}
                  </span>

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 shadow-sm hover:scale-110 transition-transform"
                    aria-label="Add to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-600 hover:text-red-500'
                      }`}
                    />
                  </button>

                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Hover "Quick View" & "Add to Cart" Buttons */}
                  <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="p-3 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-xl transition-colors border border-stone-200"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="flex-1 py-3.5 rounded-full bg-zinc-900 hover:bg-[#b89628] text-white font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </button>
                  </div>
                </div>

                {/* Card Info Area */}
                <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium block mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg text-zinc-900 font-semibold group-hover:text-[#b89628] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating & Price */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-sans font-bold text-zinc-800">
                        {product.rating}
                      </span>
                      <span className="text-[10px] text-stone-400 font-sans">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    <span className="font-serif text-xl font-bold text-zinc-900">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
