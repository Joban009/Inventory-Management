<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}



require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all products
    $result = $conn->query("SELECT * FROM products ORDER BY id DESC");

    if (!$result) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]);
        exit;
    }

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode(["status" => "success", "products" => $products]);

} elseif ($method === 'POST') {
    // Add a new product
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
$price = $data['price'];
$stock = $data['stock'];
$description = $data['description'];

    if ($name === '' || $price <= 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Name and price are required."]);
        exit;
    }

    // Auto-generate SKU: e.g. ELEC-00042
    // Auto-generate UNIQUE SKU
$prefix = strtoupper(substr($category ?: 'ITEM', 0, 4));

do {
    $randomNumber = random_int(10000, 99999);
    $sku = $prefix . '-' . $randomNumber;

    // check if SKU already exists
    $check = $conn->prepare("SELECT id FROM products WHERE sku = ?");
    $check->bind_param("s", $sku);
    $check->execute();
    $check->store_result();

    $exists = $check->num_rows > 0;
    $check->close();

} while ($exists);

    $stmt = $conn->prepare(
        "INSERT INTO products (name, sku, category, price, stock, description, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())"
    );
    $stmt->bind_param("sssids", $name, $sku, $category, $price, $stock, $description);

    if ($stmt->execute()) {
        $newId = $stmt->insert_id;
        echo json_encode([
            "status"  => "success",
            "message" => "Product added successfully.",
            "product" => [
                "id"          => $newId,
                "name"        => $name,
                "sku"         => $sku,
                "category"    => $category,
                "price"       => $price,
                "stock"       => $stock,
                "description" => $description, 
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Insert failed: " . $stmt->error]);
    }

    $stmt->close();

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}

$conn->close();
?>