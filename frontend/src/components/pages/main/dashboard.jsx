import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import InventoryStock from "../../common/InventoryStock";
import StockTrendChart from "../../charts/StockTrendChart";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { MdSync } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const iconMap = {
  add: IoMdAddCircleOutline,
  warning: IoWarningOutline,
  sync: MdSync,
  delete: FaRegTrashAlt,
};

const defaultActivities = [
  {
    title: "Stock Added: PH-102",
    detail: "50 units added to Premium Headphones.",
    time: "2 mins ago",
    icon: "add",
    iconClass: "bg-emerald-500 text-white",
  },
  {
    title: "Low Stock Alert: MK-22",
    detail: "Mechanical Keyboard has only 4 units left.",
    time: "45 mins ago",
    icon: "warning",
    iconClass: "bg-amber-500 text-white",
  },
  {
    title: "Inventory Sync",
    detail: "Warehouse A sync completed successfully.",
    time: "2 hours ago",
    icon: "sync",
    iconClass: "bg-blue-500 text-white",
  },
  {
    title: "Item Deleted: OLD-01",
    detail: "Discontinued Office Lamp removed from catalog.",
    time: "5 hours ago",
    icon: "delete",
    iconClass: "bg-red-500 text-white",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState(defaultActivities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState("7");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/backend/analytics/activity.php");
        if (response.data?.status === "success") {
          setActivities(response.data.activities || defaultActivities);
        } else {
          setError(response.data?.message || "Failed to load recent activity.");
        }
      } catch {
        setError("Failed to load recent activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-full bg-slate-50">
      <Navbar searchPlaceholder="Search metrics, items or reports..." />

      <div className="px-6 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Inventory Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            High-level insights into your stock levels and warehouse
            performance.
          </p>
        </div>

        <div className="mb-6">
          <InventoryStock variant="dashboard" />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:min-w-0 lg:basis-[62%]">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Stock Trends
                </h2>
                <p className="text-sm text-gray-500">
                  Inventory movement over the last 7 days.
                </p>
              </div>
              <select
                name="days"
                id="days-select"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
            </div>
            <StockTrendChart days={days} />
          </div>

          <div className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:max-w-md lg:shrink-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Recent Activity
              </h2>
              <button
                type="button"
                onClick={() => navigate("/activity")}
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                View All
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {loading ? (
                <li className="rounded-xl border border-gray-100 bg-gray-50/80 p-3.5 text-center text-sm text-gray-600">
                  Loading recent activity...
                </li>
              ) : error ? (
                <li className="rounded-xl border border-red-100 bg-red-50 p-3.5 text-center text-sm text-red-600">
                  {error}
                </li>
              ) : activities.length === 0 ? (
                <li className="rounded-xl border border-gray-100 bg-gray-50/80 p-3.5 text-center text-sm text-gray-600">
                  No recent activity.
                </li>
              ) : (
                activities.map((item) => {
                  const Icon =
                    typeof item.icon === "string"
                      ? iconMap[item.icon] || IoMdAddCircleOutline
                      : item.icon;
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
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-600">
                          {item.detail}
                        </p>
                        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          {item.time}
                        </p>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
