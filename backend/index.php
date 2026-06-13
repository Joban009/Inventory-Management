<?php
/**
 * Backend Router
 * Routes requests to organized API endpoints in subdirectories
 * 
 * Routing Examples:
 *   Direct file access:
 *     /backend/auth/login_registration.php
 *     /backend/inventory/products.php
 *     /backend/suppliers/suppliers.php
 *   
 *   Via router with query param:
 *     /backend/index.php?route=auth/login_registration
 *     /backend/index.php?route=inventory/products
 *     /backend/index.php?route=settings/export_data
 */

header("Content-Type: application/json");
require_once 'config.php'; // ✅ CORS HANDLING
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Extract route from query parameter or URL path
$route = $_GET['route'] ?? $_POST['route'] ?? null;

// Fallback: parse from REQUEST_URI
if (!$route) {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    // Extract after 'backend/' - handle both direct calls and routed calls
    if (preg_match('/backend\/(.+?)(?:\.php)?$/', $uri, $matches)) {
        $route = $matches[1];
    }
}

if (!$route) {
    echo json_encode(["status" => "error", "message" => "No route specified"]);
    exit;
}

// Sanitize route: remove ../ traversal attempts, keep subdirectories
$route = str_replace(['../', '..\\', '\\'], '/', $route);
$route = trim($route, '/');

// Construct file path - support subdirectories like "auth/login_registration"
$file = __DIR__ . '/' . $route . '.php';

// Prevent directory traversal by checking the real path is within backend
$realFile = realpath($file);
$realBackend = realpath(__DIR__);
if (!$realFile || strpos($realFile, $realBackend) !== 0) {
    echo json_encode(["status" => "error", "message" => "Invalid route"]);
    http_response_code(404);
    exit;
}

// Check if file exists
if (!file_exists($file)) {
    echo json_encode(["status" => "error", "message" => "Endpoint not found: $route"]);
    http_response_code(404);
    exit;
}

// Include the endpoint
require_once $file;
?>
