<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';

$sid="";
$cid="";

if(isset($_POST["sid"])&&$_POST["sid"]!=null&&isset($_POST["cid"])&&$_POST["cid"]!=null){
    $sid=$_POST["sid"];
    $cid=$_POST["cid"];
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

$sql="DELETE FROM ".$tablename." WHERE ".$first_charactor."_id='".$cid."'";
$affected=$conne->uidRst($sql);
$conne->close_conn();
if($affected==1){
    $result = array("Code" => "1", "Msg" => "成功删除章目录");
    echo json_encode($result);
}else{
    $result = array("Code" => "-1", "Msg" => "删除章目录失败");
    echo json_encode($result);
}
