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

if (!is_array($data)) {
    $data = $_POST;
}

$reviewId = $data['id'] ?? null;

if (!$reviewId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Review id is required.']);
    exit;
}

try {
    $henriqueRating = isset($data['henriqueRating']) ? floatval($data['henriqueRating']) : 0;
    $rodrigoRating = isset($data['rodrigoRating']) ? floatval($data['rodrigoRating']) : 0;
    $averageRating = ($henriqueRating && $rodrigoRating) ? (($henriqueRating + $rodrigoRating) / 2) : floatval($data['rating'] ?? 0);

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
                image_position = :image_position,
                address = :address,
                website_url = :website_url,
                instagram_url = :instagram_url,
                henrique_review_title = :henrique_review_title,
                henrique_review_body = :henrique_review_body,
                henrique_rating = :henrique_rating,
                henrique_amount_spent = :henrique_amount_spent,
                henrique_spent_details = :henrique_spent_details,
                rodrigo_review_title = :rodrigo_review_title,
                rodrigo_review_body = :rodrigo_review_body,
                rodrigo_rating = :rodrigo_rating,
                rodrigo_amount_spent = :rodrigo_amount_spent,
                rodrigo_spent_details = :rodrigo_spent_details
            WHERE id_review = :id';

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':id' => $reviewId,
        ':title' => $data['restaurantName'] ?? '',
        ':review' => $data['description'] ?? '',
        ':category' => $data['category'] ?? 'Restaurant',
        ':cuisine' => $data['cuisine'] ?? 'General',
        ':location' => $data['location'] ?? 'Brisbane',
        ':rating' => $averageRating,
        ':price_range' => $data['priceRange'] ?? '$$',
        ':tags' => $data['tags'] ?? null,
        ':keywords' => $data['keywords'] ?? null,
        ':image_position' => $data['imagePosition'] ?? 'center',
        ':address' => $data['address'] ?? null,
        ':website_url' => $data['websiteUrl'] ?? null,
        ':instagram_url' => $data['instagramUrl'] ?? null,
        ':henrique_review_title' => $data['henriqueReviewTitle'] ?? null,
        ':henrique_review_body' => $data['henriqueReviewBody'] ?? null,
        ':henrique_rating' => $henriqueRating,
        ':henrique_amount_spent' => $data['henriqueAmountSpent'] ?? null,
        ':henrique_spent_details' => $data['henriqueSpentDetails'] ?? null,
        ':rodrigo_review_title' => $data['rodrigoReviewTitle'] ?? null,
        ':rodrigo_review_body' => $data['rodrigoReviewBody'] ?? null,
        ':rodrigo_rating' => $rodrigoRating,
        ':rodrigo_amount_spent' => $data['rodrigoAmountSpent'] ?? null,
        ':rodrigo_spent_details' => $data['rodrigoSpentDetails'] ?? null,
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
