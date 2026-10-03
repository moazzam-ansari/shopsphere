import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { formatCurrency } from '../utils/currencyFormatter';
import { ShieldCheck, CheckCircle } from 'lucide-react';

export default function Checkout({ cartItems, onClearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    address: '742 Fifth Avenue',
    city: 'New York',
    postalCode: '10019',
    country: 'United States',
  });
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await orderService.createOrder({
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
        totalAmount: subtotal,
        items: cartItems.map(i => ({ name: i.name, price: i.price, quantity: i.quantity || 1, image: i.image }))
      });
      onClearCart();
      setLoading(false);
      navigate('/orders');
    } catch (err) {
      setLoading(false);
      alert("Error placing order: " + err.message);
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <h1 className="font-serif text-4xl text-zinc-900 mb-8">White-Glove Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 md:p-12 rounded-2xl border border-stone-200 shadow-sm">
        
        {/* Shipping Form */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-zinc-900 mb-4">Shipping Destination</h2>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#b89628]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#b89628]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">Street Address</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#b89628]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">City</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#b89628]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">Postal Code</label>
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#b89628]"
              />
            </div>
          </div>
        </div>

        {/* Order Payment Summary */}
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl text-zinc-900 mb-4">Payment Method</h3>
            <div className="p-4 rounded-lg bg-white border border-[#b89628]/50 flex items-center gap-3 mb-6">
              <CheckCircle className="w-5 h-5 text-[#b89628]" />
              <div>
                <p className="text-xs font-bold text-zinc-900">Complimentary Concierge Invoice</p>
                <p className="text-[10px] text-stone-500">Private client billing after white-glove delivery</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-sans tracking-wide pt-4 border-t border-stone-200">
              <div className="flex justify-between text-stone-600">
                <span>Items ({cartItems.length})</span>
                <span className="font-bold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between font-serif text-lg font-bold text-zinc-900 pt-2">
                <span>Total Due</span>
                <span className="text-[#b89628]">{formatCurrency(subtotal)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 rounded-full bg-zinc-900 hover:bg-[#b89628] text-white hover:text-black font-sans font-bold text-xs tracking-[0.25em] uppercase transition-colors shadow-xl"
          >
            {loading ? 'Processing Order...' : 'Place Order'}
          </button>
        </div>

      </form>
    </div>
  );
}
