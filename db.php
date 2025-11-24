<?php
// db.php - archivo de configuración de la BD
// Rellena con tu host, dbname, usuario y password desde Hostinger

$DB_HOST = 'TU_HOST_DE_DB';      // ej: localhost o mysqlxxx.hostinger.com
$DB_NAME = 'sava_site';
$DB_USER = 'usuario_db';
$DB_PASS = 'contraseña_segura';

// Opciones PDO
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO(
        "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        $options
    );
} catch (PDOException $e) {
    // En producción no mostrar error completo
    error_log("DB connection failed: " . $e->getMessage());
    // Puedes mostrar un mensaje genérico:
    die("Error de conexión con la base de datos. Intenta más tarde.");
}
