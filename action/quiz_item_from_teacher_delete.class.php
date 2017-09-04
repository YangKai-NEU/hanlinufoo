<?php

header("Content-type: text/html; charset=utf-8");
require "./config.class.php";
require "./class/UserClass.php";

session_start();
$id = "";
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && isset($_POST["id"]) && $_POST["id"] != null) {
    $id = $_POST["id"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";
$conne->init_conn();
$sql = "DELETE FROM homework_content WHERE m_id='" . $id . "'";
$affected = $conne->uidRst($sql);
$conne->close_rst();
$conne->close_conn();
if ($affected == 0) {
    $result = array("Code" => "-1", "Msg" => "删除失败");
    echo json_encode($result);
    exit(0);
} else {
    $result = array("Code" => "1", "Msg" => "删除成功");
    echo json_encode($result);
    exit(0);
}
