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

if(isset($_POST["hid"] )&&$_POST["hid"] !=null&&$_POST["hid"] !=""&&isset($_POST["eid"] )&&$_POST["eid"] !=null&&$_POST["eid"] !=""&&isset($_POST["expect"] )&&$_POST["expect"] !=null&&$_POST["expect"] !=""){
    require '../db/conn.class.php';
    $conne->init_conn();

    $sql="SELECT * FROM homework WHERE h_id='".$_POST["hid"]."'";
    $tmparray=$conne->getRowsArray($sql);
    $conne->close_rst();

    if(count($tmparray)!=0){
        $table=$tmparray[0]["h_table_name"];
        $sql="UPDATE ".$table." SET q_expect='".$_POST["expect"]."' WHERE q_exam='".$_POST["eid"]."'";
        $affected=$conne->uidRst($sql);

        $result = array("Code" => "1", "Msg" => "获取数据成功");
        echo json_encode($result);

    }else{
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
    }
}
else{
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}
