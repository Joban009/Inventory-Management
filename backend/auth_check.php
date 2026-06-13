<?php
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', '1');
ini_set('session.cookie_httponly', '1');

header("Content-Type: application/json");
require_once 'config.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "success",
        "message" => "User authenticated",
        "name" => $_SESSION["user_name"] ?? "",
        "orgName" => $_SESSION["user_org_name"] ?? "",
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Unauthorized"
    ]);
}
?>