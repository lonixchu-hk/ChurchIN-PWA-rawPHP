
<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require '../Classes/Common.php';

use Classes\Common;

session_start();

$status = 0;
$text   = isset($_POST['text'])? $_POST['text'] : '';


// Church Code to Add
$validationArray = [

    "我的教會demo 202100 ChurchIN AZM7nMqEp'd2IJ+" => [
        "formCode" => "1FAIpQLSfL1V0uMZ52nZmSp9A9SkKpRmkIKEjKx3n82i0flZbP_8DzIQ",
        "entryCode" => [
            "name"  => "256322667", 
            "mobile"=> "142953802"
        ]
    ],

];



if (isset($validationArray[$text])) {
    // get response value
    $token = isset($_SESSION['token'])? $_SESSION['token'] : '';
    $userInfo = Common::getInfoFromToken($token);

    $domain = "https://docs.google.com/forms/u/4/d/e/";
    $formInfo = $validationArray[$text];
    $formCode = $formInfo['formCode'];
    $entryCodes = $formInfo['entryCode'];
    $entryRequest = "";
    foreach($entryCodes as $field => $entryCode) {
        $value = urlencode($userInfo[$field]);
        $entryRequest .= "&entry.{$entryCode}={$value}";
    }

    $url = $domain.$formCode."/formResponse?ifq".$entryRequest."&submit=Submit";

    // curl to call the form 
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($curl);
    curl_close($curl);

    // update session
    $_SESSION['lastCheckInDate'] = date("Y-m-d");
    $status = 1;
}

echo json_encode([
    "status" => $status
]);