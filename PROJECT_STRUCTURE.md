# Inventory Management System - Complete Project Structure

**Project Root**: `c:\xampp\htdocs\Inventory_Management\InventoryMGT\`

## 📊 Project Overview

A full-stack inventory management system with:

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: PHP 7.x with MySQLi
- **Database**: MySQL/MariaDB
- **Authentication**: Session-based
- **Port**: Frontend runs on `localhost:5173`, Backend on `localhost/Inventory_Management/InventoryMGT/`

---

## 🗂️ Directory Structure

### Root Level Files

```
├── .git/                          # Version control
├── backend/                       # PHP REST API endpoints
├── frontend/                      # React application
├── DATABASE_SETUP.sql            # MySQL schema definition
└── README.md                      # Project documentation
```

---

## 🖥️ BACKEND - PHP REST API

**Location**: `backend/`

### Database Configuration

```
backend/
├── config.php                     # MySQL connection setup
│   └── Credentials: root, database: inventorymgt
```

### Authentication & Session

```
auth_check.php                     # Session validation endpoint
login_registration.php             # User login/registration handler
```

### Data Management Endpoints

#### **Inventory Management**

```
products.php                       # GET all products, POST new product
  └── Methods: GET, POST
  └── Returns: Full product list or confirmation

add_product.php                    # Legacy product creation (deprecated)
```

#### **Supplier Management**

```
suppliers.php                      # GET all suppliers, manage supplier data
  └── Methods: GET, POST, PUT, DELETE

supplier_stats.php                 # Aggregate supplier statistics
  └── Returns: {totalSuppliers, activeSuppliers, averageRating, categoryCount}
  └── Used by: Supplier.jsx statistics cards
  └── No authentication required
```

#### **Inventory Analytics**

```
stock_movements.php                # Product stock transaction history
  └── GET: All stock movements with product details

stock_trend.php                    # Historical stock level trends
  └── GET: Trend data for charts

stock_by_category.php              # Inventory breakdown by category
  └── GET: Category-wise stock counts

inventory_value.php                # Total inventory valuation
  └── GET: Monetary value of all stock
```

#### **Reporting & Notifications**

```
activity.php                       # System activity log
  └── GET: Recent products, low stock items, recent activity

notification_preferences.php       # User notification settings
  └── GET: User's notification toggles
  └── POST: Update low_stock_alerts, out_of_stock_alerts, weekly_summary
```

#### **Settings Module** ⭐ NEW

```
settings.php                       # Warehouse configuration
  └── GET: Current warehouse settings
  └── POST: Update warehouse_name, timezone, description

roles.php                          # User role management
  └── GET: All roles with user counts
  └── POST: Create new role
  └── PUT: Update role
  └── DELETE: Remove role

export_data.php                    # CSV/JSON export functionality
  └── GET: ?format=csv or ?format=json
  └── Returns: File download stream

import_data.php                    # CSV file import
  └── POST: Multipart form-data file upload
  └── Validates CSV structure
  └── Upserts products by SKU
  └── Returns: imported_count, failed_count, errors[]

purge_data.php                     # Safe data deletion
  └── DELETE: Requires "PURGE_ALL_DATA" confirmation
  └── Transactional delete across product_movements, activity, products
