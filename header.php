<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require 'Classes/Common.php';

use Classes\Common;

//==========================================

session_start();


$user = [];

// check if this user has session
$token = '';
if (isset($_SESSION['token']) && !empty($_SESSION['token'])) {
    $token = $_SESSION['token'];
    // update cookies as session (have value) is the latest token
    setcookie(
        "token",
        $token,
        time() + (10 * 365 * 24 * 60 * 60), // ten years
        '/'
    );
} else {
    // session's token is null / '', use the cookie one and update session
    if (isset($_COOKIE['token'])) {
        $token = $_COOKIE['token'];
        $_SESSION['token'] = $token;
    }
}


// get user info if there is token
$lastCheckInDate = null;
if ($token) {
    $isNewUser = false;
    $userInfo = Common::getInfoFromToken($token);
    $user = $userInfo;

    // check if this user checked In
    if (isset($_SESSION['lastCheckInDate']) && !empty($_SESSION['lastCheckInDate'])) {
        $lastCheckInDate = $_SESSION['lastCheckInDate'];
        // update cookies as session (have value) is the latest lastCheckInDate
        setcookie(
            "lastCheckInDate",
            $lastCheckInDate,
            time() + (10 * 365 * 24 * 60 * 60), // ten years
            '/'
        );
    } else {
        // session's lastCheckInDate is null / '', use the cookie one and update session
        if (isset($_COOKIE['lastCheckInDate'])) {
            $lastCheckInDate = $_COOKIE['lastCheckInDate'];
            $_SESSION['lastCheckInDate'] = $lastCheckInDate;
        }
    }

} else {
    $isNewUser = true;
}