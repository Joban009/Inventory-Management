<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

// Stock by category
$sql = "SELECT 
        COALESCE(category, 'OTHER') AS category, 
        SUM(stock) AS total_stock
        FROM products
        GROUP BY category
        ORDER BY total_stock DESC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]);
    exit;
}

$categories = [];
$stocks = [];

while ($row = $result->fetch_assoc()) {
    $categories[] = strtoupper($row['category']);
    $stocks[] = (int)$row['total_stock'];
}

echo json_encode(["status" => "success", "categories" => $categories, "stocks" => $stocks]);
$conn->close();
?>
