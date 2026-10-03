import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyFormatter';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart({ cartItems, onUpdateQuantity, onRemoveFromCart }) {
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const freeShippingThreshold = 5000;
  const isFreeShipping = subtotal >= freeShippingThreshold;

  if (cartItems.length === 0) {
    return (
      <div className="pt-36 pb-24 px-6 text-center max-w-md mx-auto">
        <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h2 className="font-serif text-3xl text-zinc-900 mb-2">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-stone-500 font-sans leading-relaxed mb-6">
          Explore our Haute Couture and Ready-to-Wear collections to add luxury pieces.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-8 py-3.5 rounded-full bg-zinc-900 text-white font-sans text-xs font-bold tracking-widest uppercase hover:bg-[#b89628] transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
      <h1 className="font-serif text-4xl text-zinc-900 mb-8">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 p-4 bg-white border border-stone-200 rounded-2xl shadow-sm">
              <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded-xl border border-stone-100" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#b89628] font-bold block">{item.category}</span>
                  <h3 className="font-serif text-lg text-zinc-900 font-semibold">{item.name}</h3>
                  <p className="text-xs text-stone-500 mt-1">Size: {item.size || 'S'} • Color: {item.color || 'Standard'}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-serif text-lg font-bold text-zinc-900">
                    {formatCurrency(item.price * (item.quantity || 1))}
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-stone-300 rounded-full px-2 py-0.5">
                      <button onClick={() => onUpdateQuantity(index, (item.quantity || 1) - 1)} className="px-2 font-bold text-stone-600">-</button>
                      <span className="px-2 text-xs font-bold">{item.quantity || 1}</span>
                      <button onClick={() => onUpdateQuantity(index, (item.quantity || 1) + 1)} className="px-2 font-bold text-stone-600">+</button>
                    </div>

                    <button onClick={() => onRemoveFromCart(index)} className="text-stone-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm h-fit space-y-6">
          <h2 className="font-serif text-2xl text-zinc-900">Order Summary</h2>

          <div className="space-y-3 text-xs font-sans tracking-wide border-b border-stone-100 pb-4">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="font-bold text-zinc-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Express Shipping</span>
              <span className="font-bold text-[#b89628]">{isFreeShipping ? 'COMPLIMENTARY' : '$150'}</span>
            </div>
          </div>

          <div className="flex justify-between font-serif text-xl font-bold text-zinc-900 pt-2">
            <span>Total</span>
            <span className="text-[#b89628]">{formatCurrency(subtotal + (isFreeShipping ? 0 : 150))}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-full bg-zinc-900 hover:bg-[#b89628] text-white hover:text-black font-sans font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 shadow-xl transition-colors"
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#b89628]" />
            <span>256-Bit Encrypted Luxury Checkout</span>
          </div>
        </div>

      </div>
    </div>
  );
}
