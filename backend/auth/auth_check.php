<?php

session_start();
require_once '../config.php';
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
