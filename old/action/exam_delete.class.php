<?php

header("Content-type: text/html; charset=utf-8");

$sid = "";
$eid = "";

if (isset($_POST["sid"]) && $_POST["sid"] != null && isset($_POST["eid"]) && $_POST["eid"] != null) {
    $sid = $_POST["sid"];
    $eid = $_POST["eid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";

$conne->init_conn();
$sql = "SELECT m_exam_table_name FROM subject WHERE m_id='" . $sid . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
$tablename = $tmparray[0]["m_exam_table_name"];
$first_charactor = substr($tablename, 0, 1);

$sql = "DELETE FROM " . $tablename . " WHERE " . $first_charactor . "_id='" . $eid . "'";
$affected = $conne->uidRst($sql);
if ($affected == 1) {
    $result = array("Code" => "1", "Msg" => "删除成功");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
} else {
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
}
