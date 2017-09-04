<?php

header("Content-type: text/html; charset=utf-8");
require "./class/UserClass.php";
require "./config.class.php";

$cid = "";
$tid = "";
session_start();
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && ($_SESSION[ACCOUNT]->m_lv == '1' || $_SESSION[ACCOUNT]->m_lv == '2' || $_SESSION[ACCOUNT]->m_lv == '3') && isset($_POST["cid"]) && $_POST["cid"] != null) {
    $cid = $_POST["cid"];
    $tid = $_SESSION[ACCOUNT]->m_id;
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";
$conne->init_conn();
$sql = "DELETE FROM class WHERE m_id='" . $cid . "' AND m_tid='" . $tid . "'";
$affected = $conne->uidRst($sql);
if ($affected == 0) {
    $conne->close_conn();
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
    exit(0);
} else {
    $sql = "DELETE FROM class_item WHERE m_cid='" . $cid . "'";
    $conne->uidRst($sql);
    $conne->close_conn();
    $result = array("Code" => "1", "Msg" => "删除成功");
    echo json_encode($result);
    exit(0);
}