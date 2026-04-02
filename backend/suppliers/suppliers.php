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

require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM suppliers ORDER BY id DESC");
    if (!$result) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Query failed: " . $conn->error]);
        exit;
    }

    $suppliers = [];
    while ($row = $result->fetch_assoc()) {
        $suppliers[] = $row;
    }

    echo json_encode(["status" => "success", "suppliers" => $suppliers]);

} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "No data received"]);
        exit;
    }

    $name = $conn->real_escape_string(trim($data['name'] ?? ''));
    $uid = $conn->real_escape_string(trim($data['uid'] ?? ''));
    $contact = $conn->real_escape_string(trim($data['contact'] ?? ''));
    $email = $conn->real_escape_string(trim($data['email'] ?? ''));
    $category = $conn->real_escape_string(trim($data['category'] ?? ''));
    $rating = floatval($data['rating'] ?? 0);
    $status = $conn->real_escape_string(trim($data['status'] ?? 'active'));

    if ($name === '' || $uid === '') {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Name and UID are required"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO suppliers (name, uid, contact, email, category, rating, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("sssssis", $name, $uid, $contact, $email, $category, $rating, $status);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Supplier added", "supplier" => [
            "id" => $stmt->insert_id,
            "name" => $name,
            "uid" => $uid,
            "contact" => $contact,
            "email" => $email,
            "category" => $category,
            "rating" => $rating,
            "status" => $status
        ]]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Insert failed: " . $stmt->error]);
    }

    $stmt->close();

} elseif ($method === 'PUT') {
    parse_str(file_get_contents('php://input'), $put_data);
    $id = intval($put_data['id'] ?? 0);
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid supplier id"]);
        exit;
    }

    $name = $conn->real_escape_string(trim($put_data['name'] ?? ''));
    $contact = $conn->real_escape_string(trim($put_data['contact'] ?? ''));
    $email = $conn->real_escape_string(trim($put_data['email'] ?? ''));
    $category = $conn->real_escape_string(trim($put_data['category'] ?? ''));
    $rating = floatval($put_data['rating'] ?? 0);
    $status = $conn->real_escape_string(trim($put_data['status'] ?? 'active'));

    $stmt = $conn->prepare("UPDATE suppliers SET name=?, contact=?, email=?, category=?, rating=?, status=?, updated_at=NOW() WHERE id=?");
    $stmt->bind_param("ssssdsi", $name, $contact, $email, $category, $rating, $status, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Supplier updated"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Update failed: " . $stmt->error]);
    }
    $stmt->close();

} elseif ($method === 'DELETE') {
    parse_str(file_get_contents('php://input'), $delete_data);
    $id = intval($delete_data['id'] ?? 0);
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid supplier id"]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM suppliers WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Supplier deleted"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Delete failed: " . $stmt->error]);
    }

    $stmt->close();

} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

$conn->close();
?>
