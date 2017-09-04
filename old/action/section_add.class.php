<?php

header("Content-type: text/html; charset=utf-8");

$sid="";
$name="";
$cid="";
$pid="";

if(isset($_POST["sid"])&&$_POST["sid"]!=null&&isset($_POST["name"])&&$_POST["name"]!=null&&isset($_POST["cid"])&&$_POST["cid"]!=null&&isset($_POST["pid"])&&$_POST["pid"]!=null){
    $sid=$_POST["sid"];
    $name=$_POST["name"];
    $cid=$_POST["cid"];
    $pid=$_POST["pid"];
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
$sql = "SELECT m_section_table_name FROM subject WHERE m_id='" . $sid . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
$tablename = $tmparray[0]["m_section_table_name"];
$first_charactor = substr($tablename, 0, 1);

$sql="INSERT INTO ".$tablename."(".$first_charactor."_name,".$first_charactor."_chapter,".$first_charactor."_parent) VALUES('".$name."','".$cid."','".$pid."')";

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
