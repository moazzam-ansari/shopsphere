import { useState } from 'react';
import { cartService } from '../services/cartService';

export function useCart() {
  const [cartItems, setCartItems] = useState(cartService.getCart());

  const addToCart = (product, size, color) => {
    const updated = cartService.addToCart(product, size, color);
    setCartItems([...updated]);
  };

  const updateQuantity = (index, qty) => {
    const updated = cartService.updateQuantity(index, qty);
    setCartItems([...updated]);
  };

  const removeFromCart = (index) => {
    const updated = cartService.removeFromCart(index);
    setCartItems([...updated]);
  };

  const clearCart = () => {
    const updated = cartService.clearCart();
    setCartItems([...updated]);
  };

  const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return { cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalCount, subtotal };
}
