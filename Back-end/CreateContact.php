<?php
require_once __DIR__ . '/db.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

try {
    $sql = 'INSERT INTO contacts (
        name,
        email,
        subject,
        message
    ) VALUES (
        :name,
        :email,
        :subject,
        :message
    )';

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':subject' => $subject ?: null,
        ':message' => $message,
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully.',
        'id' => $pdo->lastInsertId(),
    ]);
} catch (Exception $error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message.',
        'error' => $error->getMessage(),
    ]);
}