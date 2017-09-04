<?php

header("Content-type: text/html; charset=utf-8");
require 'account.class.php';

session_start();
if (isset($_SESSION['account']) || $_SESSION['account'] != null || $_SESSION['account'] != "" || isset($_SESSION['type']) || $_SESSION['type'] != null || $_SESSION['type'] != "" || !is_login($_SESSION['account'], $_SESSION['type'])) {
    $result = array("Code" => "-1", "Msg" => "您还未登录");
    echo json_encode($result);
    exit(0);
} else if ($_SESSION['type'] != ADMIN_TYPE) {
    $result = array("Code" => "-1", "Msg" => "您没有该权限");
    echo json_encode($result);
    exit(0);
} else {
    $uid = "";
    $type = "";
    if (isset($_GET["uid"]) && $_GET["uid"] != null) {
        $uid = $_GET["uid"];
    }
    if (isset($_GET["type"]) && $_GET["type"] != null) {
        $type = $_GET["type"];
    }
    /*
     * Load the database config file
     * */
    require '../db/conn.class.php';
    $conne->init_conn();
    $sql = "";
    switch ($type) {
        case  STUDENT_TYPE:
            $sql = "DELETE FROM student WHERE s_id='" . $uid . "'";
            break;
        case TEACHER_TYPE:
            $sql = "DELETE FROM teacher WHERE t_id='" . $uid . "'";
            break;
        default:
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
            exit(0);
            break;
    }
    $affectednum = $conne->uidRst($sql);
    /*
     * Format the result
     * */
    $result = array();
    if ($affectednum == 1) {
        $result = array("Code" => "1", "Msg" => "删除成功");
    } else {
        $result = array("Code" => "-1", "Msg" => "该用户不存在");
    }
    echo json_encode($result);
    $conne->close_conn();

}