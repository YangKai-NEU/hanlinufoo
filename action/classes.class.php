<?php

header("Content-type: text/html; charset=utf-8");
require "./class/UserClass.php";
require "./config.class.php";

session_start();
$tid = "";
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && ($_SESSION[ACCOUNT]->m_lv == "1" || $_SESSION[ACCOUNT]->m_lv == "2" || $_SESSION[ACCOUNT]->m_lv == "3")) {
    $tid = $_SESSION[ACCOUNT]->m_id;
} else {
    $result = array("Code" => "-1", "Msg" => "权限错误");
    echo json_encode($result);
    exit(0);
}

require '../db/conn.class.php';
$conne->init_conn();
$sql = "SELECT * FROM class WHERE m_tid='" . $tid . "'";
$tmparray = $conne->getRowsArray($sql);
if (count($tmparray) == 0) {
    $result = array("Code" => "-1", "Msg" => "您还未创建任何班级");
    echo json_encode($result);
    exit(0);
} else {
    $result = array("Code" => "1", "Msg" => "获取数据成功", "classdata" => $tmparray);
    echo json_encode($result);
    exit(0);
}
