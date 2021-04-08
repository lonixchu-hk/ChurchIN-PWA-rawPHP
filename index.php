<?php

include('header.php');

use Classes\Common;


$page = "index";

// get Home Page Message
$bibleContent = Common::getBibleContent();
$notiContent = Common::getNotiContent($user, $lastCheckInDate);

// get image 
$bannerImageDir = "image/banner/";
$bannerImages = scandir($bannerImageDir);
unset($bannerImages[0]); // unset ..
unset($bannerImages[1]); // unset .
$banners = '';
$bannerPlaceholder = '';
foreach($bannerImages as $bannerImage) {
    $bannerSrc = $bannerImageDir.$bannerImage;
    $banners .= "<img class='slide' src='{$bannerSrc}'>";
    $bannerPlaceholder = "<img class='placeholder' src='{$bannerSrc}'>";
}
$banners .= $bannerPlaceholder;

include('master.php');

// Page content
$html = str_replace("{{notiContent}}", $notiContent, $html); 
$html = str_replace("{{bibleSentence}}", $bibleContent['sentence'], $html); 
$html = str_replace("{{bibleChapter}}", $bibleContent['chapter'], $html); 
$html = str_replace("{{banners}}", $banners, $html); 

echo $html;