```

### Backend Summary Table

| File                         | Purpose            | Methods                | Key Features                    |
| ---------------------------- | ------------------ | ---------------------- | ------------------------------- |
| config.php                   | DB Connection      | -                      | MySQLi connection setup         |
| auth_check.php               | Session Validation | GET                    | Verify user authentication      |
| login_registration.php       | User Auth          | POST                   | Login/Register users            |
| products.php                 | Product CRUD       | GET, POST              | List/Create products            |
| suppliers.php                | Supplier CRUD      | GET, POST, PUT, DELETE | Manage suppliers                |
| supplier_stats.php           | Statistics         | GET                    | Dynamic supplier counts/ratings |
| stock_movements.php          | Movement Log       | GET                    | Stock transaction history       |
| stock_trend.php              | Trend Data         | GET                    | Historical trends for charts    |
| stock_by_category.php        | Category Stats     | GET                    | Stock breakdown by category     |
| inventory_value.php          | Valuation          | GET                    | Total inventory worth           |
| activity.php                 | Activity Log       | GET                    | Recent system activities        |
| settings.php                 | Warehouse Config   | GET, POST              | Warehouse settings              |
| roles.php                    | Role Management    | GET, POST, PUT, DELETE | User roles                      |
| notification_preferences.php | Notifications      | GET, POST              | User notification toggles       |
| export_data.php              | CSV/JSON Export    | GET                    | Download inventory data         |
| import_data.php              | CSV Import         | POST                   | Upload product data             |
| purge_data.php               | Data Purge         | DELETE                 | Permanent data deletion         |

---

## ⚛️ FRONTEND - React Application

**Location**: `frontend/`

### Configuration Files

```
frontend/
├── package.json                   # Dependencies & scripts
├── vite.config.js                # Vite build configuration
├── eslint.config.js              # Code quality rules
├── index.html                    # HTML entry point
└── README.md                     # Frontend documentation
```

### Source Files

#### **Root Components**

```
src/
├── main.jsx                      # React entry point (mounted to #app)
├── App.jsx                       # Main router configuration
├── App.css                       # Global styles
├── index.css                     # Base styles
├── ProtectedRoute.jsx            # Routes wrapper for authentication
```

#### **Core Components Directory**

```
src/components/
├── Navbar.jsx                    # Top navigation bar
├── Footer.jsx                    # Page footer
├── InventoryStock.jsx            # Stock display component
├── AddItems.jsx                  # Product creation form
├── AddSupplier.jsx               # Supplier creation form
```

#### **Page Components - Pages Directory**

```
src/components/pages/
│
├── Login.jsx                     # Authentication page
│   └── Routes: [/]
│   └── Components: Email/password form, login/register toggle
│
└── main/                         # Main protected pages (wrapped with MainContainer
)
    │
    ├── MainContainer
.jsx         # Layout wrapper with sidebar & navbar
    │   └── Routes all nested pages
    │   └── Components: LeftSideBar, Navbar, Footer
    │
    ├── Dashboard.jsx             # Main overview
    │   └── Route: [/dashboard]
    │   └── Displays: Total products, stock status, trends, low stock items
    │   └── Uses: StockTrendChart, InventoryValueChart, activity data
    │
    ├── Inventory.jsx             # Product management
    │   └── Route: [/inventory]
    │   └── Features: List products, add new, search, edit, delete
    │   └── Modal: AddItems.jsx for new product creation
    │
    ├── Supplier.jsx              # Supplier management ⭐ ENHANCED
    │   └── Route: [/supplier]
    │   └── Features: Supplier list, statistics cards, pagination
    │   └── Data source: suppliers.php + supplier_stats.php
    │   └── Real statistics: Total suppliers, Active suppliers, Avg rating, Categories
    │
    ├── Report.jsx                # Stock movements log
    │   └── Route: [/report]
    │   └── Displays: Historical stock movements
    │   └── Data source: stock_movements.php
    │
    ├── Setting.jsx               # System configuration ⭐ NEW & COMPLETE
    │   └── Route: [/setting]
    │   └── Sections:
    │       ├── General Profile: warehouse_name, timezone, description
    │       ├── Notifications: 3 toggle switches (low_stock, out_of_stock, weekly)
    │       ├── User Roles: role list with user counts, Create/Edit buttons
    │       ├── Data Export: CSV & JSON download
    │       ├── Data Import: CSV file upload with validation
    │       └── Danger Zone: Purge all data with confirmation
    │   └── Data sources: 6 backend endpoints
    │
    └── LeftSideBar.jsx           # Navigation sidebar
        └── Menu items: Dashboard, Inventory, Report, Supplier, Setting
```

#### **Chart Components**

```
src/components/charts/
├── StockTrendChart.jsx           # Line chart - stock trends over time
│   └── Used by: Dashboard
│   └── Library: ApexCharts
│
├── StockByCat.jsx                # Pie chart - inventory by category
│   └── Used by: Dashboard
│   └── Library: ApexCharts
│
└── InventoryValueChart.jsx       # Bar chart - inventory monetary value
    └── Used by: Dashboard
    └── Library: ApexCharts
