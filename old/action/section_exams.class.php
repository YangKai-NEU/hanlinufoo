<?php

header("Content-type: text/html; charset=utf-8");

$sid = "";
$secid = "";

if (isset($_POST["sid"]) && $_POST["sid"] != "" && isset($_POST["secid"]) && $_POST["secid"] != "") {
    $sid = $_POST["sid"];
    $secid = $_POST["secid"];
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
$sql = "SELECT m_section_exam_table_name,m_exam_table_name FROM subject WHERE m_id='" . $sid . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
if (count($tmparray) == 0) {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
$sectionexamtablename = $tmparray[0]["m_section_exam_table_name"];
$se_first_charactor = substr($sectionexamtablename, 0, 1);
$examtablename = $tmparray[0]["m_exam_table_name"];
$e_first_charactor = substr($examtablename, 0, 1);

$sql = "SELECT " . $sectionexamtablename . "." . $se_first_charactor . "_eid as id," . $examtablename . "." . $e_first_charactor . "_name as name FROM " . $sectionexamtablename . "," . $examtablename . " WHERE " . $se_first_charactor . "_eid=" . $examtablename . "." . $e_first_charactor . "_id and " . $se_first_charactor . "_sid='" . $secid . "'";
$tmp = $conne->getRowsArray($sql);
/*
   * Close the database
   * */
$conne->close_rst();
$conne->close_conn();
/*
 * Format the result
 * */
$result = array();
for ($i = 0; $i < count($tmp); $i++) {
    $result[$i] = array("name" => $tmp[$i]["name"], "id" => $tmp[$i]["id"]);
}
echo json_encode(array("Code" => "1", "Msg" => "获取数据成功", "exam" => $result));
?>
