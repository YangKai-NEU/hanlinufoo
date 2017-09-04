<?php

header("Content-type: text/html; charset=utf-8");
require 'account.class.php';

session_start();

if (!isset($_SESSION["type"]) || $_SESSION["type"] == null || $_SESSION["type"] == "" || !isset($_SESSION["account"]) || $_SESSION["account"] == null || $_SESSION["account"] == "" || !is_login($_SESSION['account'], $_SESSION['type'])) {
    $result = array("Code" => "-1", "Msg" => "您还未登录");
    echo json_encode($result);
    exit(0);
} else {
    $password = "";
    $newpassword = "";
    if (isset($_GET["password"]) && $_GET["password"] != null) {
        $password = $_GET["password"];
    }
    if (isset($_GET["newpassword"]) && $_GET["newpassword"] != null) {
        $newpassword = $_GET["newpassword"];
    }
    if ($password == "" || $newpassword == "") {
        $result = array("Code" => "-1", "Msg" => "密码错误");
        echo json_encode($result);
    } else {
        if ($_SESSION['type'] == STUDENT_TYPE) {
            if ($password != $_SESSION['account']->getSPassword()) {
                $result = array("Code" => "-1", "Msg" => "密码错误");
                echo json_encode($result);
            } else {
                require '../db/conn.class.php';
                $conne->init_conn();
                $sql = "UPDATE student SET s_password='" . $newpassword . "' WHERE s_id='" . $_SESSION["account"]->getSId() . "'";
                $conne->uidRst($sql);
                $result = array("Code" => "1", "Msg" => "密码修改成功");
                echo json_encode($result);
                $_SESSION['account']->setSPassword($newpassword);
                $conne->close_conn();
            }
        } else if ($_SESSION['type'] == TEACHER_TYPE) {
            if ($password != $_SESSION['account']->getTPassword()) {
                $result = array("Code" => "-1", "Msg" => "密码错误");
                echo json_encode($result);
            } else {
                require '../db/conn.class.php';
                $conne->init_conn();
                $sql = "UPDATE teacher SET t_password='" . $newpassword . "' WHERE t_id='" . $_SESSION["account"]->getTId() . "'";
                $conne->uidRst($sql);
                $result = array("Code" => "1", "Msg" => "密码修改成功");
                echo json_encode($result);
                $_SESSION['account']->setTPassword($newpassword);
                $conne->close_conn();
            }
        } else if ($_SESSION['type'] == ADMIN_TYPE) {
            if ($password != $_SESSION['account']->getAPassword()) {
                $result = array("Code" => "-1", "Msg" => "密码错误");
                echo json_encode($result);
            } else {
                require '../db/conn.class.php';
                $conne->init_conn();
                $sql = "UPDATE admin SET a_password='" . $newpassword . "' WHERE a_id='" . $_SESSION["account"]->getAId() . "'";
                $conne->uidRst($sql);
                $result = array("Code" => "1", "Msg" => "密码修改成功");
                echo json_encode($result);
                $_SESSION['account']->setAPassword($newpassword);
                $conne->close_conn();
            }
        } else {
            $result = array("Code" => "-1", "Msg" => "参数错误");
            echo json_encode($result);
        }
    }
}