<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/12/10 0010
 * Time: afternoon 5:09
 */

require 'account.class.php';

session_start();

if (!is_login($_SESSION['account'], $_SESSION['type'])) {
    $result = array("Code" => "-1", "Msg" => "you have not logined");
    echo json_encode($result);
    exit(0);
} else if ($_SESSION['type'] != ADMIN_TYPE) {
    $result = array("Code" => "-1", "Msg" => "you don't have the right");
    echo json_encode($result);
    exit(0);
} else {
    $tablename = "";
    $qid = "";
    if (isset($_GET["qid"]) && $_GET["qid"] != null) {
        $qid = $_GET["qid"];
    }
    if (isset($_GET["tablename"]) && $_GET["tablename"] != null) {
        $tablename = $_GET["tablename"];
    }

    if ($qid == "" || $tablename == "") {
        $result = array("Code" => "-1", "Msg" => "parameter error");
        echo json_encode($result);
        exit(0);
    }

    $first_charactor = substr($tablename, 0, 1);

    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "DELETE FROM ".$tablename." WHERE ".$first_charactor."_id='" . $qid . "'";
    $affectednum = $conne->uidRst($sql);
    $result = array();
    if ($affectednum == 1) {
        $result = array("Code" => "1", "Msg" => "remove question successful");
    } else {
        $result = array("Code" => "-1", "Msg" => "there is no such question");
    }
    echo json_encode($result);
    $conne->close_conn();

}