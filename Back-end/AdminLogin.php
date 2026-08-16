<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed",
    ]);
    exit;
}

$config = require __DIR__ . "/db.config.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

$adminEmail = $config["admin_email"] ?? "";
$adminPassword = $config["admin_password"] ?? "";

if ($email === $adminEmail && $password === $adminPassword) {
    echo json_encode([
        "success" => true,
        "message" => "Login successful",
    ]);
    exit;
}

http_response_code(401);
echo json_encode([
    "success" => false,
    "message" => "Invalid email or password",
]);