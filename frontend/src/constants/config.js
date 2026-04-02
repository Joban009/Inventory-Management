/**
 * Application Configuration
 * Centralized settings and constants
 */

export const API_BASE_URL =
  "http://localhost/Inventory_Management/InventoryMGT/backend";

export const API_ENDPOINTS = {
  // Auth
  AUTH_CHECK: "/auth_check.php",
  LOGIN_REGISTER: "/login_registration.php",

  // Inventory
  PRODUCTS: "/products.php",
  ADD_PRODUCT: "/add_product.php",

  // Suppliers
  SUPPLIERS: "/suppliers.php",
  SUPPLIER_STATS: "/supplier_stats.php",

  // Analytics
  STOCK_MOVEMENTS: "/stock_movements.php",
  STOCK_TREND: "/stock_trend.php",
  STOCK_BY_CATEGORY: "/stock_by_category.php",
  INVENTORY_VALUE: "/inventory_value.php",
  ACTIVITY: "/activity.php",

  // Settings
  SETTINGS: "/settings.php",
  ROLES: "/roles.php",
  NOTIFICATION_PREFERENCES: "/notification_preferences.php",
  EXPORT_DATA: "/export_data.php",
  IMPORT_DATA: "/import_data.php",
  PURGE_DATA: "/purge_data.php",
};

export const HTTP_CONFIG = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const PAGE_ROUTES = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  INVENTORY: "/inventory",
  REPORT: "/report",
  SUPPLIER: "/supplier",
  SUPPLIER_ADD: "/supplier/add",
  SETTING: "/setting",
};

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};
