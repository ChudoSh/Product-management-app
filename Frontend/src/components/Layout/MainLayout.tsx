// src/components/layout/MainLayout.tsx
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from '../Sidebar/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const MainLayout = ({ children, showSidebar = true }: MainLayoutProps) => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        {showSidebar && <Sidebar />}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;