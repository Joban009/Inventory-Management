<?php
// CORS is handled by Apache in backend/.htaccess.
// Remove duplicate CORS headers from PHP to avoid "double origin" errors.

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
