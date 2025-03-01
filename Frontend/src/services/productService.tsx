import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.VITE_API_URL + '/products';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const productService = {
  getAll: async (page = 1, limit = 10) => {
    return await axios.get(`${API_URL}?page=${page}&limit=${limit}`, { 
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
    return await axios.get(`${API_URL}?${queryParams}`, { 
      headers: getAuthHeader() 
    });
  }
};

export default productService;