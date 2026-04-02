<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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
$format = isset($_GET['format']) ? strtolower($_GET['format']) : 'csv';

// Validate format
if (!in_array($format, ['csv', 'json'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid format. Use 'csv' or 'json'"]);
    exit;
}

// Fetch all products with stock information
$result = $conn->query("
    SELECT 
        id,
        name,
        sku,
        category,
        price,
        stock,
        created_at,
    FROM products
    ORDER BY id ASC
");

if (!$result) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]);
    exit;
}

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

$record_count = count($products);

if ($format === 'csv') {
    // CSV Export
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="inventory_export_' . date('Y-m-d_H-i-s') . '.csv"');

    // Open output stream
    $output = fopen('php://output', 'w');
    
    // Write BOM for UTF-8
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
    
    // Write headers
    fputcsv($output, ['ID', 'Product Name', 'SKU', 'Category', 'Price', 'Stock', 'Supplier ID', 'Created Date', 'Updated Date']);
    
    // Write data
    foreach ($products as $product) {
        fputcsv($output, [
            $product['id'],
            $product['name'],
            $product['sku'],
            $product['category'],
            $product['price'],
            $product['stock'],
            $product['supplier_id'],
            $product['created_at'],
            $product['updated_at']
        ]);
    }
    
    fclose($output);

    // Log the export
    $stmt = $conn->prepare("INSERT INTO export_import_log (user_id, action, file_format, record_count, status) VALUES (?, 'export', 'csv', ?, 'success')");
    $stmt->bind_param("ii", $user_id, $record_count);
    $stmt->execute();
    $stmt->close();

} elseif ($format === 'json') {
    // JSON Export
    header('Content-Type: application/json; charset=utf-8');
    header('Content-Disposition: attachment; filename="inventory_export_' . date('Y-m-d_H-i-s') . '.json"');

    $export_data = [
        "export_date" => date('Y-m-d H:i:s'),
        "record_count" => $record_count,
        "products" => $products
    ];

    echo json_encode($export_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    // Log the export
    $stmt = $conn->prepare("INSERT INTO export_import_log (user_id, action, file_format, record_count, status) VALUES (?, 'export', 'json', ?, 'success')");
    $stmt->bind_param("ii", $user_id, $record_count);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
?>
