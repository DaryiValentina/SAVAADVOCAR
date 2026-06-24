<?php
session_start();

// Si ya está logueado → redirigir
if (isset($_SESSION['admin'])) {
    header("Location: admin-panel.php");
    exit;
}

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $user = trim($_POST['usuario'] ?? '');
    $pass = $_POST['clave'] ?? '';

    // *** CAMBIA ESTO por las credenciales que quieras ***
    $ADMIN_USER = "admin";
    $ADMIN_PASS = '$2y$10$kF1E/j6dgS3qKoU/JNspXe6tz6kVpxl9hld.WLGRWovjqFziLSaWS';

    if ($user === $ADMIN_USER && password_verify($pass, $ADMIN_PASS)) {

        session_regenerate_id(true);
        $_SESSION['admin'] = $user;

        header("Location: admin-panel.php");
        exit;

    } else {
        $error = "Usuario o contraseña incorrectos";
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Login Administrador</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            height: 100vh;
            font-family: Arial, sans-serif;

            /* IMAGEN DE FONDO */
            background-image: url('../img/Fondoo.png'); /* <-- tu imagen */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            /* CENTRADO */
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .form-login {
            max-width: 300px;
            background: white;
            padding: 20px;
            margin: auto;
            border-radius: 8px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
        }

        button {
            padding: 10px;
            width: 100%;
            background: #0056b3;
            color: white;
            border: none;
            border-radius: 6px;
        }
    </style>
</head>

<body>

    <div class="form-login">
        <h2>Acceso Administrador</h2>
        <?php if ($error): ?>
            <p style="color:red;"><?= $error ?></p>
        <?php endif; ?>

        <form method="POST">
            <input type="text" name="usuario" placeholder="Usuario" required>
            <input type="password" name="clave" placeholder="Contraseña" required>
            <button type="submit">Entrar</button>
        </form>
    </div>

</body>

</html>