import React from "react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiUser
} from "react-icons/fi";

export const RouteSelect = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="space-y-1">
      <Route 
        Icon={FiHome} 
        selected={currentPath === '/'} 
        title="Dashboard" 
        path="/" 
      />
      <Route 
        Icon={FiPackage} 
        selected={currentPath.includes('/products')} 
        title="Products" 
        path="/products" 
      />
      <Route 
        Icon={FiUser} 
        selected={currentPath.includes('/profile')} 
        title="Profile" 
        path="/profile" 
      />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  path,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  path: string;
}) => {
  return (
    <Link to={path} className="block">
      <button
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }`}
      >
        <Icon className={selected ? "text-violet-500" : ""} />
        <span>{title}</span>
      </button>
    </Link>
  );
};