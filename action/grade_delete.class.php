<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';

$gid = "";

if (isset($_POST["gid"]) && $_POST["gid"] != null) {
    $gid = $_POST["gid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
/*
 * Load the database config file
 * */
require "../db/conn.class.php";

$conne->init_conn();

$sql = "DELETE FROM grade WHERE g_id='" . $gid . "'";
$affected = $conne->uidRst($sql);
$conne->close_conn();
if ($affected == 1) {
    $result = array("Code" => "1", "Msg" => "删除成功");
    echo json_encode($result);
} else {
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
}
