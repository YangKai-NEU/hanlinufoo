<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';
require "class/CacheClass.php";

$sid = "";
$pid = "";

if (isset($_POST['sid']) && $_POST['sid'] != null && $_POST['sid'] != "" && isset($_POST['pid']) && $_POST['pid'] != null && $_POST['pid'] != "") {
    $sid = $_POST['sid'];
    $pid = $_POST['pid'];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {
    /*
     * The director of the cache file
     * */
    $cachedir = './cache/';
    $cache = new Cache($cachedir, $sid . $cecid, 30);
    if ($cache->load() == true)
        exit(0);
    $tablename = "";
    $first_charactor = "";

    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT s_exam_table_name FROM subject WHERE s_id='" . $sid . "'";
    $tmparray = $conne->getRowsArray($sql);
    $conne->close_rst();
    $tablename = $tmparray[0]["s_exam_table_name"];
    $first_charactor = substr($tablename, 0, 1);

    $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_parent='" . $pid . "'";
    $tmpresult = $conne->getRowsArray($sql);

    /*
    * Format the result
    * */
    $result = array();
    for ($i = 0; $i < count($tmpresult); $i++) {
        $result[$i] = array("id" => $tmpresult[$i][$first_charactor . "_id"], "name" => $tmpresult[$i][$first_charactor . "_name"]);
    }

    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "exam" => $result));
    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
    /*
     * Write the result to the cache file
     * */

    $cache->write(3, json_encode(array("Code" => "1", "Msg" => "获取数据成功", "exam" => $result)));
    ob_end_flush();
} else {
    $tablename = "";
    $first_charactor = "";

    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT s_exam_table_name FROM subject WHERE s_id='" . $sid . "'";
    $tmparray = $conne->getRowsArray($sql);
    $conne->close_rst();
    $tablename = $tmparray[0]["s_exam_table_name"];
    $first_charactor = substr($tablename, 0, 1);

    $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_parent='" . $pid . "'";
    $tmpresult = $conne->getRowsArray($sql);

    /*
    * Format the result
    * */

    $result = array();
    for ($i = 0; $i < count($tmpresult); $i++) {
        $result[$i] = array("id" => $tmpresult[$i][$first_charactor . "_id"], "name" => $tmpresult[$i][$first_charactor . "_name"]);
    }

    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "exam" => $result));
    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
}
?>