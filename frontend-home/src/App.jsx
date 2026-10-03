import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import LoginModal from './components/LoginModal';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';

export default function App() {
  const { user, login, register, logout } = useAuth();
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalCount } = useCart();
  const { products } = useProducts();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalReason, setLoginModalReason] = useState("");

  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleRequireLogin = (reason = "Please sign in to save items to your private wishlist.") => {
    if (!user) {
      setLoginModalReason(reason);
      setIsLoginModalOpen(true);
    }
  };

  const handleToggleWishlist = (product) => {
    if (!user) {
      handleRequireLogin(`Sign in to save "${product.name}" to your wishlist.`);
      return;
    }

    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <Layout
        brandName="SHOPSPHERE"
        cartCount={totalCount}
        wishlistCount={wishlistItems.length}
        user={user}
        onLogout={logout}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onRequireLogin={handleRequireLogin}
        products={products}
        onAddToCart={addToCart}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                onAddToCart={addToCart}
                user={user}
                onRequireLogin={handleRequireLogin}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                onAddToCart={addToCart}
                user={user}
                onRequireLogin={handleRequireLogin}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                onAddToCart={addToCart}
                user={user}
                onRequireLogin={handleRequireLogin}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} onClearCart={clearCart} />}
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register onRegister={register} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
        </Routes>
      </Layout>

      {/* Global Login Popup Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={login}
        reasonMessage={loginModalReason}
      />

      {/* Global Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={addToCart}
      />
    </Router>
  );
}
