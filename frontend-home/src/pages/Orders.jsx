import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { formatCurrency } from '../utils/currencyFormatter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      <h1 className="font-serif text-4xl text-zinc-900 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center">
          <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="font-serif text-2xl text-zinc-800">No Orders Found</p>
          <p className="text-xs text-stone-500 font-sans mt-1">Your order history will appear here once you place an order.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#b89628] font-bold">ORDER ID: {order.id}</span>
                  <p className="text-xs text-stone-500 font-sans">Placed on {order.date}</p>
                </div>

                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-bold text-zinc-900 w-fit">
                  {order.status === 'DELIVERED' ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Delivered</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-[#b89628]" />
                      <span className="text-[#b89628]">{order.status}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img src={item.image || 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=300&q=80'} alt={item.name} className="w-16 h-20 object-cover rounded-lg border border-stone-100" />
                    <div className="flex-1">
                      <h4 className="font-serif text-base text-zinc-900 font-semibold">{item.name}</h4>
                      <p className="text-xs text-stone-500">Qty: {item.quantity || 1} • {formatCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <p className="text-stone-500 font-sans">Shipping Address: <span className="text-zinc-800 font-medium">{order.shippingAddress}</span></p>
                <p className="font-serif text-lg font-bold text-zinc-900">Total: <span className="text-[#b89628]">{formatCurrency(order.totalAmount)}</span></p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
