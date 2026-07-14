<?php

declare(strict_types=1);

$config = require __DIR__ . '/../config/config.php';

header('Access-Control-Allow-Origin: ' . $config['allowed_origin']);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid payload']);
    exit;
}

$nombre = trim((string)($data['nombre'] ?? ''));
$mensaje = trim((string)($data['mensaje'] ?? ''));

if ($nombre === '' || $mensaje === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Nombre y mensaje son obligatorios']);
    exit;
}

$empresa = trim((string)($data['empresa'] ?? ''));
$correo = trim((string)($data['correo'] ?? ''));
$telefono = trim((string)($data['telefono'] ?? ''));
$servicio = trim((string)($data['servicio'] ?? ''));

if ($correo !== '' && !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Correo inválido']);
    exit;
}

$entry = [
    'timestamp' => date('c'),
    'nombre' => $nombre,
    'empresa' => $empresa,
    'correo' => $correo,
    'telefono' => $telefono,
    'servicio' => $servicio ?: 'General',
    'mensaje' => $mensaje,
];

$storageDir = dirname($config['log_file']);
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0775, true);
}
file_put_contents($config['log_file'], json_encode($entry, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND | LOCK_EX);

$body = "Nueva solicitud de contacto — GR Cárdenas Construcciones\n\n"
    . "Nombre: {$entry['nombre']}\n"
    . ($empresa !== '' ? "Empresa: {$empresa}\n" : '')
    . ($correo !== '' ? "Correo: {$correo}\n" : '')
    . ($telefono !== '' ? "Teléfono: {$telefono}\n" : '')
    . "Servicio de interés: {$entry['servicio']}\n\n"
    . "Mensaje:\n{$mensaje}\n";

$headers = "From: {$config['contact_from_email']}\r\n";
if ($correo !== '') {
    $headers .= "Reply-To: {$correo}\r\n";
}

$mailSent = false;
if (function_exists('mail')) {
    $mailSent = @mail($config['contact_to_email'], 'Solicitud de contacto — ' . $entry['servicio'], $body, $headers);
}

echo json_encode(['ok' => true, 'mailSent' => $mailSent]);
