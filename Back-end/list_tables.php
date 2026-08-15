<?php
require_once __DIR__ . '/db.php';
try {
    if (isset($pdo) && $pdo instanceof PDO) {
        $stmt = $pdo->query('SHOW TABLES');
        $tables = $stmt->fetchAll(PDO::FETCH_NUM);
        echo "Tables in db:\n";
        foreach ($tables as $t) {
            echo $t[0] . "\n";
        }
    } else {
        echo "No PDO connection\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
