<?php

header("Content-type: text/html; charset=utf-8");
require './config.class.php';
require './class/SubjectClass.php';
require './class/ExamClass.php';
require "./class/CacheClass.php";

function getSection($conn, $tablename, $section)
{
    $first_charactor = substr($tablename, 0, 1);
    $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_parent='" . $section->m_id . "'";
    $tmp = $conn->getRowsArray($sql);
    $conn->close_rst();
    for ($i = 0; $i < count($tmp); $i++) {
        $section->m_exams[$i] = new ExamClass($tmp[$i][$first_charactor . "_id"], $tmp[$i][$first_charactor . "_name"], array());
        getSection($conn, $tablename, $section->m_exams[$i]);
    }
}

$tablename = "";
$iid = "";

session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null) {
    $tablename = $_SESSION[SUBJECT]->m_examtablename;
    $iid = $_POST["iid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
if (CACHEENABLE) {

} else {
    require '../db/conn.class.php';
    $conne->init_conn();
    $first_charactor = substr($tablename, 0, 1);

    $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_parent='-1'";
    $tmpresult = $conne->getRowsArray($sql);
    $conne->close_rst();
    /*
    * Format the result
    * */
    $result = array();
    for ($i = 0; $i < count($tmpresult); $i++) {
        $result[$i] = new ExamClass($tmpresult[$i][$first_charactor . "_id"], $tmpresult[$i][$first_charactor . "_name"], array());
        getSection($conne, $tablename, $result[$i]);
    }
    /*
         * Close the database connection
         * */
    $conne->close_rst();
    $conne->close_conn();
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "exam" => $result));
}
?>
