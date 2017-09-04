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

require '../db/conn.class.php';
$conne->init_conn();
$sql = "SELECT * FROM class WHERE c_tid='" . $tid . "'";
$tmparray = $conne->getRowsArray($sql);
if (count($tmparray) == 0) {
    $result = array("Code" => "-1", "Msg" => "不存在任何班级");
    echo json_encode($result);
} else {
    $result = array("Code" => "1", "Msg" => "获取数据成功", "classdata" => $tmparray);
    echo json_encode($result);
}
