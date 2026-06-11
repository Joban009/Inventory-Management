<?php

$allowed_origins = [
    'http://localhost:5173',
    getenv('FRONTEND_URL')
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin && in_array($origin, $allowed_origins)) {
}

header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}