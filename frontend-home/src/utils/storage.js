const KEYS = {
  CART: 'shopsphere_cart',
  AUTH: 'shopsphere_auth',
  ORDERS: 'shopsphere_orders',
};

export const getStoredItem = (key, fallback = null) => {
  try {
    const data = localStorage.getItem(KEYS[key] || key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(KEYS[key] || key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err);
  }
};

export const removeStoredItem = (key) => {
  try {
    localStorage.removeItem(KEYS[key] || key);
  } catch (err) {
    console.error(`Error removing ${key} from localStorage`, err);
  }
};
