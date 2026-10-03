import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { formatCurrency } from '../utils/currencyFormatter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Shield, Plus, Trash2, Package, DollarSign, ShoppingBag, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard({ user }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'HAUTE COUTURE',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    description: ''
  });

  const loadData = async () => {
    setLoading(true);
    const [prods, ords] = await Promise.all([
      productService.getProducts(),
      orderService.getOrders()
    ]);
    setProducts(prods);
    setOrders(ords);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    await productService.createProduct(newProd);
    setShowAddModal(false);
    setNewProd({ name: '', category: 'HAUTE COUTURE', price: 1500, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', description: '' });
    loadData();
  };

  const handleDeleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await productService.deleteProduct(id);
      loadData();
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    await orderService.updateOrderStatus(orderId, status);
    loadData();
  };

  if (loading) return <LoadingSpinner />;

  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-sans tracking-[0.4em] uppercase text-[#b89628] font-bold flex items-center gap-1.5 mb-1">
            <Shield className="w-4 h-4" /> ADMIN PORTAL
          </span>
          <h1 className="font-serif text-4xl text-zinc-900">Atelier Management</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-[#b89628] text-white hover:text-black font-sans font-bold text-xs tracking-widest uppercase flex items-center gap-2 shadow-lg transition-colors w-fit"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-xl bg-[#b89628]/10 text-[#b89628]">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-sans tracking-wider block">TOTAL REVENUE</span>
            <span className="font-serif text-2xl font-bold text-zinc-900">{formatCurrency(totalRevenue)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-xl bg-blue-50 text-blue-600">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-sans tracking-wider block">ACTIVE PRODUCTS</span>
            <span className="font-serif text-2xl font-bold text-zinc-900">{products.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-600">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-sans tracking-wider block">TOTAL ORDERS</span>
            <span className="font-serif text-2xl font-bold text-zinc-900">{orders.length}</span>
          </div>
        </div>
      </div>

      {/* Section 1: Orders Management */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl text-zinc-900">Recent Customer Orders</h2>
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-stone-100 border-b border-stone-200 uppercase tracking-wider text-stone-600">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Shipping Address</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50">
                    <td className="p-4 font-bold text-zinc-900">{order.id}</td>
                    <td className="p-4 text-stone-500">{order.date}</td>
                    <td className="p-4 text-stone-700 max-w-xs truncate">{order.shippingAddress}</td>
                    <td className="p-4 font-bold text-[#b89628]">{formatCurrency(order.totalAmount)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className="bg-white border border-stone-300 rounded px-2 py-1 text-xs focus:outline-none"
                      >
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 2: Products Catalogue Management */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl text-zinc-900">Manage Product Catalogue</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
              <img src={p.image} alt={p.name} className="w-full h-44 object-cover" />
              <div className="p-4 space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-[#b89628] font-bold block">{p.category}</span>
                <h4 className="font-serif text-base font-bold text-zinc-900 line-clamp-1">{p.name}</h4>
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="font-bold text-sm text-zinc-900">{formatCurrency(p.price)}</span>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <h3 className="font-serif text-2xl text-zinc-900 font-bold">Add New Luxury Product</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider text-stone-600 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Silk Velvet Evening Gown"
                  className="w-full border border-stone-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-stone-600 block mb-1">Category</label>
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg p-2.5"
                >
                  <option value="HAUTE COUTURE">HAUTE COUTURE</option>
                  <option value="READY TO WEAR">READY TO WEAR</option>
                  <option value="ACCESSORIES">ACCESSORIES</option>
                  <option value="OUTERWEAR">OUTERWEAR</option>
                </select>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-stone-600 block mb-1">Price ($ USD)</label>
                <input
                  type="number"
                  required
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                  className="w-full border border-stone-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-stone-600 block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-stone-600 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="w-full border border-stone-300 rounded-lg p-2.5"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-full border border-stone-300 text-stone-600 font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-zinc-900 text-white font-bold uppercase hover:bg-[#b89628]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
