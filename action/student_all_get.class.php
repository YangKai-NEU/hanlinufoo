<?php
header("Content-type: text/html; charset=utf-8");
require "./class/UserClass.php";
require "./config.class.php";
require "../db/conn.class.php";

session_start();
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && ($_SESSION[ACCOUNT]->m_lv == '1' || $_SESSION[ACCOUNT]->m_lv == '2' || $_SESSION[ACCOUNT]->m_lv == '3')) {
    $conne->init_conn();
    $sql = "SELECT m_id,m_username FROM user WHERE m_lv='4' OR m_lv='5'";
    $tmp = $conne->getRowsArray($sql);
    $conne->close_rst();
    $conne->close_conn();
    $result = array("Code" => "1", "Msg" => "获取数据成功", "Data" => $tmp);
    echo json_encode($result);
    exit(0);
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

