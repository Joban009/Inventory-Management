<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "inventorymgt";

// Create MySQLi connection
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $conn->connect_error,
    ]);
    exit;
}

?>