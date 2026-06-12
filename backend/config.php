<?php
// config.php — works for both local (XAMPP) and production (Render)

require_once 'cors.php';

$host     = getenv('DB_HOST')     ?: 'localhost';
$port     = getenv('DB_PORT')     ?: 3306;
$dbname   = getenv('DB_NAME')     ?: 'inventorymgt';
$username = getenv('DB_USER')     ?: 'root';
$password = getenv('DB_PASS')     ?: '';

$conn = new mysqli($host, $username, $password, $dbname, (int)$port);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed'
        // Don't expose $conn->connect_error in production
    ]));
}

$conn->set_charset("utf8mb4");
?>