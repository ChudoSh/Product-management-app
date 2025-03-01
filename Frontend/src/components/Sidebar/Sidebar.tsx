// src/components/layout/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li><Link to="/products">All Products</Link></li>
        {isAuthenticated && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/products/new">Add Product</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;