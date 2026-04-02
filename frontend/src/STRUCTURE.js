/**
 * NEW FRONTEND STRUCTURE
 *
 * This document outlines the reorganized frontend architecture
 * Follow this pattern for all new component creation
 */

/**
 * Component Organization Guide
 * ==========================
 *
 * src/
 * ├── components/
 * │   ├── common/              [Reusable, shared components]
 * │   │   ├── Navbar.jsx       - Top navigation bar
 * │   │   ├── Footer.jsx       - Page footer
 * │   │   ├── LeftSideBar.jsx  - Sidebar navigation
 * │   │   └── InventoryStock.jsx - Stock display widget
 * │   │
 * │   ├── forms/               [Modal forms and input components]
 * │   │   ├── AddItems.jsx     - Product creation form
 * │   │   └── AddSupplier.jsx  - Supplier creation form
 * │   │
 * │   ├── charts/              [Data visualization components]
 * │   │   ├── StockTrendChart.jsx
 * │   │   ├── StockByCat.jsx
 * │   │   └── InventoryValueChart.jsx
 * │   │
 * │   └── pages/               [Page-level components]
 * │       ├── Login.jsx        - Auth page
 * │       └── main/            - Main app pages (protected)
 * │           ├── MainContainer.jsx - Layout wrapper
 * │           ├── Dashboard.jsx
 * │           ├── Inventory.jsx
 * │           ├── Supplier.jsx
 * │           ├── Report.jsx
 * │           └── Setting.jsx
 * │
 * ├── services/                [API & business logic]
 * │   └── api.js              - Centralized API client with all endpoints
 * │
 * ├── constants/               [Configuration & constants]
 * │   └── config.js           - API URLs, routes, config values
 * │
 * ├── utils/                   [Utility & helper functions]
 * │   └── helpers.js          - String, date, formatting utilities
 * │
 * ├── data/                    [Static data & resources]
 * │   ├── inventoryProducts.json
 * │   └── inventoryProductIcons.js
 * │
 * ├── App.jsx                  - Main router
 * ├── ProtectedRoute.jsx       - Auth wrapper
 * ├── main.jsx                 - React entry point
 * └── ...config files
 */

/**
 * IMPORT PATTERNS
 * ===============
 */

// ✅ DO: Import from services for API calls
import { supplierService, settingsService } from "../services/api.js";

// ✅ DO: Import from constants for config
import { API_BASE_URL, PAGE_ROUTES } from "../constants/config.js";

// ✅ DO: Import from utils for helpers
import { formatDate, formatCurrency, isValidEmail } from "../utils/helpers.js";

// ✅ DO: Import components with relative paths
import Navbar from "./common/Navbar.jsx";
import AddItems from "./forms/AddItems.jsx";
import StockTrendChart from "./charts/StockTrendChart.jsx";

// ❌ DON'T: Make direct API calls with hardcoded URLs
// Instead use: supplierService.getAllSuppliers()

// ❌ DON'T: Repeat utility functions
// Instead use: helpers.formatDate()

/**
 * API USAGE EXAMPLES
 * ==================
 */

// Getting all suppliers
async function loadSuppliers() {
  try {
    const response = await supplierService.getAllSuppliers();
    console.log(response.data.suppliers);
  } catch (error) {
    console.error("Failed to load suppliers:", error);
  }
}

// Creating a new role
async function createNewRole(roleName, description) {
  try {
    const response = await settingsService.createRole({
      role_name: roleName,
      description: description,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create role:", error);
  }
}

// Exporting data
async function downloadExport(format = "csv") {
  try {
    const response = await settingsService.exportData(format);
    window.location.href = response.data; // File download
  } catch (error) {
    console.error("Failed to export:", error);
  }
}

/**
 * MIGRATION CHECKLIST
 * ===================
 *
 * [ ] Move Navbar.jsx → components/common/Navbar.jsx
 * [ ] Move Footer.jsx → components/common/Footer.jsx
 * [ ] Move LeftSideBar.jsx → components/common/LeftSideBar.jsx
 * [ ] Move InventoryStock.jsx → components/common/InventoryStock.jsx
 * [ ] Move AddItems.jsx → components/forms/AddItems.jsx
 * [ ] Move AddSupplier.jsx → components/forms/AddSupplier.jsx
 * [ ] Keep charts/ as is (already organized)
 * [ ] Keep pages/ structure (already organized)
 * [ ] Update all imports in moved components
 * [ ] Update all imports in App.jsx
 * [ ] Update all imports in MainContainer.jsx
 * [ ] Create api.js service layer ✅ DONE
 * [ ] Create config.js constants ✅ DONE
 * [ ] Create helpers.js utilities ✅ DONE
 * [ ] Replace axios calls with service methods
 * [ ] Test build: npm run build
 * [ ] Verify functionality in browser
 */

export const STRUCTURE_GUIDE = "See comments above";
