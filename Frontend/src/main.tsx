// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Auth/Profile';
import { Dashboard } from './components/Dashboard/Dashboard';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetails';
import CreateProduct from './components/Products/CreateProduct';
import UpdateProduct from './components/Products/UpdateProduct';
import './index.css';

// Private route component to protect authenticated routes
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
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
          
          {/* Protected routes with sidebar */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/profile" element={
            <PrivateRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </PrivateRoute>
          } />
          
          {/* Product routes */}
          <Route path="/products" element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          } />
          
          <Route path="/products/new" element={
            <PrivateRoute>
              <MainLayout>
                <CreateProduct />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/products/:id" element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          } />
          
          <Route path="/products/:id/edit" element={
            <PrivateRoute>
              <MainLayout>
                <UpdateProduct />
              </MainLayout>
            </PrivateRoute>
          } />
          
          {/* Redirect default route to products */}
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;