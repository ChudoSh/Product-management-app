// src/components/Dashboard/Dashboard.tsx
import React from "react";
import { TopBar } from "./TopBar";
import { StatCards } from "./StatCards";
import { ProductsChart } from "./ProductsChart";
import  RecentProductsList  from "./RecentProductsList";

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="px-4 grid gap-3 grid-cols-12">
        <StatCards />
        <ProductsChart />
        <RecentProductsList />
      </div>
    </div>
  );
};