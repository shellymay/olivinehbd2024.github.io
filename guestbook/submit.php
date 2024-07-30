<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nickname = htmlspecialchars($_POST['nickname']);
    $message = htmlspecialchars($_POST['message']);
    $country = htmlspecialchars($_POST['country']);
    $time = date('Y-m-d H:i:s');

    $data = json_decode(file_get_contents('messages.json'), true);
    $data[] = ['nickname' => $nickname, 'message' => $message, 'country' => $country, 'time' => $time];
    file_put_contents('messages.json', json_encode($data));
}
?>
