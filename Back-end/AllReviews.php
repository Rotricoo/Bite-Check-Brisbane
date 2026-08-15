<?php
require_once __DIR__ . '/db.php';
// Enable error reporting for debugging (development only)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Add CORS headers for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(204);
	exit;
}

// Use PDO if available, otherwise fall back to MySQLi
try {
	if (isset($pdo) && $pdo instanceof PDO) {
		$sql = 'SELECT 
  id_review AS id,
  title,
  review AS summary,
  author,
  photo,
  created_at,
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
FROM reviews
ORDER BY created_at DESC';
		$stmt = $pdo->query($sql);
		$reviews = $stmt->fetchAll();
		echo json_encode($reviews ?? []);
	} elseif (isset($mysqli) && $mysqli instanceof mysqli) {
		$result = $mysqli->query('SELECT 
  id_review AS id,
  title,
  review AS summary,
  author,
  photo,
  created_at,
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
FROM reviews
ORDER BY created_at DESC');
		$reviews = [];
		if ($result) {
			while ($row = $result->fetch_assoc()) {
				$reviews[] = $row;
			}
		}
		echo json_encode($reviews);
	} else {
		http_response_code(500);
		echo json_encode(['error' => 'No DB connection available']);
	}
} catch (Exception $e) {
	http_response_code(500);
	echo json_encode(['error' => 'Query error', 'message' => $e->getMessage()]);
}