import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../common/Navbar";
import { IoMdAddCircle } from "react-icons/io";
import { MdFileDownload, MdTimer } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { AiOutlineFall, AiOutlineRise } from "react-icons/ai";
import { FcDocument } from "react-icons/fc";
import { GoChecklist } from "react-icons/go";
import { MdFilterList, MdOutlineRotateLeft } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { FaBuilding, FaTruck, FaChair } from "react-icons/fa6";

const summaryCards = [
  {
    title: "Total Suppliers",
    value: "84",
    footer: "+3 this month",
    footerClass: "text-emerald-600",
    icon: FaUserGroup,
    iconWrap: "bg-blue-50 text-blue-600",
    trend: AiOutlineRise,
  },
  {
    title: "Active Contracts",
    value: "62",
    footer: "Across 12 categories",
    footerClass: "text-gray-500",
    icon: FcDocument,
    iconWrap: "bg-violet-50 text-violet-600",
  },
  {
    title: "Pending Orders",
    value: "18",
    footer: "Awaiting fulfillment",
    footerClass: "text-gray-500",
    icon: GoChecklist,
    iconWrap: "bg-amber-50 text-amber-600",
  },
  {
    title: "Avg. Lead Time",
    value: "4.2d",
    footer: "-0.5d improved",
    footerClass: "text-emerald-600",
    icon: MdTimer,
    iconWrap: "bg-emerald-50 text-emerald-600",
    trend: AiOutlineFall,
  },
];

const defaultSuppliers = [
  {
    name: "Global Tech Corp",
    uid: "SUP-0144",
    contact: "Sarah Chen",
    email: "s.chen@globaltech.example",
    category: "Electronics",
    catClass: "bg-blue-50 text-blue-700 ring-blue-100",
    rating: "4.8",
    ratingLabel: "Excellent",
    date: "Mar 12, 2024",
    icon: "building",
  },
  {
    name: "ComfortWorks Ltd",
    uid: "SUP-0291",
    contact: "James Miller",
    email: "jmiller@comfortworks.example",
    category: "Furniture",
    catClass: "bg-violet-50 text-violet-700 ring-violet-100",
    rating: "4.6",
    ratingLabel: "Very Good",
    date: "Mar 08, 2024",
    icon: FaChair,
  },
  {
    name: "FastLane Logistics",
    uid: "SUP-1102",
    contact: "Elena Rossi",
    email: "e.rossi@fastlane.example",
    category: "Logistics",
    catClass: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    rating: "4.9",
    ratingLabel: "Excellent",
    date: "Feb 28, 2024",
    icon: FaTruck,
  },
  {
    name: "RawSource Materials",
    uid: "SUP-0455",
    contact: "David Okonjo",
    email: "d.okonjo@rawsource.example",
    category: "Raw Materials",
    catClass: "bg-orange-50 text-orange-700 ring-orange-100",
    rating: "4.3",
    ratingLabel: "Good",
    date: "Feb 22, 2024",
    icon: FaBuilding,
  },
  {
    name: "Pacific Components",
    uid: "SUP-0770",
    contact: "Mei Lin",
    email: "mlin@pacificcomp.example",
    category: "Electronics",
    catClass: "bg-blue-50 text-blue-700 ring-blue-100",
    rating: "4.7",
    ratingLabel: "Excellent",
    date: "Feb 19, 2024",
    icon: "building",
  },
];

const iconMap = {
  building: FaBuilding,
  truck: FaTruck,
  chair: FaChair,
};

