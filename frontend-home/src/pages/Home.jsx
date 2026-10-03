import React, { useState } from 'react';
import HeroRunway from '../components/HeroRunway';
import LuxuryMarquee from '../components/LuxuryMarquee';
import DualMarqueeShowroom from '../components/DualMarqueeShowroom';
import GentlemenCollectionSection from '../components/GentlemenCollectionSection';
import WomenCoutureSection from '../components/WomenCoutureSection';
import SareeHeritageSection from '../components/SareeHeritageSection';
import BrandPhilosophy from '../components/BrandPhilosophy';
import UspSection from '../components/UspSection';
import QuickViewModal from '../components/QuickViewModal';

export default function Home({ products, onAddToCart, user, onRequireLogin, wishlistItems, onToggleWishlist }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="bg-marble-light min-h-screen text-zinc-900 overflow-x-hidden">
      
      {/* 1. Hero Showcase Slider */}
      <HeroRunway onAddToCart={onAddToCart} />

      {/* 2. Luxury Gold Running Marquee */}
      <LuxuryMarquee />

      {/* 3. DUAL-LINE CONTINUOUS MARQUEE SHOWROOM (Row 1 Left, Row 2 Right) */}
      <DualMarqueeShowroom
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
        user={user}
        onRequireLogin={onRequireLogin}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 4. Section 2: Gentlemen's Royal Suits & Kurta Collection (Boys / Men) */}
      <GentlemenCollectionSection
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
        user={user}
        onRequireLogin={onRequireLogin}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 5. Section 3: Women's Haute Couture & Evening Wear (3D Arc Perspective Slider) */}
      <WomenCoutureSection
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
        user={user}
        onRequireLogin={onRequireLogin}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 6. Section 4: The Royal Bridal & Silk Saree Collection (Gold Add to Cart Buttons) */}
      <SareeHeritageSection
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
        user={user}
        onRequireLogin={onRequireLogin}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
      />

      {/* 7. Brand Philosophy & Mor • E Manifesto */}
      <BrandPhilosophy />

      {/* 8. Unique Selling Proposition / VIP Concierge */}
      <UspSection />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={onAddToCart}
          user={user}
          onRequireLogin={onRequireLogin}
          wishlistItems={wishlistItems}
          onToggleWishlist={onToggleWishlist}
          setCursorState={() => {}}
        />
      )}
    </div>
  );
}
