<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/UserClass.php";
require "./class/SubjectClass.php";

session_start();
$name = "";
$hid = "";
$cid = "";
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && isset($_POST["title"]) && $_POST["title"] != null && isset($_POST["hid"]) && $_POST["hid"] != null && isset($_POST["cid"]) && $_POST["cid"] != null) {
    $name = $_POST["title"];
    $hid = $_POST["hid"];
    $cid = $_POST["cid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";
$conne->init_conn();
$sql = "UPDATE homework SET m_homework_name='" . $name . "',m_publish='Y',m_cid='" . $cid . "' WHERE m_id='" . $hid . "'";
$conne->uidRst($sql);
$sql = "DELETE FROM homework_item WHERE m_hid='" . $hid . "'";
$conne->uidRst($sql);
$sql = "INSERT INTO homework_item(m_hid,m_sid) SELECT '" . $hid . "',m_sid FROM class_item WHERE m_cid='" . $cid . "'";
$conne->uidRst($sql);
$conne->close_rst();
$conne->close_conn();

$result = array("Code" => "1", "Msg" => "发布成功");
echo json_encode($result);
exit(0);
?>