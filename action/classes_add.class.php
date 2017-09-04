<?php

header("Content-type: text/html; charset=utf-8");
require "./class/UserClass.php";
require "./config.class.php";

$tid = "";
$cid = "";
$classname = "";
$data = "";
session_start();
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null && ($_SESSION[ACCOUNT]->m_lv == '1' || $_SESSION[ACCOUNT]->m_lv == '2' || $_SESSION[ACCOUNT]->m_lv == '3') && isset($_POST["name"]) && $_POST["name"] != null && isset($_POST["data"]) && $_POST["data"] != null & isset($_POST["cid"]) && $_POST["cid"] != null) {
    $tid = $_SESSION[ACCOUNT]->m_id;
    $classname = $_POST["name"];
    $data = $_POST["data"];
    $cid = $_POST["cid"];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误" . $_POST["name"] . "," . $_POST["data"] . "," . $_POST["cid"]);
    echo json_encode($result);
    exit(0);
}

require "../db/conn.class.php";
$conne->init_conn();
if ($cid == "-1") {
    $time = date('Y-m-d h:i:s', time());
    $sql = "INSERT INTO class(m_name,m_tid,m_time) VALUES('" . $classname . "','" . $tid . "','" . $time . "')";
    $affected = $conne->uidRst($sql);
    if ($affected == 0) {
        $conne->close_conn();
        $result = array("Code" => "-1", "Msg" => "添加失败");
        echo json_encode($result);
        exit(0);
    } else {
        $sql = "SELECT m_id FROM class WHERE m_tid='" . $tid . "' AND m_time='" . $time . "'";
        $tmp = $conne->getRowsArray($sql);
        $conne->close_rst();
        $id = $tmp[0]["m_id"];
        $students = json_decode($data);
        for ($i = 0; $i < count($students); $i++) {
            $sql = "INSERT INTO class_item(m_cid,m_sid) VALUES('" . $id . "','" . $students[$i] . "')";
            $conne->uidRst($sql);
        }
        $conne->close_rst();
        $conne->close_conn();
        $result = array("Code" => "1", "Msg" => "添加成功");
        echo json_encode($result);
        exit(0);
    }
} else {
    $sql = "UPDATE class SET m_name='" . $classname . "' WHERE m_id='" . $cid . "'";
    $affected = $conne->uidRst($sql);
    $sql = "DELETE FROM class_item WHERE m_cid='" . $cid . "'";
    $affected = $conne->uidRst($sql);
    $students = json_decode($data);
    for ($i = 0; $i < count($students); $i++) {
        $sql = "INSERT INTO class_item(m_cid,m_sid) VALUES('" . $cid . "','" . $students[$i] . "')";
        $conne->uidRst($sql);
    }
    $conne->close_conn();
    $result = array("Code" => "1", "Msg" => "更新成功");
    echo json_encode($result);
    exit(0);
}


