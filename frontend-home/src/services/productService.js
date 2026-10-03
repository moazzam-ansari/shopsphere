import { apiRequest } from './api';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export const productService = {
  // Get all products with optional filtering & sorting
  async getProducts({ category = 'ALL', search = '', sortBy = 'default' } = {}) {
    await apiRequest('/products'); // Will trigger real API when backend is ready

    let result = [...MOCK_PRODUCTS];

    if (category && category !== 'ALL') {
      result = result.filter(p => p.category.toUpperCase() === category.toUpperCase());
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  },

  // Get single product by ID
  async getProductById(id) {
    await apiRequest(`/products/${id}`);
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  // Admin: Create product
  async createProduct(productData) {
    await apiRequest('/admin/products', { method: 'POST', body: JSON.stringify(productData) });
    const newProduct = {
      id: `aura-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      tag: "NEW ADDITION",
      formattedPrice: `$${productData.price}`,
      ...productData,
    };
    MOCK_PRODUCTS.unshift(newProduct);
    return newProduct;
  },

  // Admin: Delete product
  async deleteProduct(id) {
    await apiRequest(`/admin/products/${id}`, { method: 'DELETE' });
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index > -1) MOCK_PRODUCTS.splice(index, 1);
    return true;
  }
};
