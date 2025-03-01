// src/components/Layout/MainLayout.tsx
import React, { ReactNode } from 'react';
import {Sidebar} from '../Sidebar/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <Sidebar />
      <div className="bg-white rounded-lg pb-4 shadow">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;