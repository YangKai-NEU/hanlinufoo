<?php

header("Content-type: text/html; charset=utf-8");
require 'account.class.php';

session_start();
if (!isset($_SESSION['account']) || $_SESSION['account'] == null || $_SESSION['account'] == "" || !isset($_SESSION['type']) || $_SESSION['type'] == null || $_SESSION['type'] == "" || !is_login($_SESSION['account'], $_SESSION['type'])) {
    $result = array("Code" => "1", "Msg" => "您还未登录");
    echo json_encode($result);
    exit(0);
} else {
    $_SESSION['account'] = null;
    $_SESSION['type'] = null;
    $result = array("Code" => "1", "Msg" => "您已经成功退出登录");
    echo json_encode($result);
    exit(0);
}