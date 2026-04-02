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

require_once '../config.php';

// Daily stock trend (last 7 days)
$sql = "SELECT 
        DATE_FORMAT(created_at, '%a') AS day_name,
        SUM(stock) AS total_stock
        FROM products
        WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY DATE(created_at)
        ORDER BY created_at ASC";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]);
    exit;
}

$days = [];
$stocks = [];

while ($row = $result->fetch_assoc()) {
    $days[] = $row['day_name'];
    $stocks[] = (int)$row['total_stock'];
}

// If no data, return default 7-day structure
if (empty($days)) {
    $days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    $stocks = [0, 0, 0, 0, 0, 0, 0];
}

echo json_encode(["status" => "success", "days" => $days, "stocks" => $stocks]);
$conn->close();
?>
