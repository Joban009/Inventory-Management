/**
 * Centralized API Service
 * All HTTP requests go through this layer for consistency
 */

import axios from "axios";

// ✅ Read from env variable, fall back to Render URL directly
// This means it works even if VITE_API_BASE_URL is missing in Vercel
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://inventory-management-te6v.onrender.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for request logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API Error]", error);
    return Promise.reject(error);
  },
);

// Interceptor for response logging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error(
      "[API Error Response]",
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

// ─── AUTH ─────────────────────────────────────────────────────────────────────
// ✅ Added /auth/ prefix to match backend/auth/ folder
export const authService = {
  check: () => apiClient.get("/auth/auth_check.php"),

  login: (email, password) =>
    apiClient.post("/auth/login_registration.php", {
      action: "login",
      userEmail: email,
      password,
    }),

  register: (name, orgName, email, password) =>
    apiClient.post("/auth/login_registration.php", {
      action: "register",
      userName: name,
      orgName,
      userEmail: email,
      password,
    }),
};

// ─── INVENTORY ────────────────────────────────────────────────────────────────
// ✅ Added /inventory/ prefix to match backend/inventory/ folder
export const inventoryService = {
  getAllProducts: () => apiClient.get("/inventory/products.php"),

  addProduct: (productData) =>
    apiClient.post("/inventory/products.php", productData),

  addProductLegacy: (productData) =>
    apiClient.post("/inventory/add_product.php", productData),

  getInventoryValue: () => apiClient.get("/inventory/inventory_value.php"),

  getStockByCategory: () => apiClient.get("/inventory/stock_by_category.php"),

  getActivity: () => apiClient.get("/inventory/activity.php"),
};

// ─── SUPPLIERS ────────────────────────────────────────────────────────────────
// ✅ Added /suppliers/ prefix to match backend/suppliers/ folder
export const supplierService = {
  getAllSuppliers: () => apiClient.get("/suppliers/suppliers.php"),

  getStatistics: () => apiClient.get("/suppliers/supplier_stats.php"),

  addSupplier: (supplierData) =>
    apiClient.post("/suppliers/suppliers.php", supplierData),

  updateSupplier: (supplierId, supplierData) =>
    apiClient.put("/suppliers/suppliers.php", {
      id: supplierId,
      ...supplierData,
    }),

  deleteSupplier: (supplierId) =>
    apiClient.delete("/suppliers/suppliers.php", { data: { id: supplierId } }),
};

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
// ✅ Added /analytics/ prefix to match backend/analytics/ folder
export const analyticsService = {
  getStockMovements: () => apiClient.get("/analytics/stock_movements.php"),

  getStockTrend: (days = 7) =>
    apiClient.get(`/analytics/stock_trend.php?days=${days}`),

  getStockByCategory: () => apiClient.get("/inventory/stock_by_category.php"),

  getInventoryValue: () => apiClient.get("/inventory/inventory_value.php"),

  getActivity: () => apiClient.get("/inventory/activity.php"),
};

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
// ✅ Added /settings/ prefix to match backend/settings/ folder
export const settingsService = {
  getSettings: () => apiClient.get("/settings/settings.php"),

  updateSettings: (settingsData) =>
    apiClient.post("/settings/settings.php", settingsData),

  getNotifications: () =>
    apiClient.get("/settings/notification_preferences.php"),

  updateNotifications: (notificationData) =>
    apiClient.post("/settings/notification_preferences.php", notificationData),

  getRoles: () => apiClient.get("/settings/roles.php"),

  createRole: (roleData) => apiClient.post("/settings/roles.php", roleData),

  updateRole: (roleId, roleData) =>
    apiClient.put("/settings/roles.php", { id: roleId, ...roleData }),

  deleteRole: (roleId) =>
    apiClient.delete("/settings/roles.php", { data: { id: roleId } }),

  exportData: (format, type = "products") =>
    apiClient.get(`/settings/export_data.php?format=${format}&type=${type}`),

  importData: (formData) =>
    apiClient.post("/settings/import_data.php", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  purgeData: () =>
    apiClient.delete("/settings/purge_data.php", {
      data: { confirm: "PURGE_ALL_DATA" },
    }),
};

export default apiClient;
