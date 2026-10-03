import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShoppingBag, Heart, Sparkles } from 'lucide-react';

export const PRODUCTS = [
  {
    id: 1,
    name: "AURA Architectural Silk Gown",
    category: "HAUTE COUTURE",
    price: 3450,
    formattedPrice: "$3,450",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    tag: "NEW SEASON",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir Black", "Champagne Gold"],
    description: "Sculpted from 100% heavy silk duchesse with hand-draped sculptural shoulder contours. Designed for black-tie galas and runway premieres."
  },
  {
    id: 2,
    name: "Obsidian Structured Blazer",
    category: "READY TO WEAR",
    price: 1890,
    formattedPrice: "$1,890",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    tag: "RUNWAY EXCLUSIVE",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Midnight Obsidian", "Bone White"],
    description: "Double-breasted wool blazer with sharp exaggerated lapels and subtle metallic gold thread stitch work."
  },
  {
    id: 3,
    name: "Monolith Gold Minaudière",
    category: "ACCESSORIES",
    price: 1250,
    formattedPrice: "$1,250",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    tag: "BESTSELLER",
    sizes: ["One Size"],
    colors: ["24K Gold Plated"],
    description: "Handcrafted brass box clutch plated in 24K gold with soft nappa leather interior lining."
  },
  {
    id: 4,
    name: "Velvet Trench Coat & Belt",
    category: "READY TO WEAR",
    price: 2780,
    formattedPrice: "$2,780",
    image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    tag: "AUTUMN 2026",
    sizes: ["XS", "S", "M"],
    colors: ["Deep Emerald", "Midnight Blue"],
    description: "Heavy cotton-velvet full length trench coat with oversized collar and cinch-waist belt."
  },
  {
    id: 5,
    name: "Celestial Organza Evening Dress",
    category: "HAUTE COUTURE",
    price: 4100,
    formattedPrice: "$4,100",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    tag: "LIMITED EDITION",
    sizes: ["S", "M"],
    colors: ["Ivory Mist"],
    description: "Layered semi-sheer silk organza featuring crystal hand embroidery across the bodice."
  },
  {
    id: 6,
    name: "Aura Sculpted Heels 105mm",
    category: "ACCESSORIES",
    price: 980,
    formattedPrice: "$980",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    tag: "NEW IN",
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Liquid Gold", "Nero"],
    description: "Italian calfskin heels with custom metallic architectural stiletto heel."
  }
];

export default function ProductCollection({ onQuickView, onAddToCart, setCursorState }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = ["ALL", "HAUTE COUTURE", "READY TO WEAR", "ACCESSORIES"];

  const filteredProducts = activeCategory === "ALL"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="collection" className="py-24 px-6 md:px-12 bg-[#fdfbf7] relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#b89628]" />
              <span className="text-xs font-sans tracking-[0.4em] uppercase text-[#b89628] font-bold">
                CURATED STORE
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-zinc-900 tracking-tight">
              AURA <span className="italic text-stone-500 font-light">Collection</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setCursorState(cat, true)}
                onMouseLeave={() => setCursorState('', false)}
                className={`px-5 py-2.5 text-xs font-sans tracking-[0.25em] uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'border-[#b89628] bg-[#b89628] text-white font-bold shadow-md'
                    : 'border-stone-300 text-stone-600 hover:border-[#b89628] hover:text-black bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => {
                  setHoveredCard(product.id);
                  setCursorState('VIEW', true);
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setCursorState('', false);
                }}
                className="group relative bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  
                  {/* Top Tag Badge */}
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md border border-stone-200 text-[10px] uppercase tracking-widest text-zinc-900 font-bold">
                    {product.tag}
                  </span>

                  {/* Primary & Secondary Image Swap */}
                  <img
                    src={hoveredCard === product.id ? product.hoverImage : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                    <button
                      onClick={() => onQuickView(product)}
                      className="p-3 bg-white text-zinc-900 hover:bg-[#b89628] hover:text-white transition-colors duration-300 shadow-xl"
                      title="Quick View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-5 py-3 bg-zinc-900 text-white hover:bg-[#b89628] hover:text-black transition-colors duration-300 font-sans font-bold text-xs tracking-widest uppercase flex items-center gap-2 shadow-xl"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </button>
                  </div>
                </div>

                {/* Product Details Info */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-white border-t border-stone-100">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium block mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-xl text-zinc-900 group-hover:text-[#b89628] transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-stone-100">
                    <span className="font-serif text-xl text-zinc-900 font-bold">
                      {product.formattedPrice}
                    </span>
                    <span className="text-xs text-stone-500 font-sans tracking-wider">
                      {product.sizes.join(" • ")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
