<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/SubjectClass.php";
require "./class/CacheClass.php";

$tablename = "";
$cid = "";
$pid = "";
session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && $_SESSION[SUBJECT] != "" && isset($_POST['cid']) && $_POST['cid'] != null && $_POST['cid'] != "" && isset($_POST['pid']) && $_POST['pid'] != null && $_POST['pid'] != "") {
    $tablename = $_SESSION[SUBJECT]->m_sectiontablename;
    $cid = $_POST['cid'];
    $pid = $_POST["pid"];
} else {
    /*
     * The parameter is error
     * */
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {

} else {
    require '../db/conn.class.php';
    $conne->init_conn();
    $first_charactor = substr($tablename, 0, 1);

    if ($cid != "-1") {
        $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_chapter='" . $cid . "'";
    } else {
        $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_parent='" . $pid . "'";
    }
    $tmpresult = $conne->getRowsArray($sql);
    /*
         * Close the database connection
         * */
    $conne->close_rst();
    $conne->close_conn();
    /*
    * Format the result
    * */
    $result = array();
    for ($i = 0; $i < count($tmpresult); $i++) {
        $result[$i] = array("id" => $tmpresult[$i][$first_charactor . "_id"], "name" => $tmpresult[$i][$first_charactor . "_name"]);
    }
    echo json_encode(array("Code" => "1", "Msg" => "Getting Section Successful", "section" => $result));
}