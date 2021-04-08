
<?php

session_start();

setcookie("lastCheckInDate", "", time() - 3600,'/');
setcookie("token", "", time() - 3600, '/');
$_SESSION['lastCheckInDate'] = '';
$_SESSION['token'] = '';

echo true;