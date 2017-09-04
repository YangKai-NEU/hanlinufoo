<?php
header("Content-type: text/html; charset=utf-8");
require "./class/UserClass.php";
require "./config.class.php";
require "../db/conn.class.php";

$cid = "";
session_start();
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && ($_SESSION[ACCOUNT]->m_lv == '1' || $_SESSION[ACCOUNT]->m_lv == '2' || $_SESSION[ACCOUNT]->m_lv == '3') && isset($_POST["cid"]) && $_POST["cid"] != null) {
    $cid = $_POST["cid"];
    $conne->init_conn();
    $sql = "SELECT user.m_id as m_id,user.m_username as m_username FROM user,class_item,class WHERE class_item.m_cid='" . $cid . "' AND class_item.m_sid=user.m_id";
    $tmp = $conne->getRowsArray($sql);
    $conne->close_rst();
    $class_name = "";
    $sql = "SELECT m_name FROM class WHERE m_id='" . $cid . "'";
    $tmp2 = $conne->getRowsArray($sql);
    $conne->close_rst();
    if (count($tmp2) != 0) {
        $class_name = $tmp2[0]["m_name"];
    }
    $conne->close_conn();
    $result = array("Code" => "1", "Msg" => "获取数据成功", "Data" => $tmp, "Name" => $class_name);
    echo json_encode($result);
    exit(0);
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

