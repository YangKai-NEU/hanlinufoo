<?php

header("Content-type: text/html; charset=utf-8");
require './config.class.php';
require './class/UserClass.php';

session_start();
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null) {
    $result = array("Code" => "1", "Msg" => "您已经登录");
    echo json_encode($result);
    exit(0);
}

$username = '';
$password = '';

if (isset($_POST['username']) && $_POST['username'] != null) {
    $username = $_POST['username'];
}
if (isset($_POST['password']) && $_POST['password'] != null) {
    $password = $_POST['password'];
}
if ($username == "" || $password == "") {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

require '../db/conn.class.php';
$tmp = $conne->init_conn();

$sql = "SELECT * FROM user WHERE m_username='" . $username . "' AND m_password='" . $password . "'";
$tmparray = $conne->getRowsArray($sql);
$conne->close_rst();
$conne->close_conn();
$count = count($tmparray);
if ($count == 1) {
    session_start();
    $_SESSION[ACCOUNT] = new UserClass(
        $tmparray[0]['m_id'],
        $tmparray[0]['m_username'],
        $tmparray[0]['m_password'],
        $tmparray[0]['m_truename'],
        $tmparray[0]['m_phone'],
        $tmparray[0]['m_qq'],
        $tmparray[0]['m_familyphone'],
        $tmparray[0]['m_img'],
        $tmparray[0]['m_school'],
        $tmparray[0]['m_class'],
        $tmparray[0]['m_lv']);
    $result = array("Code" => "1", "Msg" => "登录成功", 'Account' => $_SESSION[ACCOUNT]);
    echo json_encode($result);
    exit(0);
} else if ($count == 0) {
    $result = array("Code" => "-1", "Msg" => "用户名或密码错误");
    echo json_encode($result);
    exit(0);
}