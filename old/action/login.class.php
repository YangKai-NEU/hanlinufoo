<?php

header("Content-type: text/html; charset=utf-8");
require 'account.class.php';

session_start();
if (isset($_SESSION["account"]) && $_SESSION["account"] != null && $_SESSION["account"] != "" && isset($_SESSION["type"]) && $_SESSION["type"] != null && $_SESSION["type"] != "" && is_login($_SESSION['account'], $_SESSION['type'])) {
    $result = array("Code" => "1", "Msg" => "您已经登录");
    echo json_encode($result);
    exit(0);
}

$username = '';
$password = '';
$type = '';

if (isset($_POST['username']) && $_POST['username'] != null) {
    $username = $_POST['username'];
}
if (isset($_POST['password']) && $_POST['password'] != null) {
    $password = $_POST['password'];
}
if (isset($_POST['type']) && $_POST['type'] != null) {
    $type = $_POST['type'];
}
if ($username == "" || $password == "" || $type == "") {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
}

if ($type == TEACHER_TYPE) {
    require '../db/conn.class.php';
    $tmp = $conne->init_conn();
    if ($tmp == -1) {
        $result = array("Code" => "-1", "Msg" => "连接数据库失败");
        echo json_encode($result);
        exit(0);
    }
    $sql = "select * from teacher where t_username='" . $username . "' and t_password='" . $password . "'";
    $tmparray = $conne->getRowsArray($sql);
    $count = count($tmparray);
    if ($count == 1) {
        session_start();
        $_SESSION["type"] = TEACHER_TYPE;
        $_SESSION['account'] = new TeacherClass(
            $tmparray[0]['t_id'],
            $tmparray[0]['t_username'],
            $tmparray[0]['t_password'],
            $tmparray[0]['t_truename'],
            $tmparray[0]['t_phone'],
            $tmparray[0]['t_qq']);
        $accountmsg = array(
            't_id' => $tmparray[0]['t_id'],
            't_username' => $tmparray[0]['t_username'],
            't_password' => $tmparray[0]['t_password'],
            't_truename' => $tmparray[0]['t_truename'],
            't_phone' => $tmparray[0]['t_phone'],
            't_qq' => $tmparray[0]['t_qq']);
        $result = array("Code" => "1", "Msg" => "登录成功", 'Account' => $accountmsg);
        echo json_encode($result);
        exit(0);
    } else if ($count == 0) {
        $result = array("Code" => "-1", "Msg" => "用户名或密码错误");
        echo json_encode($result);
        exit(0);
    } else if ($count == -1) {
        $result = array("Code" => "-1", "Msg" => "登录异常");
        echo json_encode($result);
        exit(0);
    }
    $conne->close_rst();
    $conne->close_conn();
} else if ($type == ADMIN_TYPE) {
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "select * from user where m_username='" . $username . "' and m_password='" . $password . "'";
    $tmparray = $conne->getRowsArray($sql);
    $count = count($tmparray);
    if ($count == 1) {
        session_start();
        $_SESSION["type"] = ADMIN_TYPE;
        $_SESSION['account'] = new AdminClass(
            $tmparray[0]['m_id'],
            $tmparray[0]['m_username'],
            $tmparray[0]['m_password'],
            $tmparray[0]['m_phone'],
            $tmparray[0]['m_qq']);
        $accountmsg = array(
            'm_id' => $tmparray[0]['m_id'],
            'm_username' => $tmparray[0]['m_username'],
            'm_password' => $tmparray[0]['m_password'],
            'm_phone' => $tmparray[0]['m_phone'],
            'm_qq' => $tmparray[0]['m_qq']);
        $result = array("Code" => "1", "Msg" => "登录成功", 'Account' => $accountmsg);
        echo json_encode($result);
        exit(0);
    } else if ($count == 0) {
        $result = array("Code" => "-1", "Msg" => "用户名或密码错误");
        echo json_encode($result);
        exit(0);
    } else if ($count == -1) {
        $result = array("Code" => "-1", "Msg" => "登录异常");
        echo json_encode($result);
        exit(0);
    }
    $conne->close_rst();
    $conne->close_conn();
} else {
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
}

