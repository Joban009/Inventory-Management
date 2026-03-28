import React from "react";
import { MdInventory2 } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { MdDoNotDisturbOn } from "react-icons/md";
import { MdPayments } from "react-icons/md";
const StatCard = ({ title, value, footer, footerClass, icon, iconWrapClass }) => {
  const Icon = icon;
  return (
  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div
      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg ${iconWrapClass}`}
    >
      <Icon className="h-5 w-5" />
    </div>
    <p className="text-xs font-medium text-gray-500">{title}</p>
    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{value}</p>
    <p className={`mt-2 text-xs font-medium ${footerClass}`}>{footer}</p>
  </div>
  );
};

const InventoryStock = ({ variant = "dashboard" }) => {
  const isInventory = variant === "inventory";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Items"
        value="1,240"
        footer={isInventory ? "+2.5% vs last month" : "+12 this week"}
        footerClass={isInventory ? "text-emerald-600" : "text-emerald-600 flex items-center gap-1"}
        icon={MdInventory2}
        iconWrapClass="bg-blue-50 text-blue-600"
      />
      <StatCard
        title="Low Stock Alerts"
        value="12"
        footer={isInventory ? "Immediate action required" : "ACTION REQUIRED"}
        footerClass={isInventory ? "text-gray-500" : "text-amber-600 font-semibold uppercase tracking-wide"}
        icon={IoWarningOutline}
        iconWrapClass="bg-amber-50 text-amber-600"
      />
      <StatCard
        title="Out of Stock"
        value="5"
        footer={isInventory ? "Restock recommended" : "2 more than yesterday"}
        footerClass={isInventory ? "text-gray-500" : "text-red-600 flex items-center gap-1"}
        icon={MdDoNotDisturbOn}
        iconWrapClass="bg-red-50 text-red-600"
      />
      <StatCard
        title="Total Inventory Value"
        value="$45,200"
        footer={isInventory ? "Stable vs last month" : "3.2% Increase"}
        footerClass={isInventory ? "text-gray-500" : "text-emerald-600 flex items-center gap-1"}
        icon={MdPayments}
        iconWrapClass="bg-emerald-50 text-emerald-600"
      />
    </div>
  );
};

export default InventoryStock;
