<?php

header("Content-type: text/html; charset=utf-8");
require 'config.class.php';

if (isset($_GET['type']) && $_GET['type'] != null) {
    $type = $_GET['type'];
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
}

if ($type == TEACHER_TYPE) {
    if (isset($_GET["username"]) && $_GET["username"] != null) {
        $username = $_GET["username"];
    }
    if (isset($_GET["password"]) && $_GET["password"] != null) {
        $password = $_GET["password"];
    }
    if (isset($_GET["truename"]) && $_GET["truename"] != null) {
        $truename = $_GET["truename"];
    }
    if (isset($_GET["phone"]) && $_GET["phone"] != null) {
        $phone = $_GET["phone"];
    }
    if (isset($_GET["qq"]) && $_GET["qq"] != null) {
        $qq = $_GET["qq"];
    }
    if ($username == "" || $truename == "" || $password == "" || $phone == "" || $qq == "") {
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
    }
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "INSERT INTO teacher(t_username, t_password, t_truename, t_phone, t_qq) VALUES('" . $username . "','" . $password . "','" . $truename . "','" . $phone . "','" . $qq . "')";
    $conne->uidRst($sql);
    $result = array("Code" => "1", "Msg" => "注册成功");
    echo json_encode($result);
    $conne->close_conn();
} else if ($type == ADMIN_TYPE) {
    if (isset($_GET["username"]) && $_GET["username"] != null) {
        $username = $_GET["username"];
    }
    if (isset($_GET["password"]) && $_GET["password"] != null) {
        $password = $_GET["password"];
    }
    if (isset($_GET["phone"]) && $_GET["phone"] != null) {
        $phone = $_GET["phone"];
    }
    if (isset($_GET["qq"]) && $_GET["qq"] != null) {
        $qq = $_GET["qq"];
    }
    if ($username == "" || $password == "" || $phone == "" || $qq == "") {
        $result = array("Code" => "-1", "Msg" => "参数错误");
        echo json_encode($result);
    }
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "INSERT INTO admin(m_username, m_password, m_phone, m_qq) VALUES('" . $username . "','" . $password . "','" . $phone . "','" . $qq . "')";
    $conne->uidRst($sql);
    $result = array("Code" => "1", "Msg" => "注册成功");
    echo json_encode($result);
    $conne->close_conn();
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
}
