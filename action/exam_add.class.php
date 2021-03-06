<?php

header("Content-type: text/html; charset=utf-8");

$sid = "";
$name = "";
$pid = "";

if (isset($_POST["sid"]) && $_POST["sid"] != null && isset($_POST["name"]) && $_POST["name"] != null && isset($_POST["pid"]) && $_POST["pid"] != null) {
    $sid = $_POST["sid"];
    $name = $_POST["name"];
    $pid = $_POST["pid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";

$conne->init_conn();
$sql = "SELECT s_exam_table_name FROM subject WHERE s_id='" . $sid . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
$tablename = $tmparray[0]["s_exam_table_name"];
$first_charactor = substr($tablename, 0, 1);

$sql = "INSERT INTO " . $tablename . "(" . $first_charactor . "_name," . $first_charactor . "_parent) VALUES('" . $name . "','" . $pid . "')";
$affected = $conne->uidRst($sql);
if ($affected == 1) {
    $result = array("Code" => "1", "Msg" => "添加成功");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
} else {
    $result = array("Code" => "-1", "Msg" => "添加失败");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
}