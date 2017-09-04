<?php

header("Content-type: text/html; charset=utf-8");
require "account.class.php";

session_start();
$tid = "";
if (isset($_SESSION["type"]) && $_SESSION["type"] == TEACHER_TYPE && isset($_SESSION["account"]) && $_SESSION["account"] != null && $_SESSION["account"] != "" && is_login($_SESSION["account"], $_SESSION["type"])) {
    $tid = $_SESSION["account"]->getTId();
} else {
    $result = array("Code" => "-1", "Msg" => "权限错误");
    echo json_encode($result);
    exit(0);
}

$name = "";
if (isset($_POST["name"]) && $_POST["name"] != null && $_POST["name"] != "") {
    $name = $_POST["name"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require '../db/conn.class.php';
$conne->init_conn();
$sql = "INSERT INTO class(c_name,c_tid,c_time) VALUES ('" . $name . "','" . $tid . "','" . date('Y-m-d h:i:s', time()) . "')";
$affected = $tmparray = $conne->uidRst($sql);
if ($affected == 0) {
    $result = array("Code" => "-1", "Msg" => "添加失败");
    echo json_encode($result);
} else {
    $result = array("Code" => "1", "Msg" => "添加成功");
    echo json_encode($result);
}
