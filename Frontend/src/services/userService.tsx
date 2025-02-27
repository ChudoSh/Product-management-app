// src/services/AgentService.tsx
import axios, { AxiosResponse } from 'axios';
import { Agent } from '../Types/Agent';
import productService from './productService';

const API_URL = 'http://localhost:6000/api/products';

const productService = {
    // Backend returns array of agents
    register: (name: string, email:string, password: string): 
        Promise<AxiosResponse> => axios.get(API_URL),
    
    // Backend returns single agent
    login: (id: string): Promise<AxiosResponse<Agent>> =>
        axios.get(`${API_URL}/${id}`),
    
};

export default productService;