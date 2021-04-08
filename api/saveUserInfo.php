
<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require '../Classes/Common.php';

use Classes\Common;

session_start();

$name   = isset($_POST['name'])? $_POST['name'] : '';
$mobile = isset($_POST['mobile'])? $_POST['mobile'] : '';

$error = [];

// validate name
if (empty($name)) {
    $error[] = "姓名不能留空。";
}

// validate mobile
if (empty($mobile)) {
    $error[] = "電話號碼不能留空。";
} else if (!(preg_match('/^[0-9]{8}+$/', $mobile))) {
    $error[] = "電話號碼格式錯誤。";
}

if (empty($error)) {
    // save to session
    $_SESSION['token'] = Common::generateToken($name , $mobile);
}

echo json_encode([
    "status" => empty($error),
    "error"  => $error
]);

