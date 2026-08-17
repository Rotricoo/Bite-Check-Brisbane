<?php

$config = require __DIR__ . '/db.config.php';

$host = 'localhost';
$db   = 'if0_42665315_db_bite_blog';
$user = 'if0_42665315';
$pass = '4dLXQCYoMBeTz';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    // PDO failed (possibly missing pdo_mysql). Try mysqli as a fallback.
    $pdo = null;
    $mysqli = null;
    try {
        $mysqli = new mysqli($host, $user, $pass, $db);
        if ($mysqli->connect_errno) {
            // both PDO and mysqli failed
            http_response_code(500);
            echo 'Connection error (PDO and MySQLi): ' . $e->getMessage() . ' | MySQLi: ' . $mysqli->connect_error;
            exit;
        }
    } catch (Exception $ex) {
        http_response_code(500);
        echo 'Connection error (PDO and MySQLi): ' . $e->getMessage() . ' | ' . $ex->getMessage();
        exit;
    }
}