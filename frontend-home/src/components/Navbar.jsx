import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ShoppingBag, User, Shield, LogOut, Heart, ArrowRight, PlusCircle, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PeacockLogo from './PeacockLogo';
import { formatINR } from '../utils/currencyFormatter';

export default function Navbar({
  brandName = "SHOPSPHERE",
  cartCount = 0,
  wishlistCount = 0,
  user,
  onLogout,
  onOpenWishlist,
  onRequireLogin,
  products = [],
  onAddToCart
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState([]);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside search dropdown to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWishlistClick = () => {
    if (!user) {
      if (onRequireLogin) onRequireLogin("Sign in to view & access your private wishlist.");
      return;
    }
    if (onOpenWishlist) onOpenWishlist();
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
    setAddedItemIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItemIds(prev => prev.filter(id => id !== product.id));
    }, 1500);
  };

  // Filter products for inline search dropdown
  const filteredProducts = searchQuery.trim() === ''
    ? []
    : products.filter(p => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.gender && p.gender.toLowerCase().includes(q))
        );
      }).slice(0, 5); // top 5 results inline

  const quickTags = ['Saree', 'Blazer', 'Shoes', 'Bag', 'Shirt', 'T-Shirt', 'Gown', 'Kurta'];

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'glass-header-light py-3.5 shadow-sm'
            : 'bg-gradient-to-b from-stone-900/30 via-stone-900/5 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Navigation */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-800 md:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-800 hover:text-[#b89628] transition-colors py-1 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#b89628] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                to="/products"
                className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-800 hover:text-[#b89628] transition-colors py-1 relative group"
              >
                Store
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#b89628] group-hover:w-full transition-all duration-300" />
              </Link>
              {user && (
                <Link
                  to="/orders"
                  className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-800 hover:text-[#b89628] transition-colors py-1 relative group"
                >
                  My Orders
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#b89628] group-hover:w-full transition-all duration-300" />
                </Link>
              )}
              {user?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  className="text-xs uppercase tracking-[0.25em] font-bold text-[#b89628] flex items-center gap-1.5 bg-[#b89628]/10 px-3.5 py-1.5 rounded-full border border-[#b89628]/30 hover:bg-[#b89628] hover:text-white transition-all shadow-sm"
                >
                  <Shield className="w-3.5 h-3.5" /> Admin Portal
                </Link>
              )}
            </nav>
          </div>

          {/* Center Brand Logo */}
          <Link to="/" className="flex items-center justify-center">
            <PeacockLogo
              className="w-9 h-9"
              showText={true}
              textColor="text-zinc-900"
            />
          </Link>

          {/* Right Action Icons & Inline Search Bar */}
          <div className="flex items-center space-x-3 md:space-x-4" ref={searchRef}>
            
            {/* Inline Search Expandable Bar */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center bg-white/90 backdrop-blur-md border border-[#b89628]/40 rounded-full px-3 py-1.5 shadow-md"
                  >
                    <Search className="w-4 h-4 text-[#b89628] shrink-0 mr-2" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search bag, shirt, shoes, saree..."
                      className="w-full bg-transparent text-xs text-zinc-900 placeholder:text-stone-400 focus:outline-none"
                      autoFocus
                    />
                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="p-0.5 text-stone-400 hover:text-zinc-800"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setSearchOpen(false)}
                        className="p-0.5 text-stone-400 hover:text-zinc-800"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <button
                    onClick={() => {
                      setSearchOpen(true);
                      setTimeout(() => inputRef.current?.focus(), 100);
                    }}
                    className="p-2 text-zinc-800 hover:text-[#b89628] transition-colors flex items-center gap-1.5 rounded-full hover:bg-stone-200/50"
                    aria-label="Search"
                    title="Search Products"
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden lg:inline text-[11px] uppercase tracking-wider text-stone-600 font-medium">Search</span>
                  </button>
                )}
              </AnimatePresence>

              {/* INLINE SEARCH RESULTS DROPDOWN (No Popup Overlay) */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-stone-200 rounded-2xl shadow-2xl overflow-hidden z-50 p-4"
                  >
                    {/* Quick Search Chips */}
                    <div className="mb-3 pb-3 border-b border-stone-100">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">
                        Popular Searches
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {quickTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-stone-100 hover:bg-[#b89628] hover:text-white text-zinc-700 transition-colors border border-stone-200"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Results List */}
                    {searchQuery.trim() !== '' && (
                      <div>
                        <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
                          <span>Matching Products ({filteredProducts.length})</span>
                          {filteredProducts.length > 0 && (
                            <button
                              onClick={() => {
                                setSearchOpen(false);
                                navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
                              }}
                              className="text-[#b89628] hover:underline flex items-center gap-1 font-semibold"
                            >
                              View all <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {filteredProducts.length === 0 ? (
                          <div className="py-6 text-center text-xs text-stone-500">
                            No products found for "<span className="font-semibold text-zinc-800">{searchQuery}</span>". Try searching for <span className="text-[#b89628]">shoes, bag, shirt, saree, gown</span>.
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                            {filteredProducts.map((product) => {
                              const isAdded = addedItemIds.includes(product.id);
                              return (
                                <div
                                  key={product.id}
                                  onClick={() => {
                                    setSearchOpen(false);
                                    navigate(`/product/${product.id}`);
                                  }}
                                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-all cursor-pointer group border border-transparent hover:border-stone-200"
                                >
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-bold tracking-wider text-[#b89628] uppercase block">
                                      {product.category}
                                    </span>
                                    <h4 className="text-xs font-semibold text-zinc-900 truncate group-hover:text-[#b89628] transition-colors">
                                      {product.name}
                                    </h4>
                                    <span className="text-xs font-serif font-bold text-zinc-900 block mt-0.5">
                                      {formatINR(product.price)}
                                    </span>
                                  </div>

                                  <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className={`p-2 rounded-full transition-all shrink-0 ${
                                      isAdded
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-stone-100 hover:bg-[#b89628] text-zinc-800 hover:text-white'
                                    }`}
                                    title="Add to Bag"
                                  >
                                    {isAdded ? <Check className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Heart Icon Button */}
            <button
              onClick={handleWishlistClick}
              className="relative p-2 text-zinc-800 hover:text-red-500 transition-colors group flex items-center"
              aria-label="Wishlist"
              title="View Liked Products"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : 'text-zinc-800'}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon Button */}
            <Link
              to="/cart"
              className="relative p-2 text-zinc-800 hover:text-[#b89628] transition-colors flex items-center group"
              aria-label="Cart"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#b89628] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account / Sign In Badge */}
            {user ? (
              <div className="flex items-center gap-2 bg-white/80 border border-stone-300 rounded-full px-3 py-1 shadow-sm">
                <span className="text-xs font-bold tracking-wider text-zinc-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#b89628]" />
                  {user.name}
                </span>
                <button
                  onClick={onLogout}
                  className="p-1 text-stone-400 hover:text-red-500 transition-colors ml-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (onRequireLogin) onRequireLogin();
                }}
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-stone-300 text-zinc-800 hover:border-[#b89628] hover:text-[#b89628] transition-all text-xs tracking-widest uppercase font-semibold bg-white/80 shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-[#b89628]" />
                Sign in
              </button>
            )}

          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#f7f5f0] flex flex-col justify-center px-12 md:hidden"
          >
            <div className="space-y-8">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block font-serif text-3xl tracking-[0.2em] text-zinc-900">HOME</Link>
              <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block font-serif text-3xl tracking-[0.2em] text-zinc-900">STORE</Link>
              <button onClick={() => { setMobileMenuOpen(false); handleWishlistClick(); }} className="block font-serif text-3xl tracking-[0.2em] text-zinc-900 text-left">WISHLIST ({wishlistCount})</button>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="block font-serif text-3xl tracking-[0.2em] text-zinc-900">CART ({cartCount})</Link>
              {user && <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="block font-serif text-3xl tracking-[0.2em] text-zinc-900">MY ORDERS</Link>}
              {user?.role === 'ADMIN' && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block font-serif text-3xl tracking-[0.2em] text-[#b89628] font-bold">ADMIN PORTAL</Link>}
              {!user && <button onClick={() => { setMobileMenuOpen(false); if (onRequireLogin) onRequireLogin(); }} className="block font-serif text-3xl tracking-[0.2em] text-[#b89628]">SIGN IN</button>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
