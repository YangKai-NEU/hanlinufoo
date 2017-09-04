<?php

/*
 * This aim is to save the subject information to the session
 * */
header("Content-type: text/html; charset=utf-8");
require "./class/SubjectClass.php";
require "./config.class.php";

session_start();

if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && $_SESSION[SUBJECT] != "") {
    require "../db/conn.class.php";
    $conne->init_conn();
    $sql = "SELECT * FROM grade WHERE m_id='" . $_SESSION[SUBJECT]->m_grade . "'";
    $tmparray = $conne->getRowsArray($sql);
    if (count($tmparray) == 0) {
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
    } else {
        $result = array("Code" => "1", "Msg" => "获取数据成功", "Data" => $tmparray[0]["m_name"] . $_SESSION[SUBJECT]->m_name);
        echo json_encode($result);
    }
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
}