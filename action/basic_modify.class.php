<?php

header("Content-type: text/html; charset=utf-8");
require '../config/config.php';
$confige->initConfig("../config/config.json");

if (isset($_POST["web_name"]) && $_POST["web_name"] != null && $_POST["web_name"] != "") {
    $confige->addNewItem("web_name", $_POST["web_name"]);
}
if (isset($_POST["web_site"]) && $_POST["web_site"] != null && $_POST["web_site"] != "") {
    $confige->addNewItem("web_site", $_POST["web_site"]);
}
if (isset($_POST["web_title"]) && $_POST["web_title"] != null && $_POST["web_title"] != "") {
    $confige->addNewItem("web_title", $_POST["web_title"]);
}
$confige->writeToFile("../config/config.json");

$result = array("Code" => "1", "Msg" => "提交成功");
echo json_encode($result);