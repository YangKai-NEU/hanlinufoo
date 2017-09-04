<?php

header("Content-type: text/html; charset=utf-8");
/*
 * Load the config file
 * */
require './config.class.php';
require './class/UserClass.php';

/*
 * Check the authentic information
 * */
session_start();
if (isset($_SESSION[ACCOUNT]) && $_SESSION[ACCOUNT] != null) {
    /*
     * The user has logined
     * */
    $result = array("Code" => "1", "Msg" => "您已登录", "Data" => $_SESSION[ACCOUNT]);
    echo json_encode($result);
    exit(0);
} else {
    /*
     * The user has not logined
     * */
    $_SESSION[ACCOUNT] = null;
    $result = array("Code" => "-1", "Msg" => "您还未登录");
    echo json_encode($result);
    exit(0);
}


