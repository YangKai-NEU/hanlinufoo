<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/20 0020
 * Time: afternoon 10:12
 */

header("Content-type: text/html; charset=utf-8");
require '../config/config.php';
$confige->initConfig("../config/config.json");

$webname = null;
if (isset($_POST["web_name"]) && $_POST["web_name"] != null) {
    $webname = $_POST["web_name"];
}

$web_site = null;
if (isset($_POST["web_site"]) && $_POST["web_site"] != null) {
    $web_site = $_POST["web_site"];
}

$web_title = null;
if (isset($_POST["web_title"]) && $_POST["web_title"] != null) {
    $web_title = $_POST["web_title"];
}

$web_root = null;
if (isset($_POST["web_root"]) && $_POST["web_root"] != null) {
    $web_root = $_POST["web_root"];
}
//echo $web_root;
if ($webname != null) {
    $confige->addNewItem("web_name", $webname);
}
if ($web_site != null) {
    $confige->addNewItem("web_site", $web_site);
}
if ($web_title != null) {
    $confige->addNewItem("web_title", $web_title);
}
$confige->writeToFile("../config/config.json");
if ($web_root != null) {
    $filename = "../ueditor/php/config.json";
    $handle = fopen($filename, "r");
    $contents = fread($handle, filesize($filename));
    fclose($handle);
    if (preg_match_all('/\/(.+?)\/ueditor\/php\/upload/', $contents, $matches)) {
        if (count($matches[0]) > 0) {
            $contents = str_replace($matches[1][0], $web_root, $contents);
        }
    }
    $myfile = fopen($filename, "w");
    fwrite($myfile, $contents);
    fclose($myfile);
}

echo "<script language='javascript' type='text/javascript'>";
echo "window.history.go(-1);";
echo "</script>";