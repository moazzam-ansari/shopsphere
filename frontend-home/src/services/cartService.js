import { getStoredItem, setStoredItem } from '../utils/storage';

const INITIAL_CART = [
  {
    id: "aura-01",
    name: "Architectural Draped Silk Gown",
    category: "Haute Couture",
    price: 3450,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    quantity: 1,
    size: "S",
    color: "Noir Black"
  }
];

export const cartService = {
  getCart() {
    return getStoredItem('CART', INITIAL_CART);
  },

  saveCart(items) {
    setStoredItem('CART', items);
    return items;
  },

  addToCart(product, size = 'S', color = 'Standard') {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        ...product,
        size,
        color,
        quantity: 1
      });
    }

    this.saveCart(cart);
    return cart;
  },

  updateQuantity(index, quantity) {
    const cart = this.getCart();
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
    this.saveCart(cart);
    return cart;
  },

  removeFromCart(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    return cart;
  },

  clearCart() {
    this.saveCart([]);
    return [];
  }
};
