// src/services/AgentService.tsx
import axios, { AxiosResponse } from 'axios';
import { Agent } from '../Types/Agent';
import productService from './productService';

const API_URL = 'http://localhost:6000/api/products';

const productService = {
    // Backend returns array of agents
    getAll: (): Promise<AxiosResponse<Agent[]>> => axios.get(API_URL),
    
    // Backend returns single agent
    getById: (id: string): Promise<AxiosResponse<Agent>> =>
        axios.get(`${API_URL}/${id}`),
    
    // Backend creates and returns new agent
    create: (): Promise<AxiosResponse<Agent>> =>
        axios.post(API_URL),
    
    // These return the updated agent
    start: (id: string): Promise<AxiosResponse<Agent>> =>
        axios.put(`${API_URL}/${id}/start`),
    
    stop: (id: string): Promise<AxiosResponse<Agent>> =>
        axios.put(`${API_URL}/${id}/stop`),
    
    // This returns no content (204)
    delete: (id: string): Promise<AxiosResponse<void>> =>
        axios.delete(`${API_URL}/${id}`),
};

export default productService;