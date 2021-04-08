<?php


$html = file_get_contents("views/master.html");
$nav_html = file_get_contents("views/nav.html");
$content_html = file_get_contents("views/{$page}.html");

// inject placeholder
$html = str_replace("{{page}}", $page, $html); 
$html = str_replace("{{timestamp}}", date("YmdHis"), $html);
$html = str_replace("{{nav_content}}", $nav_html, $html);
$html = str_replace("{{page_content}}", $content_html, $html);
$html = str_replace("{{name}}", isset($user['name'])? $user['name'] : '', $html);
$html = str_replace("{{mobile}}", isset($user['mobile'])? $user['mobile'] : '', $html);
$html = str_replace("{{memberImage}}", isset($user['memberImage'])? $user['memberImage'] : 'image/member_image/default.png', $html);
$html = str_replace("{{lastCheckInDate}}", ($lastCheckInDate)? $lastCheckInDate : '-', $html);


// replace church names
$churchNameEn = "RAINFUL TOP CHURCH";
$churchNameTc = "卓越盈峯行道會";

$html = str_replace("{{churchNameEn}}", $churchNameEn, $html); 
$html = str_replace("{{churchNameTc}}", $churchNameTc, $html); 



// show popup if is new
if ($isNewUser) {
    $html = str_replace("{{isNewUser}}", 'is-new-user', $html);
}
