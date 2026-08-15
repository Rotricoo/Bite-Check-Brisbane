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
    $sql = 'UPDATE reviews
            SET
                title = :title,
                review = :review,
                category = :category,
                cuisine = :cuisine,
                location = :location,
                rating = :rating,
                price_range = :price_range,
                tags = :tags,
                keywords = :keywords,
                address = :address,
                website_url = :website_url,
                instagram_url = :instagram_url
            WHERE id_review = :id';

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':id' => $reviewId,
        ':title' => $data['restaurantName'] ?? '',
        ':review' => $data['description'] ?? '',
        ':category' => $data['category'] ?? 'Restaurant',
        ':cuisine' => $data['cuisine'] ?? 'General',
        ':location' => $data['location'] ?? 'Brisbane',
        ':rating' => $data['rating'] ?? 0,
        ':price_range' => $data['priceRange'] ?? '$$',
        ':tags' => $data['tags'] ?? null,
        ':keywords' => $data['keywords'] ?? null,
        ':address' => $data['address'] ?? null,
        ':website_url' => $data['websiteUrl'] ?? null,
        ':instagram_url' => $data['instagramUrl'] ?? null,
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Review updated successfully.',
    ]);
} catch (Exception $error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to update review.',
        'error' => $error->getMessage(),
    ]);
}