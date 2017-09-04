<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';

$name = "";
$gid = "";

if (isset($_POST["name"]) && $_POST["name"] != null) {
    $name = $_POST["name"];
    if (isset($_POST["gid"]) && $_POST["gid"] != null) {
        $gid = $_POST["gid"];
    }
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";

$conne->init_conn();

if ($gid == "") {
    $sql = "INSERT INTO grade(m_name) VALUES('" . $name . "')";
} else {
    $sql = "INSERT INTO grade(m_name,m_parent) VALUES('" . $name . "','" . $gid . "')";
}

$affected = $conne->uidRst($sql);
$conne->close_conn();
if ($affected == 1) {
    $result = array("Code" => "1", "Msg" => "添加成功");
    echo json_encode($result);
} else {
    $result = array("Code" => "-1", "Msg" => "添加失败");
    echo json_encode($result);
}
