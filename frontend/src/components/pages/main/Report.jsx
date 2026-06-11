import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { FaFilePdf } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import Navbar from "../../common/Navbar";
import { CiMenuKebab } from "react-icons/ci";
import StockByCat from "../../charts/StockByCat";
import InventoryValueChart from "../../charts/InventoryValueChart";
import { FaHeadphones } from "react-icons/fa6";
import { FaChair } from "react-icons/fa6";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import { MdSync } from "react-icons/md";

const initialMovements = [
  {
    date: "Mar 28, 2024 · 10:24 AM",
    product: "Premium Headphones",
    sku: "PH-102",
    type: "Inbound",
    typeClass: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    qty: "+50",
    qtyClass: "text-emerald-600",
    route: "Supplier → Main Hub",
    user: "AR",
    userBg: "bg-blue-500",
    iconName: "headphones",
  },
  {
    date: "Mar 28, 2024 · 09:02 AM",
    product: "Ergonomic Chair",
    sku: "CH-204",
    type: "Outbound",
    typeClass: "bg-orange-50 text-orange-700 ring-orange-100",
    qty: "-12",
    qtyClass: "text-orange-600",
    route: "Main Hub → Retail A",
    user: "MK",
    userBg: "bg-violet-500",
    iconName: "chair",
  },
  {
    date: "Mar 27, 2024 · 04:15 PM",
    product: "USB-C Hub Pro",
    sku: "AC-881",
    type: "Adjustment",
    typeClass: "bg-blue-50 text-blue-700 ring-blue-100",
    qty: "-3",
    qtyClass: "text-blue-600",
    route: "Cycle count",
    user: "AR",
    userBg: "bg-blue-500",
    iconName: "headphones",
  },
];

const TypeBadge = ({ label, className }) => {
  const Icon =
    label === "Inbound"
      ? HiArrowTrendingUp
      : label === "Outbound"
      ? HiArrowTrendingDown
      : MdSync;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
};

const iconMap = {
  headphones: FaHeadphones,
  chair: FaChair,
};

const Report = () => {
  const [movements, setMovements] = useState(initialMovements);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: "Jan 1, 2024",
    end: "Mar 31, 2024",
  });

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchMovements = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/backend/analytics/stock_movements.php", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.status === "success" && Array.isArray(data.movements)) {
          setMovements(data.movements);
          setPage(1);
        } else {
          setError(data.message || "Failed to load stock movements.");
        }
      } catch {
        setError("Network error while loading stock movements.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
  }, []);

  const totalPages = Math.max(1, Math.ceil(movements.length / ITEMS_PER_PAGE));
  const pageMovements = movements.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleExportPDF = () => {
    window.location.href =
      "/backend/settings/export_data.php?format=pdf&type=reports";
  };

  const handleExportCSV = () => {
    window.location.href =
      "/backend/settings/export_data.php?format=csv&type=reports";
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ start: startDate, end: endDate });
    setShowDatePicker(false);
    // TODO: Refetch movements with new date range
  };

  return (
    <div className="min-h-full bg-slate-50">
      <Navbar searchPlaceholder="Search reports..." />

      <div className="px-6 pb-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Reports &amp; Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Insightful data visualizations and movement logs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <SlCalender className="h-4 w-4 text-gray-500" />
              {dateRange.start} – {dateRange.end}
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <FaFilePdf className="h-4 w-4 text-red-500" />
              PDF
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <FaFileCsv className="h-4 w-4 text-emerald-600" />
              CSV
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-base font-bold text-gray-900">
                Stock by Category
              </p>
              <button
                type="button"
                onClick={() => console.log("Chart options")}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                aria-label="Chart options"
              >
                <CiMenuKebab className="h-5 w-5" />
              </button>
            </div>
            <StockByCat />
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-base font-bold text-gray-900">
                Inventory Value Over Time
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                $45.2k Current
              </span>
            </div>
            <InventoryValueChart />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Stock Movement Log
              </h2>
              <p className="text-sm text-gray-500">
                Recent inbound, outbound, and adjustment events.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowFilter(!showFilter)}
              className="self-start rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:self-auto"
            >
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  {[
                    "DATE & TIME",
                    "PRODUCT",
                    "TYPE",
                    "QUANTITY",
                    "SOURCE / DEST",
                    "USER",
                  ].map((h) => (
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
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-gray-400 text-sm"
                    >
                      Loading stock movement log...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-red-600 text-sm"
                    >
                      {error}
                    </td>
                  </tr>
                ) : pageMovements.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-gray-400 text-sm"
                    >
                      No movement logs found.
                    </td>
                  </tr>
                ) : (
                  pageMovements.map((row) => {
                    const Icon = iconMap[row.iconName] || FaHeadphones;
                    return (
                      <tr
                        key={row.date + row.sku}
                        className="hover:bg-gray-50/80"
                      >
                        <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                          {row.date}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-600">
                              <Icon className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="font-medium text-gray-900">
                                {row.product}
                              </p>
                              <p className="text-xs text-gray-500">{row.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <TypeBadge
                            label={row.type}
                            className={row.typeClass}
                          />
                        </td>
                        <td
                          className={`px-5 py-4 text-sm font-semibold ${row.qtyClass}`}
                        >
                          {row.qty}
                        </td>
                        <td className="px-5 py-4 text-gray-600">{row.route}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${row.userBg}`}
                          >
                            {row.user}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row">
            <p className="text-xs text-gray-500">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(page * ITEMS_PER_PAGE, movements.length)} of{" "}
              {movements.length} logs
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map((n) => {
                const pageNumber = n + 1;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => handlePageChange(pageNumber)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                      page === pageNumber
                        ? "bg-blue-500 text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
