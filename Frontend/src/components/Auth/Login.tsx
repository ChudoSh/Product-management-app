// src/components/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userService from '../../services/userService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await userService.login(email, password);
      localStorage.setItem('token', response.data.token);
      navigate('/products');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please try again.');
    }
  };


  return (
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-md transition-colors"
          >
            Login
          </button>
          <div className="mt-4 text-center text-sm text-stone-600">
            Don't have an account? 
            <Link to="/register" className="text-violet-600 hover:underline ml-1">Register</Link>
          </div>
        </form>
      </div>
    );
};

export default Login;