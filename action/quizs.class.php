<?php

header("Content-type: text/html; charset=utf-8");
require "./account.class.php";

session_start();
$sid = "";
$tid = "";

if (isset($_SESSION["type"]) && $_SESSION["type"] == TEACHER_TYPE && isset($_SESSION["account"]) && $_SESSION["account"] != null && $_SESSION["account"] != "" && is_login($_SESSION["account"], $_SESSION["type"])) {
    $tid = $_SESSION["account"]->getTId();
} else {
    $result = array("Code" => "-1", "Msg" => "权限错误");
    echo json_encode($result);
    exit(0);
}

if (isset($_POST["sid"]) && $_POST["sid"] != "") {
    $sid = $_POST["sid"];
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "SELECT * FROM homework WHERE h_tid='" . $tid . "' AND h_sid='" . $sid . "' AND h_submit='Y'";
    $tmparray = $conne->getRowsArray($sql);

    $result = array("Code" => "1", "Msg" => "获取数据成功", "quizs" => $tmparray);
    echo json_encode($result);

} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
}
