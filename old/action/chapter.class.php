<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';
require "class/CacheClass.php";

$sid = "";
$iid = "";

/*
 * To get the parameters
 * */
if (isset($_POST['sid']) && $_POST['sid'] != null && $_POST['sid'] != "" && isset($_POST['iid']) && $_POST['iid'] != null && $_POST['iid'] != "") {
    $sid = $_POST['sid'];
    $iid = $_POST["iid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {
    /*
     * The director of cache files
     * */
    $cachedir = './cache/';
    /*
     * Setting the cache time
     * */
    $cache = new Cache($cachedir, $sid, 30);
    if ($cache->load() == true)
        exit(0);

    $tablename = "";
    $first_charactor = "";

    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT m_chapter_table_name FROM subject WHERE m_id='" . $sid . "'";
    $tmparray = $conne->getRowsArray($sql);
    $conne->close_rst();
    $tablename = $tmparray[0]["m_chapter_table_name"];
    $first_charactor = substr($tablename, 0, 1);

    $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_iid='" . $iid . "'";
    $tmpresult = $conne->getRowsArray($sql);

    /*
     * Close the database connection
     * */
    $conne->close_rst();
    $conne->close_conn();

    /*
     * Get the data from database
     * */
    $result = array();
    for ($i = 0; $i < count($tmpresult); $i++) {
        $result[$i] = array("id" => $tmpresult[$i][$first_charactor . "_id"], "name" => $tmpresult[$i][$first_charactor . "_name"]);
    }
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "chapter" => $result));
    /*
     * Write the data to the cache file
     * */

    $cache->write(3, json_encode(array("Code" => "1", "Msg" => "获取数据成功", "chapter" => $result)));
    ob_end_flush();

} else {
    $tablename = "";
    $first_charactor = "";
    /*
     * Load the database config file
     * */
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT m_chapter_table_name FROM subject WHERE m_id='" . $sid . "'";
    $tmparray = $conne->getRowsArray($sql);
    $conne->close_rst();
    $tablename = $tmparray[0]["m_chapter_table_name"];
    $first_charactor = substr($tablename, 0, 1);
    /*
     * Get the data from database
     * */
    $sql = "SELECT * FROM " . $tablename . " WHERE " . $first_charactor . "_iid='" . $iid . "'";
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