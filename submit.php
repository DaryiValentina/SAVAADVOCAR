<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

error_log("submit.php: REQUEST_METHOD=" . $_SERVER['REQUEST_METHOD']); // debug

function clean($s) { return trim($s); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Método no permitido"
    ]);
    exit;
}

$nombre   = isset($_POST['nombre']) ? clean($_POST['nombre']) : '';
$email    = isset($_POST['email']) ? clean($_POST['email']) : '';
$telefono = isset($_POST['telefono']) ? clean($_POST['telefono']) : '';
$mensaje  = isset($_POST['mensaje']) ? clean($_POST['mensaje']) : '';
$origen   = isset($_POST['origen']) ? clean($_POST['origen']) : '';

$errors = [];
if (strlen($nombre) < 2) $errors[] = "Nombre inválido";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Email inválido";
if (strlen($mensaje) < 4) $errors[] = "Mensaje demasiado corto";

if (!empty($errors)) {
    echo json_encode(["status"=>"error", "message"=>$errors[0]]);
    exit;
}

try {
    $sql = "INSERT INTO contactos (nombre, email, telefono, mensaje, origen)
            VALUES (:nombre, :email, :telefono, :mensaje, :origen)";
    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":nombre" => $nombre,
        ":email" => $email,
        ":telefono" => $telefono ?: null,
        ":mensaje" => $mensaje,
        ":origen" => $origen
    ]);

    echo json_encode(["status" => "ok"]);
    exit;

} catch (Exception $e) {
    error_log("DB insert error: ".$e->getMessage());
    echo json_encode(["status"=>"error","message"=>"Error en el servidor"]);
    exit;
}
