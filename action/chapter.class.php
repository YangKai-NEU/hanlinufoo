<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/SubjectClass.php";
require "./class/CacheClass.php";

$tablename = "";
$iid = "";

/*
 * To get the parameters
 * */

session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && isset($_POST['iid']) && $_POST['iid'] != null && $_POST['iid'] != "") {
    $tablename = $_SESSION[SUBJECT]->m_chaptertablename;
    $iid = $_POST["iid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {

} else {

    /*
     * Load the database config file
     * */
    require '../db/conn.class.php';
    $conne->init_conn();
    $first_charactor = substr($tablename, 0, 1);
    /*
     * Get the data from database
     * */
    $sql = "SELECT " . $first_charactor . "_id," . $first_charactor . "_name FROM " . $tablename . " WHERE " . $first_charactor . "_iid='" . $iid . "'";
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

    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "chapter" => $result));
}