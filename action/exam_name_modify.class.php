<?php

header("Content-type: text/html; charset=utf-8");
require './config.class.php';
require './class/SubjectClass.php';
require './class/ExamClass.php';
require "./class/CacheClass.php";

$tablename = "";
$eid = "";
$ename = "";

session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && isset($_POST['eid']) && $_POST['eid'] != null && $_POST['eid'] != "" && isset($_POST['ename']) && $_POST['ename'] != null && $_POST['ename'] != "") {
    $tablename = $_SESSION[SUBJECT]->m_examtablename;
    $eid = $_POST["eid"];
    $ename = $_POST["ename"];
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

    $sql = "UPDATE " . $tablename . " SET " . $first_charactor . "_name='" . $ename . "' WHERE " . $first_charactor . "_id='" . $eid . "'";
    $affected = $conne->uidRst($sql);

    /*
     * Close the database connection
     * */
    $conne->close_conn();
    if ($affected == 1) {
        echo json_encode(array("Code" => "1", "Msg" => "数据更新成功"));
    } else {
        echo json_encode(array("Code" => "-1", "Msg" => "数据更新失败"));
    }

}
?>
