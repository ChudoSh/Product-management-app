import React from "react";
import { IconType } from "react-icons";
import {
  FiDollarSign,
  FiHome
} from "react-icons/fi";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Gi3dGlasses } from "react-icons/gi";
import { RiStockLine } from "react-icons/ri";
import Link from 'next/link';





export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title="Dashboard" path="/" />
      <Route Icon={RiStockLine} selected={false} title="Strategies" path="/strategies" />
      <Route Icon={Gi3dGlasses} selected={false} title="Agents" path="/agents" />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  path, // Add path prop
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  path: string;
}) => {
  return (
    <Link href={path}>
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