```

#### **Data Files**

```
src/data/
├── inventoryProducts.json        # Static product catalog
│   └── Contains: Sample products with icons, categories, pricing
│
└── inventoryProductIcons.js      # Icon mappings
    └── Maps: Product categories to React Icons
```

### Component Hierarchy Tree

```
App (Router)
└── Login.jsx
│   └── [/] Route
│
└── MainContainer
 (Protected)
    └── Header
    │   └── Navbar.jsx
    │
    ├── Body
    │   ├── LeftSideBar.jsx
    │   │   └── Dashboard → Dashboard.jsx
    │   │   └── Inventory → Inventory.jsx
    │   │   └── Report → Report.jsx
    │   │   └── Supplier → Supplier.jsx
    │   │   └── Settings → Setting.jsx
    │   │
    │   └── MainComponent (Page Content)
    │       ├── Dashboard.jsx
    │       │   ├── StockTrendChart.jsx
    │       │   ├── InventoryValueChart.jsx
    │       │   └── Daily widgets
    │       │
    │       ├── Inventory.jsx
    │       │   └── AddItems.jsx (Modal)
    │       │
    │       ├── Report.jsx
    │       │   └── Stock movements table
    │       │
    │       ├── Supplier.jsx
    │       │   ├── Statistics cards (from supplier_stats.php)
    │       │   ├── Supplier list table
    │       │   └── AddSupplier.jsx (Modal)
    │       │
    │       └── Setting.jsx
    │           ├── General Profile section
    │           ├── Notification Preferences (Toggle component)
    │           ├── User Roles table
    │           ├── Create Role Modal
    │           ├── Data Export/Import
    │           └── Danger Zone (Purge)
    │
    └── Footer
        └── Footer.jsx
```

---

## 🗄️ DATABASE Schema

**Database Name**: `inventorymgt`

### Tables Created by DATABASE_SETUP.sql

#### **Core Inventory Tables** (Pre-existing)

```
products
├── id (PK)
├── name
├── sku (UNIQUE)
├── category
├── price
├── stock
├── supplier_id (FK)
├── description
├── created_at
└── updated_at

suppliers
├── id (PK)
├── supplier_name
├── contact_person
├── email
├── phone
├── rating
├── status
├── created_at
└── updated_at

product_movements
├── id (PK)
├── product_id (FK)
├── movement_type (in/out)
├── quantity
├── remarks
└── created_at

activity
├── id (PK)
├── user_id
├── action_type
├── description
└── created_at
```

#### **Settings Module Tables** ⭐ NEW

```
warehouse_settings
├── id (PK)
├── warehouse_name
├── timezone
├── description
├── created_at
└── updated_at

roles
├── id (PK)
├── role_name (UNIQUE)
├── description
├── created_at
└── updated_at
└── Default roles: Super Admin, Warehouse Staff, Viewer

user_roles (Junction Table)
├── id (PK)
├── user_id (FK to users)
├── role_id (FK to roles)
├── assigned_at
└── UNIQUE(user_id, role_id)

notification_preferences
├── id (PK)
├── user_id (UNIQUE, FK to users)
├── low_stock_alerts
├── out_of_stock_alerts
├── weekly_summary
├── created_at
└── updated_at

export_import_log (Audit Trail)
├── id (PK)
├── user_id (FK to users)
├── action (export/import/purge)
├── file_format (csv/json)
├── record_count
├── status (success/partial/failed)
├── error_message
└── created_at
```

---

## 🔗 API Endpoints & Data Flow

### Frontend → Backend Communication

#### **Authentication Flow**

```
Login.jsx
  → POST /backend/auth/login_registration.php (email, password)
  → Response: {status, message, user_id, session}
  → Stores session cookie for subsequent requests
```

#### **Dashboard Data Flow**

```
Dashboard.jsx
  ├─→ GET /backend/activity.php
  │    └─ Response: {recentProducts, lowStockItems, recentActivity}
  │
  ├─→ GET /backend/stock_trend.php
  │    └─ Used by: StockTrendChart.jsx
  │
  ├─→ GET /backend/stock_by_category.php
  │    └─ Used by: StockByCat.jsx
  │
  └─→ GET /backend/inventory_value.php
       └─ Used by: InventoryValueChart.jsx
