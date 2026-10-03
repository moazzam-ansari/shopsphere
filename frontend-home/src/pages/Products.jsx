import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function Products({ onAddToCart }) {
  const [category, setCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { products, loading, error } = useProducts({ category, search, sortBy });

  const categories = ['ALL', 'HAUTE COUTURE', 'READY TO WEAR', 'ACCESSORIES', 'OUTERWEAR', 'FOOTWEAR'];

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-sans tracking-[0.4em] uppercase text-[#b89628] font-bold block mb-2">
            SHOPSPHERE CATALOGUE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-zinc-900 tracking-tight">
            Explore All Products
          </h1>
        </div>

        {/* Search Input & Sort Selector */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search luxury pieces..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-full px-5 py-2.5 pl-10 text-xs text-zinc-900 focus:outline-none focus:border-[#b89628]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-stone-300 shadow-sm">
            <SlidersHorizontal className="w-4 h-4 text-[#b89628]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-sans font-semibold tracking-wider text-zinc-800 focus:outline-none cursor-pointer"
            >
              <option value="default">Sort By: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center flex-wrap gap-3 mb-12 border-b border-stone-200 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2.5 text-xs font-sans tracking-[0.2em] uppercase transition-all rounded-full border ${
              category === cat
                ? 'border-[#b89628] bg-[#b89628] text-white font-bold shadow-md'
                : 'border-stone-300 text-stone-600 hover:border-[#b89628] bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center py-12 text-red-500 font-sans text-sm">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
          <p className="font-serif text-2xl text-zinc-800 mb-2">No Products Found</p>
          <p className="text-xs text-stone-500 font-sans">Try modifying your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={onAddToCart}
          setCursorState={() => {}}
        />
      )}
    </div>
  );
}
