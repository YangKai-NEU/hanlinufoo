<?php

header("Content-type: text/html; charset=utf-8");
require "config.class.php";
require "class/CacheClass.php";

$grade_id = '';
/*
 * To get the parameters
 * */
if (isset($_POST['grade_id']) && $_POST['grade_id'] != null) {
    $grade_id = $_POST['grade_id'];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

if (CACHEENABLE) {
    /*
     * Set the cache directories
     * */
    $cachedir = './cache/';
    /*
     * Init the cache object, life time is 30s
     * */
    $cache = new Cache($cachedir, $grade_id, 30);
    if ($cache->load() == true)
        exit(0);
    /*
     * If there is not the cache files, create it and make query and write the result to the cache file
     * */
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "select m_id,m_name from subject where m_grade='" . $grade_id . "'";
    $tmpresult = $conne->getRowsArray($sql);
    $result = array();
    for ($i = 0; $i < count($tmpresult); $i++) {
        $result[$i] = array('m_id' => $tmpresult[$i]['m_id'], 'm_name' => $tmpresult[$i]['m_name']);
    }
    /*
     * Output the page content
     * */
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "subject" => $result));
    /*
     * Clear the quering results
     * */
    $conne->close_rst();
    /*
     * Close the database connection
     * */
    $conne->close_conn();
    /*
     * Write the quering to the cache
     * */
    $cache->write(3, json_encode(array("Code" => "1", "Msg" => "获取数据成功", "subject" => $result)));
    ob_end_flush();
} else {
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "select m_id,m_name from subject where m_grade='" . $grade_id . "'";
    $tmpresult = $conne->getRowsArray($sql);
    $result = array();
    for ($i = 0; $i < count($tmpresult); $i++) {
        $result[$i] = array('m_id' => $tmpresult[$i]['m_id'], 'm_name' => $tmpresult[$i]['m_name']);
    }
    /*
    * Output the page content
    * */
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "subject" => $result));
    /*
     * Clear the quering results
     * */
    $conne->close_rst();
    /*
     * Close the database connection
     * */
    $conne->close_conn();
}