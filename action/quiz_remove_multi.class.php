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

$sid = "";
$time = "";
if (isset($_POST["sid"]) && $_POST["sid"] != null && isset($_POST["time"]) && $_POST["time"] != null) {
    $sid = $_POST["sid"];
    $time = $_POST["time"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

/*
 * Load the database config file
 * */
require "../db/conn.class.php";
$conne->init_conn();
$tablename = "";
$ctime=date('Y-m-d h:i:s', time());
$date=date_create($ctime);
switch($time){
    case "1":
        date_add($date,date_interval_create_from_date_string("-7 days"));
        break;
    case "2":
        date_add($date,date_interval_create_from_date_string("-30 days"));
        break;
    case "3":
        date_add($date,date_interval_create_from_date_string("-90 days"));
        break;
    case "4":
        date_add($date,date_interval_create_from_date_string("-180 days"));
        break;
    case "5":
        date_add($date,date_interval_create_from_date_string("-360 days"));
        break;
    default:
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
        exit(0);
        break;
}

$ctime=date_format($date,"Y-m-d h:i:s");

$sql = "SELECT * FROM homework WHERE h_tid='".$tid."' and h_sid='".$sid."' and h_time<'" . $ctime . "'";
$tmparray = $conne->getRowsArray($sql);

$conne->close_rst();
if(count($tmparray)==0){
    $result = array("Code" => "-1", "Msg" => "未找到任何记录");
    echo json_encode($result);
    $conne->close_rst();
    $conne->close_conn();
    exit(0);
}

$state=false;
for($i=0;$i<count($tmparray);$i++){
    $tablename = $tmparray[$i]["h_table_name"];
    $sql = "DELETE FROM homework WHERE h_id='" . $tmparray[$i]["h_id"] . "'";
    $affected=$conne->uidRst($sql);
    $conne->close_rst();
    if($affected!=0){
        $state=true;
    }
    $sql = "DROP TABLE " . $tablename;
    $affected = $conne->uidRst($sql);
}

if ($state ==false) {
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
    $conne->close_rst();
    $conne->close_conn();
    exit(0);
}

$conne->close_rst();
$conne->close_conn();
$result = array("Code" => "1", "Msg" => "删除成功");
echo json_encode($result);
