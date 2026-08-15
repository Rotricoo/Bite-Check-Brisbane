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

function createSlug($text) {
    $slug = strtolower(trim($text));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    return trim($slug, '-');
}

function saveUploadedImage($file) {
    if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
        return null;
    }

    $uploadDirectory = __DIR__ . '/uploads/reviews/';

    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    $originalName = pathinfo($file['name'], PATHINFO_FILENAME);
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $safeName = createSlug($originalName);
    $fileName = $safeName . '-' . time() . '.' . $extension;
    $destination = $uploadDirectory . $fileName;

    move_uploaded_file($file['tmp_name'], $destination);

    return '/uploads/reviews/' . $fileName;
}

try {
    $title = $_POST['restaurantName'] ?? '';
    $review = $_POST['description'] ?? '';
    $author = $_POST['author'] ?? 'Rodrigo';
    $photoPath = saveUploadedImage($_FILES['photo'] ?? null);

    $henriqueRating = isset($_POST['henriqueRating']) ? floatval($_POST['henriqueRating']) : 0;
    $rodrigoRating = isset($_POST['rodrigoRating']) ? floatval($_POST['rodrigoRating']) : 0;
    $averageRating = ($henriqueRating + $rodrigoRating) / 2;

    if (!$title || !$review || !$photoPath) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Restaurant name, description, and photo are required.'
        ]);
        exit;
    }

    $slug = $_POST['slug'] ?? createSlug($title);

    $sql = 'INSERT INTO reviews (
        title,
        review,
        author,
        photo,
        category,
        cuisine,
        location,
        rating,
        price_range,
        slug,
        tags,
        keywords,
        image_position,
        address,
        website_url,
        instagram_url,
        henrique_review_title,
        henrique_review_body,   
        henrique_rating,
        henrique_amount_spent,
        henrique_spent_details,
        rodrigo_review_title,
        rodrigo_review_body,
        rodrigo_rating,
        rodrigo_amount_spent,
        rodrigo_spent_details
    ) VALUES (
        :title,
        :review,
        :author,
        :photo,
        :category,
        :cuisine,
        :location,
        :rating,
        :price_range,
        :slug,
        :tags,
        :keywords,
        :image_position,
        :address,
        :website_url,
        :instagram_url,
        :henrique_review_title,
        :henrique_review_body,
        :henrique_rating,
        :henrique_amount_spent,
        :henrique_spent_details,
        :rodrigo_review_title,
        :rodrigo_review_body,
        :rodrigo_rating,
        :rodrigo_amount_spent,
        :rodrigo_spent_details
    )';

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':title' => $title,
        ':review' => $review,
        ':author' => $author,
        ':photo' => $photoPath,
        ':category' => $_POST['category'] ?? 'Restaurant',
        ':cuisine' => $_POST['cuisine'] ?? 'General',
        ':location' => $_POST['location'] ?? 'Brisbane',
        ':rating' => $averageRating,
        ':price_range' => $_POST['priceRange'] ?? '$$',
        ':slug' => $slug,
        ':tags' => $_POST['tags'] ?? null,
        ':keywords' => $_POST['keywords'] ?? null,
        ':image_position' => $_POST['imagePosition'] ?? 'center',
        ':address' => $_POST['address'] ?? null,
        ':website_url' => $_POST['websiteUrl'] ?? null,
        ':instagram_url' => $_POST['instagramUrl'] ?? null,
        ':henrique_review_title' => $_POST['henriqueReviewTitle'] ?? null,
        ':henrique_review_body' => $_POST['henriqueReviewBody'] ?? null,
        ':henrique_rating' => $henriqueRating,
        ':henrique_amount_spent' => $_POST['henriqueAmountSpent'] ?? null,
        ':henrique_spent_details' => $_POST['henriqueSpentDetails'] ?? null,
        ':rodrigo_review_title' => $_POST['rodrigoReviewTitle'] ?? null,
        ':rodrigo_review_body' => $_POST['rodrigoReviewBody'] ?? null,
        ':rodrigo_rating' => $rodrigoRating,
        ':rodrigo_amount_spent' => $_POST['rodrigoAmountSpent'] ?? null,
        ':rodrigo_spent_details' => $_POST['rodrigoSpentDetails'] ?? null,
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Review created successfully.',
        'id' => $pdo->lastInsertId(),
        'photo' => $photoPath,
    ]);
} catch (Exception $error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to create review.',
        'error' => $error->getMessage(),
    ]);
}