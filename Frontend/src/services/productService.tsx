// src/services/productService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/products';

// Helper to get the auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const productService = {
  getAll: async () => {
    return await axios.get(API_URL, { 
      headers: getAuthHeader() 
    });
  },
  
  getById: async (id) => {
    return await axios.get(`${API_URL}/${id}`, { 
      headers: getAuthHeader() 
    });
  },
  
  create: async (product) => {
    return await axios.post(API_URL, product, { 
      headers: getAuthHeader() 
    });
  },
  
  update: async (id, product) => {
    return await axios.put(`${API_URL}/${id}`, product, { 
      headers: getAuthHeader() 
    });
  },
  
  delete: async (id) => {
    return await axios.delete(`${API_URL}/${id}`, { 
      headers: getAuthHeader() 
    });
  },
  
  search: async (queryParams) => {
    return await axios.get(`${API_URL}/search?${queryParams}`, { 
      headers: getAuthHeader() 
    });
  }
};

export default productService;