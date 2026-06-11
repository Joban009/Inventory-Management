<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
require_once 'config.php';

// Check authentication - Admin only
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

// Check if user is Super Admin - you might add this check
$user_id = intval($_SESSION['user_id']);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST' || $method === 'DELETE') {
    // Request body should contain confirmation token
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['confirm']) || $data['confirm'] !== 'PURGE_ALL_DATA') {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Purge confirmation required. Send confirm: 'PURGE_ALL_DATA'"
        ]);
        exit;
    }

    // Get record counts before deletion for logging
    $product_count = $conn->query("SELECT COUNT(*) as count FROM products")->fetch_assoc()['count'];
    $movement_count = $conn->query("SELECT COUNT(*) as count FROM product_movements")->fetch_assoc()['count'] ?? 0;
    $activity_count = $conn->query("SELECT COUNT(*) as count FROM activity")->fetch_assoc()['count'] ?? 0;

    // Begin transaction
    $conn->begin_transaction();

    try {
        // Delete data from related tables
        $conn->query("DELETE FROM product_movements");
        $conn->query("DELETE FROM activity");
        $conn->query("DELETE FROM products WHERE id > 0");
        
        // Reset auto-increment
        $conn->query("ALTER TABLE products AUTO_INCREMENT = 1");
        
        $conn->commit();

        // Log the purge action
        $total_deleted = $product_count + $movement_count + $activity_count;
        $log_stmt = $conn->prepare("INSERT INTO export_import_log (user_id, action, file_format, record_count, status) VALUES (?, 'purge', 'all', ?, 'success')");
        $log_stmt->bind_param("ii", $user_id, $total_deleted);
        $log_stmt->execute();
        $log_stmt->close();

        echo json_encode([
            "status" => "success",
            "message" => "All warehouse data has been purged successfully",
            "deleted_records" => [
                "products" => intval($product_count),
                "movements" => intval($movement_count ?? 0),
                "activities" => intval($activity_count ?? 0),
                "total" => intval($total_deleted)
            ]
        ]);

    } catch (Exception $e) {
        $conn->rollback();
        
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Failed to purge data: " . $e->getMessage()
        ]);

        // Log the failed purge
        $log_stmt = $conn->prepare("INSERT INTO export_import_log (user_id, action, file_format, record_count, status, error_message) VALUES (?, 'purge', 'all', 0, 'failed', ?)");
        $error_msg = $e->getMessage();
        $log_stmt->bind_param("is", $user_id, $error_msg);
        $log_stmt->execute();
        $log_stmt->close();
    }

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

$conn->close();
?>
