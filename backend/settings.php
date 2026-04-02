<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch warehouse settings
    $result = $conn->query("SELECT * FROM warehouse_settings LIMIT 1");
    
    if (!$result) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]);
        exit;
    }

    $settings = $result->fetch_assoc();
    
    if (!$settings) {
        // Create default settings if none exist
        $conn->query("INSERT INTO warehouse_settings (warehouse_name, timezone, description) VALUES ('Main Hub South', 'EST', 'Primary distribution center for electronics and office equipment.')");
        $result = $conn->query("SELECT * FROM warehouse_settings LIMIT 1");
        $settings = $result->fetch_assoc();
    }

    echo json_encode([
        "status" => "success",
        "settings" => $settings
    ]);

} elseif ($method === 'POST' || $method === 'PUT') {
    // Update warehouse settings
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "No data received"]);
        exit;
    }

    $warehouse_name = $conn->real_escape_string(trim($data['warehouse_name'] ?? ''));
    $timezone = $conn->real_escape_string(trim($data['timezone'] ?? 'UTC'));
    $description = $conn->real_escape_string(trim($data['description'] ?? ''));

    if (empty($warehouse_name)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Warehouse name is required"]);
        exit;
    }

    // Check if settings exist
    $check = $conn->query("SELECT id FROM warehouse_settings LIMIT 1");
    
    if ($check->num_rows > 0) {
        // Update existing
        $stmt = $conn->prepare("UPDATE warehouse_settings SET warehouse_name=?, timezone=?, description=?, updated_at=NOW() LIMIT 1");
        $stmt->bind_param("sss", $warehouse_name, $timezone, $description);
    } else {
        // Insert new
        $stmt = $conn->prepare("INSERT INTO warehouse_settings (warehouse_name, timezone, description) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $warehouse_name, $timezone, $description);
    }

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Settings saved successfully",
            "settings" => [
                "warehouse_name" => $warehouse_name,
                "timezone" => $timezone,
                "description" => $description
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to save settings: " . $stmt->error]);
    }

    $stmt->close();

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

$conn->close();
?>
