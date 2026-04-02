# Frontend Project Structure - Reorganized

## 📁 New Directory Layout

```
frontend/src/
│
├── 📄 App.jsx                    # Main router configuration
├── 📄 main.jsx                   # React entry point
├── 📄 ProtectedRoute.jsx         # Authentication wrapper
├── 📄 STRUCTURE.js               # Structure guide & examples
│
├── 📁 components/                # React components (organized by type)
│   ├── 📁 common/               # Reusable, shared components
│   │   ├── Navbar.jsx           # Top navigation
│   │   ├── Footer.jsx           # Page footer
│   │   ├── LeftSideBar.jsx      # Sidebar menu
│   │   └── InventoryStock.jsx   # Stock widget
│   │
│   ├── 📁 forms/                # Modal & form components
│   │   ├── AddItems.jsx         # Product creation
│   │   └── AddSupplier.jsx      # Supplier creation
│   │
│   ├── 📁 charts/               # Data visualization
│   │   ├── StockTrendChart.jsx  # Trend line chart
│   │   ├── StockByCat.jsx       # Category pie chart
│   │   └── InventoryValueChart.jsx # Value bar chart
│   │
│   └── 📁 pages/                # Page components
│       ├── Login.jsx             # Auth page
│       └── 📁 main/             # Protected pages
│           ├── MainContainer.jsx # Layout wrapper
│           ├── Dashboard.jsx     # Overview page
│           ├── Inventory.jsx     # Product management
│           ├── Supplier.jsx      # Supplier management
│           ├── Report.jsx        # Stock movements
│           └── Setting.jsx       # System settings
│
├── 📁 services/                 # API & business logic
│   └── api.js                   # Centralized API client
│                                 # ✨ NEW: Services for all endpoints
│                                 # - authService (login, register, check)
│                                 # - inventoryService (products)
│                                 # - supplierService (suppliers, stats)
│                                 # - analyticsService (trends, movements)
│                                 # - settingsService (config, roles, export, import)
│
├── 📁 constants/                # Global constants & config
│   └── config.js                # API URLs, routes, app settings
│                                 # ✨ NEW: Centralized configuration
│                                 # - API_BASE_URL
│                                 # - API_ENDPOINTS
│                                 # - PAGE_ROUTES
│                                 # - HTTP_CONFIG
│
├── 📁 utils/                    # Helper utilities
│   └── helpers.js               # Utility functions
│                                 # ✨ NEW: Centralized helpers
│                                 # - formatDate()
│                                 # - formatCurrency()
│                                 # - isValidEmail()
│                                 # - truncate()
│                                 # - groupBy()
│
├── 📁 data/                     # Static data & assets
│   ├── inventoryProducts.json   # Sample product data
│   └── inventoryProductIcons.js # Icon mappings
│
├── 📁 assets/                   # Images & media
│   ├── react.svg
│   └── logo.png
│
├── App.css                      # App styles
└── index.css                    # Global styles
```

## 🎯 Benefits of This Structure

### **Scalability**

- Easy to find components by type
- Clear separation of concerns
- Ready for large team collaboration

### **Maintainability**

- Centralized API calls (single source of truth)
- Consistent config across app
- Reusable utilities avoid duplication

### **Performance**

- Common components can be easily optimized
- Clear component dependencies
- Better code splitting opportunities

### **Developer Experience**

- New devs can quickly understand architecture
- Import patterns are consistent
- API changes affect only one file

## 📝 Import Examples

### Before (❌ Old Pattern)

```javascript
import axios from "axios";

const response = await axios.get(
  "http://localhost/Inventory_Management/InventoryMGT/backend/suppliers.php",
  { withCredentials: true },
);
```

### After (✅ New Pattern)

```javascript
import { supplierService } from "../services/api.js";

const response = await supplierService.getAllSuppliers();
```

## 🚀 Migration Steps

### Step 1: Move Common Components

Copy these to `components/common/`:

- ✅ Navbar.jsx
- ✅ Footer.jsx
- ✅ LeftSideBar.jsx
- ✅ InventoryStock.jsx

### Step 2: Move Form Components

Copy these to `components/forms/`:

- ✅ AddItems.jsx
- ✅ AddSupplier.jsx

### Step 3: Update Page Imports

Update imports in `components/pages/main/`:

- MainContainer.jsx
- Dashboard.jsx
- Inventory.jsx
- Supplier.jsx
- Report.jsx
- Setting.jsx

### Step 4: Update App.jsx

Change import paths to new structure:

```javascript
import Navbar from "./components/common/Navbar";
import AddItems from "./components/forms/AddItems";
```

### Step 5: Replace Direct API Calls

Replace all `axios.get()` calls with service functions:

```javascript
// In any component
import { supplierService } from "../services/api.js";
const suppliers = await supplierService.getAllSuppliers();
```

### Step 6: Use Config Constants

Replace hardcoded URLs with config:

```javascript
import { API_BASE_URL, PAGE_ROUTES } from "../constants/config.js";
```

### Step 7: Use Utility Functions

Replace repeated logic with helpers:

```javascript
import { formatDate, truncate } from "../utils/helpers.js";
const formatted = formatDate(date);
const short = truncate(longText);
```

## 📊 File Statistics

| Category          | Count  | Location             |
| ----------------- | ------ | -------------------- |
| Common Components | 4      | `components/common/` |
| Form Components   | 2      | `components/forms/`  |
| Chart Components  | 3      | `components/charts/` |
| Page Components   | 7      | `components/pages/`  |
| Services          | 1      | `services/`          |
| Constants         | 1      | `constants/`         |
| Utils             | 1      | `utils/`             |
| **Total**         | **20** | -                    |

## ✅ Checklist for Team

- [ ] Review new structure
- [ ] Update imports in components
- [ ] Test all page loads
- [ ] Verify API calls work
- [ ] Check console for errors
- [ ] Run `npm run build`
- [ ] Run `npm run lint`
- [ ] Commit changes

## 🔗 Cross-References

- **API Module**: See `services/api.js`
- **Configuration**: See `constants/config.js`
- **Utilities**: See `utils/helpers.js`
- **Structure Guide**: See `STRUCTURE.js`

---

**Date Updated**: April 2, 2026  
**Status**: Ready for Implementation
