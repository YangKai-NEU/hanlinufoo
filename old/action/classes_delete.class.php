<?php

header("Content-type: text/html; charset=utf-8");
require "account.class.php";

session_start();
if (!isset($_SESSION["account"]) || $_SESSION["account"] == null || $_SESSION["account"] == "" || !isset($_SESSION["type"]) || $_SESSION["type"] != TEACHER_TYPE || !is_login($_SESSION["account"], $_SESSION["type"])) {
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

require '../db/conn.class.php';
$conne->init_conn();
$sql = "DELETE FROM class WHERE c_id='" . $cid . "'";
$affected = $tmparray = $conne->uidRst($sql);
if ($affected == 0) {
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
} else {
    $sql = "DELETE FROM class_item WHERE c_cid='" . $cid . "'";
    $tmparray = $conne->uidRst($sql);
    $result = array("Code" => "1", "Msg" => "删除成功");
    echo json_encode($result);
}
