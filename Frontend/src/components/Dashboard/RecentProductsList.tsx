// src/components/Dashboard/RecentProductsList.tsx
import React from "react";
import { FiPackage, FiArrowUpRight, FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";

const RecentProductsList = () => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiPackage /> Recent Products
        </h3>
        <Link to="/products" className="text-sm text-violet-500 hover:underline">
          See all
        </Link>
      </div>
      <div className="space-y-3">
        <ProductItem
          id="1"
          name="Wireless Earbuds"
          price="$89.99"
          order={1}
        />
        <ProductItem
          id="2"
          name="Smart Watch"
          price="$129.99"
          order={2}
        />
        <ProductItem
          id="3"
          name="Bluetooth Speaker"
          price="$59.99"
          order={3}
        />
        <ProductItem
          id="4"
          name="USB-C Cable"
          price="$12.99"
          order={4}
        />
      </div>
    </div>
  );
};

const ProductItem = ({
  id,
  name,
  price,
  order,
}: {
  id: string;
  name: string;
  price: string;
  order: number;
}) => {
  return (
    <div className={order % 2 ? "p-2 rounded bg-stone-100" : "p-2 rounded"}>
      <div className="flex items-center justify-between">
        <Link
          to={`/products/${id}`}
          className="text-violet-600 flex items-center gap-1 hover:underline"
        >
          {name} <FiArrowUpRight size={14} />
        </Link>
        <div className="flex items-center">
          <span className="text-sm">{price}</span>
          <button className="ml-2 hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-6">
            <FiMoreHorizontal size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentProductsList;