// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Sidebar  from './components/Sidebar/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetails';
import CreateProduct from './components/Products/CreateProduct';
import UpdateProduct from './components/Products/UpdateProduct';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Auth/Profile';
import './index.css';

// PrivateRoute component for protected routes
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

function App() {
  // Check if the route is an auth route (login/register)
  const isAuthRoute = (pathname: string) => {
    return pathname === '/login' || pathname === '/register';
  };
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-100">
        <Routes>
          {/* Auth routes without sidebar */}
          <Route path="/login" element={
            <div className="flex items-center justify-center min-h-screen">
              <Login />
            </div>
          } />
          <Route path="/register" element={
            <div className="flex items-center justify-center min-h-screen">
              <Register />
            </div>
          } />
          
          {/* Main layout with sidebar */}
          <Route path="/" element={
            <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
              <Sidebar />
              <Dashboard />
            </main>
          } />
          
          <Route path="/products" element={
            <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
              <Sidebar />
              <div className="bg-white rounded-lg pb-4 shadow">
                <ProductList />
              </div>
            </main>
          } />
          
          <Route path="/products/new" element={
            <PrivateRoute>
              <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
                <Sidebar />
                <div className="bg-white rounded-lg pb-4 shadow">
                  <CreateProduct />
                </div>
              </main>
            </PrivateRoute>
          } />
          
          <Route path="/products/:id" element={
            <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
              <Sidebar />
              <div className="bg-white rounded-lg pb-4 shadow">
                <ProductDetail />
              </div>
            </main>
          } />
          
          <Route path="/products/:id/edit" element={
            <PrivateRoute>
              <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
                <Sidebar />
                <div className="bg-white rounded-lg pb-4 shadow">
                  <UpdateProduct />
                </div>
              </main>
            </PrivateRoute>
          } />
          
          <Route path="/profile" element={
            <PrivateRoute>
              <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
                <Sidebar />
                <div className="bg-white rounded-lg pb-4 shadow">
                  <Profile />
                </div>
              </main>
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;