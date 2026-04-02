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

$movements = [
    [
        "date" => date('M d, Y \· h:i A', strtotime('-1 hour')),
        "product" => "Premium Headphones",
        "sku" => "PH-102",
        "type" => "Inbound",
        "typeClass" => "bg-emerald-50 text-emerald-700 ring-emerald-100",
        "qty" => "+50",
        "qtyClass" => "text-emerald-600",
        "route" => "Supplier → Main Hub",
        "user" => "AR",
        "userBg" => "bg-blue-500",
        "iconName" => "headphones",
    ],
    [
        "date" => date('M d, Y \· h:i A', strtotime('-2 hours')),
        "product" => "Ergonomic Chair",
        "sku" => "CH-204",
        "type" => "Outbound",
        "typeClass" => "bg-orange-50 text-orange-700 ring-orange-100",
        "qty" => "-12",
        "qtyClass" => "text-orange-600",
        "route" => "Main Hub → Retail A",
        "user" => "MK",
        "userBg" => "bg-violet-500",
        "iconName" => "chair",
    ],
    [
        "date" => date('M d, Y \· h:i A', strtotime('-5 hours')),
        "product" => "USB-C Hub Pro",
        "sku" => "AC-881",
        "type" => "Adjustment",
        "typeClass" => "bg-blue-50 text-blue-700 ring-blue-100",
        "qty" => "-3",
        "qtyClass" => "text-blue-600",
        "route" => "Cycle count",
        "user" => "AR",
        "userBg" => "bg-blue-500",
        "iconName" => "headphones",
    ],
];

// If there are existing products, generate more realistic history records for recent items.
$result = $conn->query("SELECT name, sku, category, stock FROM products ORDER BY id DESC LIMIT 10");
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $name = $row['name'];
        $sku = $row['sku'];
        $stock = intval($row['stock'] ?? $row['stock_qty'] ?? 0);

        $movements[] = [
            "date" => date('M d, Y \· h:i A', strtotime('-1 day')),
            "product" => $name,
            "sku" => $sku,
            "type" => "Inbound",
            "typeClass" => "bg-emerald-50 text-emerald-700 ring-emerald-100",
            "qty" => "+" . max(1, min(20, (int)($stock * 0.15))),
            "qtyClass" => "text-emerald-600",
            "route" => "Supplier → Main Hub",
            "user" => "SYS",
            "userBg" => "bg-sky-500",
            "iconName" => strpos(strtolower($name), 'chair') !== false ? "chair" : "headphones",
        ];

        $movements[] = [
            "date" => date('M d, Y \· h:i A', strtotime('-2 days')),
            "product" => $name,
            "sku" => $sku,
            "type" => "Outbound",
            "typeClass" => "bg-orange-50 text-orange-700 ring-orange-100",
            "qty" => "-" . max(1, min(15, (int)($stock * 0.1))),
            "qtyClass" => "text-orange-600",
            "route" => "Main Hub → Retail",
            "user" => "SYS",
            "userBg" => "bg-violet-500",
            "iconName" => strpos(strtolower($name), 'chair') !== false ? "chair" : "headphones",
        ];
    }
}

// sort by date descending
usort($movements, function ($a, $b) {
    $timeA = strtotime(str_replace('·', '', $a['date']));
    $timeB = strtotime(str_replace('·', '', $b['date']));
    return $timeB <=> $timeA;
});

echo json_encode(["status" => "success", "movements" => $movements]);

$conn->close();
