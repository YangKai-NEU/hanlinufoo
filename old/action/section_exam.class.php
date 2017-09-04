<?php

header("Content-type: text/html; charset=utf-8");

$sid="";
$secid="";
$eid="";

if(isset($_POST["sid"])&&$_POST["sid"]!=""&&isset($_POST["secid"])&&$_POST["secid"]!=""&&isset($_POST["eid"])&&$_POST["eid"]!=""){
    $sid=$_POST["sid"];
    $secid=$_POST["secid"];
    $eid=$_POST["eid"];
}else{
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require  '../db/conn.class.php';
$conne->init_conn();
$sql = "SELECT m_section_exam_table_name FROM subject WHERE m_id='" . $sid . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
$tablename = $tmparray[0]["m_section_exam_table_name"];
$first_charactor = substr($tablename, 0, 1);

$sql="INSERT INTO ".$tablename."(".$first_charactor."_sid,".$first_charactor."_eid) VALUES('".$secid."','".$eid."')";

$affected=$conne->uidRst($sql);
if($affected==1){
    $result = array("Code" => "1", "Msg" => "添加成功");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
}else{
    $result = array("Code" => "-1", "Msg" => "添加失败");
    echo json_encode($result);
    $conne->close_conn();
    exit(0);
}