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
$reviewId = $data['id'] ?? null;

if (!$reviewId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Review id is required.']);
    exit;
}

try {
    $stmt = $pdo->prepare('DELETE FROM reviews WHERE id_review = :id');
    $stmt->execute([':id' => $reviewId]);

    echo json_encode([
        'success' => true,
        'message' => 'Review deleted successfully.',
    ]);
} catch (Exception $error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to delete review.',
        'error' => $error->getMessage(),
    ]);
}