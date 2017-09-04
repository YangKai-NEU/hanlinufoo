<?php

header("Content-type: text/html; charset=utf-8");
require './config.class.php';
require './class/UserClass.php';

session_start();
if (!isset($_SESSION[ACCOUNT]) || $_SESSION[ACCOUNT] == null) {
    $result = array("Code" => "1", "Msg" => "您还未登录");
    echo json_encode($result);
    exit(0);
} else {
    $_SESSION[ACCOUNT] = null;
    $result = array("Code" => "1", "Msg" => "您已经成功退出登录");
    echo json_encode($result);
    exit(0);
}