```

#### **Inventory Management Flow**

```
Inventory.jsx
  ├─→ GET /backend/products.php
  │    └─ Displays: All products in table
  │
  ├─→ POST /backend/products.php (via AddItems.jsx)
  │    └─ Data: {name, category, price, stock, description}
  │    └─ Auto-generates SKU: CATX-XXXXX
  │
  └─→ POST /backend/add_product.php (legacy)
```

#### **Supplier Management Flow** ⭐ ENHANCED

```
Supplier.jsx
  ├─→ GET /backend/suppliers.php
  │    └─ Displays: Supplier list with pagination
  │
  ├─→ GET /backend/supplier_stats.php
  │    └─ Displays: Statistics cards
  │    │   ├─ Total Suppliers (COUNT)
  │    │   ├─ Active Suppliers (COUNT WHERE status='active')
  │    │   ├─ Average Rating (AVG)
  │    │   └─ Total Categories (COUNT DISTINCT)
  │
  └─→ POST /backend/suppliers.php (via AddSupplier.jsx)
       └─ Data: {supplier_name, contact_person, email, phone, rating, status}
```

#### **Settings Management Flow** ⭐ NEW & COMPLETE

```
Setting.jsx
  │
  ├─ General Profile
  │   ├─→ GET /backend/settings.php
  │   │    └─ Returns: {warehouse_name, timezone, description}
  │   └─→ POST /backend/settings.php
  │        └─ Sends: {warehouse_name, timezone, description}
  │
  ├─ Notifications
  │   ├─→ GET /backend/notification_preferences.php
  │   │    └─ Returns: {low_stock_alerts, out_of_stock_alerts, weekly_summary}
  │   └─→ POST /backend/notification_preferences.php
  │        └─ Sends: Updated toggle states
  │
  ├─ Roles Management
  │   ├─→ GET /backend/roles.php
  │   │    └─ Returns: [{id, role_name, description, user_count}, ...]
  │   │
  │   ├─→ POST /backend/roles.php (handleCreateRole)
  │   │    └─ Data: {role_name, description}
  │   │    └─ Modal triggers form submission
  │   │    └─ Shows success/error notifications
  │   │
  │   ├─→ PUT /backend/roles.php (Edit - ready to wire)
  │   │    └─ Data: {role_id, role_name, description}
  │   │
  │   └─→ DELETE /backend/roles.php (Edit - ready to wire)
  │        └─ Prevents deletion of default roles
  │
  ├─ Data Export
  │   ├─→ GET /backend/export_data.php?format=csv
  │   │    └─ Returns: CSV file download (stream)
  │   │    └─ Columns: ID, Name, SKU, Category, Price, Stock, Supplier ID, Dates
  │   │
  │   └─→ GET /backend/export_data.php?format=json
  │        └─ Returns: JSON file download
  │        └─ Structure: {export_date, record_count, products: [...]}
  │
  ├─ Data Import
  │   └─→ POST /backend/import_data.php (multipart/form-data)
  │        └─ Input: CSV file with columns: ID, Name, SKU, Category, Price, Stock, Supplier ID, Dates
  │        └─ Logic: Upsert by SKU (update if exists, create if new)
  │        └─ Returns: {imported_count, failed_count, errors: [...]}
  │
  └─ Danger Zone (Purge)
      └─→ DELETE /backend/purge_data.php
           └─ Requires: {confirm: "PURGE_ALL_DATA"}
           └─ Action: Transactional delete from product_movements, activity, products
           └─ Returns: {status, deleted_records: {movements, activities, products, total}}
           └─ Logs: Audit trail in export_import_log
```

#### **Report (Stock Movements) Flow**

```
Report.jsx
  └─→ GET /backend/stock_movements.php
       └─ Returns: All product movements with stock history
       └─ Displays: Date, Product, Quantity, Type, Details
