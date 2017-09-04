<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/SubjectClass.php";
require "./class/CacheClass.php";

$gid="";
session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null) {
    $gid=$_SESSION[SUBJECT]->m_grade;
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {

} else {
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT * FROM grade WHERE m_parent='".$gid."'";
    $tmpresult = $conne->getRowsArray($sql);
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "grade"=>$tmpresult));
    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
}