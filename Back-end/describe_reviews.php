<?php
require_once __DIR__ . '/db.php';
try {
    if (isset($pdo) && $pdo instanceof PDO) {
        $stmt = $pdo->query('SHOW COLUMNS FROM reviews');
        $cols = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($cols, JSON_PRETTY_PRINT);
    } else {
        echo "No PDO connection\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
