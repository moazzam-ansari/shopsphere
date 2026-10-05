import { apiRequest } from './api';

const categoryLabels = {
  1: 'Haute Couture',
  2: "Men's Collection",
  3: 'Ready To Wear',
  4: 'Accessories',
  5: 'Footwear',
};

const productImages = [
  'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
];

// The product service currently supplies product fields only (not media or
// descriptions), so UI-only presentation defaults are added here.
const toFrontendProduct = (product) => {
  const category = categoryLabels[product.productCategory] || `Category ${product.productCategory}`;
  const image = productImages[Number(product.productId) % productImages.length];

  return {
    id: String(product.productId),
    name: product.productName,
    price: Number(product.productPrice),
    category,
    gender: category === "Men's Collection" ? 'Gentlemen' : 'Ladies',
    image,
    hoverImage: image,
    rating: 5,
    reviewsCount: 0,
    tag: product.status || 'ACTIVE',
    description: `${product.productName} — available while stock lasts.`,
    stock: product.productStock,
    status: product.status,
  };
};

export const productService = {
  // Get all products with optional filtering & sorting
  async getProducts({ category = 'ALL', search = '', sortBy = 'default' } = {}) {
    const products = await apiRequest('/products');
    let result = products.map(toFrontendProduct);

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
    const product = await apiRequest(`/products/${id}`);
    return toFrontendProduct(product);
  },

  // Admin: Create product
  async createProduct(productData) {
    const categoryId = Object.entries(categoryLabels)
      .find(([, label]) => label.toUpperCase() === productData.category.toUpperCase())?.[0] || 1;
    const product = await apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify({
        productName: productData.name,
        productPrice: productData.price,
        productStock: productData.stock ?? 0,
        productCategory: Number(categoryId),
      }),
    });
    return toFrontendProduct(product);
  },

  // Admin: Delete product
  async deleteProduct(id) {
    await apiRequest(`/products/${id}`, { method: 'DELETE' });
    return true;
  }
};
