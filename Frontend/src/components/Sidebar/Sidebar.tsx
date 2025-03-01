import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

export const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Product Manager</h2>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/products" className="sidebar-link active">
          @Products
        </Link>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          [•] Logout
        </button>
      </div>
    </div>
  );
};