<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

function timeAgo($datetime) {
    $now = new DateTime();
    $past = new DateTime($datetime);
    $diff = $now->getTimestamp() - $past->getTimestamp();

    if ($diff < 60) {
        return 'Just now';
    }
    if ($diff < 3600) {
        $min = floor($diff / 60);
        return $min . ' min' . ($min > 1 ? 's' : '') . ' ago';
    }
    if ($diff < 86400) {
        $hours = floor($diff / 3600);
        return $hours . ' hour' . ($hours > 1 ? 's' : '') . ' ago';
    }
    $days = floor($diff / 86400);
    return $days . ' day' . ($days > 1 ? 's' : '') . ' ago';
}

$activities = [];

// Recent products added
$recentSql = "SELECT name, sku, stock, created_at FROM products ORDER BY created_at DESC LIMIT 3";
$recentResult = $conn->query($recentSql);
if ($recentResult) {
    while ($row = $recentResult->fetch_assoc()) {
        $activities[] = [
            'title' => "Stock Added: " . $row['sku'],
            'detail' => "{$row['stock']} units added to {$row['name']}.",
            'time' => timeAgo($row['created_at']),
            'icon' => 'add',
            'iconClass' => 'bg-emerald-500 text-white',
        ];
    }
}

// Low stock alerts (stock <= 5)
$lowSql = "SELECT name, sku, stock, created_at FROM products WHERE stock <= 5 ORDER BY stock ASC, created_at DESC LIMIT 2";
$lowResult = $conn->query($lowSql);
if ($lowResult) {
    while ($row = $lowResult->fetch_assoc()) {
        $activities[] = [
            'title' => "Low Stock Alert: " . $row['sku'],
            'detail' => "{$row['name']} has only {$row['stock']} units left.",
            'time' => timeAgo($row['created_at']),
            'icon' => 'warning',
            'iconClass' => 'bg-amber-500 text-white',
        ];
    }
}

// Add a static sync event as fallback; only if we still have fewer than 4 alerts
if (count($activities) < 4) {
    $activities[] = [
        'title' => 'Inventory Sync',
        'detail' => 'Warehouse sync completed successfully.',
        'time' => 'Just now',
        'icon' => 'sync',
        'iconClass' => 'bg-blue-500 text-white',
    ];
}

// Optional deleted item event (static)
$activities[] = [
    'title' => 'Item Deleted: OLD-01',
    'detail' => 'Discontinued Office Lamp removed from catalog.',
    'time' => '5 hours ago',
    'icon' => 'delete',
    'iconClass' => 'bg-red-500 text-white',
];

echo json_encode([
    'status' => 'success',
    'activities' => array_slice($activities, 0, 6),
]);
$conn->close();
?>