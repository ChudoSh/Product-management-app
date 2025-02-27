// src/services/userService.tsx
import axios, { AxiosResponse } from 'axios';
import { User } from '../types/User'; // You'll need to create this type

const API_URL = 'http://localhost:6000/api/users';

const userService = {
  // Register new user
  register: (name: string, email: string, password: string): Promise<AxiosResponse> => 
    axios.post(`${API_URL}/register`, { name, email, password }),
  
  // Login user
  login: (email: string, password: string): Promise<AxiosResponse> => 
    axios.post(`${API_URL}/login`, { email, password }),
  
  // Get user profile (authenticated)
  getProfile: (): Promise<AxiosResponse<User>> => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/profile`, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
  },
  
  // Logout (client-side only)
  logout: (): void => {
    localStorage.removeItem('token');
  }
};

export default userService;