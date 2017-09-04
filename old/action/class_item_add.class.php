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
$sid = "";
if (isset($_POST["cid"]) && $_POST["cid"] != null && $_POST["cid"] != "" && isset($_POST["sid"]) && $_POST["sid"] != null && $_POST["sid"] != "") {
    $cid = $_POST["cid"];
    $sid = $_POST["sid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require '../db/conn.class.php';
$conne->init_conn();
$sql = "INSERT INTO class_item(m_cid,m_sid) VALUES ('" . $cid . "','" . $sid . "')";

$affected = $conne->uidRst($sql);
if ($affected == 0) {
    $result = array("Code" => "-1", "Msg" => "添加失败");
    echo json_encode($result);
} else {
    $result = array("Code" => "1", "Msg" => "添加成功");
    echo json_encode($result);
}
