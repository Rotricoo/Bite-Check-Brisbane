<?php
require_once __DIR__ . '/db.php';

// Simple test to check PDO connection
try {
    if (isset($pdo) && $pdo instanceof PDO) {
        echo "PDO is set and ready\n";
        $stmt = $pdo->query('SELECT 1');
        $res = $stmt->fetchAll();
        echo "Query OK: ";
        var_export($res);
    } else {
        echo "PDO is not set\n";
    }
} catch (Exception $e) {
    echo "Connection error: " . $e->getMessage() . "\n";
}
