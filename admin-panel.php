<?php
session_start();

// Si NO está autenticado → fuera
if (!isset($_SESSION['admin'])) {
    header("Location: admin-login.php");
    exit;
}

require_once 'db.php';

// Obtener los datos
$stmt = $pdo->query("SELECT * FROM contactos ORDER BY id DESC");
$registros = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Panel Admin</title>
<style>
body { font-family: Arial; padding:20px; background:#f5f5f5; }
table { width:100%; border-collapse: collapse; background:white; }
th, td { padding:10px; border:1px solid #ddd; }
th { background:#0056b3; color:white; }
.logout { margin-bottom:20px; display:inline-block; }
</style>
</head>
<body>

<a class="logout" href="logout.php">Cerrar sesión</a>

<h2>Registros del formulario</h2>

<table>
    <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Teléfono</th>
        <th>Mensaje</th>
        <th>Origen</th>
    </tr>

    <?php foreach ($registros as $r): ?>
        <tr>
            <td><?= $r['id'] ?></td>
            <td><?= htmlspecialchars($r['nombre']) ?></td>
            <td><?= htmlspecialchars($r['email']) ?></td>
            <td><?= htmlspecialchars($r['telefono']) ?></td>
            <td><?= htmlspecialchars($r['mensaje']) ?></td>
            <td><?= htmlspecialchars($r['origen']) ?></td>
        </tr>
    <?php endforeach; ?>
</table>

</body>
</html>
