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

} else {
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "select m_id,m_name from subject where m_grade='" . $grade_id . "'";
    $tmpresult = $conne->getRowsArray($sql);
    /*
    * Output the page content
    * */
    echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "subject" => $tmpresult));
    /*
     * Clear the quering results
     * */
    $conne->close_rst();
    /*
     * Close the database connection
     * */
    $conne->close_conn();
}