<?php
header("Content-type: text/html; charset=utf-8");
require "./class/UserClass.php";
require "./config.class.php";
require "../db/conn.class.php";

$cid = "";
$sid = "";
session_start();
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && ($_SESSION[ACCOUNT]->m_lv == '1' || $_SESSION[ACCOUNT]->m_lv == '2' || $_SESSION[ACCOUNT]->m_lv == '3') && isset($_POST["cid"]) && $_POST["cid"] != null && isset($_POST["sid"]) && $_POST["sid"] != null) {
    $cid = $_POST["cid"];
    $sid = $_POST["sid"];
    $conne->init_conn();
    $sql = "DELETE FROM class_item WHERE class_item.m_cid='" . $cid . "' AND class_item.m_sid='" . $sid . "'";
    $affexted = $conne->uidRst($sql);
    $conne->close_rst();
    $conne->close_conn();
    if ($affexted == 1) {
        $result = array("Code" => "1", "Msg" => "删除成功");
        echo json_encode($result);
        exit(0);
    } else {
        $result = array("Code" => "-1", "Msg" => "删除失败");
        echo json_encode($result);
        exit(0);
    }
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

