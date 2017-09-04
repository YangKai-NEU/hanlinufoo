<?php

header("Content-type: text/html; charset=utf-8");
require 'account.class.php';

$sid = "";
$questiontype = "";
$qid="";
if (isset($_POST["sid"]) && $_POST["sid"] != null && isset($_POST["type"]) && $_POST["type"]&& isset($_POST["qid"]) && $_POST["qid"]) {
    $sid = $_POST["sid"];
    $questiontype = $_POST["type"];
    $qid=$_POST["qid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

$tablename = "";
$first_charactor = "";

switch ($questiontype) {
    case "1":
        require '../db/conn.class.php';
        $conne->init_conn();
        $sql = "SELECT s_choice_table_name FROM subject WHERE s_id='" . $sid . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["s_choice_table_name"];
        $first_charactor = substr($tablename, 0, 1);
        break;
    case "2":
        require '../db/conn.class.php';
        $conne->init_conn();
        $sql = "SELECT s_fillin_table_name FROM subject WHERE s_id='" . $sid . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["s_fillin_table_name"];
        $first_charactor = substr($tablename, 0, 1);
        break;
    case "3":
        require '../db/conn.class.php';
        $conne->init_conn();
        $sql = "SELECT s_answer_table_name FROM subject WHERE s_id='" . $sid . "'";
        $tmparray = $conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename = $tmparray[0]["s_answer_table_name"];
        $first_charactor = substr($tablename, 0, 1);
        break;
    default:
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
        exit(0);
        break;
}

$sql = "DELETE FROM " . $tablename." WHERE ".$first_charactor."_id='".$qid."'";

$tmpresult = $conne->uidRst($sql);

/*
 * ������β�ѯ���
 * */

if($tmpresult==1){
    echo json_encode(array("Code" => "1", "Msg" => "删除成功"));
}else{
    echo json_encode(array("Code" => "-1", "Msg" => "删除失败"));
}

/*
 * ��ղ�ѯ���
 * */
$conne->close_rst();
/*
 * �ر����ݿ�����
 * */
$conne->close_conn();