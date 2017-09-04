<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/UserClass.php";
require "./class/SubjectClass.php";

session_start();
$hid = "";
$examtable = "";
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && isset($_POST["hid"]) && $_POST["hid"] != null) {
    $hid = $_POST["hid"];
    $examtable = $_SESSION[SUBJECT]->m_examtablename;
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";
$conne->init_conn();
$sql = "SELECT m_homework_name,m_cid FROM homework WHERE m_id='" . $hid . "'";
$tmp = $conne->getRowsArray($sql);
$conne->close_rst();
if (count($tmp) == 0) {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
} else {
    $homework_name = $tmp[0]["m_homework_name"];
    $cid = $tmp[0]["m_cid"];
    $first_charactor = substr($examtable, 0, 1);
    $sql = "SELECT homework_content.*," . $examtable . "." . $first_charactor . "_name as m_exam_name FROM homework_content," . $examtable . " WHERE m_hid='" . $hid . "' AND m_exam=" . $examtable . "." . $first_charactor . "_id ORDER BY m_exam";
    $tmp = $conne->getRowsArray($sql);
    $result = array("Code" => "1", "Msg" => "获取数据成功" . $sql, "Data" => $tmp, "Name" => $homework_name, "Class" => $cid);
    echo json_encode($result);
    exit(0);
}
