import React from "react";
import Navbar from "../../Navbar";
import InventoryStick from "../../InventoryStock";
import StockTrendChart from "../../charts/StockTrendChart";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { MdSync } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const activities = [
  {
    title: "Stock Added: PH-102",
    detail: "50 units added to Premium Headphones.",
    time: "2 MINS AGO",
    icon: IoMdAddCircleOutline,
    iconClass: "bg-emerald-500 text-white",
  },
  {
    title: "Low Stock Alert: MK-22",
    detail: "Mechanical Keyboard has only 4 units left.",
    time: "45 MINS AGO",
    icon: IoWarningOutline,
    iconClass: "bg-amber-500 text-white",
  },
  {
    title: "Inventory Sync",
    detail: "Warehouse A sync completed successfully.",
    time: "2 HOURS AGO",
    icon: MdSync,
    iconClass: "bg-blue-500 text-white",
  },
  {
    title: "Item Deleted: OLD-01",
    detail: "Discontinued Office Lamp removed from catalog.",
    time: "5 HOURS AGO",
    icon: FaRegTrashAlt,
    iconClass: "bg-red-500 text-white",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-full bg-slate-50">
      <Navbar searchPlaceholder="Search metrics, items or reports..." />

      <div className="px-6 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Inventory Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            High-level insights into your stock levels and warehouse performance.
          </p>
        </div>

        <div className="mb-6">
          <InventoryStick variant="dashboard" />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:min-w-0 lg:basis-[62%]">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Stock Trends</h2>
                <p className="text-sm text-gray-500">Inventory movement over the last 7 days.</p>
              </div>
              <select
                name="days"
                id="days-select"
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
            </div>
            <StockTrendChart />
          </div>

          <div className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:max-w-md lg:shrink-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              <button
                type="button"
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                View All
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {activities.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-3.5"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ${item.iconClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-0.5 text-xs text-gray-600">{item.detail}</p>
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        {item.time}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
