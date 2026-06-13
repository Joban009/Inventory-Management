<?php
header("Content-Type: application/json");
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


// Range option from query string: 7, 30, 90 days (default 30)
$range = intval($_GET['range'] ?? 30);
if (!in_array($range, [7, 30, 90], true)) {
    $range = 30;
}

// Day-level inventory value in the range (last N days)
$sql = "SELECT DATE_FORMAT(created_at, '%Y-%m-%d') AS day, SUM(stock * price) AS inventory_value
        FROM products
        WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        GROUP BY day
        ORDER BY day ASC";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $range);
$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]);
    exit;
}

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = [
        'day' => $row['day'],
        'inventory_value' => (float)$row['inventory_value'],
    ];
}

echo json_encode(["status" => "success", "range" => $range, "data" => $data]);
$conn->close();
?>