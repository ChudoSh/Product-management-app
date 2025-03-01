// src/components/Dashboard/StatCards.tsx
import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
  return (
    <>
      <Card
        title="Total Products"
        value="42"
        pillText="2.75%"
        trend="up"
        period="From previous month"
      />
      <Card
        title="Avg Price"
        value="$89.99"
        pillText="1.01%"
        trend="down"
        period="From previous month"
      />
      <Card
        title="Total Value"
        value="$3,779.58"
        pillText="12.5%"
        trend="up"
        period="From previous month"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span
                 className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
                  trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
              </span>
            </div>
      
            <p className="text-xs text-stone-500">{period}</p>
          </div>
        );
      };