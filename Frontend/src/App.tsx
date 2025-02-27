// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import {Dashboard} from './components/Dashboard/Dashboard';
import ProductList from './components/Products/ProductList';
import { AuthProvider } from './context/AuthContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth routes without sidebar */}
          <Route path="/login" element={
            <MainLayout showSidebar={false}>
              <Login />
            </MainLayout>
          } />
          <Route path="/register" element={
            <MainLayout showSidebar={false}>
              <Register />
            </MainLayout>
          } />
          
          {/* Routes with sidebar */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/Products" element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          } />
          
          {/* Other routes with similar patterns */}
          
          <Route path="/" element={<Navigate to="/Products" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;