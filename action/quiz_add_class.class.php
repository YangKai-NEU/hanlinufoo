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

if(isset($_POST["hid"] )&&$_POST["hid"] !=null&&$_POST["hid"] !=""&&isset($_POST["cid"] )&&$_POST["cid"] !=null&&$_POST["cid"] !=""){
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql="UPDATE homework SET h_cid='".$_POST["cid"]."',h_publish='Y' WHERE h_id='".$_POST["hid"]."'";
    $affected=$conne->uidRst($sql);
    if($affected==1){
        $sql="DELETE FROM homework_item WHERE h_hid='".$_POST["hid"]."'";
        $conne->uidRst($sql);
        $sql="INSERT INTO homework_item(h_hid,h_sid) SELECT '".$_POST["hid"]."',c_sid FROM class_item WHERE c_cid='".$_POST["cid"]."'";
        $conne->uidRst($sql);
    }
    $result = array("Code" => "1", "Msg" => "操作成功");
    echo json_encode($result);
    exit(0);
}
else{
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
