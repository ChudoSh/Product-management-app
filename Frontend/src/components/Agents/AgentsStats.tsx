import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export const AgentsStats = () => {
  return (
    <>
      <StatCard
        title="Active Agents"
        value="4"
        pillText="2 Running"
        trend="up"
        info="From last 24 hours"
      />
      <StatCard
        title="Success Rate"
        value="78.5%"
        pillText="2.3%"
        trend="up"
        info="Compared to previous week"
      />
      <StatCard
        title="Avg. Response Time"
        value="426ms"
        pillText="12ms"
        trend="down"
        info="Compared to previous week"
      />
    </>
  );
};

const StatCard = ({
  title,
  value,
  pillText,
  trend,
  info,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  info: string;
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

      <p className="text-xs text-stone-500">{info}</p>
    </div>
  );
};