import React from 'react';
import Navbar from './Navbar';
import FooterSection from './FooterSection';

export default function Layout({
  children,
  brandName = "SHOPSPHERE",
  cartCount,
  wishlistCount,
  user,
  onLogout,
  onOpenWishlist,
  onRequireLogin,
  products = [],
  onAddToCart
}) {
  return (
    <div className="min-h-screen bg-[#f5f3ef] text-zinc-900 font-sans flex flex-col justify-between selection:bg-[#d4af37] selection:text-black">
      <Navbar
        brandName={brandName}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        user={user}
        onLogout={onLogout}
        onOpenWishlist={onOpenWishlist}
        onRequireLogin={onRequireLogin}
        products={products}
        onAddToCart={onAddToCart}
      />
      <main className="flex-grow">{children}</main>
      <FooterSection brandName={brandName} />
    </div>
  );
}
