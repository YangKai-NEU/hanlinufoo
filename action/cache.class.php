<?php

header("Content-type: text/html; charset=utf-8");

$array = array();
$pos = 0;
$file = scandir("./cache");
for ($i = 0; $i < count($file); $i++) {
    if ($file[$i] != "." && $file[$i] != "..") {
        $array[$pos] = array("filename" => $file[$i], "filesize" => filesize("./cache/" . $file[$i]), "filetime" => date("F d Y H:i:s.", fileatime("./cache/" . $file[$i])));
        $pos++;
    }
}
$result = array("Code" => "1", "Msg" => "缓存获取成功", "Data" => $array);
echo json_encode($result);
?>