<?php

function getKeyImg($str)
{
    if (preg_match_all('/<img src="(.+?)" title(.+?)>/', $str, $matches)) {
        for ($i = 0; $i < count($matches[1]); $i++) {
            $url = "12345";
            $str = str_replace($matches[0][$i], "<img src=\"" . $url . "\" style=\"vertical-align: middle\"/>", $str);
        }
    }
    return $str;
}

echo getKeyImg($_POST["question"]);