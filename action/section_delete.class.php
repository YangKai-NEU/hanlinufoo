<?php

header("Content-type: text/html; charset=utf-8");

$sid="";
$secid="";

if(isset($_POST["sid"])&&$_POST["sid"]!=null&&isset($_POST["secid"])&&$_POST["secid"]!=null){
    $sid=$_POST["sid"];
    $secid=$_POST["secid"];
}else{
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
/*
 * Load the database config file
 * */
require "../db/conn.class.php";

$conne->init_conn();
$sql = "SELECT s_section_table_name FROM subject WHERE s_id='" . $sid . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
$tablename = $tmparray[0]["s_section_table_name"];
$first_charactor = substr($tablename, 0, 1);

$sql="DELETE FROM ".$tablename." WHERE ".$first_charactor."_id='".$secid."'";
$affected=$conne->uidRst($sql);
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
