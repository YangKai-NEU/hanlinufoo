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
$type = "";
if (isset($_POST["cid"]) && $_POST["cid"] != null && $_POST["cid"] != "" && isset($_POST["type"]) && $_POST["type"] != null && $_POST["type"] != "") {
    $cid = $_POST["cid"];
    $type = $_POST["type"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require '../db/conn.class.php';
$conne->init_conn();
if ($type == "2") {
    $sql = "SELECT * FROM student WHERE s_id NOT IN(SELECT c_sid FROM class_item WHERE c_cid='" . $cid . "')";
} else {
    $sql = "SELECT * FROM class_item,student WHERE c_cid='" . $cid . "' AND c_sid=s_id";
}
$tmparray = $conne->getRowsArray($sql);
if (count($tmparray) == 0) {
    $result = array("Code" => "-1", "Msg" => "该班级不存在任何学生");
    echo json_encode($result);
} else {
    $result = array("Code" => "1", "Msg" => "获取数据成功", "studentdata" => $tmparray);
    echo json_encode($result);
}