const Supplier = () => {
  const [suppliers, setSuppliers] = useState(defaultSuppliers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalSuppliers: 0,
    activeSuppliers: 0,
    averageRating: 0,
    totalCategories: 0,
  });
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [rowMenu, setRowMenu] = useState(null);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "/backend/suppliers/supplier_stats.php",
          { withCredentials: true },
        );
        if (response.data?.status === "success") {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/backend/suppliers/suppliers.php",
          { withCredentials: true },
        );
        if (response.data?.status === "success") {
          const normalized = response.data.suppliers.map((item) => {
            const ratingNum = parseFloat(item.rating) || 0;
            return {
              ...item,
              name: item.name || "Unknown",
              uid: item.uid || `SUP-${item.id ?? "0000"}`,
              contact: item.contact || "N/A",
              email: item.email || "N/A",
              category: item.category || "General",
              catClass: "bg-gray-50 text-gray-700 ring-gray-100",
              rating: ratingNum.toFixed(1),
              ratingLabel:
                ratingNum >= 4.5
                  ? "Excellent"
                  : ratingNum >= 4.0
                  ? "Very Good"
                  : "Good",
              date: item.created_at
                ? new Date(item.created_at).toLocaleDateString()
                : "N/A",
              icon: item.icon || "building",
            };
          });
          setSuppliers(normalized);
          setError("");
        } else {
          setError(response.data?.message || "Unable to load suppliers.");
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setError("Network error while loading suppliers.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchSuppliers();
  }, []);

  const handleExport = () => {
    window.location.href = "/backend/settings/export_data.php?format=csv&type=suppliers";
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/backend/suppliers/suppliers.php",
        { withCredentials: true },
      );
      if (response.data?.status === "success") {
        const normalized = response.data.suppliers.map((item) => {
          const ratingNum = parseFloat(item.rating) || 0;
          return {
            ...item,
            name: item.name || "Unknown",
            uid: item.uid || `SUP-${item.id ?? "0000"}`,
            contact: item.contact || "N/A",
            email: item.email || "N/A",
            category: item.category || "General",
            catClass: "bg-gray-50 text-gray-700 ring-gray-100",
            rating: ratingNum.toFixed(1),
            ratingLabel:
              ratingNum >= 4.5
                ? "Excellent"
                : ratingNum >= 4.0
                ? "Very Good"
                : "Good",
            date: item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : "N/A",
            icon: item.icon || "building",
          };
        });
        setSuppliers(normalized);
        setError("");
      }
    } catch (error) {
      console.error("Error refreshing suppliers:", error);
      setError("Failed to refresh suppliers.");
    } finally {
      setLoading(false);
    }
  };

  const handleRowAction = (supplierUid, action) => {
    if (action === "edit") {
      // TODO: Navigate to edit page or open edit modal
      console.log("Edit supplier:", supplierUid);
    } else if (action === "delete") {
      if (window.confirm("Are you sure you want to delete this supplier?")) {
        // TODO: Call delete API endpoint
        console.log("Delete supplier:", supplierUid);
      }
    } else if (action === "details") {
      // TODO: Navigate to supplier details page
      console.log("View details:", supplierUid);
    }
    setRowMenu(null);
  };

  const totalPages = Math.max(1, Math.ceil(suppliers.length / ITEMS_PER_PAGE));
  const pagedSuppliers = suppliers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-full bg-slate-50">
      <Navbar searchPlaceholder="Search suppliers, contacts or categories..." />

      <div className="px-6 pb-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Supplier Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your vendor relationships and procurement sources.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <MdFileDownload className="h-5 w-5 text-gray-500" />
              Export List
            </button>
            <Link
              to="/supplier/add"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
            >
              <IoMdAddCircle className="h-5 w-5" />
              Add New Supplier
            </Link>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Suppliers",
              value: stats.totalSuppliers,
              footer: `${stats.activeSuppliers} active`,
              footerClass: "text-emerald-600",
              icon: FaUserGroup,
              iconWrap: "bg-blue-50 text-blue-600",
              trend: AiOutlineRise,
            },
            {
              title: "Active Suppliers",
              value: stats.activeSuppliers,
              footer: `${Math.round(
                (stats.activeSuppliers / Math.max(stats.totalSuppliers, 1)) *
                  100,
              )}% active`,
              footerClass: "text-gray-500",
              icon: FcDocument,
              iconWrap: "bg-violet-50 text-violet-600",
            },
            {
              title: "Categories",
              value: stats.totalCategories,
              footer: "Across suppliers",
              footerClass: "text-gray-500",
              icon: GoChecklist,
              iconWrap: "bg-amber-50 text-amber-600",
            },
            {
              title: "Avg. Rating",
              value: stats.averageRating.toFixed(1),
              footer: "Overall score",
              footerClass: "text-emerald-600",
              icon: MdTimer,
              iconWrap: "bg-emerald-50 text-emerald-600",
              trend: AiOutlineRise,
            },
          ].map((c) => {
            const Icon = c.icon;
            const Trend = c.trend;
            return (
              <div
                key={c.title}
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div
                  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg ${c.iconWrap}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-gray-500">{c.title}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {c.value}
                </p>
                <p
                  className={`mt-2 flex items-center gap-1 text-xs font-medium ${c.footerClass}`}
                >
                  {Trend && <Trend className="h-4 w-4" />}
                  {c.footer}
                </p>
              </div>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-lg font-bold text-gray-900">
              Supplier Directory
            </h2>
            <div className="flex items-center gap-1 text-gray-500">
              <button
                type="button"
                onClick={() => setShowFilter(!showFilter)}
                className="rounded-lg p-2 hover:bg-gray-100 hover:text-gray-800"
                aria-label="Filter"
              >
                <MdFilterList className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleRefresh}
                className="rounded-lg p-2 hover:bg-gray-100 hover:text-gray-800"
                aria-label="Refresh"
              >
                <MdOutlineRotateLeft className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center text-sm text-gray-500">
                Loading suppliers...
              </div>
            ) : error ? (
              <div className="p-6 text-center text-sm text-red-500">
                {error}
              </div>
            ) : suppliers.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                No suppliers found.
              </div>
            ) : (
              <>
                <table className="w-full min-w-240 border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/80">
                      {[
                        "SUPPLIER NAME",
                        "PRIMARY CONTACT",
                        "CATEGORY",
                        "RATING",
                        "LAST ORDER DATE",
                        "ACTIONS",
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
                    {pagedSuppliers.map((s) => {
                      const Icon =
                        typeof s.icon === "string"
                          ? iconMap[s.icon] || FaBuilding
                          : s.icon;
                      return (
                        <tr key={s.uid} className="hover:bg-gray-50/80">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                <Icon className="h-5 w-5" />
                              </span>
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {s.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  UID: {s.uid}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-gray-900">
                              {s.contact}
                            </p>
                            <a
                              href={`mailto:${s.email}`}
                              className="text-xs font-medium text-blue-600 hover:underline"
                            >
                              {s.email}
                            </a>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${s.catClass}`}
                            >
                              {s.category}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5">
                              <FaStar className="h-4 w-4 text-amber-500" />
                              <span className="font-semibold text-gray-900">
                                {s.rating}
                              </span>
                              <span className="text-xs text-gray-500">
                                {s.ratingLabel}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gray-600">{s.date}</td>
                          <td className="px-5 py-4">
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setRowMenu(rowMenu === s.uid ? null : s.uid)}
                                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                aria-label="Row actions"
                              >
                                <BsThreeDotsVertical className="h-5 w-5" />
                              </button>
                              {rowMenu === s.uid && (
                                <div className="absolute right-0 z-10 rounded-lg border border-gray-200 bg-white shadow-lg">
                                  <button
                                    type="button"
                                    onClick={() => handleRowAction(s.uid, "details")}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg"
                                  >
                                    View Details
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRowAction(s.uid, "edit")}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRowAction(s.uid, "delete")}
                                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row">
            <p className="text-xs text-gray-500">
              Showing {suppliers.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}{" "}
              to {Math.min(page * ITEMS_PER_PAGE, suppliers.length)} of{" "}
              {suppliers.length} vendors
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePageChange(p)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    p === page
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
                onClick={() => handlePageChange(page + 1)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
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

export default Supplier;
