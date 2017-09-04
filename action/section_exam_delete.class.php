<?php

header("Content-type: text/html; charset=utf-8");

$sid = "";
$seid = "";

if (isset($_POST["sid"]) && $_POST["sid"] != "" && isset($_POST["seid"]) && $_POST["seid"] != "") {
    $sid = $_POST["sid"];
    $seid = $_POST["seid"];
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
/*
 * Get data from database
 * */
$sql = "SELECT s_section_exam_table_name FROM subject WHERE s_id='" . $sid . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
$sectionexamtablename = $tmparray[0]["s_section_exam_table_name"];
$se_first_charactor = substr($sectionexamtablename, 0, 1);

$sql = "DELETE FROM ".$sectionexamtablename." WHERE ".$se_first_charactor."_id='".$seid."'";
$affected=$tmp = $conne->uidRst($sql);

if($affected==1){
    $result = array("Code" => "1", "Msg" => "删除成功");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
}else{
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
}
