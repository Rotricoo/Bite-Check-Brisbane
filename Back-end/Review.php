<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');
// CORS for local dev
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid ID']);
    exit;
}

// Map DB columns to frontend-friendly keys
$sql = 'SELECT id_review AS id, title, review AS content, author, photo, created_at FROM reviews WHERE id_review = :id';
$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => $id]);
$review = $stmt->fetch();

if (!$review) {
    http_response_code(404);
    echo json_encode(['error' => 'Review not found']);
    exit;
}

echo json_encode($review);