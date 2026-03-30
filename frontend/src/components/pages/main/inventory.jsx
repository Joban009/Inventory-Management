import React, { useState, useEffect } from "react";
import { MdDownload } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { MdOutlineRotateLeft } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddItems from "../../AddItems";
import Navbar from "../../Navbar";
import InventoryStick from "../../InventoryStock";
import { getIconForCategory } from "../../../data/inventoryProductIcons";

// Derive stock label/bar styling from a stock count
const getStockMeta = (stock) => {
  if (stock >= 50) return { stockLabel: "Good", stockPct: 100, barClass: "bg-emerald-500" };
  if (stock >= 15) return { stockLabel: "Low", stockPct: 40, barClass: "bg-amber-500" };
  return { stockLabel: "Critical", stockPct: 10, barClass: "bg-red-500" };
};

// Category badge classes
const catClassMap = {
  electronics: "bg-blue-50 text-blue-700 ring-blue-700/10",
  furniture: "bg-amber-50 text-amber-700 ring-amber-700/10",
  apparel: "bg-purple-50 text-purple-700 ring-purple-700/10",
  accessories: "bg-green-50 text-green-700 ring-green-700/10",
};

const StockCell = ({ label, pct, barClass }) => {
  const labelClass =
    label === "Good" ? "text-emerald-600" : label === "Low" ? "text-amber-600" : "text-red-600";
  return (
    <div className="min-w-[120px]">
      <p className={`text-xs font-semibold ${labelClass}`}>{label}</p>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${barClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const ITEMS_PER_PAGE = 10;

const Inventory = () => {
  const [showModel, setShowModel] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost/api/product.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.status === "success") {
        setProducts(data.products);
      } else {
        setError(data.message || "Failed to fetch products.");
      }
    } catch {
      setError("Network error. Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Map raw DB rows → display rows
  const rows = products.map((p) => {
    const Icon = getIconForCategory(p.category);
    const { stockLabel, stockPct, barClass } = getStockMeta(Number(p.stock ?? 0));
    return {
      ...p,
      icon: Icon,
      stockLabel,
      stockPct,
      barClass,
      catClass: catClassMap[p.category] ?? "bg-gray-50 text-gray-700 ring-gray-700/10",
      price: `$${Number(p.price).toFixed(2)}`,
    };
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(rows.length / ITEMS_PER_PAGE));
  const pagedRows = rows.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleItemAdded = (newProduct) => {
    // Optimistically prepend the new product
    setProducts((prev) => [newProduct, ...prev]);
    setPage(1);
  };

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
                onClick={fetchProducts}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 hover:text-gray-800"
                aria-label="Refresh"
              >
                <MdOutlineRotateLeft className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Error state */}
          {error && (
            <div className="px-5 py-4 text-sm text-red-600 bg-red-50 border-b border-red-100">
              {error}
            </div>
          )}

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
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-400 text-sm">
                      Loading products...
                    </td>
                  </tr>
                ) : pagedRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-400 text-sm">
                      No products found. Add your first item!
                    </td>
                  </tr>
                ) : (
                  pagedRows.map((row) => {
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
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${row.catClass}`}>
                            {row.category || "—"}
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
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row">
            <p className="text-xs text-gray-500">
              Showing {rows.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(page * ITEMS_PER_PAGE, rows.length)} of {rows.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${p === page
                      ? "bg-blue-500 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModel && (
        <AddItems
          onClose={() => setShowModel(false)}
          onItemAdded={handleItemAdded}
        />
      )}
    </div>
  );
};

export default Inventory;