<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';
require "class/CacheClass.php";

$sid = "";
$cid = "";
$pid = "";

if (isset($_POST['sid']) && $_POST['sid'] != null && $_POST['sid'] != "" && isset($_POST['cid']) && $_POST['cid'] != null && $_POST['cid'] != "" && isset($_POST['pid']) && $_POST['pid'] != null && $_POST['pid'] != "") {
    $sid = $_POST['sid'];
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
    /*
     * Director of cache file
     * */
    $cachedir = './cache/';
    $cache = new Cache($cachedir, $sid . $cid, 30);
    if ($cache->load() == true)
        exit(0);
    $tablename = "";
    $first_charactor = "";

    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT m_section_table_name FROM subject WHERE m_id='" . $sid . "'";
    $tmparray = $conne->getRowsArray($sql);
    $conne->close_rst();
    $tablename = $tmparray[0]["m_section_table_name"];
    $first_charactor = substr($tablename, 0, 1);

    if ($cid != "-1") {
        $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_chapter='" . $cid . "'";
    } else {
        $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_parent='" . $pid . "'";
    }

    $tmpresult = $conne->getRowsArray($sql);

    /*
    * Format the result
    * */

    $result = array();
    for ($i = 0; $i < count($tmpresult); $i++) {
        $result[$i] = array("id" => $tmpresult[$i][$first_charactor . "_id"], "name" => $tmpresult[$i][$first_charactor . "_name"]);
    }

    echo json_encode(array("Code" => "1", "Msg" => "Getting Section Successful", "section" => $result));
    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
    /*
     * Write the data to the cache file
     * */

    $cache->write(3, json_encode(array("Code" => "1", "Msg" => "Getting Section Successful", "section" => $result)));
    ob_end_flush();
} else {
    $tablename = "";
    $first_charactor = "";

    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT m_section_table_name FROM subject WHERE m_id='" . $sid . "'";
    $tmparray = $conne->getRowsArray($sql);
    $conne->close_rst();
    $tablename = $tmparray[0]["m_section_table_name"];
    $first_charactor = substr($tablename, 0, 1);

    if ($cid != "-1") {
        $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_chapter='" . $cid . "'";
    } else {
        $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_parent='" . $pid . "'";
    }
    $tmpresult = $conne->getRowsArray($sql);

    /*
    * Format the result
    * */
    $result = array();
    for ($i = 0; $i < count($tmpresult); $i++) {
        $result[$i] = array("id" => $tmpresult[$i][$first_charactor . "_id"], "name" => $tmpresult[$i][$first_charactor . "_name"]);
    }
    echo json_encode(array("Code" => "1", "Msg" => "Getting Section Successful", "section" => $result));

    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();
}