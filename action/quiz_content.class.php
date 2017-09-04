<?php

header("Content-type: text/html; charset=utf-8");
require "account.class.php";

session_start();
$tid = "";
if (isset($_SESSION["type"]) && $_SESSION["type"] == TEACHER_TYPE && isset($_SESSION["account"]) && $_SESSION["account"] != null && $_SESSION["account"] != "" && is_login($_SESSION["account"], $_SESSION["type"])) {
    $tid = $_SESSION["account"]->getTId();
} else {
    $result = array("Code" => "-1", "Msg" => "权限错误");
    echo json_encode($result);
    exit(0);
}

if(isset($_POST["qid"] )&&$_POST["qid"] !=null&&$_POST["qid"] !=""){
    require '../db/conn.class.php';
    $conne->init_conn();

    $sql="SELECT * FROM homework WHERE h_id='".$_POST["qid"]."'";
    $tmparray=$conne->getRowsArray($sql);
    $conne->close_rst();
    if(count($tmparray)!=0){
        $name=$tmparray[0]["h_homework_name"];
        $table=$tmparray[0]["h_table_name"];
        $sql="SELECT s_exam_table_name FROM subject WHERE s_id='".$tmparray[0]["h_sid"]."'";
        $tmparray=$conne->getRowsArray($sql);
        $conne->close_rst();
        $tablename=$tmparray[0]["s_exam_table_name"];
        $first_charactor = substr($tablename, 0, 1);

        $sql="SELECT ".$table.".*,".$tablename.".".$first_charactor."_name as name FROM ".$table.",".$tablename." WHERE q_exam=".$tablename.".".$first_charactor."_id ORDER BY q_exam";
        $tmparray=$conne->getRowsArray($sql);
        $conne->close_rst();
        $result = array("Code" => "1", "Msg" => "删除成功","question"=>$tmparray,"title"=>$name);
        $conne->close_conn();
        echo json_encode($result);
    }else{
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
    }
}
else{
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
}
