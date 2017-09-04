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

if (isset($_SESSION["quiz"]) && $_SESSION["quiz"] != null && $_SESSION["quiz"] != "") {
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "UPDATE homework SET h_submit='Y' WHERE h_table_name='" . $_SESSION["quiz"] . "'";
    $conne->uidRst($sql);
    $conne->close_conn();
    $_SESSION["quiz"] = null;
    $result = array("Code" => "1", "Msg" => "清除成功");
    echo json_encode($result);
} else {
    $result = array("Code" => "-1", "Msg" => "清除失败");
    echo json_encode($result);
    exit(0);
}


