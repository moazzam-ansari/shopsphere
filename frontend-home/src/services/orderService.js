import { apiRequest } from './api';
import { getStoredItem, setStoredItem } from '../utils/storage';

const INITIAL_ORDERS = [
  {
    id: "ORD-98210",
    date: "2026-09-22",
    status: "DELIVERED",
    totalAmount: 3450,
    shippingAddress: "742 Fifth Avenue, New York, NY 10019",
    items: [
      {
        name: "Architectural Draped Silk Gown",
        price: 3450,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export const orderService = {
  async createOrder(orderData) {
    await apiRequest('/orders', { method: 'POST', body: JSON.stringify(orderData) });
    const orders = getStoredItem('ORDERS', INITIAL_ORDERS);
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: "PROCESSING",
      ...orderData
    };
    orders.unshift(newOrder);
    setStoredItem('ORDERS', orders);
    return newOrder;
  },

  async getOrders() {
    await apiRequest('/orders');
    return getStoredItem('ORDERS', INITIAL_ORDERS);
  },

  async updateOrderStatus(orderId, newStatus) {
    await apiRequest(`/admin/orders/${orderId}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
    const orders = getStoredItem('ORDERS', INITIAL_ORDERS);
    const order = orders.find(o => o.id === orderId);
    if (order) order.status = newStatus;
    setStoredItem('ORDERS', orders);
    return orders;
  }
};
