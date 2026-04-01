import React, { useState, useEffect } from "react";
import { MdInventory2 } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { MdDoNotDisturbOn } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { MdRefresh } from "react-icons/md";
const StatCard = ({
  title,
  value,
  footer,
  footerClass,
  icon,
  iconWrapClass,
}) => {
  const Icon = icon;
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div
        className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg ${iconWrapClass}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xs font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </p>
      <p className={`mt-2 text-xs font-medium ${footerClass}`}>{footer}</p>
    </div>
  );
};

const InventoryStock = ({ variant = "dashboard" }) => {
  const isInventory = variant === "inventory";
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch("/backend/products.php");
      const data = await response.json();
      console.log("API Response:", data);
      if (data.status === "success") {
        const products = data.products;
        console.log("Products:", products);
        const totalItems = products.length;
        const lowStock = products.filter(
          (p) => parseInt(p.stock) < 10 && parseInt(p.stock) > 0,
        ).length;
        const outOfStock = products.filter(
          (p) => parseInt(p.stock) === 0,
        ).length;
        const totalValue = products.reduce(
          (sum, p) => sum + parseFloat(p.price) * parseInt(p.stock),
          0,
        );
        setStats({
          totalItems,
          lowStock,
          outOfStock,
          totalValue: totalValue.toFixed(2),
        });
        console.log("Calculated Stats:", {
          totalItems,
          lowStock,
          outOfStock,
          totalValue: totalValue.toFixed(2),
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setLoading(true);
            fetchStats();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <MdRefresh className="h-4 w-4" />
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Items"
          value={stats.totalItems.toLocaleString()}
          footer={isInventory ? "+2.5% vs last month" : "+12 this week"}
          footerClass={
            isInventory
              ? "text-emerald-600"
              : "text-emerald-600 flex items-center gap-1"
          }
          icon={MdInventory2}
          iconWrapClass="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats.lowStock}
          footer={isInventory ? "Immediate action required" : "ACTION REQUIRED"}
          footerClass={
            isInventory
              ? "text-gray-500"
              : "text-amber-600 font-semibold uppercase tracking-wide"
          }
          icon={IoWarningOutline}
          iconWrapClass="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock}
          footer={isInventory ? "Restock recommended" : "2 more than yesterday"}
          footerClass={
            isInventory
              ? "text-gray-500"
              : "text-red-600 flex items-center gap-1"
          }
          icon={MdDoNotDisturbOn}
          iconWrapClass="bg-red-50 text-red-600"
        />
        <StatCard
          title="Total Inventory Value"
          value={`$${stats.totalValue}`}
          footer={isInventory ? "Stable vs last month" : "3.2% Increase"}
          footerClass={
            isInventory
              ? "text-gray-500"
              : "text-emerald-600 flex items-center gap-1"
          }
          icon={MdPayments}
          iconWrapClass="bg-emerald-50 text-emerald-600"
        />
      </div>
    </div>
  );
};

export default InventoryStock;
