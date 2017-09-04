<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/UserClass.php";

session_start();
$hid = "";
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && isset($_POST["hid"]) && $_POST["hid"] != null) {
    $hid = $_POST["hid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";
$conne->init_conn();
$sql = "DELETE FROM homework WHERE m_id='" . $hid . "'";
$affected = $conne->uidRst($sql);
if ($affected != 0) {
    $sql = "DELETE FROM homework_item WHERE m_hid='" . $hid . "'";
    $affected = $conne->uidRst($sql);
    $result = array("Code" => "1", "Msg" => "删除成功");
    echo json_encode($result);
    exit(0);
} else {
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
    exit(0);
}
?>