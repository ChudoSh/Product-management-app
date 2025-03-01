import axios, { AxiosResponse } from 'axios';
import {User} from '../types/User'; 

const API_URL = import.meta.env.VITE_API_URL + '/users';

const userService = {
  register: (name: string, email: string, password: string): Promise<AxiosResponse> => 
    axios.post(`${API_URL}/register`, { name, email, password }),
  
  login: (email: string, password: string): Promise<AxiosResponse> => 
    axios.post(`${API_URL}/login`, { email, password }),
  
  getProfile: (): Promise<AxiosResponse<User>> => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/profile`, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
  },
  
  logout: (): void => {
    localStorage.removeItem('token');
  }
};

export default userService;