<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
require_once '../config.php';

// Check authentication
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$user_id = intval($_SESSION['user_id']);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch user's notification preferences
    $stmt = $conn->prepare("SELECT * FROM notification_preferences WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        // Create default preferences if none exist
        $stmt = $conn->prepare("INSERT INTO notification_preferences (user_id, low_stock_alerts, out_of_stock_alerts, weekly_summary) VALUES (?, 1, 1, 0)");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        
        // Fetch the newly created preferences
        $stmt = $conn->prepare("SELECT * FROM notification_preferences WHERE user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
    }

    $preferences = $result->fetch_assoc();

    echo json_encode([
        "status" => "success",
        "preferences" => [
            "low_stock_alerts" => (bool)$preferences['low_stock_alerts'],
            "out_of_stock_alerts" => (bool)$preferences['out_of_stock_alerts'],
            "weekly_summary" => (bool)$preferences['weekly_summary']
        ]
    ]);

    $stmt->close();

} elseif ($method === 'POST' || $method === 'PUT') {
    // Update notification preferences
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "No data received"]);
        exit;
    }

    $low_stock = isset($data['low_stock_alerts']) ? (int)$data['low_stock_alerts'] : 1;
    $out_of_stock = isset($data['out_of_stock_alerts']) ? (int)$data['out_of_stock_alerts'] : 1;
    $weekly = isset($data['weekly_summary']) ? (int)$data['weekly_summary'] : 0;

    // Check if user has preferences
    $check = $conn->prepare("SELECT id FROM notification_preferences WHERE user_id = ?");
    $check->bind_param("i", $user_id);
    $check->execute();
    $check_result = $check->get_result();
    $check->close();

    if ($check_result->num_rows > 0) {
        // Update existing
        $stmt = $conn->prepare("UPDATE notification_preferences SET low_stock_alerts=?, out_of_stock_alerts=?, weekly_summary=?, updated_at=NOW() WHERE user_id=?");
        $stmt->bind_param("iiii", $low_stock, $out_of_stock, $weekly, $user_id);
    } else {
        // Insert new
        $stmt = $conn->prepare("INSERT INTO notification_preferences (user_id, low_stock_alerts, out_of_stock_alerts, weekly_summary) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iiii", $user_id, $low_stock, $out_of_stock, $weekly);
    }

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Notification preferences updated",
            "preferences" => [
                "low_stock_alerts" => (bool)$low_stock,
                "out_of_stock_alerts" => (bool)$out_of_stock,
                "weekly_summary" => (bool)$weekly
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to update preferences: " . $stmt->error]);
    }

    $stmt->close();

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

$conn->close();
?>
