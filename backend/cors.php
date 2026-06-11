<?php
$allowed_origins = [
    'https://www.joban.com.np',
    'https://joban.com.np',
    'http://localhost:5173',
    'http://localhost:3000',
    getenv('FRONTEND_URL') ?: '',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin && in_array($origin, $allowed_origins)) {
    // ✅ These lines were MISSING from your if block
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
}

// Handle preflight — must come AFTER the CORS headers above
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}