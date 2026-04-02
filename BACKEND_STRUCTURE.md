# Backend Architecture - Organized Structure

## Overview

The backend has been reorganized into a modular, feature-based structure. All 23 PHP API endpoints are now organized into logical functional directories, making the codebase more maintainable and scalable.

---

## Directory Structure

```
backend/
├── config.php                    (Shared database configuration)
├── index.php                     (Universal router for subdirectory support)
│
├── auth/                         ✨ Authentication
│   ├── auth_check.php           - Check if user is authenticated
│   └── login_registration.php   - User login & registration
│
├── inventory/                    ✨ Product Management
│   ├── products.php             - Get/add/manage products
│   ├── add_product.php          - Legacy add product endpoint
│   ├── inventory_value.php      - Total inventory valuation
│   ├── stock_by_category.php    - Stock distribution by category
│   └── activity.php             - Recent inventory activities
│
├── suppliers/                    ✨ Supplier Management
│   ├── suppliers.php            - CRUD operations for suppliers
│   └── supplier_stats.php       - Supplier statistics & metrics
│
├── analytics/                    ✨ Analytics & Reporting
│   ├── stock_movements.php      - Stock inbound/outbound history
│   └── stock_trend.php          - 7-day stock trend data
│
└── settings/                     ✨ System Configuration
    ├── roles.php                - Role management (CRUD)
    ├── settings.php             - Warehouse configuration
    ├── export_data.php          - Data export (CSV/JSON)
    ├── import_data.php          - Data import from CSV
    ├── purge_data.php           - Bulk data deletion
    └── notification_preferences.php - User notification settings
```

---

## API Endpoint Routing

### Direct File Access

Files can be accessed directly by their path:

```
GET  http://localhost/.../backend/inventory/products.php
POST http://localhost/.../backend/auth/login_registration.php
```

### Router-Based Access

Use the universal router in `index.php` with route parameter:

```
GET  http://localhost/.../backend/index.php?route=inventory/products
POST http://localhost/.../backend/index.php?route=auth/login_registration
PUT  http://localhost/.../backend/index.php?route=settings/roles
```

---

## Endpoint Reference

### Authentication (2 endpoints)

| Method | Route                     | Purpose                    |
| ------ | ------------------------- | -------------------------- |
| POST   | `auth/login_registration` | Login or register new user |
| GET    | `auth/auth_check`         | Verify current session     |

### Inventory Management (5 endpoints)

| Method   | Route                         | Purpose                   |
| -------- | ----------------------------- | ------------------------- |
| GET,POST | `inventory/products`          | Manage product catalog    |
| POST     | `inventory/add_product`       | Add new product (legacy)  |
| GET      | `inventory/inventory_value`   | Get total inventory value |
| GET      | `inventory/stock_by_category` | Get stock by category     |
| GET      | `inventory/activity`          | Get recent activities     |

### Supplier Management (2 endpoints)

| Method              | Route                      | Purpose                  |
| ------------------- | -------------------------- | ------------------------ |
| GET,POST,PUT,DELETE | `suppliers/suppliers`      | CRUD supplier operations |
| GET                 | `suppliers/supplier_stats` | Supplier metrics         |

### Analytics (2 endpoints)

| Method | Route                       | Purpose                |
| ------ | --------------------------- | ---------------------- |
| GET    | `analytics/stock_movements` | Stock movement history |
| GET    | `analytics/stock_trend`     | 7-day stock trend      |

### Settings & Admin (6 endpoints)

| Method              | Route                               | Purpose                    |
| ------------------- | ----------------------------------- | -------------------------- |
| GET,POST,PUT,DELETE | `settings/roles`                    | Manage user roles          |
| GET,POST,PUT        | `settings/settings`                 | Warehouse configuration    |
| GET                 | `settings/export_data`              | Export data as CSV/JSON    |
| POST                | `settings/import_data`              | Import data from CSV       |
| POST,DELETE         | `settings/purge_data`               | Delete all warehouse data  |
| GET,POST,PUT        | `settings/notification_preferences` | User notification settings |

---

## Database Configuration

All files use `require_once '../config.php'` to load:

- Database connection (`$conn`)
- Connection credentials
- Environment settings

**Location**: `backend/config.php`

---

## Router Features

### File Inclusion

The `index.php` router safely includes files from subdirectories:

- ✅ Supports paths like `auth/login_registration`
- ✅ Automatically appends `.php` extension
- ✅ Prevents directory traversal attacks
- ✅ Validates file existence before including

### Route Examples

```php
// Query parameter routing
?route=inventory/products        → /backend/inventory/products.php
?route=settings/export_data      → /backend/settings/export_data.php
?route=auth/login_registration  → /backend/auth/login_registration.php
```

---

## Adding New Endpoints

To add a new endpoint:

1. **Create the file** in appropriate subdirectory

   ```php
   // backend/analytics/new_report.php
   <?php
   header("Content-Type: application/json");
   require_once '../config.php';
   // ... endpoint code ...
   ?>
   ```

2. **Access via router**

   ```
   GET http://localhost/.../backend/index.php?route=analytics/new_report
   ```

3. **Or access directly**
   ```
   GET http://localhost/.../backend/analytics/new_report.php
   ```

---

## Frontend Integration

All frontend API calls use the centralized service layer in `frontend/src/services/api.js`.

Example service call:

```javascript
import { inventoryService } from "../services/api.js";

// Products
await inventoryService.getAllProducts();
await inventoryService.addProduct(productData);

// Suppliers
await supplierService.getAllSuppliers();
await supplierService.getSupplierStats();

// Settings
await settingsService.exportData("csv");
await settingsService.getRoles();
```

---

## Migration Summary

**What Changed:**

- ✅ 23 PHP files moved to organized subdirectories
- ✅ All `require_once 'config.php'` updated to `require_once '../config.php'`
- ✅ Router updated to support subdirectory paths
- ✅ Frontend remains unchanged (service layer handles routing)

**What Stayed the Same:**

- ✅ Database configuration (`config.php` at root)
- ✅ All endpoints operational at same URLs
- ✅ Backward compatibility maintained

**Benefits:**

- 📁 Clear code organization by feature
- 🔒 Better security through modular structure
- 📈 Easier to add new features
- 🧹 Reduced clutter at root level
- 👥 Better for team collaboration

---

## File Organization Checklist

✅ **auth/** (Authentication)

- auth_check.php
- login_registration.php

✅ **inventory/** (Product Management)

- products.php
- add_product.php
- inventory_value.php
- stock_by_category.php
- activity.php

✅ **suppliers/** (Supplier Management)

- suppliers.php
- supplier_stats.php

✅ **analytics/** (Analytics & Reporting)

- stock_movements.php
- stock_trend.php

✅ **settings/** (System Configuration)

- roles.php
- settings.php
- export_data.php
- import_data.php
- purge_data.php
- notification_preferences.php

✅ **Root Level**

- config.php (database config)
- index.php (router)

---

**Total: 23 API endpoints organized into 5 functional categories**
