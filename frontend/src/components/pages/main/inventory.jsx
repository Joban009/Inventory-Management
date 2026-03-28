import React, { useState } from "react";
import { MdDownload } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { MdOutlineRotateLeft } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddItems from "../../AddItems";
import Navbar from "../../Navbar";
import InventoryStick from "../../InventoryStock";
import inventoryData from "../../../data/inventoryProducts.json";
import { getIconForCategory } from "../../../data/inventoryProductIcons";

const rows = inventoryData.products.map((p) => ({
  ...p,
  icon: getIconForCategory(p.category),
}));

const StockCell = ({ label, pct, barClass }) => {
  const labelClass =
    label === "Good"
      ? "text-emerald-600"
      : label === "Low"
        ? "text-amber-600"
        : "text-red-600";
  return (
    <div className="min-w-[120px]">
      <p className={`text-xs font-semibold ${labelClass}`}>{label}</p>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${barClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const Inventory = () => {
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="min-h-full bg-slate-50">
      <Navbar searchPlaceholder="Search products, SKU or category..." />

      <div className="px-6 pb-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Inventory Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Real-time overview of your warehouse stock and catalog.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <MdDownload className="h-5 w-5 text-gray-500" />
              Export
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
              onClick={() => setShowModel(true)}
            >
              <IoIosAdd className="h-5 w-5" />
              Add New Item
            </button>
          </div>
        </div>

        <div className="mb-6">
          <InventoryStick variant="inventory" />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-lg font-bold text-gray-900">Product Catalog</h2>
            <div className="flex items-center gap-1 text-gray-500">
              <button
                type="button"
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 hover:text-gray-800"
                aria-label="Filter"
              >
                <MdFilterList className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 hover:text-gray-800"
                aria-label="Refresh"
              >
                <MdOutlineRotateLeft className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  {["PRODUCT NAME", "SKU", "CATEGORY", "STOCK LEVEL", "PRICE", "ACTIONS"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {rows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <tr key={row.sku} className="transition-colors hover:bg-gray-50/80">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="font-medium text-gray-900">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{row.sku}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${row.catClass}`}
                        >
                          {row.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <StockCell label={row.stockLabel} pct={row.stockPct} barClass={row.barClass} />
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-900">{row.price}</td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                          aria-label="Row actions"
                        >
                          <BsThreeDotsVertical className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row">
            <p className="text-xs text-gray-500">Showing 1 to 5 of 124 results</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white"
              >
                1
              </button>
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                2
              </button>
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                3
              </button>
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModel && <AddItems onClose={() => setShowModel(false)} />}
    </div>
  );
};

export default Inventory;
