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

$cid = "";
if (isset($_POST["cid"]) && $_POST["cid"] != null && $_POST["cid"] != "") {
    $cid = $_POST["cid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
/*
 * Load the database config file
 * */
require '../db/conn.class.php';
$conne->init_conn();
/*
 * Get the data from database
 * */
$sql = "DELETE FROM class_item WHERE c_id='" . $cid . "'";
$affected = $tmparray = $conne->getRowsArray($sql);
if ($affected == 0) {
    $result = array("Code" => "-1", "Msg" => "该班级没有任何学生");
    echo json_encode($result);
} else {
    $result = array("Code" => "1", "Msg" => "获取数据成功");
    echo json_encode($result);
}
