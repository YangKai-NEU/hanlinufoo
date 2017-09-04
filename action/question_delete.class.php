<?php

header("Content-type: text/html; charset=utf-8");
require './account.class.php';
require "./class/SubjectClass.php";

$questiontype = "";
$qid = "";

session_start();
if (isset($_SESSION[SUBJECT]) && $_SESSION[SUBJECT] != null && $_SESSION[SUBJECT] != "" && isset($_POST["type"]) && $_POST["type"] && isset($_POST["qid"]) && $_POST["qid"]) {
    $questiontype = $_POST["type"];
    $qid = $_POST["qid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

$tablename = "";
$first_charactor = "";

require '../db/conn.class.php';
$conne->init_conn();
switch ($questiontype) {
    case "1":
        $tablename = $_SESSION[SUBJECT]->m_choicetablename;
        $first_charactor = substr($tablename, 0, 1);
        break;
    case "2":
        $tablename = $_SESSION[SUBJECT]->m_fillintablename;
        $first_charactor = substr($tablename, 0, 1);
        break;
    case "3":
        $tablename = $_SESSION[SUBJECT]->m_answertablename;
        $first_charactor = substr($tablename, 0, 1);
        break;
    default:
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
        exit(0);
        break;
}

$sql = "DELETE FROM " . $tablename . " WHERE " . $first_charactor . "_id='" . $qid . "'";
$tmpresult = $conne->uidRst($sql);
$conne->close_conn();

if ($tmpresult == 1) {
    echo json_encode(array("Code" => "1", "Msg" => "删除成功"));
} else {
    echo json_encode(array("Code" => "-1", "Msg" => "删除失败".$sql));
}
?>
