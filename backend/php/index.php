<?php

header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'service' => 'GR Cárdenas Construcciones — backend API',
    'status' => 'ok',
    'endpoints' => [
        'POST /api/contact.php' => 'Recibe el formulario de contacto',
    ],
]);
