// Centralized API Configuration & Client Adapter
const API_CONFIG = {
  // In development this is proxied by Vite to Moazzam's product service on :8080.
  // Set VITE_API_BASE_URL when the backend is deployed elsewhere.
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  USE_MOCK: false,
  TIMEOUT: 8000,
};

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const { token, ...requestOptions } = options;
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...requestOptions.headers,
      },
      ...requestOptions,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }

    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    console.error(`API Request Failed: ${endpoint}`, error);
    throw error;
  }
};

export default API_CONFIG;
