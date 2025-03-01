// src/services/productService.tsx
import axios, { AxiosResponse } from 'axios';
import { Product } from '../types/Product';

const API_URL = 'http://localhost:6000/api/products';

// Helper to handle auth token for protected routes
const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const productService = {
  // Get all products with pagination
  getAll: (page = 1, limit = 10): Promise<AxiosResponse<{products: Product[], total: number}>> => 
    axios.get(`${API_URL}?page=${page}&limit=${limit}`),
  
  // Get product by ID
  getById: (id: string): Promise<AxiosResponse<Product>> =>
    axios.get(`${API_URL}/${id}`),
  
  // Advanced search products
  search: (queryParams: string): Promise<AxiosResponse<Product[]>> =>
    axios.get(`${API_URL}/search?${queryParams}`),
  
  // Create product (authenticated)
  create: (productData: Partial<Product>): Promise<AxiosResponse<Product>> =>
    axios.post(API_URL, productData, { 
      headers: authHeader() 
    }),
  
  // Update product (authenticated)
  update: (id: string, productData: Partial<Product>): Promise<AxiosResponse<Product>> =>
    axios.put(`${API_URL}/${id}`, productData, { 
      headers: authHeader() 
    }),
  
  // Delete product (authenticated)
  delete: (id: string): Promise<AxiosResponse<void>> =>
    axios.delete(`${API_URL}/${id}`, { 
      headers: authHeader() 
    }),
};

export default productService;