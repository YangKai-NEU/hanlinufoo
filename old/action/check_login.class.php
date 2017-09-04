<?php

header("Content-type: text/html; charset=utf-8");
/*
 * Load the config file
 * */
require 'account.class.php';

/*
 * Check whether the user has logined
 * */
if (isset($_POST["type"]) && $_POST["type"] != null && $_POST["type"] != "") {
    /*
     * Check the authentic information
     * */
    session_start();
    if (isset($_SESSION["account"]) && $_SESSION["account"] != null && $_SESSION["account"] != "" && isset($_SESSION["type"])&&$_SESSION["type"]!=null&&$_SESSION["type"]!="" && $_SESSION["type"] == $_POST["type"] && is_login($_SESSION["account"], $_SESSION["type"])) {
        /*
         * The user has logined
         * */
        $result = array("Code" => "1", "Msg" => "您已登录", "Data" => $_SESSION["account"]);
        echo json_encode($result);
        exit(0);
    } else {
        /*
         * The user has not logined
         * */
        $_SESSION["account"]=null;
        $_SESSION["type"]=null;
        $result = array("Code" => "-1", "Msg" => "您还未登录");
        echo json_encode($result);
        exit(0);
    }
} else {
    /*
     * The parameter is error
     * */
    $result = array("Code" => "-1", "Msg" => "参数错误");
    echo json_encode($result);
    exit(0);
}

