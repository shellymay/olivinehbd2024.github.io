<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('messages.json'), true);
echo json_encode($data);
?>
