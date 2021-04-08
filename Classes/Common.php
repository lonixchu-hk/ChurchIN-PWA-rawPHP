<?php

namespace Classes;

class Common
{

    /**
     * Function to generate token to be stored in session.
     *
     * @param string $name Name input by user
     * @param string $mobile Mobile input by user
     * @return string token
     */
    public static function generateToken($name, $mobile)
    {
        return "{$name}#####{$mobile}";
    }


    /**
     * Function to decode token to name and mobile.
     *
     * @param string $token Token got from session
     * @return string token
     */
    public static function getInfoFromToken($token)
    {
        $userInfo = explode("#####", $token);

        return [
            "name" => $userInfo[0],
            "mobile" => $userInfo[1],
        ];
    }


    /**
     * Get notification content in home page
     *
     * @param array $user user info
     * @param string|null $lastCheckInDate last check in date of this user
     * @return string Content to be shown in notification block
     */
    public static function getNotiContent($user = [], $lastCheckInDate = null)
    {

        date_default_timezone_set("Asia/Hong_Kong");

        // Check in Info
        // return congrat / reminder
        $reminder = '';
        $weekday = date('w');
        $lastSunday = date('Y-m-d', strtotime('last Sunday', strtotime("now")));
        $nextSunday = date('Y-m-d', strtotime('next Sunday', strtotime("now")));

        if (empty($user)) {
            // not finished setup
            $reminder = "您好，歡迎您使用《實體聚會》，請您喺正式開始使用前，喺設定到填寫你嘅姓名同電話號碼先啦！";
        } else if ($lastCheckInDate == null) {
            $reminder = "填完資料，下一步就係試下掃描QR Code啦！<br>快啲撳下面『CHURCH IN！』按扭開始下一步啦！";
        } else if ($lastCheckInDate == date('Y-m-d')) {
            // is churchIn in today 
            $reminder = "你今日已經有Church IN紀錄啦！";
        } else if ($weekday === "0") {
            // Sunday but not yet churchIn
            $reminder = "今日係主日，快啲翻教會做Church IN啦！";
        } else if ($lastCheckInDate < $lastSunday) {
            // last churchIn record is before last Sunday
            $reminder = "哎呀, 上個星期冇做到Church IN添。黎緊呢個星期，記住係每次聚會開始前，嘟一嘟個QR Code啦！";
        } else {
            // last Sunday done, not yet reach next sunday
            $datetime1 = date_create(date("Y-m-d"));
            $datetime2 = date_create($nextSunday);
            $interval = date_diff($datetime1, $datetime2);
            $dayLeftTillSunday = $interval->format('%a');
            $reminder = "仲有{$dayLeftTillSunday}日就到主日啦，記住係每次聚會開始前，嘟一嘟個QR Code啦！";
        }

        return $reminder;

    }


    /**
     * Get Bible content in home page
     *
     * @return string Content to be shown in Bible block
     */
    public static function getBibleContent()
    {
        // show bible chapter
        $randomContent = [
            [
                "sentence"  => "你要專心仰賴耶和華，不可倚靠自己的聰明， 在你一切所行的事上都要認定他，他必指引你的路。",
                "chapter"   => "箴言 3:5-6"
            ],[
                "sentence" => "我將這些事告訴你們，是要叫你們在我裡面有平安。在世上，你們有苦難；但你們可以放心，我已經勝了世界。",
                "chapter"   => "約翰福音 16:33"
            ],[
                "sentence" => "我留下平安給你們；我將我的平安賜給你們。我所賜的，不像世人所賜的。你們心裡不要憂愁，也不要膽怯。",
                "chapter"   => "約翰福音 14:27"
            ],[
                "sentence" => "我雖然行過死蔭的幽谷，也不怕遭害，因為你與我同在；你的杖，你的竿，都安慰我。在我敵人面前，你為我擺設筵席；你用油膏了我的頭，使我的福杯滿溢。",
                "chapter"   => "詩篇 23:4-5"
            ],[
                "sentence" => "你不要害怕，因為我與你同在；不要驚惶，因為我是你的神。我必堅固你，我必幫助你，我必用我公義的右手扶持你。",
                "chapter"   => "以賽亞書 41:10"
            ],[
                "sentence" => "我的弟兄們，你們落在百般試煉中，都要以為大喜樂；因為知道你們的信心經過試驗，就生忍耐。但忍耐也當成功，使你們成全、完備，毫無缺欠。",
                "chapter"   => "雅各書 1:2-4"
            ],[
                "sentence" => "耶和華是我的巖石，我的山寨，我的救主，我的神，我的磐石，我所投靠的。他是我的盾牌，是拯救我的角，是我的高臺。",
                "chapter"   => "詩篇 18:2"
            ],[
                "sentence" => "神是我們的避難所，是我們的力量，是我們在患難中隨時的幫助。",
                "chapter"   => "詩篇 46:1"
            ]
        ];

        $bibleContent = $randomContent[array_rand($randomContent, 1)];

        return $bibleContent;

    }
}
