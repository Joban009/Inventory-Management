<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
require_once 'config.php';

// Check authentication
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$user_id = intval($_SESSION['user_id']);

// Check if file was uploaded
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No file uploaded or upload error"]);
    exit;
}

$file = $_FILES['file'];
$file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// Only accept CSV
if ($file_ext !== 'csv') {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Only CSV files are allowed"]);
    exit;
}

// Read the CSV file
$file_handle = fopen($file['tmp_name'], 'r');
if (!$file_handle) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to open file"]);
    exit;
}

// Skip BOM if present
$first_line = fgets($file_handle);
if (ord($first_line[0]) === 0xEF && ord($first_line[1]) === 0xBB && ord($first_line[2]) === 0xBF) {
    $first_line = substr($first_line, 3);
}
rewind($file_handle);
fgets($file_handle); // Skip header row

$imported_count = 0;
$failed_count = 0;
$errors = [];

while (($row = fgetcsv($file_handle, 0, ',')) !== false) {
    // Skip empty rows
    if (count(array_filter($row)) === 0) {
        continue;
    }

    // Parse row (ID, Product Name, SKU, Category, Price, Stock, Supplier ID, Created Date, Updated Date)
    $id = isset($row[0]) && !empty($row[0]) ? intval($row[0]) : null;
    $name = $row[1] ?? '';
    $sku = $row[2] ?? '';
    $category = $row[3] ?? '';
    $price = isset($row[4]) ? floatval($row[4]) : 0;
    $stock = isset($row[5]) ? intval($row[5]) : 0;
    $supplier_id = isset($row[6]) && !empty($row[6]) ? intval($row[6]) : null;

    // Validate required fields
    if (empty($name) || empty($sku) || empty($category)) {
        $failed_count++;
        $errors[] = "Row $imported_count: Missing required fields (Name, SKU, or Category)";
        continue;
    }

    // Escape strings
    $name = $conn->real_escape_string($name);
    $sku = $conn->real_escape_string($sku);
    $category = $conn->real_escape_string($category);

    // Check if product exists (by SKU)
    $check = $conn->prepare("SELECT id FROM products WHERE sku = ?");
    $check->bind_param("s", $sku);
    $check->execute();
    $check_result = $check->get_result();
    $check->close();

    if ($check_result->num_rows > 0) {
        // Update existing product
        if ($supplier_id !== null) {
            $stmt = $conn->prepare("UPDATE products SET name=?, category=?, price=?, stock=?, supplier_id=?, updated_at=NOW() WHERE sku=?");
            $stmt->bind_param("ssdiis", $name, $category, $price, $stock, $supplier_id, $sku);
        } else {
            $stmt = $conn->prepare("UPDATE products SET name=?, category=?, price=?, stock=?, updated_at=NOW() WHERE sku=?");
            $stmt->bind_param("ssids", $name, $category, $price, $stock, $sku);
        }
    } else {
        // Insert new product
        if ($supplier_id !== null) {
            $stmt = $conn->prepare("INSERT INTO products (name, sku, category, price, stock, supplier_id) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssidi", $name, $sku, $category, $price, $stock, $supplier_id);
        } else {
            $stmt = $conn->prepare("INSERT INTO products (name, sku, category, price, stock) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssid", $name, $sku, $category, $price, $stock);
        }
    }

    if ($stmt->execute()) {
        $imported_count++;
    } else {
        $failed_count++;
        $errors[] = "Row: " . implode(',', array_filter($row)) . " - Error: " . $stmt->error;
    }
    $stmt->close();
}

fclose($file_handle);

// Log the import
$total = $imported_count + $failed_count;
$status = $failed_count === 0 ? 'success' : 'partial';
$error_msg = empty($errors) ? null : implode('; ', array_slice($errors, 0, 5)); // Limit to 5 errors

$log_stmt = $conn->prepare("INSERT INTO export_import_log (user_id, action, file_format, record_count, status, error_message) VALUES (?, 'import', 'csv', ?, ?, ?)");
$log_stmt->bind_param("iiss", $user_id, $imported_count, $status, $error_msg);
$log_stmt->execute();
$log_stmt->close();

$conn->close();

echo json_encode([
    "status" => "success",
    "message" => "Import completed",
    "imported_count" => $imported_count,
    "failed_count" => $failed_count,
    "total_processed" => $total,
    "errors" => array_slice($errors, 0, 10) // Return first 10 errors
]);
?>
