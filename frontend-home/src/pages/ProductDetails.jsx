import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { formatCurrency } from '../utils/currencyFormatter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Star, ShoppingBag, Truck, ShieldCheck, ArrowLeft, Heart } from 'lucide-react';

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('Noir Black');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    productService.getProductById(id)
      .then((data) => {
        setProduct(data);
        if (data.sizes?.length) setSelectedSize(data.sizes[0]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="pt-32 text-center text-zinc-900 font-serif text-2xl">Product Not Found</div>;

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-600 hover:text-zinc-900 mb-8 font-semibold"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Collection
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl border border-stone-200 shadow-sm">
        
        {/* Product Image */}
        <div className="aspect-[3/4] bg-stone-100 rounded-xl overflow-hidden relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/90 shadow-md"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`} />
          </button>
        </div>

        {/* Details Column */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#b89628] font-bold block mb-2">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-zinc-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold">{product.rating}</span>
              </div>
              <span className="text-stone-300">•</span>
              <span className="text-xs text-stone-500">Verified Haute Couture Piece</span>
            </div>

            <p className="font-serif text-3xl font-bold text-zinc-900 mb-6">
              {formatCurrency(product.price)}
            </p>

            <p className="text-stone-600 font-sans text-xs leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && (
              <div className="mb-8">
                <label className="text-xs uppercase tracking-widest text-stone-500 font-bold block mb-3">
                  SELECT SIZE
                </label>
                <div className="flex gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-5 py-3 rounded-xl border text-xs font-bold transition-all ${
                        selectedSize === s
                          ? 'border-[#b89628] bg-[#b89628] text-white'
                          : 'border-stone-300 text-zinc-800 hover:border-stone-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart CTA */}
          <div className="space-y-4 pt-6 border-t border-stone-100">
            <button
              onClick={() => onAddToCart(product, selectedSize, selectedColor)}
              className="w-full py-4 rounded-full bg-zinc-900 hover:bg-[#b89628] text-white hover:text-black font-sans font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 shadow-xl transition-colors"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Bag • {formatCurrency(product.price)}
            </button>

            <div className="flex items-center justify-center gap-6 text-[11px] text-stone-500 tracking-wider pt-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#b89628]" />
                <span>White-Glove Express Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b89628]" />
                <span>Authenticity Guaranteed</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
