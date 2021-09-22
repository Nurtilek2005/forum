<?php

$form_login = $_POST["login"];
$form_password = $_POST["password"];
$status = 'success';

if ($form_login && $form_password) {
    $conn = new mysqli('localhost', 'root', '', 'uhmcpe');
    $result = $conn->query("SELECT * FROM users");
    $resonse = array(
        'login' => "$form_login",
        'password' => "$form_password",
        'status' => null
    );
    if ($result) {
        $row = $result->fetch_array();
        if (!$row) {
            $conn->query('INSERT INTO `users` (`LOGIN`, `PASSWORD`) VALUES ("' . $form_login . '", "' . $form_password . '")');
        }
        while ($row) {
            $user_login = $row["LOGIN"];
            if ($form_login == $user_login) {
                $resonse['status'] = "registered";
                die(json_encode($resonse));
            } else {
                $conn->query('INSERT INTO `users` (`LOGIN`, `PASSWORD`) VALUES ("' . $form_login . '", "' . $form_password . '")');
                break;
            }
        }
    }

    echo json_encode($resonse);
}
