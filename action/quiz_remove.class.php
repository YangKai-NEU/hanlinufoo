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

$sid = "";
$hid = "";
if (isset($_POST["sid"]) && $_POST["sid"] != null && isset($_POST["h_id"]) && $_POST["h_id"] != null) {
    $sid = $_POST["sid"];
    $hid = $_POST["h_id"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";
$conne->init_conn();
$tablename = "";

$sql = "SELECT * FROM homework WHERE h_id='" . $hid . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
if(count($tmparray)==0){
    $result = array("Code" => "-1", "Msg" => "未找到任何记录");
    echo json_encode($result);
    $conne->close_rst();
    $conne->close_conn();
    exit(0);
}

$tablename = $tmparray[0]["h_table_name"];

$sql = "DELETE FROM homework WHERE h_id='" . $hid . "'";
$affected=$conne->uidRst($sql);
$conne->close_rst();

if ($affected != 1) {
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
    $conne->close_rst();
    $conne->close_conn();
    exit(0);
}

$sql = "DROP TABLE " . $tablename;
$affected = $conne->uidRst($sql);

$conne->close_rst();
$conne->close_conn();
$result = array("Code" => "1", "Msg" => "删除成功l");
echo json_encode($result);
