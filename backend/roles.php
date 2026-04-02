<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
require_once 'config.php';

// Check authentication - admin only
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all roles with user count
    $result = $conn->query("
        SELECT 
            r.id,
            r.role_name,
            r.description,
            COUNT(ur.user_id) as user_count
        FROM roles r
        LEFT JOIN user_roles ur ON r.id = ur.role_id
        GROUP BY r.id, r.role_name, r.description
        ORDER BY r.id ASC
    ");

    if (!$result) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]);
        exit;
    }

    $roles = [];
    while ($row = $result->fetch_assoc()) {
        $roles[] = [
            "id" => intval($row['id']),
            "role_name" => $row['role_name'],
            "description" => $row['description'],
            "user_count" => intval($row['user_count'])
        ];
    }

    echo json_encode([
        "status" => "success",
        "roles" => $roles
    ]);

} elseif ($method === 'POST') {
    // Create new role
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "No data received"]);
        exit;
    }

    $role_name = $conn->real_escape_string(trim($data['role_name'] ?? ''));
    $description = $conn->real_escape_string(trim($data['description'] ?? ''));

    if (empty($role_name)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Role name is required"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO roles (role_name, description) VALUES (?, ?)");
    $stmt->bind_param("ss", $role_name, $description);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Role created successfully",
            "role" => [
                "id" => $stmt->insert_id,
                "role_name" => $role_name,
                "description" => $description,
                "user_count" => 0
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to create role: " . $stmt->error]);
    }

    $stmt->close();

} elseif ($method === 'PUT') {
    // Update role
    parse_str(file_get_contents('php://input'), $put_data);
    
    $id = intval($put_data['id'] ?? 0);
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid role ID"]);
        exit;
    }

    $role_name = $conn->real_escape_string(trim($put_data['role_name'] ?? ''));
    $description = $conn->real_escape_string(trim($put_data['description'] ?? ''));

    if (empty($role_name)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Role name is required"]);
        exit;
    }

    $stmt = $conn->prepare("UPDATE roles SET role_name=?, description=?, updated_at=NOW() WHERE id=?");
    $stmt->bind_param("ssi", $role_name, $description, $id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Role updated successfully"
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to update role: " . $stmt->error]);
    }

    $stmt->close();

} elseif ($method === 'DELETE') {
    // Delete role
    parse_str(file_get_contents('php://input'), $delete_data);
    
    $id = intval($delete_data['id'] ?? 0);
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid role ID"]);
        exit;
    }

    // Prevent deletion of default roles
    $default_roles = ['Super Admin', 'Warehouse Staff', 'Viewer'];
    $check = $conn->prepare("SELECT role_name FROM roles WHERE id=?");
    $check->bind_param("i", $id);
    $check->execute();
    $check_result = $check->get_result();
    $role = $check_result->fetch_assoc();
    $check->close();

    if (in_array($role['role_name'], $default_roles)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Cannot delete default roles"]);
        exit;
    }

    // Delete the role
    $stmt = $conn->prepare("DELETE FROM roles WHERE id=?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Role deleted successfully"
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to delete role: " . $stmt->error]);
    }

    $stmt->close();

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

$conn->close();
?>
