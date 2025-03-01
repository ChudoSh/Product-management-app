// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import ProductList from './components/Products/ProductList';
import CreateProduct from './components/Products/CreateProduct';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import './App.css';
import UpdateProduct from './components/Products/UpdateProduct';
import Profile from './components/Auth/Profile'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={
              <div className="auth-page">
                <Login />
              </div>
            } />
            <Route path="/register" element={
              <div className="auth-page">
                <Register />
              </div>
            } />

            <Route path="/profile" element={
              <PrivateRoute>
                <main className='app=layout'>
                  <Sidebar />
                  <div className="content">
                    <Profile />
                  </div>
                  </main>
              </PrivateRoute>
            } />
            
            {/* Redirect root to products */}
            <Route path="/" element={<Navigate to="/products" />} />
            
            {/* Product routes */}
            <Route path="/products" element={
              <PrivateRoute>
                <div className="app-layout">
                  <Sidebar />
                  <div className="content">
                    <ProductList />
                  </div>
                </div>
              </PrivateRoute>
            } />
            
            <Route path="/products/new" element={
              <PrivateRoute>
                <div className="app-layout">
                  <Sidebar />
                  <div className="content">
                    <CreateProduct />
                  </div>
                </div>
              </PrivateRoute>
            } />
            
            <Route path="/products/:id/edit" element={
              <PrivateRoute>
                <div className="app-layout">
                  <Sidebar />
                  <div className="content">
                    <UpdateProduct/>
                  </div>
                </div>
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;