```

---

## 🔐 Authentication & Security

### Session Management

```
- Session-based authentication
- Credentials: root user (currently in config.php)
- Session validation: auth_check.php endpoint
- Protected routes: ProtectedRoute.jsx wrapper
- CORS enabled: http://localhost:5173 on all backend endpoints
- Credentials sent: withCredentials: true on all axios calls
```

### Request Headers

```
All requests include:
├── Content-Type: application/json (or multipart/form-data for file uploads)
├── Access-Control-Allow-Credentials: true
├── CORS Origin: http://localhost:5173 (frontend)
└── Session cookies automatically attached
```

---

## 📦 Dependencies & Technologies

### Frontend Stack

```
Framework:     React 19
Build tool:    Vite (using rolldown)
Styling:       Tailwind CSS 4.1.18
Routing:       React Router 7.13.0
HTTP Client:   Axios 1.13.5
Icons:         React Icons 5.6.0
Charts:        ApexCharts 5.10.4
UI Framework:  React Bootstrap 2.10.10
Package Mgr:   npm
Node version:  v20+ (based on package.json)
```

### Backend Stack

```
Language:      PHP 7.x (MySQLi)
Database:      MySQL/MariaDB
Connection:    MySQLi procedural
Charset:       utf8mb4
Engine:        InnoDB
Server:        XAMPP Apache
```

### Development Tools

```
Linting:       ESLint 9.39.1
Code quality:  tailwindcss + eslint-plugin-react
Bundler:       rolldown-vite 7.2.5
Build output:  dist/ directory (891.69 kB JS, 34.42 kB CSS)
```

---

## 🚀 Project Features

### ✅ Completed Features

#### **Core Inventory**

- ✅ Product CRUD operations
- ✅ Stock level management
- ✅ Product categorization
- ✅ Stock movement tracking
- ✅ Inventory valuation

#### **Supplier Management**

- ✅ Supplier CRUD operations
- ✅ Dynamic supplier statistics
- ✅ Supplier rating system
- ✅ Contact management

#### **Analytics & Reporting**

- ✅ Stock trend charts
- ✅ Category-wise breakdown
- ✅ Inventory value visualization
- ✅ Activity logging
- ✅ Stock movement history

#### **Settings Module** ⭐ NEW

- ✅ Warehouse configuration
- ✅ Notification preferences
- ✅ Role management (CRUD for roles)
- ✅ CSV export (all data)
- ✅ CSV import (bulk product upsert)
- ✅ JSON export
- ✅ Data purge with confirmation
- ✅ Audit trail logging
- ✅ Create Role button fully functional

#### **UI/UX**

- ✅ Authentication page
- ✅ Responsive dashboard
- ✅ Sidebar navigation
- ✅ Modal forms
- ✅ Loading states
- ✅ Error/success notifications
- ✅ Pagination support

---

## 📊 File Size Summary

```
Frontend Build:
├── JS:   index-CQk0TCr5.js     891.69 kB (~252.68 kB gzip)
├── CSS:  index-BLK4UdBG.css    34.42 kB (~7.48 kB gzip)
└── PNG:  logo-DjlPuJ_l.png    424.18 kB

