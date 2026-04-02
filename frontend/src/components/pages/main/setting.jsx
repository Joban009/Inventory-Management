import React, { useState, useEffect } from "react";
import axios from "axios";
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
  // Settings State
  const [settings, setSettings] = useState({
    warehouse_name: "Main Hub South",
    timezone: "EST",
    description:
      "Primary distribution center for electronics and office equipment.",
  });

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    low_stock_alerts: true,
    out_of_stock_alerts: true,
    weekly_summary: false,
  });

  // Roles State
  const [roles, setRoles] = useState([]);

  // Create Role Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRole, setNewRole] = useState({
    role_name: "",
    description: "",
  });

  // Edit Role Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // UI State
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch settings
      const settingsRes = await axios.get("/backend/settings/settings.php", {
        withCredentials: true,
      });
      if (settingsRes.data?.status === "success") {
        setSettings(settingsRes.data.settings);
      }

      // Fetch notification preferences
      const notifRes = await axios.get(
        "/backend/settings/notification_preferences.php",
        { withCredentials: true },
      );
      if (notifRes.data?.status === "success") {
        setNotifications(notifRes.data.preferences);
      }

      // Fetch roles
      const rolesRes = await axios.get("/backend/settings/roles.php", {
        withCredentials: true,
      });
      if (rolesRes.data?.status === "success") {
        setRoles(rolesRes.data.roles);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load settings. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "/backend/settings/settings.php",
        settings,
        { withCredentials: true },
      );
      if (response.data?.status === "success") {
        setSuccess("Settings saved successfully!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "/backend/settings/notification_preferences.php",
        notifications,
        { withCredentials: true },
      );
      if (response.data?.status === "success") {
        setSuccess("Notification preferences updated!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error("Error saving notifications:", err);
      setError("Failed to save notification preferences. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      window.location.href = "/backend/settings/export_data.php?format=csv";
    } catch (err) {
      console.error("Error exporting CSV:", err);
      setError("Failed to export CSV");
    }
  };

  const handleExportJSON = async () => {
    try {
      window.location.href = "/backend/settings/export_data.php?format=json";
    } catch (err) {
      console.error("Error exporting JSON:", err);
      setError("Failed to export JSON");
    }
  };

  const handleImportCSV = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "/backend/settings/import_data.php",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (response.data?.status === "success") {
        setSuccess(
          `Import successful! ${response.data.imported_count} records imported.`,
        );
        setTimeout(() => setSuccess(""), 4000);
      }
    } catch (err) {
      console.error("Error importing CSV:", err);
      setError(
        err.response?.data?.message ||
          "Failed to import CSV. Please try again.",
      );
    } finally {
      setSaving(false);
      // Reset file input
      e.target.value = "";
    }
  };

  const handlePurgeData = async () => {
    const confirmed = window.confirm(
      "⚠️ WARNING: This will permanently delete ALL inventory data including products, stock movements, and activity history. This action cannot be undone.\n\nType 'PURGE_ALL_DATA' to confirm.",
    );

    if (!confirmed) return;

    const userConfirm = prompt(
      "Enter PURGE_ALL_DATA to confirm data deletion:",
    );
    if (userConfirm !== "PURGE_ALL_DATA") {
      setError("Purge cancelled. Data is safe.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.delete("/backend/settings/purge_data.php", {
        data: { confirm: "PURGE_ALL_DATA" },
        withCredentials: true,
      });

      if (response.data?.status === "success") {
        setSuccess(
          `Data purged! ${response.data.deleted_records.total} records deleted.`,
        );
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error("Error purging data:", err);
      setError(
        err.response?.data?.message ||
          "Failed to purge data. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();

    // Validation
    if (!newRole.role_name.trim()) {
      setError("Role name is required");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "/backend/settings/roles.php",
        {
          role_name: newRole.role_name.trim(),
          description: newRole.description.trim(),
        },
        { withCredentials: true },
      );

      if (response.data?.status === "success") {
        setSuccess("Role created successfully!");
        setShowCreateModal(false);
        setNewRole({ role_name: "", description: "" });
        setTimeout(() => setSuccess(""), 3000);
        // Refresh roles list
        fetchAllData();
      }
    } catch (err) {
      console.error("Error creating role:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create role. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setShowEditModal(true);
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();

    if (!editingRole.role_name.trim()) {
      setError("Role name is required");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `/backend/settings/roles.php?id=${editingRole.id}`,
        {
          role_name: editingRole.role_name.trim(),
          description: editingRole.description.trim(),
        },
        { withCredentials: true },
      );

      if (response.data?.status === "success") {
        setSuccess("Role updated successfully!");
        setShowEditModal(false);
        setEditingRole(null);
        setTimeout(() => setSuccess(""), 3000);
        // Refresh roles list
        fetchAllData();
      }
    } catch (err) {
      console.error("Error updating role:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update role. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleToggleDarkMode = () => {
    // TODO: Implement dark mode toggle
    console.log("Dark mode toggle clicked");
  };

  const handleShowHelp = () => {
    // TODO: Show help documentation or modal
    console.log("Help button clicked");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

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
              onClick={handleShowHelp}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
              aria-label="Help"
            >
              <FaQuestionCircle className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleToggleDarkMode}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
              aria-label="Dark mode"
            >
              <MdDarkMode className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Inventory System Settings
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Configure your global preferences and account management.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {/* General Profile Section */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FaUser className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-gray-900">
                General Profile
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold text-gray-900"
                  htmlFor="wh-name"
                >
                  Warehouse Name
                </label>
                <input
                  id="wh-name"
                  name="warehouse_name"
                  type="text"
                  value={settings.warehouse_name}
                  onChange={handleSettingsChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold text-gray-900"
                  htmlFor="tz"
                >
                  Timezone
                </label>
                <div className="relative">
                  <select
                    id="tz"
                    name="timezone"
                    value={settings.timezone}
                    onChange={handleSettingsChange}
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="est">Eastern Standard Time (EST)</option>
                    <option value="pst">Pacific Standard Time (PST)</option>
                    <option value="utc">UTC</option>
                    <option value="cst">Central Standard Time (CST)</option>
                    <option value="mst">Mountain Standard Time (MST)</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    ▼
                  </span>
                </div>
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold text-gray-900"
                  htmlFor="desc"
                >
                  Description
                </label>
                <textarea
                  id="desc"
                  name="description"
                  rows={4}
                  value={settings.description}
                  onChange={handleSettingsChange}
                  className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </section>

          {/* Notification Preferences Section */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <MdNotificationsActive className="h-5 w-5" />
              </span>
              <h2 className="text-base font-bold text-gray-900">
                Notification Preferences
              </h2>
            </div>
            <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100">
              <li className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Low Stock Email Alerts
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Receive an email when product stock falls below the
                    threshold.
                  </p>
                </div>
                <Toggle
                  on={notifications.low_stock_alerts}
                  onClick={() => {
                    handleNotificationChange("low_stock_alerts");
                  }}
                />
              </li>
              <li className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Out of Stock Alerts
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Receive notification for products with zero inventory.
                  </p>
                </div>
                <Toggle
                  on={notifications.out_of_stock_alerts}
                  onClick={() => {
                    handleNotificationChange("out_of_stock_alerts");
                  }}
                />
              </li>
              <li className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Weekly Inventory Summary
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    A weekly PDF report of all stock movements.
                  </p>
                </div>
                <Toggle
                  on={notifications.weekly_summary}
                  onClick={() => {
                    handleNotificationChange("weekly_summary");
                  }}
                />
              </li>
            </ul>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleSaveNotifications}
                disabled={saving}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </section>

          {/* Roles Section */}
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <GiCheckedShield className="h-5 w-5" />
              </span>
              <h2 className="text-base font-bold text-gray-900">
                User Roles &amp; Permissions
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    {["ROLE NAME", "DESCRIPTION", "USERS", "ACTION"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {roles.map((role) => (
                    <tr key={role.id}>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {role.role_name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {role.description}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {role.user_count}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleEditRole(role)}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                + Create New Role
              </button>
            </div>
          </section>

          {/* Data Export/Import Section */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FaDatabase className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-gray-900">
                Data Export / Import
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5">
                <p className="font-semibold text-gray-900">Export Data</p>
                <p className="mt-1 text-xs text-gray-500">
                  Download your entire product catalog and history in CSV or
                  JSON format.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    disabled={saving}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
                  >
                    CSV Export
                  </button>
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    disabled={saving}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
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
                  <span className="text-sm font-medium text-gray-600">
                    Click or drag CSV file here
                  </span>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportCSV}
                    disabled={saving}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Danger Zone Section */}
          <section className="overflow-hidden rounded-xl border border-red-200 bg-red-50/60 shadow-sm">
            <div className="border-b border-red-100 px-6 py-4">
              <h2 className="text-base font-bold text-red-600">Danger Zone</h2>
              <p className="mt-1 text-sm text-red-700/80">
                Actions here are permanent and cannot be undone.
              </p>
            </div>
            <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-gray-900">
                  Delete Warehouse Data
                </p>
                <p className="mt-0.5 text-sm text-gray-600">
                  Wipe all inventory and history records.
                </p>
              </div>
              <button
                type="button"
                onClick={handlePurgeData}
                disabled={saving}
                className="shrink-0 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 disabled:opacity-50"
              >
                {saving ? "Processing..." : "Purge Data"}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-100 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">
                Create New Role
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Add a new role to your system
              </p>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4 px-6 py-4">
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold text-gray-900"
                  htmlFor="role-name"
                >
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="role-name"
                  type="text"
                  value={newRole.role_name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, role_name: e.target.value })
                  }
                  placeholder="e.g., Accountant, Supervisor"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-xs font-bold text-gray-900"
                  htmlFor="role-desc"
                >
                  Description
                </label>
                <textarea
                  id="role-desc"
                  rows={3}
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  placeholder="Describe the responsibilities and access level..."
                  className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewRole({ role_name: "", description: "" });
                  }}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  {saving ? "Creating..." : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && editingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-100 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">Edit Role</h3>
              <p className="mt-1 text-sm text-gray-500">Update role details</p>
            </div>

            <form onSubmit={handleUpdateRole} className="space-y-4 px-6 py-4">
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold text-gray-900"
                  htmlFor="edit-role-name"
                >
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-role-name"
                  type="text"
                  value={editingRole.role_name}
                  onChange={(e) =>
                    setEditingRole({
                      ...editingRole,
                      role_name: e.target.value,
                    })
                  }
                  placeholder="e.g., Accountant, Supervisor"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold text-gray-900"
                  htmlFor="edit-role-desc"
                >
                  Description
                </label>
                <textarea
                  id="edit-role-desc"
                  rows={3}
                  value={editingRole.description}
                  onChange={(e) =>
                    setEditingRole({
                      ...editingRole,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the responsibilities and access level..."
                  className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingRole(null);
                  }}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  {saving ? "Updating..." : "Update Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
