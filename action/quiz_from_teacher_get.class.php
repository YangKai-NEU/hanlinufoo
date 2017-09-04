<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/UserClass.php";
require "./class/SubjectClass.php";

session_start();
$tid = "";
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null) {
    $tid = $_SESSION[ACCOUNT]->m_id;
} else {
    $result = array("Code" => "-1", "Msg" => "权限错误");
    echo json_encode($result);
    exit(0);
}

$sid = "";
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null) {
    $sid = $_SESSION[SUBJECT]->m_id;
    require "../db/conn.class.php";
    $conne->init_conn();
    $sql = "SELECT * FROM homework WHERE m_tid='" . $tid . "' AND m_sid='" . $sid . "' ORDER BY m_time DESC";
    $tmp = $conne->getRowsArray($sql);
    $result = array("Code" => "1", "Msg" => "获取数据成功", "Data" => $tmp);
    echo json_encode($result);
    exit(0);
}