<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Load the config file
 * */
require 'config.class.php';
/*
 * Load the database file
 * */
require '../db/conn.class.php';
/*
 * Init the database connection
 * */
$conne->init_conn();
/*
 * Get data from database
 * */
$sql = "SELECT * FROM advert";
$tmparray = $conne->getRowsArray($sql);
/*
 * Close the database connection
 * */
$conne->close_rst();
$conne->close_conn();
/*
 * Format the result
 * */
$finalarray = array();
for ($i = 0; $i < count($tmparray); $i++) {
    $finalarray[$i] = array("id" => $tmparray[$i]["m_id"], "title" => $tmparray[$i]["m_title"], "imgurl" => __ROOT_PATH__ . "/image/" . $tmparray[$i]["m_imgurl"]);
}
/*
 * Get data successful
 * */
$result = array("Code" => "1", "Msg" => "获取数据成功", "Data" => $finalarray);
echo json_encode($result);
?>