<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// 🔥 Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 🔥 Get data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "No data received"
    ]);
    exit;
}

$name = $data['name'];
$category = $data['category'];
$stock_qty = $data['stock_qty'];
$price = $data['price'];
$description = $data['description'];

require_once '../config.php';

$stmt = $conn->prepare("INSERT INTO products (name, category, stock_qty, price, description) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssids", $name, $category, $stock_qty, $price, $description);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
