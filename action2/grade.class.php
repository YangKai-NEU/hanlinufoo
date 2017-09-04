<?php

header("Content-type: text/html; charset=utf-8");

/*
 * Load the database config file
 * */
require '../db/conn.class.php';
/*
 * Init the database connection
 * */
$conne->init_conn();
/*
 * Get data from database
 * */
$sql = "SELECT * FROM grade WHERE m_parent='-1'";
$tmparray = $conne->getRowsArray($sql);
/*
 * Close the database connection
 * */
$conne->close_rst();
$conne->close_conn();
/*
 * Get data successful
 * */
$result = array("Code" => "1", "Msg" => "获取数据成功", "Data" => $tmparray);
echo json_encode($result);
?>