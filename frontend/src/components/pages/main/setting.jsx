import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { GiCheckedShield } from "react-icons/gi";
import { FaDatabase } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";

const Toggle = ({ on, onClick }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={onClick}
    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
      on ? "bg-blue-500" : "bg-gray-200"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
        on ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const Setting = () => {
  const [weeklySummary, setWeeklySummary] = useState(false);

  return (
    <div className="min-h-full bg-slate-50">
      <div className="border-b border-gray-100 bg-slate-50/95 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            System settings
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
              aria-label="Help"
            >
              <FaQuestionCircle className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
              aria-label="Dark mode"
            >
              <MdDarkMode className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10">
        <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Inventory System Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Configure your global preferences and account management.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FaUser className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-gray-900">General Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-900" htmlFor="wh-name">
                  Warehouse Name
                </label>
                <input
                  id="wh-name"
                  type="text"
                  defaultValue="Main Hub South"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-900" htmlFor="tz">
                  Timezone
                </label>
                <div className="relative">
                  <select
                    id="tz"
                    defaultValue="est"
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="est">Eastern Standard Time (EST)</option>
                    <option value="pst">Pacific Standard Time (PST)</option>
                    <option value="utc">UTC</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                    ▼
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-900" htmlFor="desc">
                  Description
                </label>
                <textarea
                  id="desc"
                  rows={4}
                  defaultValue="Primary distribution center for electronics and office equipment."
                  className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <MdNotificationsActive className="h-5 w-5" />
              </span>
              <h2 className="text-base font-bold text-gray-900">Notification Preferences</h2>
            </div>
            <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100">
              <li className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Low Stock Email Alerts</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Receive an email when product stock falls below the threshold.
                  </p>
                </div>
                <Toggle on />
              </li>
              <li className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Out of Stock Alerts</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Receive notification for products with zero inventory.
                  </p>
                </div>
                <Toggle on />
              </li>
              <li className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Weekly Inventory Summary</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    A weekly PDF report of all stock movements.
                  </p>
                </div>
                <Toggle
                  on={weeklySummary}
                  onClick={() => setWeeklySummary((v) => !v)}
                />
              </li>
            </ul>
          </section>

          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <GiCheckedShield className="h-5 w-5" />
              </span>
              <h2 className="text-base font-bold text-gray-900">User Roles &amp; Permissions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    {["ROLE NAME", "DESCRIPTION", "USERS", "ACTION"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Super Admin</td>
                    <td className="px-6 py-4 text-gray-600">Full access to all system settings.</td>
                    <td className="px-6 py-4 text-gray-900">2</td>
                    <td className="px-6 py-4">
                      <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Warehouse Staff</td>
                    <td className="px-6 py-4 text-gray-600">Can edit stock levels and view catalog.</td>
                    <td className="px-6 py-4 text-gray-900">8</td>
                    <td className="px-6 py-4">
                      <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Viewer</td>
                    <td className="px-6 py-4 text-gray-600">Read-only access to dashboard and reports.</td>
                    <td className="px-6 py-4 text-gray-900">5</td>
                    <td className="px-6 py-4">
                      <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 px-6 py-4">
              <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                + Create New Role
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FaDatabase className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-gray-900">Data Export / Import</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5">
                <p className="font-semibold text-gray-900">Export Data</p>
                <p className="mt-1 text-xs text-gray-500">
                  Download your entire product catalog and history in CSV or JSON format.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    CSV Export
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    JSON Export
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5">
                <p className="font-semibold text-gray-900">Import Data</p>
                <p className="mt-1 text-xs text-gray-500">
                  Bulk update or add items to your inventory via file upload.
                </p>
                <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white px-4 py-10 text-center transition-colors hover:border-blue-300 hover:bg-blue-50/30">
                  <HiOutlineUpload className="mb-2 h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Click or drag CSV file here</span>
                  <input type="file" accept=".csv" className="hidden" />
                </label>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-red-200 bg-red-50/60 shadow-sm">
            <div className="border-b border-red-100 px-6 py-4">
              <h2 className="text-base font-bold text-red-600">Danger Zone</h2>
              <p className="mt-1 text-sm text-red-700/80">Actions here are permanent and cannot be undone.</p>
            </div>
            <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-gray-900">Delete Warehouse Data</p>
                <p className="mt-0.5 text-sm text-gray-600">Wipe all inventory and history records.</p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600"
              >
                Purge Data
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Setting;
