<?php
// db.php - archivo de configuración de la BD

$DB_HOST = '127.0.0.1';     // SIN :3306
$DB_PORT = '3306';          // Puerto separado
$DB_NAME = 'u537060646_Usuarios';
$DB_USER = 'u537060646_Nick';
$DB_PASS = '7dU16XgZ;';

// Opciones PDO
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO(
        "mysql:host={$DB_HOST};port={$DB_PORT};dbname={$DB_NAME};charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        $options
    );
} catch (PDOException $e) {
    error_log("DB connection failed: " . $e->getMessage());
    die("Error de conexión con la base de datos. Intenta más tarde.");
}
