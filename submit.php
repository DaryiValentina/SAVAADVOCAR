<?php
// submit.php
header('Content-Type: text/html; charset=utf-8');

// Evitar que errores sensibles se muestren en producción
ini_set('display_errors', 0);
error_reporting(E_ALL);

// incluir la conexión
require_once 'db.php';

// Función simple de limpieza
function clean($s) {
    return trim($s);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Método no permitido";
    exit;
}

// Recolectar y validar
$nombre   = isset($_POST['nombre']) ? clean($_POST['nombre']) : '';
$email    = isset($_POST['email']) ? clean($_POST['email']) : '';
$telefono = isset($_POST['telefono']) ? clean($_POST['telefono']) : '';
$mensaje  = isset($_POST['mensaje']) ? clean($_POST['mensaje']) : '';
$origen   = isset($_POST['origen']) ? clean($_POST['origen']) : null;

// Validaciones básicas
$errors = [];
if (strlen($nombre) < 2) $errors[] = "Nombre inválido";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Email inválido";
if (strlen($mensaje) < 4) $errors[] = "Mensaje demasiado corto";

if (!empty($errors)) {
    // Puedes redirigir con error o mostrar mensajes
    foreach ($errors as $err) echo "<p>".htmlspecialchars($err)."</p>";
    exit;
}

try {
    $sql = "INSERT INTO contactos (nombre, email, telefono, mensaje, origen) VALUES (:nombre, :email, :telefono, :mensaje, :origen)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nombre' => $nombre,
        ':email' => $email,
        ':telefono' => $telefono ?: null,
        ':mensaje' => $mensaje,
        ':origen' => $origen
    ]);

    // Éxito: redirigir a página gracias o mostrar mensaje
    header("Location: gracias.html");
    exit;

} catch (Exception $e) {
    error_log("DB insert error: ".$e->getMessage());
    // Mostrar mensaje genérico al usuario
    echo "Hubo un error al enviar el formulario. Intenta nuevamente.";
    exit;
}
