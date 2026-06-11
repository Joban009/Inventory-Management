<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

// Get total suppliers
$totalResult = $conn->query("SELECT COUNT(*) as total FROM suppliers");
$totalRow = $totalResult->fetch_assoc();
$totalSuppliers = intval($totalRow['total'] ?? 0);

// Get average rating
$ratingResult = $conn->query("SELECT AVG(CAST(rating AS DECIMAL(3,2))) as avg_rating FROM suppliers WHERE rating > 0");
$ratingRow = $ratingResult->fetch_assoc();
$avgRating = floatval($ratingRow['avg_rating'] ?? 0);

// Get unique categories
$categoryResult = $conn->query("SELECT COUNT(DISTINCT category) as category_count FROM suppliers");
$categoryRow = $categoryResult->fetch_assoc();
$categoryCount = intval($categoryRow['category_count'] ?? 0);

// Get active suppliers (assuming status='active')
$activeResult = $conn->query("SELECT COUNT(*) as active FROM suppliers WHERE status = 'active'");
$activeRow = $activeResult->fetch_assoc();
$activeSuppliers = intval($activeRow['active'] ?? 0);

echo json_encode([
    "status" => "success",
    "stats" => [
        "totalSuppliers" => $totalSuppliers,
        "activeSuppliers" => $activeSuppliers,
        "averageRating" => round($avgRating, 1),
        "totalCategories" => $categoryCount,
    ]
]);

$conn->close();
?>