Source Code:
├── Backend PHP:  ~2,200 total lines (18 files)
├── Frontend JSX: ~2,500 total lines (24 files)
└── Database:     ~100 lines SQL schema
```

---

## 🔧 Quick Start

### Backend Setup

```bash
1. Database: Import DATABASE_SETUP.sql into MySQL
2. Config: backend/config.php (already configured for XAMPP)
3. Start: XAMPP Apache + MySQL
4. API: https://inventory-management-te6v.onrender.com/
```

### Frontend Setup

```bash
1. Install: npm install (in frontend/ directory)
2. Dev:     npm run dev (runs on localhost:5173)
3. Build:   npm run build (creates dist/ folder)
4. Preview: npm run preview (test production build)
```

### Access Application

```
Login:      http://localhost:5173
Backend API: https://inventory-management-te6v.onrender.com/
Database:   root user @ localhost:3306
```

---

## 📝 Configuration Files Reference

### Frontend Config Files

```
vite.config.js      - Vite build & dev server config
eslint.config.js    - Code linting rules
package.json        - Dependencies, scripts, metadata
.gitignore          - Excluded files from git
```

### Backend Config Files

```
config.php          - MySQL connection credentials
DATABASE_SETUP.sql  - Schema & initial data
.git/               - Version control history
```

---

## 🎯 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      USER BROWSER                            │
│  (localhost:5173 - React Application)                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTP/CORS
                        │ withCredentials: true
                        │
√─────────────────────────────────────────────────────────────┐
│                  FRONTEND (React)                            │
│                                                              │
│  ├─ App.jsx (Router)                                        │
│  ├─ MainContainer
 (Layout)                                  │
│  │  ├─ Navbar                                               │
│  │  ├─ LeftSideBar (Menu)                                   │
│  │  ├─ Main Content Pages:                                  │
│  │  │  ├─ Dashboard (Charts + Activity)                    │
│  │  │  ├─ Inventory (Product CRUD)                         │
│  │  │  ├─ Supplier (List + Statistics)                     │
│  │  │  ├─ Report (Movements Log)                           │
│  │  │  └─ Setting (Configuration)                          │
│  │  └─ Footer                                               │
│  └─ Login (Auth Page)                                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
                ┌───────▼───────┐
                │  AXIOS CLIENT  │
                │ (HTTP Requests)│
                └───────┬────────┘
                        │
                        │ localhost/Inventory_Management/InventoryMGT/backend/
                        │
√─────────────────────────────────────────────────────────────┐
│                   BACKEND (PHP)                             │
│                                                              │
│  Config Layer:        config.php (MySQLi Connection)       │
│                                                              │
│  Endpoint Layer:                                            │
│  ├─ Auth         → login_registration.php                   │
│  ├─ Inventory    → products.php, add_product.php           │
│  ├─ Suppliers    → suppliers.php, supplier_stats.php       │
│  ├─ Analytics    → stock_movements.php, stock_trend.php    │
│  │               → stock_by_category.php, inventory_value  │
│  ├─ Activity     → activity.php                             │
│  └─ Settings     → settings.php, roles.php                 │
│                  → notification_preferences.php             │
│                  → export_data.php, import_data.php        │
│                  → purge_data.php                           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ MySQLi
                        │
√─────────────────────────────────────────────────────────────┐
│                    DATABASE (MySQL)                         │
│             Database: inventorymgt                          │
│                                                              │
│  ├─ Core Tables:     products, suppliers, activity         │
│  │                   product_movements                      │
│  │                                                          │
│  └─ Settings Tables: warehouse_settings, roles             │
│                      user_roles, notification_preferences   │
│                      export_import_log                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 📋 Files Checklist

### Backend Files (18 total)

- [x] config.php
- [x] auth_check.php
- [x] login_registration.php
- [x] products.php
- [x] add_product.php (legacy)
- [x] suppliers.php
- [x] supplier_stats.php
- [x] stock_movements.php
- [x] stock_trend.php
- [x] stock_by_category.php
- [x] inventory_value.php
- [x] activity.php
- [x] settings.php
- [x] notification_preferences.php
- [x] roles.php
- [x] export_data.php
- [x] import_data.php
- [x] purge_data.php

### Frontend Files (24+ total)

- [x] App.jsx (Router)
- [x] ProtectedRoute.jsx
- [x] main.jsx (Entry)
- [x] App.css, index.css
- [x] Navbar.jsx
- [x] Footer.jsx
- [x] LeftSideBar.jsx
- [x] MainContainer
      .jsx
- [x] Login.jsx
- [x] Dashboard.jsx
- [x] Inventory.jsx
- [x] Supplier.jsx
- [x] Report.jsx
- [x] Setting.jsx
- [x] InventoryStock.jsx
- [x] AddItems.jsx
- [x] AddSupplier.jsx
- [x] StockTrendChart.jsx
- [x] StockByCat.jsx
- [x] InventoryValueChart.jsx
- [x] inventoryProducts.json
- [x] inventoryProductIcons.js
- [x] package.json
- [x] vite.config.js
- [x] eslint.config.js
- [x] index.html
