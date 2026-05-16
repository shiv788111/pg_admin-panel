import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tenants';

// Helper function to get auth token
const getAuthToken = () => {
  // Try to get token from localStorage (common practice)
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  return token;
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      console.error('Authentication failed:', error.response?.data?.message);
      // You can redirect to login page here
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getTenants = async () => {
  try {
    const response = await apiClient.get('/tenants');
    return response.data;
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch tenants' 
    };
  }
};

export const getTenantById = async (id) => {
  try {
    const response = await apiClient.get(`/tenants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to fetch tenant' 
    };
  }
};

export const createTenant = async (tenantData) => {
  try {
    const response = await apiClient.post('/tenants/create', tenantData);
    return response.data;
  } catch (error) {
    console.error('Error creating tenant:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to create tenant' 
    };
  }
};

export const updateTenant = async (id, tenantData) => {
  try {
    const response = await apiClient.put(`/tenants/${id}`, tenantData);
    return response.data;
  } catch (error) {
    console.error('Error updating tenant:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to update tenant' 
    };
  }
};

export const deleteTenant = async (id) => {
  try {
    const response = await apiClient.delete(`/tenants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting tenant:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Failed to delete tenant' 
    };
  }
};