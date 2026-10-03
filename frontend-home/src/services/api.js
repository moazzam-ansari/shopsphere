// Centralized API Configuration & Client Adapter
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.shopsphere.com/v1',
  USE_MOCK: true, // Toggle to false when real backend endpoints are ready
  TIMEOUT: 8000,
};

export const apiRequest = async (endpoint, options = {}) => {
  if (API_CONFIG.USE_MOCK) {
    // Artificial latency simulation for realistic async behavior
    await new Promise(res => setTimeout(res, 300));
    return null; // Handled by mock service wrappers
  }

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.token && { Authorization: `Bearer ${options.token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Failed: ${endpoint}`, error);
    throw error;
  }
};

export default API_CONFIG;
