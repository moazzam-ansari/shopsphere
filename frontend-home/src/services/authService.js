import { apiRequest } from './api';
import { getStoredItem, setStoredItem, removeStoredItem } from '../utils/storage';

export const authService = {
  async login(name, email, password) {
    await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    const displayName = name && name.trim().length > 0 ? name.trim() : email.split('@')[0].toUpperCase();
    const user = {
      id: 'usr_9981',
      name: displayName,
      email,
      role: email.toLowerCase().includes('admin') ? 'ADMIN' : 'CUSTOMER',
      token: 'jwt_mock_token_123456789'
    };
    setStoredItem('AUTH', user);
    return user;
  },

  async register(name, email, password) {
    await apiRequest('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
    const user = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email,
      role: 'CUSTOMER',
      token: 'jwt_mock_token_registered'
    };
    setStoredItem('AUTH', user);
    return user;
  },

  logout() {
    removeStoredItem('AUTH');
  },

  getCurrentUser() {
    return getStoredItem('AUTH', null);
  }
};
