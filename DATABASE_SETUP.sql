-- ============================================================================
-- SETTINGS MODULE - SQL DATABASE SETUP (WITHOUT STRICT FOREIGN KEY DEPENDENCIES)
-- ============================================================================
-- IMPORTANT: Disable foreign key checks while creating tables
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================================
-- 1. WAREHOUSE SETTINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS warehouse_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    warehouse_name VARCHAR(255) NOT NULL DEFAULT 'Main Hub',
    timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default warehouse settings if not exists
INSERT IGNORE INTO warehouse_settings (warehouse_name, timezone, description) 
VALUES ('Main Hub South', 'EST', 'Primary distribution center for electronics and office equipment.');

-- ============================================================================
-- 2. ROLES TABLE (Create before user_roles)
-- ============================================================================
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default roles
INSERT IGNORE INTO roles (role_name, description) VALUES
('Super Admin', 'Full access to all system settings.'),
('Warehouse Staff', 'Can edit stock levels and view catalog.'),
('Viewer', 'Read-only access to dashboard and reports.');

-- ============================================================================
-- 3. NOTIFICATION PREFERENCES TABLE (NO FOREIGN KEY TO USERS)
-- ============================================================================
CREATE TABLE IF NOT EXISTS notification_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    low_stock_alerts BOOLEAN DEFAULT 1,
    out_of_stock_alerts BOOLEAN DEFAULT 1,
    weekly_summary BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. USER ROLES MAPPING TABLE (FOREIGN KEY ONLY TO ROLES)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_role (user_id, role_id),
    KEY idx_user_id (user_id),
    KEY idx_role_id (role_id),
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. DATA EXPORT/IMPORT LOG TABLE (NO FOREIGN KEY TO USERS)
-- ============================================================================
CREATE TABLE IF NOT EXISTS export_import_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(50) COMMENT 'export, import, purge',
    file_format VARCHAR(20) COMMENT 'csv, json, all',
    record_count INT DEFAULT 0,
    status VARCHAR(50) COMMENT 'success, partial, failed',
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_user_id (user_id),
    KEY idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- RE-ENABLE FOREIGN KEY CHECKS
-- ============================================================================
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- OPTIONAL: Add role_id to users table if it doesn't exist
-- ============================================================================
-- Run these commands ONLY if your users table exists and has proper InnoDB engine
-- ALTER TABLE users ADD COLUMN IF NOT EXISTS role_id INT DEFAULT 1 AFTER password;
-- ALTER TABLE users ADD INDEX idx_role_id (role_id);
-- You can optionally add: ALTER TABLE users ADD CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET DEFAULT;

COMMIT;
