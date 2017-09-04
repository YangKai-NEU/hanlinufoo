<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';

$sid="";
$name="";
$iid="";

if(isset($_POST["sid"])&&$_POST["sid"]!=null&&isset($_POST["name"])&&$_POST["name"]!=null&&isset($_POST["iid"])&&$_POST["iid"]!=null){
    $sid=$_POST["sid"];
    $name=$_POST["name"];
    $iid=$_POST["iid"];
}else{
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";

$conne->init_conn();
$sql = "SELECT m_chapter_table_name FROM subject WHERE m_id='" . $sid . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
$tablename = $tmparray[0]["m_chapter_table_name"];
$first_charactor = substr($tablename, 0, 1);

$sql="INSERT INTO ".$tablename."(".$first_charactor."_name,".$first_charactor."_iid) VALUES('".$name."','".$iid."')";
$affected=$conne->uidRst($sql);
$conne->close_conn();
if($affected==1){
    $result = array("Code" => "1", "Msg" => "添加章目录成功");
    echo json_encode($result);
}else{
    $result = array("Code" => "-1", "Msg" => "添加章目录失败");
    echo json_encode($result);
}
