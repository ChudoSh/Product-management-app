"use client";

import React from "react";
import { FiActivity } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

const data = [
  {
    name: "Mon",
    Success: 92,
    Failure: 8,
  },
  {
    name: "Tue",
    Success: 87,
    Failure: 13,
  },
  {
    name: "Wed",
    Success: 79,
    Failure: 21,
  },
  {
    name: "Thu",
    Success: 82,
    Failure: 18,
  },
  {
    name: "Fri",
    Success: 75,
    Failure: 25,
  },
  {
    name: "Sat",
    Success: 68,
    Failure: 32,
  },
  {
    name: "Sun",
    Success: 72,
    Failure: 28,
  },
];

export const AgentsPerformance = () => {
  return (
    <div className="col-span-12 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiActivity /> Agent Performance
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="Success"
              stroke="#10b981"
              fill="#10b981"
            />
            <Line
              type="monotone"
              dataKey="Failure"
              stroke="#ef4444"
              fill="#ef4444"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};