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

require "../db/conn.class.php";
$conne->init_conn();
$tablename="";
if (isset($_SESSION["quiz"]) && $_SESSION["quiz"] != null&&$_SESSION["quiz"]!="") {
    $tablename = $_SESSION["quiz"];
} else {
    $result = array("Code" => "-1", "Msg" => "当前不存在任何试卷");
    echo json_encode($result);
    exit(0);
}

$sql = "DROP TABLE `" . $tablename;
$conne->uidRst($sql);
$conne->close_rst();

$sql = "DELETE FROM homework WHERE h_table_name='".$tablename."'";
$affected = $conne->uidRst($sql);
if ($affected != 1) {
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
    $conne->close_rst();
    $conne->close_conn();
    exit(0);
}
$conne->close_rst();
$conne->close_conn();
$_SESSION["quiz"] = null;
$result = array("Code" => "1", "Msg" => "删除成功l");
echo json_encode($result);
