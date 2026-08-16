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

require __DIR__ . "/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data["email"] ?? "");

if (!$email) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Email is required.",
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address.",
    ]);
    exit;
}

try {
    if ($pdo) {
        $stmt = $pdo->prepare("
            INSERT INTO newsletter_subscribers (email)
            VALUES (:email)
        ");

        $stmt->execute([
            ":email" => $email,
        ]);
    } elseif ($mysqli instanceof mysqli) {
    $stmt = $mysqli->prepare("
        INSERT INTO newsletter_subscribers (email)
        VALUES (?)
    ");

    $stmt->bind_param("s", $email);
    $stmt->execute();
} else {
    throw new Exception("Database connection is not available.");
}

    echo json_encode([
        "success" => true,
        "message" => "Thanks for subscribing.",
    ]);
} catch (Exception $error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Could not save newsletter subscription.",
    ]);
}