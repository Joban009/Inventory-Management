/**
 * Centralized API Service
 * All HTTP requests go through this layer for consistency
 */

import axios from "axios";
import { API_BASE_URL, HTTP_CONFIG } from "../constants/config.js";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  ...HTTP_CONFIG,
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

// AUTH ENDPOINTS
export const authService = {
  check: () => apiClient.get("/auth_check.php"),
  login: (email, password) =>
    apiClient.post("/login_registration.php", {
      action: "login",
      userEmail: email,
      password,
    }),
  register: (name, orgName, email, password) =>
    apiClient.post("/login_registration.php", {
      action: "register",
      userName: name,
      orgName,
      userEmail: email,
      password,
    }),
};

// INVENTORY ENDPOINTS
export const inventoryService = {
  getAllProducts: () => apiClient.get("/products.php"),
  addProduct: (productData) => apiClient.post("/products.php", productData),
  addProductLegacy: (productData) =>
    apiClient.post("/add_product.php", productData),
};

// SUPPLIER ENDPOINTS
export const supplierService = {
  getAllSuppliers: () => apiClient.get("/suppliers.php"),
  getStatistics: () => apiClient.get("/supplier_stats.php"),
  addSupplier: (supplierData) => apiClient.post("/suppliers.php", supplierData),
  updateSupplier: (supplierId, supplierData) =>
    apiClient.put("/suppliers.php", { id: supplierId, ...supplierData }),
  deleteSupplier: (supplierId) =>
    apiClient.delete("/suppliers.php", { data: { id: supplierId } }),
};

// ANALYTICS ENDPOINTS
export const analyticsService = {
  getStockMovements: () => apiClient.get("/stock_movements.php"),
  getStockTrend: () => apiClient.get("/stock_trend.php"),
  getStockByCategory: () => apiClient.get("/stock_by_category.php"),
  getInventoryValue: () => apiClient.get("/inventory_value.php"),
  getActivity: () => apiClient.get("/activity.php"),
};

// SETTINGS ENDPOINTS
export const settingsService = {
  getSettings: () => apiClient.get("/settings.php"),
  updateSettings: (settingsData) =>
    apiClient.post("/settings.php", settingsData),

  getNotifications: () => apiClient.get("/notification_preferences.php"),
  updateNotifications: (notificationData) =>
    apiClient.post("/notification_preferences.php", notificationData),

  getRoles: () => apiClient.get("/roles.php"),
  createRole: (roleData) => apiClient.post("/roles.php", roleData),
  updateRole: (roleId, roleData) =>
    apiClient.put("/roles.php", { id: roleId, ...roleData }),
  deleteRole: (roleId) =>
    apiClient.delete("/roles.php", { data: { id: roleId } }),

  exportData: (format) => apiClient.get(`/export_data.php?format=${format}`),
  importData: (formData) =>
    apiClient.post("/import_data.php", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  purgeData: () =>
    apiClient.delete("/purge_data.php", {
      data: { confirm: "PURGE_ALL_DATA" },
    }),
};

export default apiClient;
